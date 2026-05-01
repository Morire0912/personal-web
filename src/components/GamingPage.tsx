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

export const GamingPage: React.FC<GamingPageProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold" style={{ textShadow: '2px 2px 0 #ff5ba0' }}>
          游戏经历
        </h2>
        <p className="text-sm opacity-60">多年游戏玩家，涉猎广泛</p>
      </div>

      <div className="flex-1 overflow-auto pr-2">
        <div className="space-y-6">
          {GAMING_EXPERIENCE.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="pop-card"
            >
              {/* 分类标题 */}
              <div 
                className="pop-card-title flex items-center gap-2"
                style={{ 
                  borderBottomColor: categoryColors[cat.category] || '#ff5ba0',
                  color: categoryColors[cat.category] || '#ff5ba0',
                }}
              >
                <span 
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: categoryColors[cat.category] || '#ff5ba0', border: '2px solid black' }}
                />
                {cat.category}
              </div>

              {/* 游戏列表 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.games.map((game, gameIndex) => (
                  <motion.div
                    key={`${cat.category}-${gameIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.1 + gameIndex * 0.03 }}
                    className="flex items-start gap-3 p-2 rounded"
                    style={{ 
                      background: 'rgba(255,255,255,0.5)',
                      border: '2px solid #1a1a1a',
                    }}
                  >
                    {/* 游戏封面/图标占位 */}
                    <div 
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl"
                      style={{ 
                        background: categoryColors[cat.category] || '#ff5ba0',
                        border: '2px solid #1a1a1a',
                        boxShadow: '2px 2px 0 #1a1a1a',
                      }}
                    >
                      {game.coverImage ? (
                        <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" />
                      ) : (
                        '🎮'
                      )}
                    </div>

                    {/* 游戏信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate">{game.name}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {game.hours && (
                          <span className="text-xs bg-yellow-200 border border-black px-1">⏱ {game.hours}</span>
                        )}
                        {game.rank && (
                          <span className="text-xs bg-pink-200 border border-black px-1">🏆 {game.rank}</span>
                        )}
                        {game.spending && (
                          <span className="text-xs bg-blue-200 border border-black px-1">💎 {game.spending}</span>
                        )}
                        {game.note && (
                          <span className="text-xs bg-gray-200 border border-black px-1">{game.note}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
