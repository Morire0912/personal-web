import React, { useState, useEffect } from 'react';
import { LILITH_PROJECT, LilithVideo } from '../data';
import { motion } from 'motion/react';

interface LilithPageProps {
  onBack: () => void;
}

// 从B站URL中提取BV号
const extractBvid = (url: string): string | null => {
  const match = url.match(/BV[0-9A-Za-z]{10}/);
  return match ? match[0] : null;
};

// B站视频播放器
const BilibiliPlayer: React.FC<{ video: LilithVideo }> = ({ video }) => {
  const bvid = video.bvid || extractBvid(video.url);
  const [realViews, setRealViews] = useState<string | null>(null);

  useEffect(() => {
    if (bvid) {
      fetch(`/api/bilibili/stat/${bvid}`)
        .then(res => res.json())
        .then(data => {
          if (data.view) {
            setRealViews(data.view.toLocaleString());
          }
        })
        .catch(() => setRealViews(null));
    }
  }, [bvid]);

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
      <div className="pop-video-container mb-3">
        <iframe
          src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
          className="w-full"
          style={{ height: '280px', border: 'none' }}
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-between px-1">
        <span className="font-bold text-sm truncate flex-1">{video.title}</span>
        <div className="flex items-center gap-2">
          <span className="pop-tag yellow text-xs">📺 {video.views}</span>
          {realViews && (
            <span className="pop-tag text-xs">🔥 {realViews}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// YouTube视频播放器
const YouTubePlayer: React.FC<{ video: LilithVideo }> = ({ video }) => {
  const videoId = video.url.match(/[?&]v=([^&]+)/)?.[1];

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
      <div className="pop-video-container mb-3">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full"
          style={{ height: '280px', border: 'none' }}
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-between px-1">
        <span className="font-bold text-sm truncate flex-1">{video.title}</span>
        <span className="pop-tag yellow text-xs">📺 {video.views}</span>
      </div>
    </motion.div>
  );
};

export const LilithPage: React.FC<LilithPageProps> = ({ onBack }) => {
  const bilibiliVideos = LILITH_PROJECT.videos.filter(v => v.platform === 'bilibili');
  const youtubeVideos = LILITH_PROJECT.videos.filter(v => v.platform === 'youtube');

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2" style={{ textShadow: '2px 2px 0 #ff5ba0' }}>
          {LILITH_PROJECT.title}
        </h2>
        <p className="text-base opacity-70">{LILITH_PROJECT.description}</p>
      </div>

      <div className="flex-1 overflow-auto pr-2">
        {/* B站合集 */}
        {LILITH_PROJECT.playlistUrl && (
          <div className="mb-4">
            <a 
              href={LILITH_PROJECT.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pop-back-btn inline-flex"
            >
              <span>▶</span> 查看B站完整合集
            </a>
          </div>
        )}

        {/* B站视频 */}
        {bilibiliVideos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="pop-tag">Bilibili</span>
              <span className="text-sm opacity-60">({bilibiliVideos.length} 个视频)</span>
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
              <span className="pop-tag blue">YouTube</span>
              <span className="text-sm opacity-60">({youtubeVideos.length} 个视频)</span>
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
