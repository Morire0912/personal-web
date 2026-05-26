import React from 'react';
import { GAMING_EXPERIENCE } from '../data';
import { motion } from 'motion/react';
import { Crosshair, Dice5, Gamepad2, Gem, Joystick, Sprout, Swords } from 'lucide-react';

interface GamingPageProps {
  onBack: () => void;
}

// 分类颜色映射
const categoryColors: Record<string, string> = {
  'FPS': '#ff5ba0',
  '二游': '#4fc3f7',
  'MOBA': '#ffeb3b',
  '3A': '#81c784',
  'roguelite': '#ce93d8',
  '休闲/其他': '#ffb74d',
};

// 分类图标
const categoryIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  'FPS': Crosshair,
  '二游': Gem,
  'MOBA': Swords,
  '3A': Gamepad2,
  'roguelite': Dice5,
  '休闲/其他': Sprout,
};

// 判断游戏是否有详细信息
const hasExtraDetails = (game: { rank?: string; spending?: string; note?: string }) => {
  return !!(game.rank || game.spending || game.note);
};

const formatHours = (hours?: string) => {
  if (!hours) return '';
  return hours.replace('小时', 'h');
};

export const GamingPage: React.FC<GamingPageProps> = ({ onBack }) => {
  return (
    <div className="gaming-page h-full overflow-auto">
      <div className="gaming-page-shell">
        <div className="gaming-category-list">
          {GAMING_EXPERIENCE.map((cat, catIndex) => {
            const color = categoryColors[cat.category] || '#ff5ba0';
            const CategoryIcon = categoryIcons[cat.category] || Joystick;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.06 }}
                className="gaming-category-section"
              >
                {/* 分类标题 */}
                <div className="gaming-category-header" style={{ '--cat-color': color } as React.CSSProperties}>
                  <span className="gaming-category-mark">
                    <CategoryIcon size={18} strokeWidth={3} />
                  </span>
                  <span className="gaming-category-title">{cat.category}</span>
                </div>

                <div className="gaming-list" style={{ '--cat-color': color } as React.CSSProperties}>
                  {cat.games.map((game, i) => {
                    const extraDetailed = hasExtraDetails(game);
                    return (
                      <motion.div
                        key={game.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.06 + i * 0.02 }}
                        className={`gaming-list-row ${extraDetailed ? 'gaming-list-row-featured' : ''} ${game.name === '守望先锋' ? 'gaming-list-row-overwatch' : ''}`}
                        tabIndex={0}
                        aria-label={`${cat.category} - ${game.name}${extraDetailed ? '，有详细记录' : ''}`}
                      >
                        <div className="gaming-cover-slot" aria-hidden="true">
                          {game.coverImage && <img src={game.coverImage} alt="" loading="lazy" />}
                        </div>

                        <div className="gaming-row-main">
                          <div className="gaming-row-title-line">
                            <h3 className="gaming-row-title">{game.name}</h3>
                            <span className="gaming-row-award" aria-hidden="true" />
                          </div>

                          <div className="gaming-row-bottom-copy">
                            <div className="gaming-row-hours" aria-hidden={!game.hours}>
                              <span>{formatHours(game.hours)}</span>
                            </div>

                            {extraDetailed && (
                              <div className="gaming-row-inline-meta">
                                {game.rank && (
                                  <div className="gaming-row-inline-line">
                                    <span>{game.rank}</span>
                                  </div>
                                )}
                                {game.spending && (
                                  <div className="gaming-row-inline-line">
                                    <span>{game.spending}</span>
                                  </div>
                                )}
                                {game.note && (
                                  <div className="gaming-row-inline-line">
                                    <span>{game.note}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="gaming-row-progress" aria-hidden="true">
                            <span />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
