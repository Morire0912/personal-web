import React, { useRef, useEffect, useState } from 'react';
import { YOUZHIQU_PROJECT, YouzhiquVideo } from '../data';
import { motion } from 'motion/react';

interface YouzhiquPageProps {
  onBack: () => void;
}

const VideoPlayer: React.FC<{
  videoUrl: string;
  coverImage?: string;
  onAspectRatioChange?: (width: number, height: number) => void;
}> = ({ videoUrl, coverImage, onAspectRatioChange }) => {
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
      onLoadedMetadata={(event) => {
        const currentVideo = event.currentTarget;
        if (currentVideo.videoWidth > 0 && currentVideo.videoHeight > 0) {
          onAspectRatioChange?.(currentVideo.videoWidth, currentVideo.videoHeight);
        }
      }}
    >
      <source src={videoUrl} type="video/mp4" />
      您的浏览器不支持视频播放
    </video>
  );
};

const getInitialVideoRatio = (video: YouzhiquVideo) => {
  const isGardenVideo = video.projectTag === '我的花园世界';
  const isKnownHorizontal = video.videoUrl.includes('_F_');

  if (isGardenVideo && !isKnownHorizontal) {
    return { ratio: '9/16', value: 9 / 16 };
  }

  return { ratio: '16/9', value: 16 / 9 };
};

const ProjectVideoCard: React.FC<{ video: YouzhiquVideo; index: number }> = ({ video, index }) => {
  const initialRatio = getInitialVideoRatio(video);
  const [frameRatio, setFrameRatio] = useState(initialRatio.ratio);
  const [frameRatioValue, setFrameRatioValue] = useState(initialRatio.value);
  const isPortrait = frameRatioValue < 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`pop-card project-tape-card mb-6 ${isPortrait ? 'project-tape-card-portrait' : 'project-tape-card-landscape'}`}
      data-project-tag={video.projectTag || '龙骑士学园'}
    >
      <div
        className="pop-video-container portfolio-video-frame portfolio-video-frame-horizontal mb-4"
        style={{
          aspectRatio: frameRatio,
          width: isPortrait ? 'min(100%, 390px)' : '100%',
          marginInline: isPortrait ? 'auto' : undefined,
        }}
      >
        {video.videoUrl ? (
          <VideoPlayer
            videoUrl={video.videoUrl}
            coverImage={video.coverImage || undefined}
            onAspectRatioChange={(width, height) => {
              setFrameRatio(`${width}/${height}`);
              setFrameRatioValue(width / height);
            }}
          />
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
    </motion.div>
  );
};

export const YouzhiquPage: React.FC<YouzhiquPageProps> = ({ onBack }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="pt-4">
        <div className="youzhiqu-video-grid">
          {YOUZHIQU_PROJECT.videos.map((video, index) => (
            <ProjectVideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
