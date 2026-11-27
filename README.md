# 岁家档案

《明日方舟》岁家剧情的非官方资料站，收录从《洪炉示岁》到《辞岁行》的主线、十二位岁家成员、世界内年表、关系与悬案，以及左乐人物线和非官方续写建议。国服资料截至 **2026-10-08**，全站含剧透。

## 本地运行

需要 **Node.js 22.x** 和 npm。

```bash
npm ci
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。生产构建与本地预览：

```bash
npm run lint
npm run build
npm start
```

## 部署到 Vercel

1. 将本目录的源文件推送到 GitHub。不要上传 `node_modules/`、`.next/` 或其他本地构建产物；保留 `package-lock.json`、`public/` 和 `content/`。
2. 在 Vercel 创建项目，导入 GitHub 仓库。若仓库根目录就是本站，保持 **Root Directory** 默认；若本站在仓库子目录中，选择 **`arknights-sui-web`**。不要为部署个人站点而上传同一工作区内的其他项目。
3. 选用 **Next.js** 框架预设和 **Node.js 22.x**，使用默认构建与输出设置。不需要数据库、API、环境变量或自定义输出目录。
4. 点击 **Deploy**。构建会预渲染全部作品和人物详情页；更新资料后重新部署即可刷新页面。

## 路由与资料

| 路由 | 内容 |
| --- | --- |
| `/`、`/timeline` | 可按证据等级与人物联合筛选的世界内时间线 |
| `/stories`、`/stories/[slug]` | 发布顺序索引、剧情档案、前六部逐节点和来源 |
| `/characters`、`/characters/[id]` | 十二岁家成员、左乐档案、重岳和望的专题 |
| `/relationships`、`/questions` | 重点关系线与未解问题 |
| `/archive`、`/guide`、`/writing/zuo-le` | 总览、逐节点指南与左乐续写指南 |

[结构化资料](content/site-data.json)提供索引、时间线、人物关系、证据等级和来源；[剧情总览](content/01-story-overview.md)、[逐节点指南](content/02-chapter-guide.md)和[左乐专题](content/03-zuo-le-story-bible.md)在构建时渲染。新增或重命名作品、人物时，保持 JSON ID 和 Markdown 中的 `{#锚点}` 对应。未有文本定论的内容不要改标为原文；创作建议不等于游戏剧情。
