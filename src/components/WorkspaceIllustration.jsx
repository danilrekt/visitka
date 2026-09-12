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
        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#10243A" floodOpacity="0.05" />
          </filter>
        </defs>

        {/* Floating card top-right */}
        <rect x="305" y="24" width="72" height="52" rx="10" fill="#FFFFFF" stroke="var(--border)" strokeWidth="1" filter="url(#soft)" />
        <rect x="318" y="40" width="44" height="6" rx="3" fill="var(--illustration-accent)" />
        <rect x="318" y="54" width="28" height="6" rx="3" fill="var(--border)" />
        <rect x="318" y="68" width="36" height="6" rx="3" fill="var(--border)" />

        {/* Floating card left */}
        <rect x="18" y="52" width="64" height="46" rx="10" fill="#FFFFFF" stroke="var(--border)" strokeWidth="1" filter="url(#soft)" />
        <circle cx="38" cy="74" r="10" fill="var(--illustration-accent)" opacity="0.5" />
        <rect x="54" y="68" width="20" height="6" rx="3" fill="var(--border)" />
        <rect x="54" y="80" width="14" height="6" rx="3" fill="var(--border)" />

        {/* Coffee cup */}
        <rect x="24" y="216" width="38" height="44" rx="6" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="1.5" />
        <path d="M62 228 C72 228 72 244 62 244" fill="none" stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="43" cy="218" rx="19" ry="4" fill="var(--border)" />
        <path d="M34 206 Q38 200 34 194" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <path d="M48 206 Q52 200 48 194" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

        {/* Plant pot */}
        <rect x="348" y="228" width="36" height="30" rx="4" fill="var(--illustration-accent)" opacity="0.3" />
        <ellipse cx="366" cy="216" rx="14" ry="20" fill="var(--illustration-blue)" opacity="0.3" transform="rotate(-15 366 216)" />
        <ellipse cx="354" cy="218" rx="10" ry="16" fill="var(--illustration-accent)" opacity="0.4" transform="rotate(20 354 218)" />
        <ellipse cx="362" cy="208" rx="8" ry="14" fill="var(--illustration-blue)" opacity="0.25" transform="rotate(-5 362 208)" />

        {/* Laptop shadow */}
        <ellipse cx="210" cy="268" rx="140" ry="12" fill="var(--border)" opacity="0.5" />

        {/* Laptop base */}
        <rect x="55" y="200" width="310" height="18" rx="6" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="175" y="196" width="70" height="6" rx="3" fill="var(--border)" opacity="0.5" />

        {/* Laptop screen */}
        <rect x="75" y="50" width="270" height="155" rx="10" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="1.5" filter="url(#soft)" />
        {/* Screen inner */}
        <rect x="85" y="60" width="250" height="135" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />

        {/* Browser top bar */}
        <rect x="85" y="60" width="250" height="18" rx="6" fill="var(--illustration-bg)" />
        <circle cx="98" cy="69" r="4" fill="var(--border)" />
        <circle cx="112" cy="69" r="4" fill="var(--border)" />
        <circle cx="126" cy="69" r="4" fill="var(--border)" />
        <rect x="145" y="65" width="120" height="8" rx="4" fill="var(--border)" opacity="0.5" />

        {/* Code lines */}
        <rect x="100" y="92" width="80" height="6" rx="3" fill="var(--border)" />
        <rect x="100" y="106" width="120" height="6" rx="3" fill="var(--border)" />
        <rect x="100" y="120" width="60" height="6" rx="3" fill="var(--illustration-accent)" opacity="0.6" />
        <rect x="100" y="134" width="140" height="6" rx="3" fill="var(--border)" />
        <rect x="100" y="148" width="100" height="6" rx="3" fill="var(--border)" />
        <rect x="120" y="162" width="130" height="6" rx="3" fill="var(--border)" />
        <rect x="120" y="176" width="80" height="6" rx="3" fill="var(--illustration-blue)" opacity="0.5" />

        {/* Floating </> badge */}
        <rect x="340" y="148" width="56" height="42" rx="10" fill="#FFFFFF" stroke="var(--border)" strokeWidth="1" filter="url(#soft)" />
        <text x="368" y="176" textAnchor="middle" fill="var(--accent)" fontSize="18" fontFamily="monospace" fontWeight="600">&lt;/&gt;</text>
      </svg>
    </div>
  );
}
