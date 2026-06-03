import React from 'react';
import { motion } from 'motion/react';

interface AiVideoPageProps {
  onBack: () => void;
}

const BILIBILI_SPACE_URL = 'https://space.bilibili.com/12048441';

const aiVideoCards = [
  {
    id: 'ai-film-1',
    title: '提示词',
    description: '参考角色【@图片1】:一位鹿角旅人,黑色长发带青绿色暗调与红色挑染,亮红枝状鹿角,尖耳,金色发饰与红色流苏,橄榄色旗袍、白色立领、金色盘扣,黑色鞋履,身后有深色鳞尾。\nStyle&Mood:苏州园林闲游,午后金色斜光,花窗与竹影切出清晰明暗,才水石之间有轻薄体积雾,二次元写实混合质感,35mm镜头,浅景深但轮廓利落。\nDynamic Description:稳定器广角跟拍,角色沿白墙花窗旁的回廊从画面左侧向右缓步前行;长发与深色鳞尾随步伐轻摆,橄榄色旗袍的金边被细窄阳光一段段照亮。硬切到月洞门旁的平视固定中近景:她放慢脚步,脸微微转向墙面反弹的暖光,肩线松开,眼睑缓放低,领口旁的红色流苏轻晃一下后停住。切到手持特写插入:旅人的金色发饰与亮红鹿角占据画面,竹叶影从其表面滑过,几缕发丝被微风掀起。切到摇臂升起的极远景:池岸、太湖石与曲桥展开,角色继续从左向右走过曲桥,在层层园林结构中显得安静从容,明暖阳穿过竹林,回廊下仍保留清凉暗部。\nStaticDescription:苏州古典园林,粉墙黛瓦,月洞门,木雕花窗,太湖石,修竹,荷塘细纹,曲桥,回廊,石板路,斜光中可见细小尘粒与花粉。',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E5%BA%84%E6%96%B9%E5%AE%9C%E7%9A%84Copy%281%29.mp4',
  },
];

export const AiVideoPage: React.FC<AiVideoPageProps> = () => {
  return (
    <div className="ai-video-page h-full overflow-auto">
      <div className="ai-video-shell">
        <motion.a
          href={BILIBILI_SPACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ai-bilibili-link"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
        >
          <div className="ai-bilibili-mark">BiliBili</div>
          <div className="ai-bilibili-copy">
            <div className="ai-bilibili-title">B站主页</div>
            <div className="ai-bilibili-url">space.bilibili.com/12048441</div>
          </div>
          <div className="ai-bilibili-cta">打开主页</div>
        </motion.a>

        <div className="ai-video-grid">
          {aiVideoCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="pop-card ai-video-work-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.08, duration: 0.24 }}
            >
              <div
                className="pop-video-container portfolio-video-frame portfolio-video-frame-horizontal ai-video-frame"
              >
                <video controls preload="metadata">
                  <source src={card.videoUrl} type="video/mp4" />
                  您的浏览器不支持视频播放
                </video>
              </div>
              <div className="ai-video-textbox">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
