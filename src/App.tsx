import React, { useEffect, useState } from 'react';
import { Explorer } from './components/Explorer';
import { MosaicBackground } from './components/MosaicBackground';
import { BootScreen } from './components/BootScreen';

const DESIGN_WIDTH = 1760;
const DESIGN_HEIGHT = 990;
const VIEWPORT_WIDTH_RATIO = 0.8;
const VIEWPORT_HEIGHT_RATIO = 0.84;

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth * VIEWPORT_WIDTH_RATIO;
      const availableHeight = window.innerHeight * VIEWPORT_HEIGHT_RATIO;
      setDesktopScale(Math.min(availableWidth / DESIGN_WIDTH, availableHeight / DESIGN_HEIGHT, 1));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}
      
      <div
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
        style={{ background: '#008080' }}
      >
        <MosaicBackground />
        
        <main
          className="relative z-10 flex items-center justify-center"
          style={{
            width: `${DESIGN_WIDTH * desktopScale}px`,
            height: `${DESIGN_HEIGHT * desktopScale}px`,
          }}
        >
          <div
            style={{
              width: `${DESIGN_WIDTH}px`,
              height: `${DESIGN_HEIGHT}px`,
              transform: `scale(${desktopScale})`,
              transformOrigin: 'center center',
              flexShrink: 0,
            }}
          >
            <Explorer isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
          </div>
        </main>
      </div>

    </>
  );
}
