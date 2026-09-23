import { useEffect, useRef } from 'react'

// The line-art cat rebuilt from particles: dots fly in and assemble on load,
// scatter away from the pointer (lighting up in the accent colour) and spring
// back home. A click sends a shockwave through them. onActiveChange reports
// whether the pointer is currently on the cat.
const SRC = 'hero-cat.jpg'
const INK = 'rgb(10, 10, 10)'
const ACID = 'rgb(200, 255, 62)'

const MAX_PARTICLES = 32000
// luminance below this counts as a line; small renders get a stricter cut-off
// and finer dots, otherwise the thin strokes blur into grey noise
const DARK_THRESHOLD = 165
const DARK_THRESHOLD_SMALL = 135
const DOT_LARGE = 1.5
const DOT_SMALL = 1.05
const SMALL_SCALE = 0.3
const POINTER_RADIUS = 80
const POINTER_FORCE = 5
const WAVE_RADIUS = 240
const WAVE_FORCE = 16
const SPRING = 0.07
const DAMPING = 0.82
const EXCITED_OFFSET = 3
// a tap is too short for the hint to fade out, so after touch input the cat
// stays "engaged" for a while and the hint comes back only once it's left alone
const TOUCH_RELEASE_MS = 250

export default function HeroVisual({ onActiveChange }) {
  const canvasRef = useRef(null)
  const onActiveChangeRef = useRef(onActiveChange)
  onActiveChangeRef.current = onActiveChange

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const img = new Image()
    let source = null // the half-face drawing mirrored into a full face

    let w = 0
    let h = 0
    let n = 0
    let dot = DOT_LARGE
    let hx, hy, x, y, vx, vy, excited
    let raf = 0
    let firstBuild = true
    const pointer = { x: -9999, y: -9999, active: false }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      if (!w || !h || !source) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const aspect = source.width / source.height
      let dh = h
      let dw = h * aspect
      if (dw > w) {
        dw = w
        dh = w / aspect
      }
      const ox = (w - dw) / 2
      const small = dh / source.height < SMALL_SCALE
      const threshold = small ? DARK_THRESHOLD_SMALL : DARK_THRESHOLD
      dot = small ? DOT_SMALL : DOT_LARGE
      const oy = h - dh // sit on the bottom edge, the chin lines up with the text

      const off = document.createElement('canvas')
      off.width = Math.ceil(dw)
      off.height = Math.ceil(dh)
      const octx = off.getContext('2d', { willReadFrequently: true })
      octx.drawImage(source, 0, 0, off.width, off.height)
      const data = octx.getImageData(0, 0, off.width, off.height).data

      const step = Math.max(small ? 1.3 : 1.6, Math.sqrt((off.width * off.height * 0.45) / MAX_PARTICLES))
      const pts = []
      for (let sy = 0; sy < off.height; sy += step) {
        for (let sx = 0; sx < off.width; sx += step) {
          // jitter the sampling grid so the lines don't turn into a moiré pattern
          const px = Math.min(off.width - 1, Math.max(0, Math.round(sx + (Math.random() - 0.5) * step)))
          const py = Math.min(off.height - 1, Math.max(0, Math.round(sy + (Math.random() - 0.5) * step)))
          const i = (py * off.width + px) * 4
          const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          if (lum < threshold) pts.push(ox + px, oy + py)
        }
      }

      n = Math.min(pts.length / 2, MAX_PARTICLES)
      hx = new Float32Array(n)
      hy = new Float32Array(n)
      x = new Float32Array(n)
      y = new Float32Array(n)
      vx = new Float32Array(n)
      vy = new Float32Array(n)
      excited = new Int32Array(n)

      const intro = firstBuild && !reduceMotion
      for (let i = 0; i < n; i++) {
        hx[i] = pts[i * 2]
        hy[i] = pts[i * 2 + 1]
        if (intro) {
          // start as a loose cloud drifting in from the left
          const a = Math.random() * Math.PI * 2
          const r = Math.random() * Math.max(w, h) * 0.4
          x[i] = hx[i] - w * 0.2 + Math.cos(a) * r
          y[i] = hy[i] + Math.sin(a) * r
        } else {
          x[i] = hx[i]
          y[i] = hy[i]
        }
      }
      firstBuild = false
      wake()
    }

    const frame = () => {
      raf = 0
      ctx.clearRect(0, 0, w, h)

      const r2 = POINTER_RADIUS * POINTER_RADIUS
      const px = pointer.x
      const py = pointer.y
      let energy = 0
      let nExcited = 0

      ctx.fillStyle = INK
      for (let i = 0; i < n; i++) {
        let dx = x[i] - px
        let dy = y[i] - py
        const d2 = dx * dx + dy * dy
        if (pointer.active && d2 < r2) {
          const d = Math.sqrt(d2) || 1
          const f = 1 - d / POINTER_RADIUS
          vx[i] += (dx / d) * f * f * POINTER_FORCE
          vy[i] += (dy / d) * f * f * POINTER_FORCE
        }

        vx[i] = (vx[i] + (hx[i] - x[i]) * SPRING) * DAMPING
        vy[i] = (vy[i] + (hy[i] - y[i]) * SPRING) * DAMPING
        x[i] += vx[i]
        y[i] += vy[i]

        energy += Math.abs(vx[i]) + Math.abs(vy[i])
        dx = x[i] - hx[i]
        dy = y[i] - hy[i]
        if (dx * dx + dy * dy > EXCITED_OFFSET * EXCITED_OFFSET) {
          excited[nExcited++] = i
        } else {
          ctx.fillRect(x[i], y[i], dot, dot)
        }
      }

      ctx.fillStyle = ACID
      for (let k = 0; k < nExcited; k++) {
        const i = excited[k]
        ctx.fillRect(x[i] - 0.4, y[i] - 0.4, dot + 0.8, dot + 0.8)
      }

      // go to sleep once everything has settled and nobody is poking it
      if (energy / Math.max(n, 1) > 0.002 || pointer.active) wake()
    }

    function wake() {
      if (!raf && n) raf = requestAnimationFrame(frame)
    }

    const localPoint = (e) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top, inside: e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom }
    }

    // `pointer.active` drives the physics; `engaged` is what the hint follows
    let engaged = false
    let releaseTimer = 0
    const setEngaged = (value) => {
      clearTimeout(releaseTimer)
      if (engaged === value) return
      engaged = value
      onActiveChangeRef.current?.(value)
    }

    const setActive = (active, pointerType = 'mouse') => {
      pointer.active = active
      if (active) setEngaged(true)
      else if (pointerType === 'mouse') setEngaged(false)
      else {
        clearTimeout(releaseTimer)
        releaseTimer = setTimeout(() => setEngaged(false), TOUCH_RELEASE_MS)
      }
    }

    const onMove = (e) => {
      const p = localPoint(e)
      pointer.x = p.x
      pointer.y = p.y
      if (p.inside !== pointer.active) setActive(p.inside, e.pointerType)
      if (p.inside) wake()
    }
    const onLeave = () => setActive(false)
    const onUp = (e) => {
      if (e.pointerType !== 'mouse') setActive(false, e.pointerType)
    }
    // also used for pointerleave, which touch pointers fire right after lifting
    const onCancel = (e) => setActive(false, e.pointerType)
    const onDown = (e) => {
      const p = localPoint(e)
      if (!p.inside) return
      pointer.x = p.x
      pointer.y = p.y
      setActive(true, e.pointerType)
      for (let i = 0; i < n; i++) {
        const dx = x[i] - p.x
        const dy = y[i] - p.y
        const d = Math.sqrt(dx * dx + dy * dy) || 1
        if (d < WAVE_RADIUS) {
          const f = 1 - d / WAVE_RADIUS
          vx[i] += (dx / d) * f * WAVE_FORCE
          vy[i] += (dy / d) * f * WAVE_FORCE
        }
      }
      wake()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onCancel)
    document.addEventListener('pointerleave', onCancel)
    window.addEventListener('blur', onLeave)

    const ro = new ResizeObserver(() => build())
    ro.observe(canvas)

    img.onload = () => {
      // The drawing is cut down the middle of the nose, so mirror it onto
      // itself to get the whole head. A couple of pixels overlap hide the seam.
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const overlap = 2
      source = document.createElement('canvas')
      source.width = iw * 2 - overlap
      source.height = ih
      const sctx = source.getContext('2d')
      sctx.drawImage(img, 0, 0)
      sctx.translate(source.width, 0)
      sctx.scale(-1, 1)
      sctx.drawImage(img, 0, 0)
      build()
    }
    img.src = SRC

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(releaseTimer)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
      document.removeEventListener('pointerleave', onCancel)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-visual-canvas" aria-hidden="true" />
}
