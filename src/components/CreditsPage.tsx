import React from 'react';

interface CreditsPageProps {
  onBack: () => void;
}

const CREDITS = [
  { name: 'KIMI', role: 'AI 助手' },
  { name: 'ChatGPT', role: 'AI 助手' },
  { name: 'Gemini', role: 'AI 助手' },
  { name: 'Tapnow', role: '创意工具' },
  { name: 'Lovart', role: '创意工具' },
  { name: 'Pinterest', role: '灵感来源' },
];

export const CreditsPage: React.FC<CreditsPageProps> = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center" style={{ padding: '32px' }}>
      <div
        className="pop-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          background: '#fff',
          border: '4px solid #000',
          boxShadow: '6px 6px 0 #000',
          padding: '28px',
        }}
      >
        <h2
          style={{
            fontFamily: "'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif",
            fontSize: '28px',
            color: '#000',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '2px 2px 0 #ffeb3b',
          }}
        >
          特别致谢
        </h2>
        <p
          style={{
            fontFamily: "'Noto Sans SC', 'Barlow', sans-serif",
            fontSize: '14px',
            color: '#333',
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}
        >
          本网站的建构离不开以下工具与技术的支持
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {CREDITS.map((item) => (
            <div
              key={item.name}
              style={{
                background: '#ff5ba0',
                border: '3px solid #000',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow', 'Noto Sans SC', sans-serif",
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '1.5px 1.5px 0 #000',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: "'Noto Sans SC', 'Barlow', sans-serif",
                  fontSize: '11px',
                  color: '#fff',
                  opacity: 0.9,
                }}
              >
                {item.role}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'Noto Sans SC', 'Barlow', sans-serif",
            fontSize: '13px',
            color: '#666',
            textAlign: 'center',
            marginTop: '20px',
            fontStyle: 'italic',
          }}
        >
          感谢开源社区与所有创作者！(｡･ω･｡)ﾉ♡
        </p>
      </div>
    </div>
  );
};
