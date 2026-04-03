import React, { useState, useMemo } from 'react';
import chroma from 'chroma-js';
import { Upload, Palette, BadgeCheck, XOctagon, Pipette } from 'lucide-react';
import { TshirtMockup, MugMockup, CardMockup, PhotoMockup } from './components/Mockups';

const DEFAULT_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
  <path d="M 32 25 v -12 M 68 25 v -12" stroke-width="8" />
  <path d="M 25 35 q 0 -10 10 -10 h 30 q 10 0 10 10 v 17 q 0 16 -25 16 q -25 0 -25 -16 z" stroke-width="10" />
  <path d="M 14 38 v 14 M 86 38 v 14" stroke-width="10" />
  <path d="M 38 40 v 8 M 62 40 v 8" stroke-width="6" />
  <path d="M 45 58 h 10" stroke-width="6" />
  <path d="M 15 86 q 35 -10 70 0" stroke-width="8" />
</svg>`;

function App() {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#f59e0b');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [logoSvg, setLogoSvg] = useState<string>(DEFAULT_LOGO);
  const [swapColors, setSwapColors] = useState(false);
  const [colorizeLogo, setColorizeLogo] = useState(false);

  // Generate a complementary/triadic color
  const generateSecondary = () => {
    // Generate a beautiful distinct color based on primary
    // Shift hue by 150-210 degrees (complementary range)
    const newColor = chroma(primaryColor).set('hsl.h', '+180').saturate(1).hex();
    setSecondaryColor(newColor);
  };

  // Calculate contrast
  const contrastRatio = useMemo(() => {
    return chroma.contrast(primaryColor, secondaryColor).toFixed(2);
  }, [primaryColor, secondaryColor]);

  // WCAG Scoring
  const getWcagScore = (ratio: number) => {
    if (ratio >= 7) return { label: 'AAA', status: 'pass', text: 'Skvělá čitelnost' };
    if (ratio >= 4.5) return { label: 'AA', status: 'pass', text: 'Dobrá čitelnost' };
    if (ratio >= 3) return { label: 'AA (Large)', status: 'pass', text: 'Pouze pro velké nadpisy' };
    return { label: 'Fail', status: 'fail', text: 'Nedostatečný kontrast' };
  };

  const wcag = getWcagScore(parseFloat(contrastRatio));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Wrap in a div to ensure sizing, or just keep raw
          setLogoSvg(event.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Prosím, nahrajte validní SVG soubor.");
    }
  };

  // Dynamic CSS variables
  const appStyle = {
    '--color-primary': swapColors ? secondaryColor : primaryColor,
    '--color-secondary': swapColors ? primaryColor : secondaryColor,
    '--color-bg': bgColor,
  } as React.CSSProperties;

  return (
    <div className="app-container" style={appStyle}>
      {/* Left Sidebar */}
      <div className="glass-panel controls">
        <div className="controls-header">
          <h1>Generátor Barev<br/>& Náledu Loga</h1>
          <p>Vizualizace brandu na reálných objektech</p>
        </div>

        <div className="colors-section">
          <div className="control-group primary-group">
            <label>Primární barva - LOGO</label>
            <div className="color-picker-wrapper primary-picker">
              <div className="color-circle-container">
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                />
                <Pipette className="pipette-icon" size={16} />
              </div>
              <input 
                type="text" 
                className="color-hex-input" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)} 
              />
            </div>
          </div>

          <div className="control-group">
            <label>Sekundární barva (Povrch)</label>
            <div className="color-picker-wrapper">
              <div className="color-circle-container">
                <input 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)} 
                />
                <Pipette className="pipette-icon" size={12} />
              </div>
              <input 
                type="text" 
                className="color-hex-input" 
                value={secondaryColor} 
                onChange={(e) => setSecondaryColor(e.target.value)} 
              />
            </div>
          </div>

          <div className="control-group">
            <label>Barva pozadí</label>
            <div className="color-picker-wrapper">
              <div className="color-circle-container">
                <input 
                  type="color" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)} 
                />
                <Pipette className="pipette-icon" size={12} />
              </div>
              <input 
                type="text" 
                className="color-hex-input" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="actions-section">
          <button className="btn" onClick={generateSecondary}>
            <Palette size={18} /> Vygenerovat sec. barvu (AI)
          </button>

          <div className="control-group switch-wrapper" onClick={() => setSwapColors(!swapColors)}>
            <label style={{ cursor: 'pointer', margin: 0 }}>Prohodit barvy povrch/logo</label>
            <div className={`switch ${swapColors ? 'active' : ''}`}>
              <div className="switch-knob"></div>
            </div>
          </div>

          <div className="control-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'normal', textTransform: 'none', color: 'var(--color-text)' }}>
              <input type="checkbox" checked={colorizeLogo} onChange={(e) => setColorizeLogo(e.target.checked)} />
              Vnutit logu primární barvu
            </label>
          </div>

          <div className="control-group" style={{ marginTop: '0.5rem' }}>
            <div className="file-upload">
              <button className="btn btn-secondary">
                <Upload size={18} /> Nahrát logo (SVG)
              </button>
              <input type="file" accept=".svg" onChange={handleFileUpload} />
            </div>
          </div>
        </div>

        <div className="wcag-widget">
          <label>WCAG Kontrast (Pro Logo vs Povrch)</label>
          <div className="wcag-score">
            <span style={{ fontSize: '2rem', fontWeight: '700' }}>{contrastRatio}:1</span>
            <span className={`score-badge ${wcag.status === 'pass' ? 'score-pass' : 'score-fail'}`}>
              {wcag.label}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {wcag.status === 'pass' ? <BadgeCheck size={16} color="#4ade80" /> : <XOctagon size={16} color="#f87171" />}
            {wcag.text}
          </p>
        </div>
      </div>

      {/* Right Canvas */}
      <div className="canvas-area">
        <PhotoMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
        <MugMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
        <TshirtMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
        <CardMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
      </div>
    </div>
  );
}

export default App;
