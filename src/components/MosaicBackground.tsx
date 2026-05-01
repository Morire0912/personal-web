import React from 'react';

export const MosaicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* XP 桌面背景 */}
      <img
        src="/images/xp-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          imageRendering: 'pixelated',
        }}
      />
      {/* 轻微扫描线效果 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </div>
  );
};
