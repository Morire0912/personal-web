import React, { useState } from 'react';
import { Explorer } from './components/Explorer';
import { MosaicBackground } from './components/MosaicBackground';
import { BootScreen } from './components/BootScreen';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}
      
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
        <MosaicBackground />
        
        <main 
          className="relative z-10 transition-all duration-300"
          style={{
            width: isFullscreen ? '100vw' : 'min(1200px, 95vw)',
            height: isFullscreen ? '100vh' : 'min(800px, 90vh)',
            padding: isFullscreen ? '0' : '16px',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <Explorer isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
          </div>
        </main>
      </div>
    </>
  );
}
