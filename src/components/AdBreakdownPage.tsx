import React from 'react';
import { AD_BREAKDOWNS, AdBreakdown } from '../data';
import { motion } from 'motion/react';

interface AdBreakdownPageProps {
  onBack: () => void;
}

const AdCard: React.FC<{ ad: AdBreakdown; index: number }> = ({ ad, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="pop-card mb-6"
    >
      {/* 头部信息 */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold" style={{ fontFamily: 'VT323, monospace' }}>
              #{index + 1}
            </span>
            <h3 className="text-xl font-bold">{ad.gameName}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="pop-tag">{ad.materialDirection}</span>
            <span className="pop-tag yellow">{ad.materialSpec}</span>
            {ad.copyText && (
              <span className="pop-tag blue" style={{ fontStyle: 'italic' }}>
                "{ad.copyText}"
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 视频 + 封面 + 概况 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* 视频播放器 */}
        <div className="pop-video-container">
          {ad.videoUrl ? (
            <video
              controls
              className="w-full"
              style={{ maxHeight: '360px' }}
              poster={ad.coverImage || undefined}
            >
              <source src={ad.videoUrl} type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
          ) : (
            <div className="flex items-center justify-center text-white" style={{ height: '280px' }}>
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p>素材视频（请填入腾讯云 COS 链接）</p>
              </div>
            </div>
          )}
        </div>

        {/* 素材概况 */}
        <div className="flex flex-col gap-3">
          {ad.coverImage && (
            <div className="pop-card p-2">
              <img 
                src={ad.coverImage} 
                alt={ad.gameName}
                className="w-full object-contain"
                style={{ maxHeight: '180px' }}
              />
            </div>
          )}
          
          <div className="pop-card">
            <div className="pop-card-title">📊 素材概况</div>
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
                  <div className="pop-metric-label">展示消耗</div>
                  <div className="pop-metric-value">{ad.metrics.displayCost}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 素材拆解 */}
      <div className="pop-card" style={{ background: '#fff8e7' }}>
        <div className="pop-card-title">🔍 素材拆解</div>
        <div className="text-base whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'VT323, monospace' }}>
          {ad.analysis}
        </div>
      </div>
    </motion.div>
  );
};

export const AdBreakdownPage: React.FC<AdBreakdownPageProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ textShadow: '2px 2px 0 #ff5ba0' }}>
          广告创意拆解
        </h2>
        <span className="text-sm opacity-60">素材内容均来自广大大</span>
      </div>
      
      <div className="flex-1 overflow-auto pr-2">
        {AD_BREAKDOWNS.map((ad, index) => (
          <AdCard key={ad.id} ad={ad} index={index} />
        ))}
      </div>
    </div>
  );
};
