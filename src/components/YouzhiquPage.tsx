import React from 'react';
import { YOUZHIQU_PROJECT } from '../data';
import { motion } from 'motion/react';

interface YouzhiquPageProps {
  onBack: () => void;
}

export const YouzhiquPage: React.FC<YouzhiquPageProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2" style={{ textShadow: '2px 2px 0 #ff5ba0' }}>
          {YOUZHIQU_PROJECT.title}
        </h2>
        <p className="text-base opacity-70">{YOUZHIQU_PROJECT.description}</p>
      </div>

      <div className="flex-1 overflow-auto pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {YOUZHIQU_PROJECT.videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="pop-card"
            >
              {/* 视频播放器 */}
              <div className="pop-video-container mb-4">
                {video.videoUrl ? (
                  <video
                    controls
                    className="w-full"
                    style={{ maxHeight: '280px' }}
                    poster={video.coverImage || undefined}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    您的浏览器不支持视频播放
                  </video>
                ) : (
                  <div className="flex items-center justify-center text-white" style={{ height: '220px' }}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <p className="text-sm">广告视频 {index + 1}</p>
                      <p className="text-xs opacity-60 mt-1">（请填入腾讯云 COS 链接）</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 封面图 */}
              {video.coverImage && (
                <div className="mb-3">
                  <img 
                    src={video.coverImage} 
                    alt={video.title}
                    className="w-full object-contain rounded"
                    style={{ maxHeight: '160px' }}
                  />
                </div>
              )}

              {/* 投放数据 */}
              <div>
                <div className="pop-card-title">📊 投放数据</div>
                <div className="pop-metrics-grid">
                  <div className="pop-metric-item">
                    <div className="pop-metric-label">花费</div>
                    <div className="pop-metric-value">{video.metrics.spend}</div>
                  </div>
                  <div className="pop-metric-item">
                    <div className="pop-metric-label">CTR</div>
                    <div className="pop-metric-value">{video.metrics.ctr}</div>
                  </div>
                  <div className="pop-metric-item">
                    <div className="pop-metric-label">CVR</div>
                    <div className="pop-metric-value">{video.metrics.cvr}</div>
                  </div>
                  <div className="pop-metric-item">
                    <div className="pop-metric-label">CPM</div>
                    <div className="pop-metric-value">{video.metrics.cpm}</div>
                  </div>
                  <div className="pop-metric-item">
                    <div className="pop-metric-label">ROAS</div>
                    <div className="pop-metric-value">{video.metrics.roas}</div>
                  </div>
                  <div className="pop-metric-item">
                    <div className="pop-metric-label">评分</div>
                    <div className="pop-metric-value">{video.metrics.score}</div>
                  </div>
                  {video.metrics.registrations && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">注册</div>
                      <div className="pop-metric-value">{video.metrics.registrations}</div>
                    </div>
                  )}
                  {video.metrics.unitPrice && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">单价</div>
                      <div className="pop-metric-value">{video.metrics.unitPrice}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
