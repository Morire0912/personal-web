import React, { useState, useEffect, useRef } from 'react';
import { LILITH_PROJECT, LilithVideo } from '../data';
import { motion } from 'motion/react';

interface LilithPageProps {
  onBack: () => void;
}

// 检测元素是否在视口内
const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

// 从B站URL中提取BV号
const extractBvid = (url: string): string | null => {
  const match = url.match(/BV[0-9A-Za-z]{10}/);
  return match ? match[0] : null;
};

// B站视频播放器
const BilibiliPlayer: React.FC<{ video: LilithVideo }> = React.memo(({ video }) => {
  const bvid = video.bvid || extractBvid(video.url);
  const { ref, isInView } = useInView();

  if (!bvid) {
    return (
      <div className="pop-card p-4 text-center">
        <p>无法解析BV号</p>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          在B站打开
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pop-card mb-4"
    >
      <div
        ref={ref}
        className="pop-video-container mb-3"
        style={{ aspectRatio: '16/9', background: '#fff' }}
      >
        {isInView && (
          <iframe
            src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&q=80&danmaku=0&autoplay=0`}
            title={video.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allowFullScreen
          />
        )}
      </div>
      <div className="flex items-center justify-between px-1" style={{ lineHeight: '2' }}>
        <span
          className="font-bold truncate flex-1"
          style={{ fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", fontSize: '18px' }}
        >
          {video.title}
        </span>
        <span
          className="pop-tag"
          style={{
            fontSize: '14px',
            padding: '2px 6px',
            fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
          }}
        >
          🔥 播放量 {video.views}
        </span>
      </div>
    </motion.div>
  );
});

// YouTube视频播放器
const YouTubePlayer: React.FC<{ video: LilithVideo }> = React.memo(({ video }) => {
  const videoId = video.url.match(/[?&]v=([^&]+)/)?.[1];
  const { ref, isInView } = useInView();

  if (!videoId) {
    return (
      <div className="pop-card p-4 text-center">
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          在YouTube打开
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pop-card mb-4"
    >
      <div
        ref={ref}
        className="pop-video-container mb-3"
        style={{ aspectRatio: '16/9', background: '#fff' }}
      >
        {isInView && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
            title={video.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allowFullScreen
          />
        )}
      </div>
      <div className="flex items-center justify-between px-1" style={{ lineHeight: '2' }}>
        <span
          className="font-bold truncate flex-1"
          style={{ fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif", fontSize: '18px' }}
        >
          {video.title}
        </span>
        <span
          className="pop-tag"
          style={{
            fontSize: '14px',
            padding: '2px 6px',
            fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
          }}
        >
          🔥 播放量 {video.views}
        </span>
      </div>
    </motion.div>
  );
});

export const LilithPage: React.FC<LilithPageProps> = ({ onBack }) => {
  const bilibiliVideos = LILITH_PROJECT.videos.filter((v) => v.platform === 'bilibili');
  const youtubeVideos = LILITH_PROJECT.videos.filter((v) => v.platform === 'youtube');

  return (
    <div className="h-full overflow-auto">
      <div className="mx-4 pt-4">
        {/* B站视频 */}
        {bilibiliVideos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span
                className="pop-tag"
                style={{
                  fontSize: '22px',
                  padding: '2px 8px',
                  fontFamily: "'Luckiest Guy', cursive",
                  letterSpacing: '1px',
                  fontWeight: 300,
                  width: '110px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Bilibili
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bilibiliVideos.map((video) => (
                <BilibiliPlayer key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* YouTube视频 */}
        {youtubeVideos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span
                className="pop-tag blue"
                style={{
                  fontSize: '22px',
                  padding: '2px 8px',
                  fontFamily: "'Luckiest Guy', cursive",
                  fontWeight: 300,
                  width: '110px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                YouTube
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {youtubeVideos.map((video) => (
                <YouTubePlayer key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
