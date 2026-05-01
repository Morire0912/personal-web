import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'boot' | 'loading' | 'done'>('boot');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // 闪烁光标
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // 启动进度
    const bootTimer = setTimeout(() => {
      setPhase('loading');
    }, 800);

    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setPhase('done');
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(bootTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: '#1a1b26' }}
        >
          {/* 像素风格背景 */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,91,160,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,91,160,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '4px 4px',
            }}
          />

          {/* 主内容 */}
          <div className="relative z-10 flex flex-col items-center">
            {/* 电脑图标 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-8"
            >
              <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="8" width="40" height="32" fill="#ff5ba0" stroke="#fff" strokeWidth="3" rx="2"/>
                <rect x="12" y="12" width="32" height="24" fill="#1a1b26" stroke="#fff" strokeWidth="1"/>
                <rect x="20" y="40" width="16" height="6" fill="#ffeb3b" stroke="#fff" strokeWidth="2" rx="1"/>
                <rect x="12" y="46" width="32" height="4" fill="#ff5ba0" stroke="#fff" strokeWidth="2" rx="1"/>
                {/* 屏幕上的文字 */}
                <text x="16" y="28" fill="#ffeb3b" fontSize="10" fontFamily="VT323, monospace">MY</text>
                <text x="16" y="32" fill="#ffeb3b" fontSize="8" fontFamily="VT323, monospace">BRAIN</text>
              </svg>
            </motion.div>

            {/* 标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-2 tracking-widest"
              style={{ 
                fontFamily: 'VT323, monospace',
                color: '#ff5ba0',
                textShadow: '3px 3px 0 #ffeb3b, -1px -1px 0 #fff',
              }}
            >
              MY BRAIN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg mb-12 opacity-60"
              style={{ fontFamily: 'VT323, monospace' }}
            >
              Personal Portfolio System
            </motion.p>

            {/* 启动阶段文字 */}
            {phase === 'boot' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base mb-4"
                style={{ fontFamily: 'VT323, monospace', color: '#ffeb3b' }}
              >
                Booting up...{showCursor ? '_' : ' '}
              </motion.div>
            )}

            {/* 进度条 */}
            {phase === 'loading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-80"
              >
                <div className="flex justify-between mb-2 text-sm" style={{ fontFamily: 'VT323, monospace' }}>
                  <span style={{ color: '#ffeb3b' }}>Loading portfolio data...</span>
                  <span style={{ color: '#ff5ba0' }}>{Math.min(progress, 100).toFixed(0)}%</span>
                </div>
                <div 
                  className="w-full h-6 relative"
                  style={{ 
                    border: '3px solid #fff',
                    background: '#1a1b26',
                  }}
                >
                  <motion.div
                    className="h-full"
                    style={{ 
                      background: 'linear-gradient(90deg, #ff5ba0 0%, #ffeb3b 100%)',
                      width: `${Math.min(progress, 100)}%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* 像素风格网格覆盖 */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%)',
                      backgroundSize: '4px 100%',
                    }}
                  />
                </div>
                <div className="mt-3 text-xs opacity-50" style={{ fontFamily: 'VT323, monospace' }}>
                  {progress < 30 && '> Initializing pixel renderer...'}
                  {progress >= 30 && progress < 60 && '> Loading pop art assets...'}
                  {progress >= 60 && progress < 90 && '> Mounting video players...'}
                  {progress >= 90 && '> Ready to launch!'}
                </div>
              </motion.div>
            )}
          </div>

          {/* 底部版本信息 */}
          <div 
            className="absolute bottom-8 text-xs opacity-40"
            style={{ fontFamily: 'VT323, monospace' }}
          >
            MY BRAIN Portfolio v1.0 | Build 2025.05.01
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
