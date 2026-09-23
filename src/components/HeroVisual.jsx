import { useEffect, useRef } from 'react'

// A procedural wireframe knot rendered on canvas — reacts gently to pointer
// position. Stands in for the "expensive 3D object" without using a stock
// glossy-blob render.
export default function HeroVisual() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h, dpr

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    const N_RINGS = 26
    const N_PTS = 64
    let t = 0

    const project = (x, y, z, cx, cy, scale) => {
      const persp = 1 / (1 + z * 0.6)
      return {
        x: cx + x * scale * persp,
        y: cy + y * scale * persp,
        s: persp,
      }
    }

    const draw = () => {
      t += 0.0032
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04

      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.52
      const cy = h * 0.5
      const scale = Math.min(w, h) * 0.34

      const rotY = t + mouse.current.x * 0.6
      const rotX = 0.5 + mouse.current.y * 0.4

      for (let r = 0; r < N_RINGS; r++) {
        const ringT = r / N_RINGS
        const path = []
        for (let p = 0; p <= N_PTS; p++) {
          const a = (p / N_PTS) * Math.PI * 2
          // torus-knot-ish deformation for an "abstract sculpture" feel
          const knot = Math.sin(a * 3 + ringT * Math.PI * 2 + t * 2) * 0.18
          const radius = 1 + knot
          let x = Math.cos(a) * radius
          let y = Math.sin(a) * radius * 0.4 + Math.sin(ringT * Math.PI * 2 + t) * 0.9
          let z = Math.sin(a) * radius * 0.9 + ringT * 1.6 - 0.8

          // rotate Y
          const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
          const x1 = x * cosY - z * sinY
          const z1 = x * sinY + z * cosY
          // rotate X
          const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
          const y1 = y * cosX - z1 * sinX
          const z2 = y * sinX + z1 * cosX

          path.push(project(x1, y1, z2, cx, cy, scale))
        }

        const avgZ = path.reduce((s, p) => s + p.s, 0) / path.length
        const alpha = Math.max(0.06, Math.min(0.9, (avgZ - 0.55) * 1.8))
        const isAccent = r % 7 === 0

        ctx.beginPath()
        path.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
        ctx.strokeStyle = isAccent
          ? `rgba(200, 255, 62, ${alpha})`
          : `rgba(10, 10, 10, ${alpha * 0.55})`
        ctx.lineWidth = isAccent ? 1.4 : 0.7
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-visual-canvas" aria-hidden="true" />
}
