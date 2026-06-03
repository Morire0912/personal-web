# MY BRAIN 个人作品集网站 — 项目备忘录

## 项目定位
像素风 Windows XP 桌面 + 波普漫画风文件资源管理器窗口的个人作品集网站。
部署在 Vercel，源码托管在 GitHub。

## 关键信息

| 项目 | 详情 |
|------|------|
| 技术栈 | React 19 + Vite 6 + TypeScript + Tailwind CSS v4 |
| 远程仓库 | `https://github.com/Morire0912/personal-web.git` |
| 分支 | `main` |
| 自动部署 | Vercel（push 到 main 后自动构建） |
| 启动命令 | `npm run dev`（Express 开发服务器） |

## 数据维护入口

**所有内容数据集中在 `src/data.ts`**，修改此文件即可更新网站内容：

| 内容板块 | 修改对象 |
|----------|----------|
| 广告拆解案 | `AD_BREAKDOWNS` 数组 |
| 莉莉丝项目 | `LILITH_PROJECT` |
| 游之趣项目 | `YOUZHIQU_PROJECT` |
| 游戏经历 | `GAMING_EXPERIENCE` |
| 盘符定义 | `DRIVES` 数组 |

## 视频/图片资源

- **视频**：存储在腾讯云 COS（`sucai-1424528078.cos.ap-shanghai.myqcloud.com`）
- **图片**：放 `public/images/` 目录，或直接使用外部 URL

## 常用修改场景

1. **新增广告拆解** → 往 `AD_BREAKDOWNS` 数组加对象
2. **更新游戏时长/段位** → 改 `GAMING_EXPERIENCE`
3. **新增莉莉丝视频** → 改 `LILITH_PROJECT.videos`
4. **调整页面样式** → 改对应组件文件

## 部署流程

```bash
# 修改代码后
npm run lint          # （可选）类型检查
git add .
git commit -m "feat: xxx"
git push origin main  # Vercel 自动部署
```

## 注意事项

- 已接入 `@google/genai`，如需 AI 功能需在 Vercel 环境变量中设置 `GEMINI_API_KEY`
- `vercel.json` 已配置 SPA 路由（前端路由刷新不会 404）
- 简历板块已移除；如需恢复需重新添加数据与页面组件

## Agent skills

### Issue tracker

Issues and PRDs are tracked locally as markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses Chinese status labels for local markdown issues. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: use root `CONTEXT.md` and `docs/adr/` for domain language and architecture decisions. See `docs/agents/domain.md`.

### Required collaboration workflow

Future work on this project must combine these skill families:

- Use the Matt Pocock engineering skills configuration in `docs/agents/` for planning, PRDs, issue breakdowns, triage, diagnosis, TDD, and architecture review. Re-run `setup-matt-pocock-skills` only when switching issue tracker, triage vocabulary, or domain-doc layout.
- Use `ui-ux-pro-max` for UI/UX design, redesign, review, and visual-system decisions. For substantial UI changes, start with its design-system workflow and keep recommendations aligned with this portfolio's pixel XP + pop-comic identity.
- Use the GSAP skills for animation work. In React components, follow `gsap-react`; for tweens and easing use `gsap-core`; for multi-step sequencing use `gsap-timeline`; for smoothness and jank reduction use `gsap-performance`.
- For animated UI changes, treat design and motion as one pass: decide the visual intent with `ui-ux-pro-max`, choreograph it with GSAP timelines, then verify locally before considering a GitHub push.

## 项目结构速查

```
src/
  App.tsx                # 主应用（XP 桌面背景 + 资源管理器窗口）
  data.ts                # 全部数据集中在此
  components/
    Explorer.tsx           # 文件资源管理器窗口
    BootScreen.tsx         # XP 风格启动动画
    MosaicBackground.tsx   # XP 经典马赛克背景
    AdBreakdownPage.tsx    # 广告拆解详情页
    LilithPage.tsx         # 莉莉丝项目页
    YouzhiquPage.tsx       # 游之趣项目页
    GamingPage.tsx         # 游戏经历页
    AvatarPanel.tsx        # 头像面板
    CreditsPage.tsx        # 致谢页
```
