import React, { useState } from 'react';
import { DRIVES, C_FOLDERS, Drive } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { AdBreakdownPage } from './AdBreakdownPage';
import { LilithPage } from './LilithPage';
import { YouzhiquPage } from './YouzhiquPage';
import { ResumePage } from './ResumePage';
import { GamingPage } from './GamingPage';

// ==================== 图标组件 ====================

const ComputerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="12" height="9" fill="#c0c0c0" stroke="#000" strokeWidth="1.5"/>
    <rect x="3" y="4" width="10" height="7" fill="#000080"/>
    <rect x="6" y="12" width="4" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1.5"/>
    <rect x="4" y="14" width="8" height="2" fill="#c0c0c0" stroke="#000" strokeWidth="1.5"/>
  </svg>
);

const FolderIcon = ({ color = '#ffeb3b' }: { color?: string }) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <path d="M4 12h20l6 8h30v36H4z" fill={color} stroke="#1a1a1a" strokeWidth="3"/>
    <path d="M4 20h56v36H4z" fill={color} stroke="#1a1a1a" strokeWidth="3"/>
    <line x1="4" y1="28" x2="60" y2="28" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

const FloppyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="4" width="56" height="56" fill="#c0c0c0" stroke="#1a1a1a" strokeWidth="3"/>
    <rect x="8" y="8" width="48" height="36" fill="#fff" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="12" y="12" width="40" height="10" fill="#808080" stroke="#1a1a1a" strokeWidth="1.5"/>
    <rect x="40" y="14" width="8" height="6" fill="#1a1a1a"/>
    <rect x="12" y="38" width="40" height="12" fill="#c0c0c0" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="14" y1="42" x2="50" y2="42" stroke="#1a1a1a" strokeWidth="1"/>
    <line x1="14" y1="46" x2="42" y2="46" stroke="#1a1a1a" strokeWidth="1"/>
  </svg>
);

const DocIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="4" width="40" height="56" fill="#fff" stroke="#1a1a1a" strokeWidth="3"/>
    <rect x="12" y="8" width="32" height="8" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="12" y1="24" x2="44" y2="24" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="12" y1="32" x2="44" y2="32" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="12" y1="40" x2="44" y2="40" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="12" y1="48" x2="36" y2="48" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="28" cy="28" r="20" fill="#87ceeb" stroke="#1a1a1a" strokeWidth="3"/>
    <line x1="44" y1="44" x2="58" y2="58" stroke="#1a1a1a" strokeWidth="4"/>
    <circle cx="28" cy="28" r="12" fill="#fff" stroke="#1a1a1a" strokeWidth="2"/>
    <circle cx="28" cy="28" r="6" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="1.5"/>
  </svg>
);

const GamepadIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="16" width="56" height="32" rx="16" fill="#4fc3f7" stroke="#1a1a1a" strokeWidth="3"/>
    <circle cx="20" cy="32" r="6" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="2"/>
    <circle cx="44" cy="28" r="4" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <circle cx="52" cy="36" r="4" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="12" y="24" width="4" height="4" fill="#1a1a1a"/>
    <rect x="10" y="26" width="8" height="4" fill="#1a1a1a"/>
  </svg>
);

const UserIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="20" r="12" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="3"/>
    <path d="M8 56c0-16 10-24 24-24s24 8 24 24" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="3"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="8" width="56" height="48" rx="4" fill="#1a1a1a" stroke="#ff5ba0" strokeWidth="3"/>
    <polygon points="26,20 26,44 46,32" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="4" y="4" width="56" height="56" fill="#fff" stroke="#1a1a1a" strokeWidth="3"/>
    <line x1="8" y1="52" x2="56" y2="52" stroke="#1a1a1a" strokeWidth="2"/>
    <line x1="8" y1="52" x2="8" y2="8" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="12" y="32" width="8" height="20" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="24" y="20" width="8" height="32" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="36" y="28" width="8" height="24" fill="#4fc3f7" stroke="#1a1a1a" strokeWidth="2"/>
    <rect x="48" y="16" width="8" height="36" fill="#81c784" stroke="#1a1a1a" strokeWidth="2"/>
  </svg>
);

// ==================== 波普装饰元素 ====================

const PopDecorations = () => (
  <>
    <svg className="pop-burst" style={{ top: '5%', left: '2%', width: '60px', opacity: 0.15 }} viewBox="0 0 100 100">
      <path d="M50 0 L60 30 L90 20 L70 45 L100 55 L70 65 L85 90 L55 75 L50 100 L45 75 L15 90 L30 65 L0 55 L30 45 L10 20 L40 30 Z" fill="#ff5ba0"/>
    </svg>
    <svg className="pop-burst" style={{ bottom: '8%', right: '3%', width: '80px', opacity: 0.12 }} viewBox="0 0 100 100">
      <path d="M50 5 L58 32 L88 22 L68 48 L95 58 L68 68 L82 92 L55 78 L50 95 L45 78 L18 92 L32 68 L5 58 L32 48 L12 22 L42 32 Z" fill="#ffeb3b"/>
    </svg>
    <svg className="pop-star" style={{ top: '15%', right: '8%', width: '20px' }} viewBox="0 0 24 24">
      <polygon points="12,0 15,9 24,9 17,14 20,24 12,18 4,24 7,14 0,9 9,9" fill="#ffeb3b" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
    <svg className="pop-star" style={{ top: '60%', left: '5%', width: '16px', animationDelay: '0.5s' }} viewBox="0 0 24 24">
      <polygon points="12,0 15,9 24,9 17,14 20,24 12,18 4,24 7,14 0,9 9,9" fill="#ff5ba0" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
    <svg className="pop-star" style={{ bottom: '20%', right: '12%', width: '14px', animationDelay: '1s' }} viewBox="0 0 24 24">
      <polygon points="12,0 15,9 24,9 17,14 20,24 12,18 4,24 7,14 0,9 9,9" fill="#4fc3f7" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
    <div className="pop-dots" style={{ top: '30%', right: '15%' }} />
    <div className="pop-dots" style={{ bottom: '35%', left: '10%', opacity: 0.1 }} />
  </>
);

// ==================== 主组件 ====================

type ContentView = 'root' | 'drive-C' | 'drive-D' | 'drive-E' | 'drive-F' | 'lilith' | 'youzhiqu';

interface ExplorerProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ isFullscreen, onToggleFullscreen }) => {
  const [view, setView] = useState<ContentView>('root');

  const goBack = () => {
    switch (view) {
      case 'lilith':
      case 'youzhiqu':
        setView('drive-C');
        break;
      case 'drive-C':
      case 'drive-D':
      case 'drive-E':
      case 'drive-F':
        setView('root');
        break;
      default:
        setView('root');
    }
  };

  const openDrive = (drive: Drive) => {
    setView(`drive-${drive.id}` as ContentView);
  };

  const getPath = (): string => {
    switch (view) {
      case 'root': return '';
      case 'drive-C': return '\\过往项目 (C:)';
      case 'drive-D': return '\\广告拆解案 (D:)';
      case 'drive-E': return '\\个人简历 (E:)';
      case 'drive-F': return '\\游戏经历 (F:)';
      case 'lilith': return '\\过往项目 (C:)\\莉莉丝项目';
      case 'youzhiqu': return '\\过往项目 (C:)\\游之趣项目';
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
    <div className="flex flex-col h-full pop-window pop-halftone">
      {/* 标题栏 */}
      <div className="pop-titlebar">
        <div className="pop-titlebar-text">
          <ComputerIcon />
          <span>MY BRAIN</span>
        </div>
        <div className="pop-titlebar-btns">
          <button className="pop-titlebar-btn">_</button>
          <button onClick={onToggleFullscreen} className="pop-titlebar-btn">
            {isFullscreen ? '❐' : '□'}
          </button>
        </div>
      </div>

      {/* 工具栏 */}
      <div className="pop-toolbar">
        <button
          onClick={goBack}
          disabled={!canGoBack}
          className="pop-back-btn"
          style={{ opacity: canGoBack ? 1 : 0.4 }}
        >
          <span>◀</span> BACK
        </button>
        <div className="pop-addressbar">
          ROOT:{getPath()}
        </div>
        <button className="pop-dropdown-btn">▼</button>
      </div>

      {/* 内容区域 */}
      <div className="pop-content">
        <PopDecorations />
        <AnimatePresence mode="wait">
          {/* 根目录 */}
          {view === 'root' && (
            <motion.div
              key="root"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-12 justify-center pt-12"
            >
              {DRIVES.map((drive) => (
                <div
                  key={drive.id}
                  onClick={() => openDrive(drive)}
                  className="pop-drive"
                >
                  <div className="pop-drive-icon">
                    {getDriveIcon(drive.icon)}
                  </div>
                  <span className="pop-drive-label">{drive.label}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* C盘 - 过往项目 */}
          {view === 'drive-C' && (
            <motion.div
              key="drive-C"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-10 justify-center pt-8"
            >
              {C_FOLDERS.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => setView(folder.id === 'c-lilith' ? 'lilith' : 'youzhiqu')}
                  className="pop-drive"
                >
                  <div className="pop-drive-icon">
                    {getFolderIcon(folder.icon)}
                  </div>
                  <span className="pop-drive-label">{folder.name}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* D盘 - 广告拆解案 */}
          {view === 'drive-D' && (
            <motion.div
              key="drive-D"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
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
              transition={{ duration: 0.25 }}
              className="h-full"
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
              transition={{ duration: 0.25 }}
              className="h-full"
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
              transition={{ duration: 0.25 }}
              className="h-full"
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
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <YouzhiquPage onBack={goBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 状态栏 */}
      <div className="pop-statusbar">
        <div className="flex items-center gap-2">
          <ComputerIcon />
          <span>{DRIVES.length} DRIVE(S) FOUND</span>
        </div>
        <div>
          <span>{view !== 'root' ? "READY" : "WAITING FOR INPUT..."}</span>
        </div>
      </div>
    </div>
  );
};
