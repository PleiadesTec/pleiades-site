# 杭州昴星科技有限公司官网

Astro 纯静态站点，使用 Keystatic 在本地编辑内容。当前只提供语义化 HTML、基础模块和原生 Banner 切换，不包含样式或美术设计。

## 本地运行

使用 Node.js >=22.22.0 和 pnpm：

```sh
pnpm install
pnpm dev
```

首页：<http://127.0.0.1:4321/>；本地编辑器：<http://127.0.0.1:4321/keystatic>。Keystatic 在开发环境写入本地文件，保存后刷新页面即可查看内容变化。

## 内容管理

| 编辑器入口 | 内容文件 | 用途 |
| --- | --- | --- |
| 站点设置 | `src/content/site/index.yaml` | 公司名称、描述、Logo、导航、联系方式、注册地址、页脚 |
| 首页 | `src/content/home/index.yaml` | 首页介绍、联系引导、Banner 列表 |
| 业务与服务 | `src/content/services/*.mdoc` | 业务列表和详情 |
| 单页 | `src/content/pages/*.mdoc` | `about` 关于我们、`contact` 联系页面 |
| 文章 | `src/content/posts/*.mdoc` | 文章列表和详情 |

文档正文采用 Markdoc；摘要、日期和图片等由编辑器字段管理。条目的 Slug 对应文件名与详情 URL，修改现有 Slug 会改变 URL。`about`、`contact` 两个固定页面条目和两个单例文件必须保留；缺少时构建会明确报错。

Banner 内容由首页单例管理，按列表顺序展示，可启用/停用，图片可留空。0 项不显示，1 项无切换按钮，多项提供上一项/下一项循环切换，不自动播放。禁用 JavaScript 后，全部启用项仍可阅读。

文章按发布日期降序排列，未填写日期的排在有日期的文章之后，同日或都未填写日期时按 Slug 升序。旧文章无需补日期；页面统一显示 `YYYY-MM-DD`。

上传图片写入 `public/images/site`、`banners`、`services`、`pages`、`posts` 对应目录，内容引用 `/images/...`，生产构建原样发布。图片与内容文件一起纳入版本控制。站点设置中的地址明确表示注册地址；域名和备案号未填写时，页脚分别显示“域名待购买”和“备案尚未办理”，不生成占位外链。

## 构建与发布

```sh
pnpm build
pnpm preview
```

构建阶段由 Astro Content Collections 读取和渲染文档，由 Keystatic Reader 读取结构化单例；浏览器无需运行 CMS。生产构建输出 `dist/index.html` 和各页面静态文件，不包含 Keystatic 后台或 API，也不需要 Node 部署适配器。

部署平台使用安装命令 `pnpm install`、构建命令 `pnpm run build`、输出目录 `dist`；Node 24 可用。生产构建不要设置 `NODE_ENV=development`。编辑完成后提交内容、图片和代码，再由平台重新构建；线上 `/keystatic` 返回 404 属于预期。

## 版本管理

提交 `pnpm-lock.yaml`、源代码、内容和图片；忽略 `node_modules/`、`dist/`、`.astro/`、真实 `.env` 文件及调试日志。`.env.example` 和 `.env.*.example` 可提交，但不得包含真实密钥。

