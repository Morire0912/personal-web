import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BootScreenProps {
  onComplete: () => void;
  timing?: BootTiming;
}

export interface BootTiming {
  enterMs: number;
  lineStaggerMs: number;
  progressMs: number;
  holdMs: number;
  windowExitMs: number;
  screenFadeMs: number;
}

export const DEFAULT_BOOT_TIMING: BootTiming = {
  enterMs: 620,
  lineStaggerMs: 120,
  progressMs: 820,
  holdMs: 200,
  windowExitMs: 460,
  screenFadeMs: 460,
};

const terminalLines = [
  'Username: Visitor_9527',
  'Password: ************',
  'Mounting creative cache...',
  'Loading MY BRAIN desktop...',
];

const seconds = (ms: number) => ms / 1000;

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete, timing = DEFAULT_BOOT_TIMING }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const complete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = window.setTimeout(complete, 900);
      return () => window.clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      gsap.set('.boot-computer', { transformPerspective: 900, transformOrigin: '50% 60%' });
      gsap.set('.boot-terminal-progress-fill', { scaleX: 0, transformOrigin: '0% 50%' });
      const exitDuration = seconds(timing.windowExitMs);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => gsap.delayedCall(0.25, complete),
      });

      tl
        .from('.boot-computer', {
          opacity: 0,
          y: 42,
          scale: 0.94,
          rotateX: 5,
          duration: seconds(timing.enterMs),
        })
        .from(
          '.boot-terminal-mark-piece',
          {
            opacity: 0,
            y: 18,
            scale: 0.92,
            stagger: 0.08,
            duration: seconds(timing.enterMs) * 0.68,
          },
          '-=0.18'
        )
        .from(
          '.boot-terminal-title',
          {
            opacity: 0,
            y: 14,
            skewX: -5,
            duration: seconds(timing.enterMs) * 0.68,
          },
          '-=0.18'
        )
        .from('.boot-terminal-subtitle', { opacity: 0, y: 8, duration: seconds(timing.enterMs) * 0.45 }, '-=0.1')
        .from(
          '.boot-terminal-line',
          {
            opacity: 0,
            x: -12,
            stagger: seconds(timing.lineStaggerMs),
            duration: 0.22,
            ease: 'steps(1)',
          },
          '+=0.08'
        )
        .to('.boot-terminal-progress-fill', { scaleX: 1, duration: seconds(timing.progressMs), ease: 'steps(18)' }, '-=0.05')
        .from('.boot-ready-line', { opacity: 0, x: -10, duration: 0.22, ease: 'steps(1)' })
        .addLabel('exit', `+=${seconds(timing.holdMs)}`)
        .to('.boot-screen', { autoAlpha: 0, duration: exitDuration, ease: 'power2.inOut' }, 'exit');

      gsap.to('.boot-scan-band', {
        yPercent: 260,
        opacity: 0.55,
        duration: 1.45,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.boot-power-dot', {
        opacity: 0.45,
        scale: 0.86,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, root);

    return () => ctx.revert();
  }, [onComplete, timing]);

  return (
      <div ref={rootRef} className="boot-screen" aria-label="MY BRAIN startup animation">
      <div className="boot-room-noise" aria-hidden="true" />
      <div className="boot-backlight" aria-hidden="true" />

      <div className="boot-computer">
        <div className="boot-launch-window">
          <div className="boot-launch-titlebar">
            <span className="boot-launch-brand">MY BRAIN</span>
            <span className="boot-launch-caption">Brain.exe loading...</span>
            <span className="boot-launch-controls" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="boot-case">
            <div className="boot-screen-bezel">
              <div className="boot-terminal-screen">
                <div className="boot-crt-glow" aria-hidden="true" />
                <div className="boot-terminal-glass" aria-hidden="true" />
                <div className="boot-scan-band" aria-hidden="true" />

                <div className="boot-terminal-content">
                  <div className="boot-terminal-mark" aria-hidden="true">
                    <span className="boot-terminal-mark-piece boot-terminal-mark-top" />
                    <span className="boot-terminal-mark-piece boot-terminal-mark-left" />
                    <span className="boot-terminal-mark-piece boot-terminal-mark-right" />
                  </div>

                  <h1 className="boot-terminal-title">MY BRAIN</h1>
                  <p className="boot-terminal-subtitle">PERSONAL PORTFOLIO SYSTEM</p>

                  <div className="boot-terminal-lines">
                    {terminalLines.map((line) => (
                      <p key={line} className="boot-terminal-line">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="boot-terminal-progress" aria-hidden="true">
                    <span className="boot-terminal-progress-fill" />
                  </div>

                  <p className="boot-ready-line">Ready.</p>
                </div>
              </div>
            </div>

            <div className="boot-case-lower" aria-hidden="true">
              <div className="boot-speaker">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <div className="boot-drive-slot">
                <span />
              </div>
              <div className="boot-power-module">
                <span className="boot-power-dot" />
              </div>
            </div>
          </div>

          <div className="boot-launch-status" aria-hidden="true">
            <span>Brain.exe running...</span>
            <span>WAITING FOR INPUT...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
