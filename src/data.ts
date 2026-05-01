/**
 * 作品集数据定义
 * 所有内容集中在此文件，后续只需修改此文件即可更新网站内容
 */

// ==================== 通用类型 ====================

export interface Drive {
  id: string;
  label: string;
  name: string;
  icon: 'floppy' | 'doc' | 'search' | 'folder' | 'game' | 'user';
  description?: string;
}

export interface Folder {
  id: string;
  name: string;
  icon: 'folder' | 'video' | 'chart' | 'doc';
  parentDrive: string;
}

// ==================== 广告拆解案 ====================

export interface AdBreakdown {
  id: string;
  gameName: string;
  materialDirection: string;
  materialSpec: string; // e.g. "竖屏", "横屏"
  videoUrl: string; // 腾讯云 COS 链接
  coverImage: string; // 封面图 URL 或本地路径
  copyText: string; // 文案/素材封面上的文字
  metrics: {
    popularity?: string; // 人气值
    estimatedCost?: string; // 预估消耗
    displayCost?: string; // 展示消耗
    days?: string; // 投放天数
    totalViews?: string; // 总曝光
  };
  analysis: string; // 素材拆解分析（长文本，支持换行）
}

// ==================== 莉莉丝项目 ====================

export interface LilithVideo {
  id: string;
  title: string;
  platform: 'bilibili' | 'youtube';
  url: string;
  bvid?: string; // B站 BV号，用于获取播放量
  views?: string; // 播放量（如 "332w"）
}

export interface LilithProject {
  title: string;
  description: string;
  videos: LilithVideo[];
  playlistUrl?: string; // B站合集链接
}

// ==================== 游之趣项目 ====================

export interface YouzhiquVideo {
  id: string;
  title: string;
  videoUrl: string; // 腾讯云 COS 链接
  coverImage: string;
  metrics: {
    spend: string; // 花费
    ctr: string; // CTR
    cvr: string; // CVR
    cpm: string; // CPM
    roas: string; // ROAS
    score: string; // 评分
    registrations?: string; // 注册
    unitPrice?: string; // 单价
  };
}

export interface YouzhiquProject {
  title: string;
  description: string;
  videos: YouzhiquVideo[];
}

// ==================== 游戏经历 ====================

export interface GameEntry {
  name: string;
  hours?: string; // 游戏时长
  rank?: string; // 最高段位
  spending?: string; // 氪金金额
  coverImage?: string; // 游戏封面/图标
  note?: string; // 备注
}

export interface GameCategory {
  category: string;
  games: GameEntry[];
}

// ==================== 个人简历 ====================

export interface Resume {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  contact: {
    email?: string;
    phone?: string;
    wechat?: string;
  };
}

// ==================== 数据导出 ====================

export const DRIVES: Drive[] = [
  {
    id: 'C',
    label: '过往项目 (C:)',
    name: '过往项目',
    icon: 'folder',
    description: '莉莉丝项目 & 游之趣项目',
  },
  {
    id: 'D',
    label: '广告拆解案 (D:)',
    name: '广告拆解案',
    icon: 'search',
    description: '游戏广告素材拆解分析',
  },
  {
    id: 'E',
    label: '个人简历 (E:)',
    name: '个人简历',
    icon: 'doc',
    description: '个人简介与联系方式',
  },
  {
    id: 'F',
    label: '游戏经历 (F:)',
    name: '游戏经历',
    icon: 'game',
    description: 'FPS / 二游 / MOBA / 3A / 休闲',
  },
];

export const C_FOLDERS: Folder[] = [
  { id: 'c-lilith', name: '莉莉丝项目', icon: 'video', parentDrive: 'C' },
  { id: 'c-youzhiqu', name: '游之趣项目', icon: 'chart', parentDrive: 'C' },
];

// 广告拆解案数据（示例框架，后续填入真实数据）
export const AD_BREAKDOWNS: AdBreakdown[] = [
  {
    id: 'ad-1',
    gameName: 'Kingshot',
    materialDirection: '策略：塔防-SLG',
    materialSpec: '竖屏',
    videoUrl: '', // TODO: 填入腾讯云 COS 链接
    coverImage: '', // TODO: 填入封面图
    copyText: 'Homemade shooting device',
    metrics: {
      popularity: '3.8万',
      estimatedCost: '4天',
      displayCost: '2.9亿',
    },
    analysis: `1. 开头前6s使用了一个真人制作竹子射击道具的视频钩子引流用以截取一些泛用户，先把观众"骗"进来，同时射击这一点又能完美契合后期玩法，是一个不错的转场。
2. 后续游戏画面接马一射击杀敌→掉落金币吸取→建造防御/营地升级，这一循环割草画面解压又有超强正反馈。
3. 游戏画风也是3D卡通渲染类型，与传统硬核SLG有明显区分，更体现休闲与轻度玩法，观众接受度更高，配音选用的也是喜感十足的音乐，能进一步加强观众代入感，配合画面吸引大量观众点击留存。`,
  },
  {
    id: 'ad-2',
    gameName: 'Lords Mobile: Kingdom Wars',
    materialDirection: '策略：塔防-SLG',
    materialSpec: '竖屏',
    videoUrl: '',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '69万',
      estimatedCost: '451天',
      displayCost: '1.7亿',
    },
    analysis: `1. 开展展示了广告游戏玩法，门槛较低简单明了，玩家独自一人守住自己的据点，搬运子弹击退敌人。
2. 循环建立，击杀 -> 掉落金币 -> 建造 -> 更强击杀，给观众带来极强的爽感和解压感，正反馈拉满。
3. 最后进行数据膨胀，通过防御设施的华丽升级和满屏的爆炸特效，满足了玩家对力量和成长的极度渴望。`,
  },
  {
    id: 'ad-3',
    gameName: 'Zombie Waves',
    materialDirection: '角色扮演：roguelike游戏',
    materialSpec: '竖屏',
    videoUrl: '',
    coverImage: '',
    copyText: '',
    metrics: {},
    analysis: `1. 开头钩子画面是类似跑酷的画面引导加上经典的蓝色数值门，降低了用户理解，但是这部分个人认为不如直接飞起旋转接上后续爆炸剧情来的直接。
2. 第二部分摩托炸墙加上机枪画面就是完全的战斗爽！爆金币爽！战斗爆金币继续战斗，海量的丧尸潮加上击杀特效爆金币特效是超强反馈。
3. 在超强反馈下观众的情绪会逐渐边际递减，所以在出现打boss的情况下会拉近主角和boss的距离，给观众一小点压迫感，而后再进行击杀。重置这一机制，有些类似做甜品要加一点盐的感觉，最后击杀清屏吸金币也是极强的ASMR享受体验感。
4. 尾板给出一个循环图告诉观众还有更多类似的玩法供你爽，还有手指引导与按钮交互，加强观众的心理暗示。`,
  },
];

// 莉莉丝项目数据
export const LILITH_PROJECT: LilithProject = {
  title: '莉莉丝游戏（远光84）',
  description: '远光84官方账号视频内容2025年7月-10月项目大部分均有不同程度参与，以下为参与且高播放链接',
  videos: [
    {
      id: 'l-yt-1',
      title: '远光84 YouTube 视频 1',
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=ITczHNUm14s',
      views: '106w',
    },
    {
      id: 'l-yt-2',
      title: '远光84 YouTube 视频 2',
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=0EMMAPpGY7o',
      views: '143w',
    },
    {
      id: 'l-bv-1',
      title: '远光84 Bilibili 视频 1',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1bZvzBEaR/',
      bvid: 'BV1bZvzBEaR',
      views: '332w',
    },
    {
      id: 'l-bv-2',
      title: '远光84 Bilibili 视频 2',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1fVGAcWEHs/',
      bvid: 'BV1fVGAcWEHs',
      views: '161w',
    },
    {
      id: 'l-bv-3',
      title: '远光84 Bilibili 视频 3',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1HfgkzYE7u/',
      bvid: 'BV1HfgkzYE7u',
      views: '154w',
    },
    {
      id: 'l-bv-4',
      title: '远光84 Bilibili 视频 4',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1GxtAQEEEZ/',
      bvid: 'BV1GxtAQEEEZ',
      views: '151w',
    },
    {
      id: 'l-bv-5',
      title: '远光84 Bilibili 视频 5',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1QTgGzaEyn/',
      bvid: 'BV1QTgGzaEyn',
      views: '73w',
    },
  ],
  playlistUrl: 'https://space.bilibili.com/3494362379979305/lists/3878816?type=season',
};

// 游之趣项目数据
export const YOUZHIQU_PROJECT: YouzhiquProject = {
  title: '游之趣Ujoygames（龙骑士学园）',
  description: '龙骑士学园广告投放项目，以下为部分广告视频及投放数据',
  videos: [
    {
      id: 'yzq-1',
      title: '广告视频 1',
      videoUrl: '', // TODO: 填入腾讯云 COS 链接
      coverImage: '',
      metrics: {
        spend: '$7,514',
        ctr: '1.57%',
        cvr: '0.06%',
        cpm: '$2.1',
        roas: '0.0%',
        score: '47',
        registrations: '0',
        unitPrice: '$0.0',
      },
    },
    {
      id: 'yzq-2',
      title: '广告视频 2',
      videoUrl: '',
      coverImage: '',
      metrics: {
        spend: '$6,040',
        ctr: '7.12%',
        cvr: '0.03%',
        cpm: '$10.5',
        roas: '0.0%',
        score: '50',
        registrations: '0',
        unitPrice: '$0.0',
      },
    },
    {
      id: 'yzq-3',
      title: '广告视频 3',
      videoUrl: '',
      coverImage: '',
      metrics: {
        spend: '$5,046',
        ctr: '1.13%',
        cvr: '0.01%',
        cpm: '$1.2',
        roas: '0.0%',
        score: '46',
        registrations: '0',
        unitPrice: '$0.0',
      },
    },
    {
      id: 'yzq-4',
      title: '广告视频 4',
      videoUrl: '',
      coverImage: '',
      metrics: {
        spend: '$4,660',
        ctr: '3.63%',
        cvr: '0.07%',
        cpm: '$9.2',
        roas: '0.0%',
        score: '45',
        registrations: '0',
        unitPrice: '$0.0',
      },
    },
  ],
};

// 游戏经历数据
export const GAMING_EXPERIENCE: GameCategory[] = [
  {
    category: 'FPS',
    games: [
      { name: 'APEX', hours: '3000+小时', rank: '多赛季竞技场/大逃杀大师' },
      { name: 'CS', hours: '2000+小时', rank: '完美平台 A+' },
      { name: '守望先锋', hours: '1000+小时', rank: '钻石5/决斗领域重装传奇，输出/支援全明星' },
      { name: '无畏契约', hours: '800+', rank: '钻石三99分' },
      { name: '三角洲行动', rank: '全面战场统帅' },
      { name: '战地1', hours: '300+小时' },
      { name: '战地5, 战地2042, THE FINALS, PUBG, L4D2, 和平精英, 香肠派对, 逃离鸭科夫', note: '均有涉猎' },
    ],
  },
  {
    category: '二游',
    games: [
      { name: '崩坏3' },
      { name: '鸣潮' },
      { name: '阴阳师' },
      { name: '明日方舟', note: '42满潜+专武满潜' },
    ],
  },
  {
    category: 'MOBA',
    games: [
      { name: '王者荣耀', spending: '氪金2000+' },
      { name: '决战平安京', spending: '氪金2000+' },
    ],
  },
  {
    category: '3A',
    games: [
      { name: 'GTA5' },
      { name: '荒野大镖客2' },
      { name: '黑神话：悟空' },
      { name: '地平线4/5' },
      { name: '死亡搁浅1/2' },
      { name: '合金装备：幻痛' },
    ],
  },
  {
    category: 'roguelite',
    games: [
      { name: '元气骑士' },
      { name: '霓虹深渊' },
      { name: '吸血鬼幸存者' },
      { name: '失落城堡' },
      { name: '暖雪' },
      { name: '土豆兄弟' },
    ],
  },
  {
    category: '休闲/其他',
    games: [
      { name: '星露谷物语' },
      { name: '保卫向日葵' },
      { name: '铁剑传说' },
      { name: '超能下蛋鸭' },
      { name: '雷霆战机' },
      { name: '糖豆人' },
      { name: '幻兽帕鲁' },
      { name: '七日世界' },
      { name: '我的勇者' },
      { name: '点我加1', hours: '350+小时' },
      { name: '块消达人', hours: '240+小时' },
    ],
  },
];

// 个人简历数据
export const RESUME: Resume = {
  name: '乔羽',
  title: '像素风全栈工程师 / 视频策划',
  bio: '热爱游戏与视频创作的广告素材策划，深耕游戏买量广告领域，擅长素材创意与数据分析。',
  skills: ['React / Vite', '像素画创作', '视频后期 (PR/AE)', '广告素材策划', '数据分析'],
  experience: [
    {
      company: '莉莉丝游戏',
      role: '视频内容策划',
      period: '2025',
      description: '负责远光84官方账号视频内容策划与制作',
    },
    {
      company: '游之趣 Ujoygames',
      role: '广告投放策划',
      period: '2024-2025',
      description: '负责龙骑士学园广告投放素材制作与数据优化',
    },
  ],
  contact: {
    email: 'example@email.com',
  },
};
