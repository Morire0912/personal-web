# MY BRAIN - 个人作品集网站

> 像素风 Windows XP 桌面 + 波普漫画风文件资源管理器

## 项目介绍

这是一个以像素风 Windows XP 桌面为背景，打开波普漫画风（Pop Art）文件资源管理器窗口的个人作品集网站。

## 内容架构

| 盘符 | 名称 | 内容 |
|------|------|------|
| C: | 过往项目 | 莉莉丝项目、游之趣项目 |
| D: | 广告拆解案 | 游戏广告素材拆解分析 |
| E: | 个人简历 | 个人简介、技能树、联系方式 |
| F: | 游戏经历 | FPS / 二游 / MOBA / 3A / 休闲 |

## 技术栈

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4
- Framer Motion (动画)
- Express / Vercel Serverless Functions (Bilibili API 代理)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# TypeScript 类型检查
npm run lint
```

## 部署到 Vercel

### 1. 推送到 GitHub

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 关联 GitHub 远程仓库（先创建好仓库）
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送
git push -u origin main
```

### 2. 在 Vercel 上部署

1. 访问 [vercel.com](https://vercel.com) 并登录
2. 点击 "Add New Project"
3. 导入你的 GitHub 仓库
4. 框架预设选择 **Vite**
5. 点击 **Deploy**

### 环境变量（可选）

如果需要使用 Gemini AI API，在 Vercel 项目设置中添加：
- `GEMINI_API_KEY`

## 数据维护

所有内容数据集中在 `src/data.ts` 中，后续只需修改此文件即可更新网站内容：

- **广告拆解案**: 修改 `AD_BREAKDOWNS` 数组
- **莉莉丝项目**: 修改 `LILITH_PROJECT`
- **游之趣项目**: 修改 `YOUZHIQU_PROJECT`
- **游戏经历**: 修改 `GAMING_EXPERIENCE`
- **个人简历**: 修改 `RESUME`

### 视频链接

- **B站视频**: 直接填入 B站视频 URL，系统会自动提取 BV号
- **YouTube 视频**: 直接填入 YouTube 视频 URL
- **腾讯云 COS 视频**: 将对象存储链接填入 `videoUrl` 字段

### 图片

- 封面图、游戏图标等可放置到 `public/images/` 目录
- 或在 `data.ts` 中直接使用图片 URL

## 进入动画

默认包含一个 XP 风格的启动动画。如需替换为自定义视频动画：
1. 准备视频文件（建议 MP4 格式）
2. 替换 `src/components/BootScreen.tsx` 中的动画逻辑
