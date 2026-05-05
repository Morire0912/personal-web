import React from 'react';
import { GAMING_EXPERIENCE } from '../data';
import { motion } from 'motion/react';

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

// 分类装饰图案
const categoryPatterns: Record<string, string> = {
  'FPS': '🔫',
  '二游': '✨',
  'MOBA': '⚔️',
  '3A': '🎮',
  'roguelite': '🎲',
  '休闲/其他': '🌱',
};

// 判断游戏是否有详细信息
const hasDetails = (game: { rank?: string; hours?: string; spending?: string; note?: string }) => {
  return !!(game.rank || game.hours || game.spending || game.note);
};

export const GamingPage: React.FC<GamingPageProps> = ({ onBack }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="mx-4 pt-4 pb-6">
        <div className="space-y-5">
          {GAMING_EXPERIENCE.map((cat, catIndex) => {
            const color = categoryColors[cat.category] || '#ff5ba0';
            const pattern = categoryPatterns[cat.category] || '⭐';

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.06 }}
              >
                {/* 分类标题 */}
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-block px-3 py-0.5 text-base font-black italic"
                    style={{
                      background: color,
                      border: '3px solid #1a1a1a',
                      borderRadius: '6px',
                      color: '#1a1a1a',
                      fontFamily: "'Barlow', sans-serif",
                      fontStyle: 'italic',
                      fontWeight: 900,
                      boxShadow: '3px 3px 0 #1a1a1a',
                      letterSpacing: '1px',
                    }}
                  >
                    {cat.category}
                  </span>

                </div>

                {/* 票根墙网格 */}
                <div className="gaming-wall">
                  {cat.games.map((game, i) => {
                    const detailed = hasDetails(game);
                    return (
                      <motion.div
                        key={game.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.06 + i * 0.02 }}
                        className={`gaming-ticket ${detailed ? 'gaming-ticket-rare' : ''}`}
                        style={{ '--cat-color': color } as React.CSSProperties}
                      >
                        {/* 正面 */}
                        <div className="gaming-ticket-front">
                          {/* 顶部锯齿 */}
                          <div
                            className="gaming-ticket-serrated-top"
                            style={{ background: color }}
                          />

                          {/* 内容区 */}
                          <div className="gaming-ticket-body">
                            {/* emoji */}
                            <div className="gaming-ticket-header">
                              <span className="gaming-ticket-emoji">{pattern}</span>
                            </div>

                            {/* 游戏名 — 占满剩余空间 */}
                            <div className="gaming-ticket-name">{game.name}</div>

                            {/* 底部条码 */}
                            <div className="gaming-ticket-barcode">
                              {Array.from({ length: 8 }).map((_, j) => (
                                <span
                                  key={j}
                                  className="gaming-ticket-bar"
                                  style={{
                                    width: j % 3 === 0 ? '3px' : '2px',
                                    height: '100%',
                                    background: j % 2 === 0 ? '#1a1a1a' : color,
                                    opacity: j % 2 === 0 ? 1 : 0.6,
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* 底部锯齿 */}
                          <div
                            className="gaming-ticket-serrated-bottom"
                            style={{ background: color }}
                          />
                        </div>

                        {/* 背面 - hover 显示 */}
                        <div className="gaming-ticket-back">
                          <div className="gaming-ticket-back-name">{game.name}</div>
                          {detailed ? (
                            <div className="gaming-ticket-back-meta">
                              {game.rank && (
                                <div className="gaming-ticket-back-line">
                                  <span style={{ color: '#ffeb3b' }}>★</span>
                                  <span>{game.rank}</span>
                                </div>
                              )}
                              {game.hours && (
                                <div className="gaming-ticket-back-line">
                                  <span>⏱</span>
                                  <span>{game.hours}</span>
                                </div>
                              )}
                              {game.spending && (
                                <div className="gaming-ticket-back-line">
                                  <span>💎</span>
                                  <span>{game.spending}</span>
                                </div>
                              )}
                              {game.note && (
                                <div className="gaming-ticket-back-line">
                                  <span>📝</span>
                                  <span>{game.note}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="gaming-ticket-back-empty">
                              <span style={{ fontSize: '28px' }}>💾</span>
                              <span>NO DATA</span>
                            </div>
                          )}
                          {/* 撕下虚线 */}
                          <div className="gaming-ticket-tear">✂ CUT HERE</div>
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
