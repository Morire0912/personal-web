import React, { useRef, useEffect } from 'react';
import { YOUZHIQU_PROJECT } from '../data';
import { motion } from 'motion/react';

interface YouzhiquPageProps {
  onBack: () => void;
}

const VideoPlayer: React.FC<{ videoUrl: string; coverImage?: string }> = ({ videoUrl, coverImage }) => {
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
    <video
      ref={videoRef}
      controls
      preload="metadata"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      poster={coverImage || undefined}
    >
      <source src={videoUrl} type="video/mp4" />
      您的浏览器不支持视频播放
    </video>
  );
};

export const YouzhiquPage: React.FC<YouzhiquPageProps> = ({ onBack }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {YOUZHIQU_PROJECT.videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="pop-card mb-6 mx-4"
            >
              {/* 16:9 横屏视频 */}
              <div className="pop-video-container mb-4" style={{ aspectRatio: '16/9' }}>
                {video.videoUrl ? (
                  <VideoPlayer videoUrl={video.videoUrl} coverImage={video.coverImage || undefined} />
                ) : (
                  <div className="flex items-center justify-center text-white h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <p>广告视频 {index + 1}</p>
                      <p className="text-xs opacity-60 mt-1">（请填入腾讯云 COS 链接）</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 投放数据 - 横向排列 */}
              <div className="pop-card">
                <div className="pop-card-title" style={{ fontFamily: "'ZCOOL KuaiLe', 'Microsoft YaHei', sans-serif", fontSize: '22px', fontWeight: 300 }}>📊 投放数据</div>
                <div className="pop-metrics-grid">
                  {video.metrics.spend && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">花费</div>
                      <div className="pop-metric-value">{video.metrics.spend}</div>
                    </div>
                  )}
                  {video.metrics.ctr && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">CTR</div>
                      <div className="pop-metric-value">{video.metrics.ctr}</div>
                    </div>
                  )}
                  {video.metrics.cpm && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">CPM</div>
                      <div className="pop-metric-value">{video.metrics.cpm}</div>
                    </div>
                  )}
                  {video.metrics.cvr && video.metrics.cvr !== '暂无' && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">CVR</div>
                      <div className="pop-metric-value">{video.metrics.cvr}</div>
                    </div>
                  )}
                  {video.metrics.roas && video.metrics.roas !== '暂无' && (
                    <div className="pop-metric-item">
                      <div className="pop-metric-label">ROAS</div>
                      <div className="pop-metric-value">{video.metrics.roas}</div>
                    </div>
                  )}
                  {video.metrics.unitPrice && video.metrics.unitPrice !== '暂无' && (
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
