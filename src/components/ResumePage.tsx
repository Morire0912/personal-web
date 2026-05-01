import React from 'react';
import { RESUME } from '../data';
import { motion } from 'motion/react';

interface ResumePageProps {
  onBack: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold" style={{ textShadow: '2px 2px 0 #ff5ba0' }}>
          个人简历
        </h2>
      </div>

      <div className="flex-1 overflow-auto pr-2">
        <div className="max-w-3xl mx-auto">
          {/* 个人信息卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pop-card mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 border-4 border-black flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h3 className="text-2xl font-bold">{RESUME.name}</h3>
                <p className="text-lg opacity-70">{RESUME.title}</p>
              </div>
            </div>
            <p className="text-base leading-relaxed">{RESUME.bio}</p>
          </motion.div>

          {/* 技能 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="pop-card mb-6"
          >
            <div className="pop-card-title">🛠️ 技能树</div>
            <div className="flex flex-wrap gap-2">
              {RESUME.skills.map((skill, i) => (
                <span key={i} className="pop-tag">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* 工作经历 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pop-card mb-6"
          >
            <div className="pop-card-title">💼 工作经历</div>
            <div className="space-y-4">
              {RESUME.experience.map((exp, i) => (
                <div key={i} className="border-l-4 border-pink-400 pl-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg">{exp.company}</h4>
                    <span className="pop-tag yellow text-xs">{exp.period}</span>
                  </div>
                  <p className="text-sm opacity-70 mb-1">{exp.role}</p>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 联系方式 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pop-card"
          >
            <div className="pop-card-title">📬 联系方式</div>
            <div className="space-y-2">
              {RESUME.contact.email && (
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{RESUME.contact.email}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
