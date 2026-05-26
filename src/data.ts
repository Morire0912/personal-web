/**
 * 作品集数据定义
 * 所有内容集中在此文件，后续只需修改此文件即可更新网站内容
 */

// ==================== 通用类型 ====================

export interface Drive {
  id: string;
  label: string;
  name: string;
  icon: 'floppy' | 'doc' | 'search' | 'folder' | 'game' | 'user' | 'video' | 'chart';
  iconImage?: string; // 自定义图标图片路径
  description?: string;
  driveLetter?: string; // 盘符显示，如 "E盘"
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
    displayCost?: string; // 展示估值
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
  backgroundImage?: string; // 卡片半透明背景图 (腾讯云COS链接)
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
  location: string;
  phone: string;
  email: string;
  social: string;
  education: {
    school: string;
    major: string;
    period: string;
    courses: string;
  };
  skills: string[];
  software: string[];
  certificates: string[];
  interests: string;
  experience: {
    company: string;
    role: string;
    period: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    role: string;
    period: string;
    bullets: string[];
  }[];
  campus: {
    org: string;
    role: string;
    period: string;
    bullets: string[];
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
    id: 'D',
    label: '广告拆解',
    name: '广告拆解案',
    icon: 'search',
    iconImage: '/images/ad-breakdown-icon.png',
    description: '游戏广告素材拆解分析',
    driveLetter: 'D:',
  },
  {
    id: 'lilith',
    label: '莉莉丝项目',
    name: '莉莉丝项目',
    icon: 'video',
    iconImage: '/images/lilith-logo.png',
    description: '远光84官方视频内容',
    driveLetter: 'E:',
  },
  {
    id: 'youzhiqu',
    label: '游之趣项目',
    name: '游之趣项目',
    icon: 'chart',
    iconImage: '/images/youzhiqu-logo.png',
    description: '龙骑士学园广告投放项目',
    driveLetter: 'F:',
  },
  {
    id: 'F',
    label: '游戏经历',
    name: '游戏经历',
    icon: 'game',
    iconImage: '/images/gaming-icon.png',
    description: 'FPS / 二游 / MOBA / 3A / 休闲',
    driveLetter: 'G:',
  },
  {
    id: 'ai-video',
    label: 'AI影视作品',
    name: 'AI影视作品',
    icon: 'video',
    iconImage: '/images/ai-video-logo.png',
    description: '正在筹备中...',
    driveLetter: 'H:',
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
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Kingshot.mp4',
    coverImage: '',
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
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Lords%20Mobile%20Kingdom%20Wars.mp4',
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
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Zombie%20Waves.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '26万',
      estimatedCost: '17天',
      displayCost: '9.5万',
    },
    analysis: `1. 开头钩子画面是类似跑酷的画面引导加上经典的蓝色数值门，降低了用户理解，但是这部分个人认为不如直接飞起旋转接上后续爆炸剧情来的直接。
2. 第二部分摩托炸墙加上机枪画面就是完全的战斗爽！爆金币爽！战斗爆金币继续战斗，海量的丧尸潮加上击杀特效爆金币特效是超强反馈。
3. 在超强反馈下观众的情绪会逐渐边际递减，所以在出现打boss的情况下会拉近主角和boss的距离，给观众一小点压迫感，而后再进行击杀。重置这一机制，有些类似做甜品要加一点盐的感觉，最后击杀清屏吸金币也是极强的ASMR享受体验感。
4. 尾板给出一个循环图告诉观众还有更多类似的玩法供你爽，还有手指引导与按钮交互，加强观众的心理暗示。`,
  },
  {
    id: 'ad-4',
    gameName: 'Slice Master : Idle Clicker',
    materialDirection: '角色扮演：放置（挂机）',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Slice%20Master%20Idle%20Clicker.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '338万',
      estimatedCost: '202天',
      displayCost: '7016万',
    },
    analysis: `1. 场景简单，玩法明了，开头章鱼和鮟鱇鱼（？）造型奇特较为吸睛，作为钩子带有猎奇和搞笑的元素效果非常好。
2. 手指ICON疯狂点击，玩家能够实时看见点击带来的效果，鱼变多，刀切割速度变快，刀变多以及爆出绿色美钞的效果都有类似视觉ASMR的效果，能够很大程度上带来解压的感觉，释放压力。`,
  },
  {
    id: 'ad-5',
    gameName: 'Color Ball Game - Sort Puz',
    materialDirection: '益智',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Color%20Ball%20Game%20-%20Sort%20Puz.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '51万',
      estimatedCost: '46天',
      displayCost: '2.9亿',
    },
    analysis: `1. 没有任何片头或剧情铺垫，直接展现游戏核心操作。益智以及三消类游戏比较吃自身玩法，而这类广告重要的是展现"无序"到"有序"带给人解压的感受，看着杂乱无章的颜色被一步步整理收纳、最终完美分类，能极大地满足玩家的掌控欲。
2. 配合不断闪烁的"TRY NOW"配合手指的操作，让玩家有"手痒"的感觉，作为转化按钮再合适不过。`,
  },
  {
    id: 'ad-6',
    gameName: 'Brawl Stars',
    materialDirection: '动作：MOBA',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Brawl%20Stars.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '8万',
      estimatedCost: '13天',
      displayCost: '2亿',
    },
    analysis: `1. 钩子文案类似"懂的都懂"，给出悬念的感觉，配合实机画面内容走位让人觉得这是个普通策略动作游戏。
2. 随后的抽卡界面开始展示精美的抽卡画面来体现美术，配合文案"legendary"拔高玩家的期待值。最后给出游戏战斗画面，快节奏的实机战斗混剪配合满屏的技能特效、大招清场的巨大伤害数字给人带来爽感，完美切中moba玩家的痛点，带来主宰战场的感受。
3. 尾板是一个互动式的内容，文案"legendary"与"tap to open"与前面抽出超强英雄相似，拉起好奇心，诱导玩家点击屏幕跳转商店带来转化。`,
  },
  {
    id: 'ad-7',
    gameName: 'Going Balls',
    materialDirection: '动作：跑酷',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Going%20Balls.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '257万',
      estimatedCost: '202天',
      displayCost: '1.8亿',
    },
    analysis: `1. 这是一条真人口播类型的广告，真人也许是KOL或者玩家演员，口播配合上游戏实机画面，给观众带来一种很"亲民"的感受，这类型内容可以减低玩家对于"广告"内容的抵触感。
2. 口播与实机画面也带来了反差感，一边是"主播"在说着这游戏有多难多难，但是实机画面给出的内容在玩家看来十分简单，就目前国内平台类似的评论大多会有"你会玩个蛋，我来"类似这种评论，可以看出有激发了玩家的逆反心理，可以促成大量的点击。`,
  },
  {
    id: 'ad-8',
    gameName: 'Block Blast!',
    materialDirection: '消除：三消-经典三消',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Block%20Blast%21.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '309万',
      estimatedCost: '150天',
      displayCost: '6.8亿',
    },
    analysis: `1. 开头经典的高血压钩子，不断尝试错误的选项但是正确的方块就在下面，配合文案让用户觉得"太蠢了不如我来"，从而骗取点击。
2. 突然的转场配合消除和音乐卡点，给人反差感，前5s积累的"无语感"在这一刻释放，配合画面和音乐带来视觉解压的正反馈。
3. 最后的ending口播了游戏名又在搜索框里打出了游戏的名字，加强用户对游戏品牌词的印象。`,
  },
  {
    id: 'ad-9',
    gameName: 'Royal Kingdom',
    materialDirection: '消除：三消-经典三消',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Royal%20Kingdom.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '17万',
      estimatedCost: '187天',
      displayCost: '2.5亿',
    },
    analysis: `1. 泛剧情向内容，开头钩子国王逃离巨蟒的追击，弹跳上平台后巨蟒慢慢探头，石块落下压迫生存空间给人带来满满压迫感，同时三消内容简单明了让人一眼就能明白玩法。
2. 高血压消除配合落石挤压和掉落，还有巨蟒缓缓向上，让玩家有代入感，这种故意犯错的操作让玩家有强烈的"你不行我上"的冲动，骗取点击。
3. 游戏即将失败，手指icon还在慢慢选择，让玩家更是着急，最终失败跳出超大的❌️，这种未完成的感受会让玩家产生强烈的游玩冲动OS："我去早赢了"。
4. 最终ending给出了一个蜂巢型的构图选关界面，填充了各种不同的玩法，还有手指icon的指引，配合上文案"play now"，暗示玩家还有各种不同的玩法，对于只是单纯被三消玩法吸引来的观众也是不小的诱惑。`,
  },
  {
    id: 'ad-10',
    gameName: 'Fashion Makeover:Salon&DressUp',
    materialDirection: '模拟：装扮&换装',
    materialSpec: '竖屏',
    videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/Fashion%20MakeoverSalon%26DressUp.mp4',
    coverImage: '',
    copyText: '',
    metrics: {
      popularity: '103万',
      estimatedCost: '238天',
      displayCost: '2.2亿',
    },
    analysis: `1. 开头3s的钩子先给出了一个未化妆的形态，而后大范围的擦除让人眼前一亮，是非常直观的视觉正反馈。
2. 后续的玩法基于开头进行延伸，对其他五官部位进行化妆，让用户开始期待最终的样貌。
3. ending部分给出了超多不同的搭配，同时标明了解锁等级暗示玩家还有超多不同的妆容和搭配等待解锁，配合转化按钮的文案"PLAY NOW"促使玩家点击下载。`,
  },
];

// 莉莉丝项目数据
export const LILITH_PROJECT: LilithProject = {
  title: '莉莉丝游戏（远光84）',
  description: '远光84官方账号视频内容2025年7月-10月项目大部分均有不同程度参与，以下为参与且高播放链接',
  videos: [
    {
      id: 'l-yt-1',
      title: 'Farlight 84 Global Relaunch Teaser Trailer - Coming August 7!',
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=0EMMAPpGY7o',
      views: '1,437,740',
    },
    {
      id: 'l-yt-2',
      title: 'Farlight 84 FPP Gameplay Trailer',
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=nTczHNUmI4s',
      views: '1,066,492',
    },
    {
      id: 'l-bv-1',
      title: '魁斗 x 黄子韬丨天天问我在燃什么？远光84，公测上号！',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1bZtvzBEaR/',
      bvid: 'BV1bZtvzBEaR',
      views: '333w',
    },
    {
      id: 'l-bv-2',
      title: '远光84丨7月18日不限号双端终测正式开启',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1fVGAzWEHs/',
      bvid: 'BV1fVGAzWEHs',
      views: '161w',
    },
    {
      id: 'l-bv-3',
      title: '《远光84》不限号双端终测开启 | 够胆拿枪，你就来！',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1HfgKzYE7u/',
      bvid: 'BV1HfgKzYE7u',
      views: '154w',
    },
    {
      id: 'l-bv-4',
      title: '《远光84》全球公测正式开启！来，试试你的枪！',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1GXtAzQEEZ/',
      bvid: 'BV1GXtAzQEEZ',
      views: '151w',
    },
    {
      id: 'l-bv-5',
      title: '远光84丨萌新必看！从入门到吃鸡',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1QTgGzaEyn/',
      bvid: 'BV1QTgGzaEyn',
      views: '73w',
    },
    {
      id: 'l-bv-6',
      title: '远光84预下载开启｜准备好和他们，一较高下了吗！？',
      platform: 'bilibili',
      url: 'https://www.bilibili.com/video/BV1pbtcz8EHF/',
      bvid: 'BV1pbtcz8EHF',
      views: '31w',
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
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%911.mp4',
      coverImage: '',
      metrics: {
        spend: '$7,514',
        ctr: '1.57%',
        cvr: '暂无',
        cpm: '$2.1',
        roas: '暂无',
        score: '47',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-2',
      title: '广告视频 2',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%912.mp4',
      coverImage: '',
      metrics: {
        spend: '$6,040',
        ctr: '7.12%',
        cvr: '暂无',
        cpm: '$10.5',
        roas: '暂无',
        score: '50',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-3',
      title: '广告视频 3',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%913.mp4',
      coverImage: '',
      metrics: {
        spend: '$5,046',
        ctr: '1.13%',
        cvr: '暂无',
        cpm: '$1.2',
        roas: '暂无',
        score: '46',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-4',
      title: '广告视频 4',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%914.mp4',
      coverImage: '',
      metrics: {
        spend: '$4,660',
        ctr: '3.63%',
        cvr: '暂无',
        cpm: '$9.2',
        roas: '暂无',
        score: '45',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-5',
      title: '广告视频 5',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%915.mp4',
      coverImage: '',
      metrics: {
        spend: '$2,366',
        ctr: '1.9%',
        cvr: '暂无',
        cpm: '$8.1',
        roas: '暂无',
        score: '44',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-6',
      title: '广告视频 6',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%916.mp4',
      coverImage: '',
      metrics: {
        spend: '$2,321',
        ctr: '6.97%',
        cvr: '暂无',
        cpm: '$6.6',
        roas: '暂无',
        score: '43',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-7',
      title: '广告视频 7',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%917.mp4',
      coverImage: '',
      metrics: {
        spend: '$2,227',
        ctr: '2.32%',
        cvr: '暂无',
        cpm: '$7.8',
        roas: '暂无',
        score: '42',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
    {
      id: 'yzq-8',
      title: '广告视频 8',
      videoUrl: 'https://sucai-1424528078.cos.ap-shanghai.myqcloud.com/%E9%BE%99%E9%AA%918.mp4',
      coverImage: '',
      metrics: {
        spend: '$1,934',
        ctr: '1.31%',
        cvr: '暂无',
        cpm: '$2.1',
        roas: '暂无',
        score: '41',
        registrations: '0',
        unitPrice: '暂无',
      },
    },
  ],
};

// 游戏经历数据
export const GAMING_EXPERIENCE: GameCategory[] = [
  {
    category: 'FPS',
    games: [
      { name: 'APEX', hours: '3000+小时', rank: '多赛季竞技场/大逃杀大师', coverImage: '/images/game-covers/apex.jpg' },
      { name: 'CS', hours: '2000+小时', rank: '完美平台 A+', coverImage: '/images/game-covers/cs.jpg' },
      { name: '守望先锋', hours: '1000+小时', rank: '钻石5/决斗领域重装传奇，输出/支援全明星', coverImage: '/images/game-covers/守望先锋.jpg' },
      { name: '无畏契约', hours: '800+小时', rank: '钻石三99分', coverImage: '/images/game-covers/无畏契约.jpg' },
      { name: '三角洲行动', rank: '全面战场统帅', coverImage: '/images/game-covers/三角洲行动.jpg' },
      { name: '战地1', hours: '300+小时', coverImage: '/images/game-covers/战地一.jpg' },
      { name: '战地5', hours: '50+小时', coverImage: '/images/game-covers/战地5.jpg' },
      { name: '战地2042', hours: '30+小时', coverImage: '/images/game-covers/战地2042.jpg' },
      { name: 'THE FINALS', hours: '20+小时', coverImage: '/images/game-covers/the finals.jpg' },
      { name: 'PUBG', note: '浅尝辄止', coverImage: '/images/game-covers/pubg.jpg' },
      { name: '和平精英', rank: '刺激战场时代最高段位', coverImage: '/images/game-covers/和平精英.png' },
      { name: '香肠派对', hours: '10+小时', coverImage: '/images/game-covers/香肠派对.jpg' },
      { name: '逃离鸭科夫', hours: '50+小时', coverImage: '/images/game-covers/逃离鸭科夫.jpg' },
    ],
  },
  {
    category: '休闲/其他',
    games: [
      { name: '星露谷物语', hours: '30+小时', coverImage: '/images/game-covers/星露谷物语.jpg' },
      { name: '保卫向日葵', spending: '氪金400+', note: '游玩两个月弃坑', coverImage: '/images/game-covers/保卫向日葵.jfif' },
      { name: '杖剑传说', note: '游玩三个月弃坑', coverImage: '/images/game-covers/杖剑传说.png' },
      { name: '超能下蛋鸭', spending: '氪金200+', note: '游玩两个月弃坑', coverImage: '/images/game-covers/超能下蛋鸭.png' },
      { name: '雷霆战机', spending: '氪金300+', note: '游玩两个月弃坑', coverImage: '/images/game-covers/雷霆战机.jfif' },
      { name: '糖豆人', hours: '50+小时', coverImage: '/images/game-covers/糖豆人.jpg' },
      { name: '幻兽帕鲁', hours: '40+小时', coverImage: '/images/game-covers/幻兽帕鲁.jpg' },
      { name: '七日世界', hours: '170+小时', coverImage: '/images/game-covers/七日世界.jpg' },
      { name: '我的勇者', hours: '80+小时', coverImage: '/images/game-covers/我的勇者.png' },
      { name: '点我加1', hours: '350+小时', coverImage: '/images/game-covers/点我加1.jpg' },
      { name: '块消达人', hours: '240+小时', coverImage: '/images/game-covers/块消达人.jpg' },
    ],
  },
  {
    category: 'roguelite',
    games: [
      { name: '元气骑士', hours: '100+小时', coverImage: '/images/game-covers/元气骑士.webp' },
      { name: '霓虹深渊', hours: '120+小时', coverImage: '/images/game-covers/霓虹深渊.jpg' },
      { name: '吸血鬼幸存者', hours: '30+小时', coverImage: '/images/game-covers/吸血鬼幸存者.jpg' },
      { name: '失落城堡', note: '我忘了', coverImage: '/images/game-covers/失落城堡.jpg' },
      { name: '暖雪', hours: '30+小时', coverImage: '/images/game-covers/暖雪.jpg' },
      { name: '土豆兄弟', hours: '30+小时', coverImage: '/images/game-covers/土豆兄弟.jpg' },
      { name: '浣熊推币机', hours: '30+小时', coverImage: '/images/game-covers/浣熊推币机.jpg' },
    ],
  },
  {
    category: '3A',
    games: [
      { name: 'GTA5', hours: '60+小时', coverImage: '/images/game-covers/gta5.jpg' },
      { name: '荒野大镖客2', hours: '40+小时', coverImage: '/images/game-covers/荒野大镖客2.jpg' },
      { name: '黑神话悟空', hours: '60+小时', coverImage: '/images/game-covers/黑神话悟空.jpg' },
      { name: '地平线4', hours: '200+小时', coverImage: '/images/game-covers/地平线4.jpg' },
      { name: '地平线5', hours: '20+小时', coverImage: '/images/game-covers/地平线5.jpg' },
      { name: '死亡搁浅1', hours: '100+小时', coverImage: '/images/game-covers/死亡搁浅1.jpg' },
      { name: '死亡搁浅2', hours: '130+小时', coverImage: '/images/game-covers/死亡搁浅2.jpg' },
    ],
  },
  {
    category: '二游',
    games: [
      { name: '鸣潮', spending: '氪金1200+', coverImage: '/images/game-covers/鸣潮.jpg' },
      { name: '终末地', note: '42满潜+专武满潜', coverImage: '/images/game-covers/终末地.webp' },
      { name: '异环', note: '开荒中', coverImage: '/images/game-covers/异环.png' },
    ],
  },
  {
    category: 'MOBA',
    games: [
      { name: '王者荣耀', spending: '氪金2000+', coverImage: '/images/game-covers/王者荣耀.jpg' },
      { name: '决战平安京', spending: '氪金2000+', coverImage: '/images/game-covers/决战平安京.png' },
    ],
  },
];

// 个人简历数据
export const RESUME: Resume = {
  name: '徐乔宇',
  title: '市场营销 / 游戏广告素材策划',
  bio: '上海市应用技术大学市场营销专业本科在读（2026届），深耕游戏买量广告领域，具备从脚本撰写到素材落地的全流程经验，擅长创意策划与数据分析。',
  location: '上海市 浦东新区',
  phone: '159-2127-6701',
  email: 'xqy320155169@163.com',
  social: 'Morire_',
  education: {
    school: '上海市应用技术大学',
    major: '市场营销（本科）',
    period: '2021.9 - 至今（2026届）',
    courses: '市场营销学，消费者行为学，数字网络营销，市场调查与预测，宏观经济学，统计学等',
  },
  skills: ['广告创意策划', '脚本撰写', '素材数据分析', 'AIGC 辅助创作', '跨部门协作', '流程标准化'],
  software: ['Excel', '剪映', 'Photoshop', '即梦', '小云雀', 'Tapnow', 'Lovart', 'Updream'],
  certificates: ['大学英语四级 CET-4', '计算机二级 WPS Office 高级应用与设计'],
  interests: 'B站十年深度用户、抖音重度使用。能够快速捕捉网络热点与流行趋势，对动漫、游戏、电影、摄影等内容有浓厚兴趣。',
  experience: [
    {
      company: '莉莉丝游戏',
      role: '美宣内录实习生',
      period: '2025.07 - 2025.09',
      bullets: [
        '品牌营销素材创作：准确产出发行侧所需的品牌营销素材，确保素材风格统一并契合各地区发行需求，以输出远光84项目为主要内容，以及部分剑与远征：启程与 Zeverland 项目的游戏内录内容素材',
        '脚本撰写与内容支持：参与多个海外发行相关执行文档编写，包括 Global Relaunch、海外 PatchNotes、远光爆料局、英雄攻略等项目的部分内容撰写，为视觉内容提供前期策划支持',
        '流程标准化与效率提升：参与搭建录制标准化体系与流程文档，建立确认机制，统一录屏参数与命名规范。优化后日均处理素材量提升至30+条，提升素材复用率，减少重复录制与沟通成本',
        'AI 工具优化工作流：引入 AI 工具，实现音频内容快速校对。定位因文档更新滞后导致的配音与台词缺失问题，提升素材校验效率，单日独立完成7份台词文档的校对与对齐，降低跨部门沟通成本',
      ],
    },
    {
      company: '游之趣 UjoyGames',
      role: '游戏创意素材实习生',
      period: '2025.12 - 至今',
      bullets: [
        '创意脚本撰写与落地：负责多款出海项目（勇者逗逗龙，龙骑士学园，我的花园世界等）的广告创意脚本撰写，独立撰写脚本累计200余条，覆盖搬运、AI、玩法、战斗、福利等多元方向，以及完成从产品卖点提炼→脚本撰写→落地跟进（包括画面表现、配音、录制等）的全流程处理',
        '脚本与平面迭代：定期与投放组进行素材数据交流汇总，分析素材数据表现，对高消耗的平面以及视频素材进行迭代。在迭代中提炼高消耗素材创意结构（视频素材如钩子画面/文案、玩法展示类型等，平面素材如特定立绘、文案包装等），在下次撰写中进行结构复用，持续提升素材消耗',
        '跨部门协作交流：对接运营、美术完成脚本翻译、配音音色筛选、福利内容录屏提报等执行细节，熟悉本地化内容与美术需求提报完整流程，确保素材落地质量，提升协作效率',
        'AIGC 辅助落地：熟练使用 AIGC 工具（如即梦、小云雀等）输出脚本 demo，为美术团队提供视觉参考，有效提升素材后期表现与制作效率。同时还可以快速产出一些AI热点内容，如短剧、萌宠、场景、变身等进行多类型尝试',
      ],
    },
  ],
  projects: [
    {
      name: 'APEX 电竞比赛',
      role: '主办方',
      period: '2023.02 - 2023.03',
      bullets: [
        '参与策划并执行一场超120人参与的校级大型线上电竞赛事，全流程负责赛事宣发、执行与监督，确保了活动在高参与度下的流畅性与公平性',
        '赛事宣发与报名管理：通过校内社交账号发布比赛信息，突出赛事奖励机制，成功招募超过40支队伍（120余名选手）报名参赛。设计标准化线上报名流程，利用问卷星高效收集、筛选与管理队伍信息，构建清晰的参赛数据库，为赛事分组与沟通奠定基础',
        '赛事执行与流程协调：负责40余支队伍的全周期沟通，包括协调赛前训练安排，确保各队伍赛前准备充分。建立清晰的退赛与替补机制，及时更新队伍信息，保障大规模赛事进程顺畅无中断',
        '赛事监督与公平性保障：设计并实施分组策略，依据队伍实力合理划分赛区，确保比赛竞争公平性。全程监督赛况并引入直播监督机制，确保赛事公平与参赛体验',
      ],
    },
  ],
  campus: [
    {
      org: 'KAB 创业俱乐部',
      role: '项目部部员',
      period: '2021.10 - 2022.09',
      bullets: [
        '每周参与部门组会探讨近期讨论市场热点，孵化创新项目想法，记录会议内容，为团队提供决策参考',
      ],
    },
    {
      org: '互联网+创新创业大赛',
      role: '项目队长',
      period: '2022.09 - 2023.10',
      bullets: [
        '担任"个性化定制手柄"项目队长，获得校级立项。负责分配任务，协调团队合作，同时进行目标市场分析，提出项目创新点，消费者需求收集和营销方案产出',
      ],
    },
  ],
  contact: {
    email: 'xqy320155169@163.com',
    phone: '159-2127-6701',
  },
};
