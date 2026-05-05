import React from 'react';

const STATS = [
  { icon: '🌍', text: 'Based in Earth' },
  { icon: '🎮', text: 'Level: 23' },
  { icon: '☕', text: 'Caffeine: NEVER' },
];

export const AvatarPanel: React.FC = () => {
  return (
    <div className="pop-avatar-panel">
      {/* 气泡对话框 */}
      <div className="pop-avatar-bubble">
        <p>Currently overthinking design 🤯</p>
        <div className="pop-avatar-bubble-tail" />
      </div>

      {/* Q版人物 */}
      <div className="pop-avatar-img-wrap">
        <span className="pop-avatar-img-label">My Avatar</span>
        <img
          src="/images/pixel-avatar.png"
          alt="Q版人物"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            imageRendering: 'auto',
            transform: 'scale(1.2) translateY(8px)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* 职业标签 */}
      <div className="pop-avatar-role">
        <span>AI POWER USER &</span>
        <span>HEAVY TOKEN CONSUMER</span>
      </div>

      {/* 统计信息 */}
      <div className="pop-avatar-stats">
        {STATS.map((stat, i) => (
          <div key={i} className="pop-avatar-stat-row">
            <span className="pop-avatar-stat-icon">{stat.icon}</span>
            <span className="pop-avatar-stat-text">{stat.text}</span>
          </div>
        ))}
      </div>

      {/* NOTE.TXT 便签 */}
      <div className="pop-avatar-note">
        <div className="pop-avatar-note-pin" />
        <h3 className="pop-avatar-note-title">NOTE.TXT</h3>
        <p className="pop-avatar-note-body">
          I design and code things that (hopefully) make sense. Sometimes.
        </p>
        <span className="pop-avatar-note-heart">💖</span>
      </div>
    </div>
  );
};
