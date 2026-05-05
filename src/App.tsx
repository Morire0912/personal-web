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
      
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: '#008080' }}>
        <MosaicBackground />
        
        <main 
          className="relative z-10"
          style={{
            width: '75vw',
            height: '80vh',
          }}
        >
          <Explorer isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
        </main>
      </div>
    </>
  );
}
