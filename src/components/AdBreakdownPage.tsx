import React, { useRef, useEffect } from 'react';
import { AD_BREAKDOWNS, AdBreakdown } from '../data';
import { motion } from 'motion/react';

interface AdBreakdownPageProps {
  onBack: () => void;
}

const AdCard: React.FC<{ ad: AdBreakdown; index: number }> = ({ ad, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
      video.load();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="pop-card mb-6 mx-4"
    >
      {/* 头部信息 */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: '1px', fontWeight: 500, fontSize: '26px' }}>{ad.gameName}</h3>
          </div>
          <div className="flex flex-wrap gap-2 ad-tags">
            <span className="pop-tag">{ad.materialDirection}</span>
            <span className="pop-tag yellow">{ad.materialSpec}</span>
            {/* copyText hidden */}
          </div>
        </div>
      </div>

      {/* 视频(左) + 概况/拆解(右) */}
      <div className="flex gap-3 justify-center" style={{ minHeight: '680px' }}>
        {/* 左边: 视频播放器 */}
        <div className="pop-video-container flex-shrink-0" style={{ height: '680px', aspectRatio: '9/16' }}>
          {ad.videoUrl ? (
            <video
              ref={videoRef}
              controls
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              poster={ad.coverImage || undefined}
            >
              <source src={ad.videoUrl} type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
          ) : (
            <div className="flex items-center justify-center text-white h-full">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p>素材视频（请填入腾讯云 COS 链接）</p>
              </div>
            </div>
          )}
        </div>

        {/* 右边: 素材概况 + 素材拆解 */}
        <div className="flex flex-col gap-3 flex-1 min-w-0 pr-1" style={{ height: '680px' }}>
          <div className="pop-card">
            <div className="pop-card-title" style={{ fontFamily: "'ZCOOL KuaiLe', 'Microsoft YaHei', sans-serif", fontSize: '22px', fontWeight: 300 }}>📊 素材概况</div>
            <div className="pop-metrics-grid">
              {ad.metrics.popularity && (
                <div className="pop-metric-item">
                  <div className="pop-metric-label">人气值</div>
                  <div className="pop-metric-value">{ad.metrics.popularity}</div>
                </div>
              )}
              {ad.metrics.estimatedCost && (
                <div className="pop-metric-item">
                  <div className="pop-metric-label">投放天数</div>
                  <div className="pop-metric-value">{ad.metrics.estimatedCost}</div>
                </div>
              )}
              {ad.metrics.displayCost && (
                <div className="pop-metric-item">
                  <div className="pop-metric-label">展示估值</div>
                  <div className="pop-metric-value">{ad.metrics.displayCost}</div>
                </div>
              )}
            </div>
          </div>

          <div className="pop-card flex-1 overflow-auto" style={{ background: '#fff8e7' }}>
            <div className="pop-card-title" style={{ fontFamily: "'ZCOOL KuaiLe', 'Microsoft YaHei', sans-serif", fontSize: '22px', fontWeight: 300 }}>🔍 素材拆解</div>
            <div className="whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", fontSize: '17.5px' }}>
              {ad.analysis}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AdBreakdownPage: React.FC<AdBreakdownPageProps> = ({ onBack }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {AD_BREAKDOWNS.map((ad, index) => (
            <AdCard key={ad.id} ad={ad} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
