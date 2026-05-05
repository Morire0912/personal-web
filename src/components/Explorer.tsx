import React, { useState } from 'react';
import { DRIVES, C_FOLDERS, Drive } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { AdBreakdownPage } from './AdBreakdownPage';
import { LilithPage } from './LilithPage';
import { YouzhiquPage } from './YouzhiquPage';
import { ResumePage } from './ResumePage';
import { GamingPage } from './GamingPage';
import { CreditsPage } from './CreditsPage';
import { AvatarPanel } from './AvatarPanel';

// ==================== 精确复刻设计图的图标 ====================

const ComputerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="12" height="9" fill="#c0c0c0" stroke="#000" strokeWidth="1.5"/>
    <rect x="3" y="4" width="10" height="7" fill="#000080"/>
    <rect x="6" y="12" width="4" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1.5"/>
    <rect x="4" y="14" width="8" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1.5"/>
  </svg>
);

// 软盘图标 - 精确复刻设计图
const FloppyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* 灰色外壳 */}
    <rect x="10" y="8" width="60" height="64" fill="#c0c0c0" stroke="#1a1a1a" strokeWidth="3" rx="2"/>
    {/* 白色标签区 */}
    <rect x="14" y="28" width="52" height="40" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2"/>
    {/* 金属滑盖区 */}
    <rect x="18" y="12" width="44" height="14" fill="#a0a0a0" stroke="#1a1a1a" strokeWidth="2"/>
    {/* 粉色标签条 */}
    <rect x="18" y="48" width="44" height="14" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="1.5"/>
    {/* 标签线条 */}
    <line x1="22" y1="52" x2="58" y2="52" stroke="#1a1a1a" strokeWidth="1"/>
    <line x1="22" y1="56" x2="50" y2="56" stroke="#1a1a1a" strokeWidth="1"/>
  </svg>
);

// 文档图标 - 精确复刻设计图
const DocIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* 白色纸张 */}
    <rect x="16" y="6" width="48" height="68" fill="#ffffff" stroke="#1a1a1a" strokeWidth="3" rx="2"/>
    {/* 粉色顶部条 */}
    <rect x="20" y="10" width="40" height="12" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    {/* 文档线条 */}
    <line x1="20" y1="32" x2="60" y2="32" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="20" y1="42" x2="60" y2="42" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="20" y1="52" x2="60" y2="52" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="20" y1="62" x2="48" y2="62" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

// 放大镜图标 - 精确复刻设计图
const SearchIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {/* 蓝色外圈 */}
    <circle cx="34" cy="34" r="24" fill="#87ceeb" stroke="#1a1a1a" strokeWidth="3"/>
    {/* 白色内圈 */}
    <circle cx="34" cy="34" r="14" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2"/>
    {/* 蓝色中心 */}
    <circle cx="34" cy="34" r="6" fill="#4fc3f7" stroke="#1a1a1a" strokeWidth="1.5"/>
    {/* 黑色手柄 */}
    <line x1="52" y1="52" x2="72" y2="72" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round"/>
    <line x1="50" y1="50" x2="54" y2="54" stroke="#1a1a1a" strokeWidth="3"/>
  </svg>
);

const FolderIcon = ({ color = '#ffeb3b' }: { color?: string }) => (
  <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
    <path d="M4 12h20l6 8h30v36H4z" fill={color} stroke="#1a1a1a" strokeWidth="3"/>
    <path d="M4 20h56v36H4z" fill={color} stroke="#1a1a1a" strokeWidth="3"/>
    <line x1="4" y1="28" x2="60" y2="28" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

const GamepadIcon = () => (
  <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="16" width="56" height="32" rx="16" fill="#4fc3f7" stroke="#1a1a1a" strokeWidth="3"/>
    <circle cx="20" cy="32" r="6" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="2"/>
    <circle cx="44" cy="28" r="4" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <circle cx="52" cy="36" r="4" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="12" y="24" width="4" height="4" fill="#1a1a1a"/>
    <rect x="10" y="26" width="8" height="4" fill="#1a1a1a"/>
  </svg>
);

const UserIcon = () => (
  <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="20" r="12" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="3"/>
    <path d="M8 56c0-16 10-24 24-24s24 8 24 24" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="3"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="8" width="56" height="48" rx="4" fill="#1a1a1a" stroke="#ff5ba0" strokeWidth="3"/>
    <polygon points="26,20 26,44 46,32" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="4" width="56" height="56" fill="#fff" stroke="#1a1a1a" strokeWidth="3"/>
    <line x1="8" y1="52" x2="56" y2="52" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="8" y1="52" x2="8" y2="8" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="12" y="32" width="8" height="20" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="24" y="20" width="8" height="32" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="36" y="28" width="8" height="24" fill="#4fc3f7" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="48" y="16" width="8" height="36" fill="#81c784" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

// ==================== 精确复刻设计图的波普装饰元素 ====================

const PopDecorations = () => null;

// ==================== 主组件 ====================

type ContentView = 'root' | 'drive-D' | 'drive-E' | 'drive-F' | 'lilith' | 'youzhiqu' | 'credits';

// 侧边栏项目配置
const SIDEBAR_ITEMS: { view: ContentView; icon: string; label: string }[] = [
  { view: 'drive-E', icon: '/images/resume-icon.png', label: '个人简历' },
  { view: 'drive-D', icon: '/images/ad-breakdown-icon.png', label: '广告拆解' },
  { view: 'lilith', icon: '/images/lilith-logo.png', label: '莉莉丝项目' },
  { view: 'youzhiqu', icon: '/images/youzhiqu-logo.png', label: '游之趣项目' },
  { view: 'drive-F', icon: '/images/gaming-icon.png', label: '游戏经历' },
];

// 波普漫画风侧边栏
const Sidebar: React.FC<{ currentView: ContentView; onNavigate: (view: ContentView) => void; onAiVideoClick?: () => void; showLockWarning?: boolean; onCreditsClick?: () => void }> = ({ currentView, onNavigate, onAiVideoClick, showLockWarning, onCreditsClick }) => {
  return (
    <div className="pop-sidebar">
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            data-active={isActive}
            className="pop-sidebar-btn"
          >
            <img src={item.icon} alt="" />
            <span className="pop-sidebar-tooltip">{item.label}</span>
          </button>
        );
      })}
      <button
        onClick={onAiVideoClick}
        className="pop-sidebar-btn"
        aria-label="AI影视作品"
        style={{ position: 'relative' }}
      >
        <img src="/images/ai-video-logo.png" alt="" style={{ transform: 'scale(2)' }} />
        <span className="pop-sidebar-tooltip">AI影视作品</span>
        {showLockWarning && (
          <div className="pop-sidebar-lock">
            <div className="pop-sidebar-lock-circle">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                <path d="M14 14L34 34" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
                <path d="M34 14L14 34" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}
      </button>
      {/* 致谢按钮 */}
      <button
        onClick={onCreditsClick}
        className="pop-sidebar-btn"
        aria-label="致谢"
        data-active={currentView === 'credits'}
        style={{ marginTop: 'auto' }}
      >
        <img src="/images/credits-icon.png" alt="" style={{ transform: 'scale(1.3)' }} />
        <span className="pop-sidebar-tooltip">致谢</span>
      </button>
    </div>
  );
};

interface ExplorerProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ isFullscreen, onToggleFullscreen }) => {
  const [view, setView] = useState<ContentView>('root');
  const [isShaking, setIsShaking] = useState(false);
  const [showLockWarning, setShowLockWarning] = useState(false);

  const handleSearchClick = () => {
    if (isShaking) return;
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 700);
  };

  const goBack = () => {
    switch (view) {
      case 'lilith':
      case 'youzhiqu':
      case 'drive-D':
      case 'drive-E':
      case 'drive-F':
      case 'credits':
        setView('root');
        break;
      default:
        setView('root');
    }
  };

  const openDrive = (drive: Drive) => {
    if (drive.id === 'lilith') {
      setView('lilith');
    } else if (drive.id === 'youzhiqu') {
      setView('youzhiqu');
    } else {
      setView(`drive-${drive.id}` as ContentView);
    }
  };

  const getIntro = (): string => {
    switch (view) {
      case 'root': return '话不说出去，事就办不成';
      case 'drive-D': return '广告素材全部来自于广大大，素材概况截止广告发布时间至4月12日';
      case 'drive-E': return '没错就是我，捞捞 (つ´ω`)つ';
      case 'drive-F': return '打枪，嘿嘿，打枪好玩！( º﹃º ｣ ∠)';
      case 'lilith': return '远光84官方账号2025年7月-9月及10月初视频内容大部分均有不同程度参与，以下为参与且高播放视频';
      case 'youzhiqu': return '龙骑士学园项目数据截取自三月中预注册启动至4月13日（未上线）数据';
      case 'credits': return '感谢所有让这一切成为可能的技术与工具！';
    }
  };

  const canGoBack = view !== 'root';

  const getDriveIcon = (icon: string) => {
    switch (icon) {
      case 'floppy': return <FloppyIcon />;
      case 'doc': return <DocIcon />;
      case 'search': return <SearchIcon />;
      case 'folder': return <FolderIcon color="#ffeb3b" />;
      case 'game': return <GamepadIcon />;
      case 'user': return <UserIcon />;
      default: return <FolderIcon />;
    }
  };

  const getFolderIcon = (icon: string) => {
    switch (icon) {
      case 'video': return <VideoIcon />;
      case 'chart': return <ChartIcon />;
      case 'doc': return <DocIcon />;
      default: return <FolderIcon color="#ffeb3b" />;
    }
  };

  return (
    <div className="pop-window">
      {/* 标题栏 */}
      <div className="pop-titlebar">
        <div className="pop-titlebar-text">
          <ComputerIcon />
          <span className="pop-titlebar-brand">MY BRAIN</span>
        </div>

      </div>

      {/* 主体区域：侧边栏 + 右侧内容 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 侧边栏 - 与标题栏连接 */}
        <Sidebar
          currentView={view}
          onNavigate={setView}
          onAiVideoClick={() => {
            if (showLockWarning) return;
            setShowLockWarning(true);
            setTimeout(() => setShowLockWarning(false), 1200);
          }}
          showLockWarning={showLockWarning}
          onCreditsClick={() => setView('credits')}
        />

        {/* 角色面板 */}
        <AvatarPanel />

        {/* 右侧区域 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* 工具栏 - 右移 */}
          <div className="pop-toolbar">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className="pop-back-btn"
              style={{ opacity: canGoBack ? 1 : 0.4 }}
            >
              <svg className="pop-back-arrow" width="18" height="18" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M10 2L4 7L10 12" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>BACK</span>
            </button>
            <div className="pop-addressbar">
              {getIntro()}
            </div>
            <div 
              className={`pop-searchbox ${isShaking ? 'pop-searchbox-shake' : ''}`}
              onClick={handleSearchClick}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="5.5" stroke="#1a1a1a" strokeWidth="1.8"/>
                <path d="M11 11L14.5 14.5" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input type="text" placeholder="Search... well, you can try." readOnly />
              {isShaking && (
                <div className="pop-searchbox-x">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M10 10L26 26" stroke="#ff0000" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M26 10L10 26" stroke="#ff0000" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="pop-content pop-halftone" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {/* 波普漫画背景图 */}
            <img 
              src="/images/explorer-bg.png" 
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                zIndex: 0,
                pointerEvents: 'none',
                imageRendering: 'auto',
              }}
            />
            <PopDecorations />
            <AnimatePresence mode="wait">
              {/* 根目录 - 三个磁盘 */}
              {view === 'root' && (
                <motion.div
                  key="root"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <div className="flex flex-col items-center" style={{ gap: '14px', transform: 'translateY(-15px)' }}>
                    <img
                      src="/images/欢迎语.png"
                      alt="欢迎语"
                      style={{
                        maxWidth: '820px',
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        imageRendering: 'auto',
                        transform: 'translate(-27px, -60px) scale(0.95)',
                      }}
                    />
                    <div className="flex" style={{ justifyContent: 'space-evenly', width: '100%', transform: 'scale(0.9) translateY(-156px) translateX(-21px)' }}>
                      {DRIVES.map((drive) => (
                        <div
                          key={drive.id}
                          onClick={() => {
                            if (drive.id === 'ai-video') {
                              if (showLockWarning) return;
                              setShowLockWarning(true);
                              setTimeout(() => setShowLockWarning(false), 1200);
                            } else {
                              openDrive(drive);
                            }
                          }}
                          className="pop-drive"
                          style={drive.id === 'ai-video' ? { position: 'relative' } : undefined}
                        >
                          <div className="pop-drive-icon">
                            {drive.iconImage ? (
                              <img 
                                src={drive.iconImage} 
                                alt={drive.name}
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'contain', 
                                  imageRendering: 'auto',
                                  transform: drive.id === 'youzhiqu' ? 'scale(1.35)' : drive.id === 'F' ? 'scale(1.15)' : drive.id === 'ai-video' ? 'scale(2.3)' : 'none',
                                }}
                              />
                            ) : (
                              getDriveIcon(drive.icon)
                            )}
                          </div>
                          <span className="pop-drive-label">{drive.label}({drive.driveLetter})</span>
                          {drive.id === 'ai-video' && showLockWarning && (
                            <>
                              <div className="pop-lock-overlay" />
                              <div className="pop-lock-warning">
                                <div className="pop-lock-circle">
                                  <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
                                    <path d="M14 14L34 34" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
                                    <path d="M34 14L14 34" stroke="#fff" strokeWidth="5" strokeLinecap="round"/>
                                  </svg>
                                </div>
                                <span className="pop-lock-text">筹备中</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <img
                    src="/images/keep-on-keeping-on.png"
                    alt="keep on keeping on"
                    style={{
                      position: 'absolute',
                      bottom: '30px',
                      left: '50%',
                      transform: 'translate(calc(-50% - 38px), -40px)',
                      maxWidth: '600px',
                      width: '90%',
                      height: 'auto',
                      objectFit: 'contain',
                      imageRendering: 'auto',
                    }}
                  />
                </motion.div>
              )}

              {/* D盘 - 广告拆解案 */}
              {view === 'drive-D' && (
                <motion.div
                  key="drive-D"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <AdBreakdownPage onBack={goBack} />
                </motion.div>
              )}

              {/* E盘 - 个人简历 */}
              {view === 'drive-E' && (
                <motion.div
                  key="drive-E"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <ResumePage onBack={goBack} />
                </motion.div>
              )}

              {/* F盘 - 游戏经历 */}
              {view === 'drive-F' && (
                <motion.div
                  key="drive-F"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <GamingPage onBack={goBack} />
                </motion.div>
              )}

              {/* 莉莉丝项目 */}
              {view === 'lilith' && (
                <motion.div
                  key="lilith"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <LilithPage onBack={goBack} />
                </motion.div>
              )}

              {/* 游之趣项目 */}
              {view === 'youzhiqu' && (
                <motion.div
                  key="youzhiqu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <YouzhiquPage onBack={goBack} />
                </motion.div>
              )}

              {/* 致谢页面 */}
              {view === 'credits' && (
                <motion.div
                  key="credits"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <CreditsPage onBack={goBack} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 状态栏 */}
      <div className="pop-statusbar">
        <div className="flex items-center gap-2">
          <ComputerIcon />
          <span>Brain.exe running...</span>
        </div>
        <div>
          <span>{view !== 'root' ? "READY" : "WAITING FOR INPUT..."}</span>
        </div>
      </div>
    </div>
  );
};
