

const LogoContainer = ({ svg, colorizeLogo }: { svg: string, colorizeLogo: boolean }) => {
  return (
    <div 
      className={`mockup-logo-wrapper ${colorizeLogo ? 'colorized' : ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export const MugMockup = ({ logo, colorizeLogo }: { logo: string, colorizeLogo: boolean }) => {
  return (
    <div className="glass-panel mockup-item">
      <svg className="mockup-shadows" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mugGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="20%" stopColor="white" stopOpacity="0.1" />
            <stop offset="80%" stopColor="black" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.4" />
          </linearGradient>
          <filter id="drop">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="black" floodOpacity="0.3" />
          </filter>
        </defs>
        <g filter="url(#drop)" style={{ transition: 'all 0.3s ease' }}>
          <path d="M 140 60 C 180 60 180 140 140 140" fill="none" stroke="var(--color-secondary)" strokeWidth="16" />
          <path d="M 140 60 C 180 60 180 140 140 140" fill="none" stroke="url(#mugGradient)" strokeWidth="16" />
          
          <rect x="50" y="40" width="100" height="120" rx="15" fill="var(--color-secondary)" />
          <rect x="50" y="40" width="100" height="120" rx="15" fill="url(#mugGradient)" />
        </g>
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '180px', height: '180px', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoContainer svg={logo} colorizeLogo={colorizeLogo} />
      </div>
    </div>
  );
};

export const TshirtMockup = ({ logo, colorizeLogo }: { logo: string, colorizeLogo: boolean }) => {
  return (
    <div className="glass-panel mockup-item">
      <svg className="mockup-shadows" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tshirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="black" stopOpacity="0.15" />
          </linearGradient>
          <filter id="drop2">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="black" floodOpacity="0.3" />
          </filter>
        </defs>
        <g filter="url(#drop2)" style={{ transition: 'all 0.3s ease' }}>
          <path 
            d="M 50 40 C 60 40 70 50 100 50 C 130 50 140 40 150 40 L 180 65 C 185 70 180 80 170 85 L 155 75 L 155 170 C 155 175 150 180 145 180 L 55 180 C 50 180 45 175 45 170 L 45 75 L 30 85 C 20 80 15 70 20 65 Z" 
            fill="var(--color-secondary)" 
          />
          <path 
            d="M 50 40 C 60 40 70 50 100 50 C 130 50 140 40 150 40 L 180 65 C 185 70 180 80 170 85 L 155 75 L 155 170 C 155 175 150 180 145 180 L 55 180 C 50 180 45 175 45 170 L 45 75 L 30 85 C 20 80 15 70 20 65 Z" 
            fill="url(#tshirtGradient)" 
          />
        </g>
      </svg>
      <div style={{ position: 'absolute', top: '48%', left: '50%', width: '200px', height: '200px', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoContainer svg={logo} colorizeLogo={colorizeLogo} />
      </div>
    </div>
  );
};

export const CardMockup = ({ logo, colorizeLogo }: { logo: string, colorizeLogo: boolean }) => {
  return (
    <div className="glass-panel mockup-item" style={{ perspective: '800px' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transform: 'rotateY(-15deg) rotateX(10deg)', transformStyle: 'preserve-3d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg className="mockup-shadows" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.0" />
            </linearGradient>
            <filter id="drop3">
              <feDropShadow dx="-5" dy="15" stdDeviation="15" floodColor="black" floodOpacity="0.4" />
            </filter>
          </defs>
          <g filter="url(#drop3)" style={{ transition: 'all 0.3s ease' }}>
            <rect x="25" y="65" width="150" height="90" rx="5" fill="var(--color-secondary)" />
            <rect x="25" y="65" width="150" height="90" rx="5" fill="url(#cardGradient)" />
          </g>
        </svg>
        <div style={{ position: 'absolute', top: '55%', left: '50%', width: '160px', height: '160px', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LogoContainer svg={logo} colorizeLogo={colorizeLogo} />
        </div>
      </div>
    </div>
  );
};

export const PhotoMockup = ({ logo, colorizeLogo }: { logo: string, colorizeLogo: boolean }) => {
  return (
    <div className="glass-panel mockup-item" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative' }}>
      {/* Fallback barva kdyby obrázek neexistoval */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
      
      <img src={`${import.meta.env.BASE_URL}photo-mockup.jpg`} alt="Photo Mockup" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 1 }} />
      
      {/* Barevná vrstva (multiply overlay) - omezena maskou jen na oblast trička (zhruba střed hrudníku) */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundColor: 'var(--color-secondary)', 
        mixBlendMode: 'multiply', 
        zIndex: 2,
        opacity: 0.9,
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 60%, black 25%, rgba(0,0,0,0.5) 50%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse 80% 90% at 50% 60%, black 25%, rgba(0,0,0,0.5) 50%, transparent 75%)'
      }} />

      <div style={{ position: 'absolute', top: '55%', left: '50%', width: '140px', height: '140px', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', mixBlendMode: 'multiply', opacity: 0.85, zIndex: 3 }}>
        <LogoContainer svg={logo} colorizeLogo={colorizeLogo} />
      </div>
    </div>
  );
};
