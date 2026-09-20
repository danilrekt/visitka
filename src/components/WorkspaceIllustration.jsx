export default function WorkspaceIllustration() {
  return (
    <div className="workspace">
      <svg
        className="workspace__svg"
        viewBox="0 0 420 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Иллюстрация рабочего места разработчика"
        role="img"
      >
        <style>{`
          .ws-border { fill: var(--border); stroke: var(--border); }
          .ws-border-only { stroke: var(--border); }
          .ws-bg { fill: var(--bg); }
          .ws-card-bg { fill: var(--card-bg); }
          .ws-illustration-bg { fill: var(--illustration-bg); }
          .ws-illustration-accent { fill: var(--illustration-accent); }
          .ws-illustration-accent-o5 { fill: var(--illustration-accent); opacity: 0.5; }
          .ws-illustration-accent-o3 { fill: var(--illustration-accent); opacity: 0.3; }
          .ws-illustration-accent-o4 { fill: var(--illustration-accent); opacity: 0.4; }
          .ws-illustration-blue { fill: var(--illustration-blue); }
          .ws-illustration-blue-o3 { fill: var(--illustration-blue); opacity: 0.3; }
          .ws-illustration-blue-o25 { fill: var(--illustration-blue); opacity: 0.25; }
          .ws-illustration-blue-o5 { fill: var(--illustration-blue); opacity: 0.5; }
          .ws-text { fill: var(--text); }
          .ws-text-secondary { fill: var(--text-secondary); }
          .ws-accent { fill: var(--accent); }
          .ws-white { fill: #FFFFFF; }
          .ws-shadow { filter: url(#soft); }
          .ws-stroke-white { stroke: #FFFFFF; }
        `}</style>

        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#10243A" floodOpacity="0.05" />
          </filter>
        </defs>

        {/* Floating card top-right */}
        <rect x="305" y="24" width="72" height="52" rx="10" className="ws-white ws-shadow ws-anim-float-slow" stroke="var(--border)" strokeWidth="1" />
        <rect x="318" y="40" width="44" height="6" rx="3" className="ws-illustration-accent ws-anim-float-slow" style={{ animationDelay: '1.5s' }} />
        <rect x="318" y="54" width="28" height="6" rx="3" className="ws-border ws-anim-float-slow" style={{ animationDelay: '1.6s' }} />
        <rect x="318" y="68" width="36" height="6" rx="3" className="ws-border ws-anim-float-slow" style={{ animationDelay: '1.7s' }} />

        {/* Floating card left */}
        <rect x="18" y="52" width="64" height="46" rx="10" className="ws-white ws-shadow ws-anim-float-slow" style={{ animationDelay: '0.5s' }} stroke="var(--border)" strokeWidth="1" />
        <circle cx="38" cy="74" r="10" className="ws-illustration-accent-o5 ws-anim-float-slow" style={{ animationDelay: '0.6s' }} />
        <rect x="54" y="68" width="20" height="6" rx="3" className="ws-border ws-anim-float-slow" style={{ animationDelay: '0.7s' }} />
        <rect x="54" y="80" width="14" height="6" rx="3" className="ws-border ws-anim-float-slow" style={{ animationDelay: '0.8s' }} />

        {/* Coffee cup */}
        <rect x="24" y="216" width="38" height="44" rx="6" className="ws-card-bg ws-border-only ws-anim-float" strokeWidth="1.5" />
        <path d="M62 228 C72 228 72 244 62 244" fill="none" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" className="ws-anim-float" style={{ animationDelay: '1.1s' }} />
        <ellipse cx="43" cy="218" rx="19" ry="4" className="ws-border ws-anim-float" style={{ animationDelay: '1.2s' }} />
        <path d="M34 206 Q38 200 34 194" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" className="ws-anim-float" style={{ animationDelay: '1.3s' }} />
        <path d="M48 206 Q52 200 48 194" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" className="ws-anim-float" style={{ animationDelay: '1.4s' }} />

        {/* Plant pot */}
        <rect x="348" y="228" width="36" height="30" rx="4" className="ws-illustration-accent-o3 ws-anim-float" style={{ animationDelay: '1.6s' }} />
        <ellipse cx="366" cy="216" rx="14" ry="20" className="ws-illustration-blue-o3 ws-anim-float" transform="rotate(-15 366 216)" style={{ animationDelay: '1.7s' }} />
        <ellipse cx="354" cy="218" rx="10" ry="16" className="ws-illustration-accent-o4 ws-anim-float" transform="rotate(20 354 218)" style={{ animationDelay: '1.8s' }} />
        <ellipse cx="362" cy="208" rx="8" ry="14" className="ws-illustration-blue-o25 ws-anim-float" transform="rotate(-5 362 208)" style={{ animationDelay: '1.9s' }} />

        {/* Laptop shadow */}
        <ellipse cx="210" cy="268" rx="140" ry="12" className="ws-border ws-anim-appear" opacity="0.5" style={{ animationDelay: '0.3s' }} />

        {/* Laptop base */}
        <rect x="55" y="200" width="310" height="18" rx="6" className="ws-card-bg ws-border-only ws-anim-appear" strokeWidth="1.5" style={{ animationDelay: '0.3s' }} />
        <rect x="175" y="196" width="70" height="6" rx="3" className="ws-border ws-anim-appear" opacity="0.5" style={{ animationDelay: '0.3s' }} />

        {/* Laptop screen */}
        <rect x="75" y="50" width="270" height="155" rx="10" className="ws-card-bg ws-shadow ws-anim-appear" stroke="var(--border)" strokeWidth="1.5" style={{ animationDelay: '0.3s' }} />
        <rect x="85" y="60" width="250" height="135" rx="6" className="ws-bg ws-border-only ws-anim-appear" strokeWidth="1" style={{ animationDelay: '0.3s' }} />

        {/* Browser top bar */}
        <rect x="85" y="60" width="250" height="18" rx="6" className="ws-illustration-bg ws-anim-appear" style={{ animationDelay: '0.35s' }} />
        <circle cx="98" cy="69" r="4" className="ws-border ws-anim-appear" style={{ animationDelay: '0.4s' }} />
        <circle cx="112" cy="69" r="4" className="ws-border ws-anim-appear" style={{ animationDelay: '0.45s' }} />
        <circle cx="126" cy="69" r="4" className="ws-border ws-anim-appear" style={{ animationDelay: '0.5s' }} />
        <rect x="145" y="65" width="120" height="8" rx="4" className="ws-border ws-anim-appear" opacity="0.5" style={{ animationDelay: '0.55s' }} />

        {/* Code lines */}
        <rect x="100" y="92" width="80" height="6" rx="3" className="ws-border ws-anim-code-line" style={{ animationDelay: '0.6s' }} />
        <rect x="100" y="106" width="120" height="6" rx="3" className="ws-border ws-anim-code-line" style={{ animationDelay: '0.65s' }} />
        <rect x="100" y="120" width="60" height="6" rx="3" className="ws-illustration-accent ws-anim-code-line" opacity="0.6" style={{ animationDelay: '0.7s' }} />
        <rect x="100" y="134" width="140" height="6" rx="3" className="ws-border ws-anim-code-line" style={{ animationDelay: '0.75s' }} />
        <rect x="100" y="148" width="100" height="6" rx="3" className="ws-border ws-anim-code-line" style={{ animationDelay: '0.8s' }} />
        <rect x="120" y="162" width="130" height="6" rx="3" className="ws-border ws-anim-code-line" style={{ animationDelay: '0.85s' }} />
        <rect x="120" y="176" width="80" height="6" rx="3" className="ws-illustration-blue-o5 ws-anim-code-line" style={{ animationDelay: '0.9s' }} />

        {/* Floating </> badge */}
        <rect x="340" y="148" width="56" height="42" rx="10" className="ws-white ws-shadow ws-anim-float-slow" style={{ animationDelay: '0.3s' }} stroke="var(--border)" strokeWidth="1" />
        <text x="368" y="176" textAnchor="middle" className="ws-accent ws-anim-float-slow" fontSize="18" fontFamily="monospace" fontWeight="600" style={{ animationDelay: '0.4s' }}>&lt;/&gt;</text>
      </svg>
    </div>
  );
}
