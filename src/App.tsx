import React, { useState, useMemo } from 'react';
import chroma from 'chroma-js';
import { Upload, Palette, BadgeCheck, XOctagon } from 'lucide-react';
import { TshirtMockup, MugMockup, CardMockup } from './components/Mockups';

const DEFAULT_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;

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

        <div className="control-group">
          <label>Nahrát logo (SVG)</label>
          <div className="file-upload">
            <button className="btn">
              <Upload size={18} /> Vybrat SVG soubor
            </button>
            <input type="file" accept=".svg" onChange={handleFileUpload} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem', fontWeight: 'normal', textTransform: 'none' }}>
            <input type="checkbox" checked={colorizeLogo} onChange={(e) => setColorizeLogo(e.target.checked)} />
            Vnutit logu primární barvu
          </label>
        </div>

        <div className="control-group">
          <label>Primární barva</label>
          <div className="color-picker-wrapper">
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => setPrimaryColor(e.target.value)} 
            />
            <span className="color-hex">{primaryColor}</span>
          </div>
        </div>

        <div className="control-group">
          <label>Sekundární barva (Povrch)</label>
          <div className="color-picker-wrapper">
            <input 
              type="color" 
              value={secondaryColor} 
              onChange={(e) => setSecondaryColor(e.target.value)} 
            />
            <span className="color-hex">{secondaryColor}</span>
          </div>
          <button className="btn" style={{ marginTop: '0.5rem' }} onClick={generateSecondary}>
            <Palette size={18} /> AI Výběr Barvy
          </button>
        </div>

        <div className="control-group">
          <label>Barva pozadí</label>
          <div className="color-picker-wrapper">
            <input 
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)} 
            />
          </div>
        </div>

        <div className="control-group switch-wrapper" onClick={() => setSwapColors(!swapColors)}>
          <label style={{ cursor: 'pointer', margin: 0 }}>Prohodit barvy povrch/logo</label>
          <div className={`switch ${swapColors ? 'active' : ''}`}>
            <div className="switch-knob"></div>
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
        <MugMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
        <TshirtMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
        <CardMockup logo={logoSvg} colorizeLogo={colorizeLogo} />
      </div>
    </div>
  );
}

export default App;
