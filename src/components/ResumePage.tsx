import React from 'react';
import { RESUME } from '../data';
import { motion } from 'motion/react';

interface ResumePageProps {
  onBack: () => void;
}

const Card: React.FC<{ children: React.ReactNode; delay?: number; title?: string; icon?: string }> = ({
  children,
  delay = 0,
  title,
  icon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="pop-card mb-5"
  >
    {title && (
      <div className="pop-card-title">
        {icon} {title}
      </div>
    )}
    {children}
  </motion.div>
);

export const ResumePage: React.FC<ResumePageProps> = () => {
  return (
    <div className="h-full overflow-auto">
      <div className="pr-2 pt-4 pb-6">
        <div className="max-w-3xl mx-auto">
          {/* 个人信息 */}
          <Card delay={0}>
            <div className="flex items-start gap-4">
              <div
                className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center flex-shrink-0"
                style={{ fontSize: '34px', background: 'linear-gradient(135deg, #ff5ba0, #ffeb3b)' }}
              >
                👾
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black" style={{ fontFamily: "'Noto Sans SC', 'Barlow', sans-serif", fontSize: '28px', fontWeight: 900, textShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}>
                  {RESUME.name}
                </h3>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ fontFamily: "'Noto Sans SC', 'VT323', sans-serif", fontSize: '16px', fontWeight: 700, marginTop: '6px' }}>
                  <span>📍 {RESUME.location}</span>
                  <span>📞 {RESUME.phone}</span>
                  <span>✉️ {RESUME.email}</span>
                  <span>🌐 {RESUME.social}</span>
                </div>
              </div>
            </div>
            
          </Card>

          {/* 教育背景 */}
          <Card delay={0.05} title="🎓 教育背景" icon="">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-bold" style={{ fontSize: '19px' }}>{RESUME.education.school}</h4>
              <span
                className="px-2 py-0.5 font-bold"
                style={{ fontSize: '16px', background: '#ffeb3b', border: '2px solid #1a1a1a', borderRadius: '4px', fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
              >
                {RESUME.education.period}
              </span>
            </div>
            <p className="opacity-80 mb-2" style={{ fontSize: '18px' }}>{RESUME.education.major}</p>
            <p className="opacity-60" style={{ fontFamily: "'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif", fontSize: '14px' }}>
              主修课程：{RESUME.education.courses}
            </p>
          </Card>

          {/* 实习经历 */}
          <Card delay={0.1} title="💼 实习经历" icon="">
            <div className="space-y-5">
              {RESUME.experience.map((exp, i) => (
                <div key={i} className="border-l-4 border-pink-400 pl-4">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-bold" style={{ fontSize: '19px' }}>{exp.company}</h4>
                    <span
                      className="px-2 py-0.5 font-bold"
                      style={{ fontSize: '16px', background: '#ff5ba0', color: '#fff', border: '2px solid #1a1a1a', borderRadius: '4px', fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-bold opacity-80 mb-2" style={{ fontSize: '17px' }}>{exp.role}</p>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="leading-relaxed flex gap-2" style={{ fontSize: '17px', fontFamily: "'Noto Sans SC', sans-serif" }}>
                        <span className="flex-shrink-0 mt-1">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* 项目经历 */}
          <Card delay={0.15} title="🚀 项目经历" icon="">
            <div className="space-y-4">
              {RESUME.projects.map((proj, i) => (
                <div key={i} className="border-l-4 border-yellow-400 pl-4">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-bold" style={{ fontSize: '19px' }}>{proj.name}</h4>
                    <span
                      className="px-2 py-0.5 font-bold"
                      style={{ fontSize: '16px', background: '#ffeb3b', border: '2px solid #1a1a1a', borderRadius: '4px', fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
                    >
                      {proj.period}
                    </span>
                  </div>
                  <p className="font-bold opacity-80 mb-2" style={{ fontSize: '17px' }}>{proj.role}</p>
                  <ul className="space-y-1.5">
                    {proj.bullets.map((b, j) => (
                      <li key={j} className="leading-relaxed flex gap-2" style={{ fontSize: '17px', fontFamily: "'Noto Sans SC', sans-serif" }}>
                        <span className="flex-shrink-0 mt-1">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* 校园经历 */}
          <Card delay={0.2} title="🏫 校园经历" icon="">
            <div className="space-y-4">
              {RESUME.campus.map((item, i) => (
                <div key={i} className="border-l-4 border-blue-400 pl-4">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className="font-bold" style={{ fontSize: '19px' }}>{item.org}</h4>
                    <span
                      className="px-2 py-0.5 font-bold"
                      style={{ fontSize: '16px', background: '#4fc3f7', border: '2px solid #1a1a1a', borderRadius: '4px', fontFamily: "'ZCOOL KuaiLe', sans-serif" }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p className="opacity-80 mb-1" style={{ fontSize: '17px' }}>{item.role}</p>
                  <ul className="space-y-1">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="leading-relaxed flex gap-2" style={{ fontSize: '17px', fontFamily: "'Noto Sans SC', sans-serif" }}>
                        <span className="flex-shrink-0 mt-1">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* 技能 & 证书 */}
          <Card delay={0.25} title="🛠️ 技能 & 证书" icon="">
            <div className="space-y-4">
              {/* 软件工具 */}
              <div>
                <p className="font-bold mb-2" style={{ fontSize: '18px' }}>软件工具</p>
                <div className="flex flex-wrap gap-2">
                  {RESUME.software.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 font-bold"
                      style={{ fontSize: '16px', background: '#ffeb3b', border: '2px solid #1a1a1a', borderRadius: '4px' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* 证书 */}
              <div>
                <p className="font-bold mb-2" style={{ fontSize: '18px' }}>证书</p>
                <div className="flex flex-wrap gap-2">
                  {RESUME.certificates.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 font-bold"
                      style={{
                        fontSize: '16px',
                        background: '#81c784',
                        border: '2px solid #1a1a1a',
                        borderRadius: '4px',
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* 兴趣爱好 */}
              <div>
                <p className="font-bold mb-1" style={{ fontSize: '18px' }}>兴趣爱好</p>
                <p className="leading-relaxed opacity-80" style={{ fontSize: '17px', fontFamily: "'Noto Sans SC', sans-serif" }}>{RESUME.interests}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
