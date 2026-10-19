# Repository Guidelines

## Project Overview

杭州昴星科技有限公司官网。当前基于 Astro + Keystatic 模板，首页及文章仍有示例文案；按公司官网实际需求修改，保持简单，不预先引入额外框架或服务。

## Architecture & Data Flow

- Astro 静态站点，构建产物为 `dist/`；React、Markdoc 已集成。
- Keystatic 仅在开发模式提供 `/keystatic`，使用本地文件存储，将文章写入 `src/content/posts/*.mdoc`。
- `src/content.config.ts` 加载文章并校验 `title`；首页通过 `getCollection('posts')` 列表展示，`src/pages/posts/[slug].astro` 通过 `getStaticPaths()`、`render(post)` 生成文章页。
- 生产站点没有管理后台或内容写入 API；内容修改需提交后重新构建发布。

## Key Directories

- `src/pages/`：页面与文件路由；`src/layouts/`：公共页面外壳。
- `src/content/posts/`：文章内容；`public/`：直接发布的静态资源。
- `src/styles.css`：当前全局样式入口。

## Development Commands

```sh
pnpm install       # 安装依赖
pnpm dev           # 本地开发，默认 http://localhost:4321
pnpm build         # 生成 dist/
pnpm preview       # 本地预览构建结果，需先 build
```

## Code Conventions & Common Patterns

- 沿用现有两空格缩进、单引号和分号；TypeScript 继承 `astro/tsconfigs/strict`。
- Astro 页面在 frontmatter 中导入模块、`await` 读取内容，模板负责展示；共用外壳使用 `Layout.astro` 与插槽。
- 内容字段变更需同步 `keystatic.config.ts`、`src/content.config.ts` 及消费这些字段的页面；保持文章文件标识与 `/posts/<id>` 链接一致。
- 当前没有独立状态管理、依赖注入或统一错误处理层；简单页面逻辑保持局部，不为官网预建抽象。
- 替换模板文案时同步检查页面标题、描述、`Layout.astro` 的语言属性及 favicon。

## Important Files

- `astro.config.mjs`：静态输出、集成和仅开发期启用的 Keystatic。
- `keystatic.config.ts`：编辑器集合、字段及图片路径；图片目录配置为 `src/assets/images/posts`，当前尚不存在。
- `src/content.config.ts`：内容加载及校验；`src/layouts/Layout.astro`：全站元数据与样式入口。
- `package.json`、`pnpm-lock.yaml`：命令和依赖。包名及 `CHANGELOG.md` 仍来自上游模板，不代表本站发布历史。

## Runtime/Tooling Preferences

- 使用 Node.js 和 pnpm；当前锁定的 Astro 7.4.0 要求 Node.js `>=22.22.0`，项目未固定 pnpm 版本。
- 提交锁文件、内容和图片；不要提交 `node_modules/`、`dist/`、`.astro/` 或真实 `.env` 密钥。

## Testing & QA

- 当前没有测试框架、test/lint/typecheck 脚本、覆盖率要求或 CI；不要假定这些检查存在。
- 修改后至少运行 `pnpm build`，再用 `pnpm preview` 检查首页、文章页及静态资源；构建成功不代表独立类型检查通过。
- 涉及内容编辑时用 `pnpm dev` 验证 `/keystatic`；生产预览不应显示后台入口，公开内容中不要留下仅开发可用的管理链接。
