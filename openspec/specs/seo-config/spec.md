# seo-config Specification

## Purpose
TBD - created by archiving change seo-optimization-implementation. Update Purpose after archive.
## Requirements
### Requirement: Sitemap 生成和配置

The site MUST automatically generate and maintain sitemap.xml to help search engines discover and index all pages.

站点 MUST 自动生成和维护 sitemap.xml,帮助搜索引擎发现和索引所有页面。

#### Scenario: Sitemap 自动生成

**Given** Astro 站点已配置 `@astrojs/sitemap` 插件
**When** 运行 `npm run build` 构建站点
**Then** 应该在 `dist/` 目录生成 `sitemap.xml` 或 `sitemap-index.xml` 文件
**And** sitemap 应该包含所有文档页面、博客文章和静态页面
**And** 每个 URL 应该包含完整的域名路径
**And** 每个 URL 应该包含 `lastmod` 时间戳
**And** sitemap 应该符合 XML sitemap 协议规范

#### Scenario: Sitemap 可访问性验证

**Given** 站点已部署到生产环境
**When** 访问 `https://your-domain.com/sitemap.xml`
**Then** 应该返回有效的 XML 文档
**And** 所有 URL 应该可访问(返回 200 状态码)
**And** URL 应该使用 HTTPS 协议
**And** URL 应该包含正确的 base path(如 `/site` 如果使用子路径部署)

#### Scenario: Sitemap 引用在 robots.txt

**Given** 站点有 sitemap.xml 文件
**When** 访问 `https://your-domain.com/robots.txt`
**Then** 应该包含 `Sitemap:` 指令
**And** Sitemap URL 应该指向 `https://your-domain.com/sitemap.xml`
**And** Sitemap URL 应该与实际部署域名匹配

---

### Requirement: 搜索引擎爬虫规则

The site MUST provide robots.txt file to guide search engine crawlers on how to crawl site content.

站点 MUST 提供 robots.txt 文件,指导搜索引擎爬虫如何抓取站点内容。

#### Scenario: robots.txt 文件存在

**Given** 站点已构建完成
**When** 检查 `dist/robots.txt` 文件
**Then** 文件应该存在于 `dist/` 根目录
**And** 文件应该遵循 robots.txt 协议规范
**And** 文件应该被复制到生产环境的根路径

#### Scenario: 允许主要搜索引擎爬取

**Given** robots.txt 文件存在
**When** 搜索引擎爬虫访问站点
**Then** `User-agent: *` 应该允许爬取所有内容
**And** `Allow: /` 应该允许根路径及所有子路径
**And** 不应该有 `Disallow:` 规则阻止重要内容

#### Scenario: robots.txt 引用 sitemap

**Given** robots.txt 文件存在
**When** 读取文件内容
**Then** 应该包含 `Sitemap:` 指令
**And** Sitemap URL 应该使用绝对 URL(包含域名)
**And** 域名应该与实际部署域名匹配

#### Scenario: 支持 GitHub Pages 部署

**Given** 站点部署在 GitHub Pages
**When** 使用根路径部署或子路径(`/site`)部署
**Then** robots.txt 应该在两种部署模式下都可访问
**And** Sitemap URL 应该根据部署模式动态调整(如需要)

---

### Requirement: Meta 标签完整性

Each page MUST include complete meta tags to optimize display in search engines and social media.

每个页面 MUST 包含完整的 meta 标签,以优化搜索引擎和社交媒体的显示效果。

#### Scenario: 基础 Meta 标签

**Given** 用户访问站点的任何页面
**When** 检查页面 `<head>` 部分
**Then** 应该包含 `<title>` 标签,内容为"页面标题 - 站点名称"格式
**And** 应该包含 `<meta name="description">` 标签
**And** description 应该准确描述页面内容(长度 50-160 字符)
**And** 应该包含 `<meta charset="utf-8">` 标签
**And** 应该包含 `<meta name="viewport">` 标签用于响应式设计

#### Scenario: Canonical URL 标签

**Given** 用户访问站点的任何页面
**When** 检查页面 `<head>` 部分
**Then** 应该包含 `<link rel="canonical">` 标签
**And** canonical URL 应该指向页面的规范 URL
**And** canonical URL 应该使用 HTTPS 协议
**And** canonical URL 应该包含正确的 base path
**And** 每个页面应该有唯一的 canonical URL

#### Scenario: Open Graph (OG) 标签

**Given** 用户访问站点的任何页面
**When** 在社交媒体(如 Facebook、LinkedIn)分享页面链接
**Then** 页面应该包含以下 OG 标签:
  - `<meta property="og:title">` - 页面标题
  - `<meta property="og:description">` - 页面描述
  - `<meta property="og:type">` - 页面类型(如 `website`, `article`)
  - `<meta property="og:url">` - 页面 URL
  - `<meta property="og:image">` - 分享预览图片
  - `<meta property="og:site_name">` - 站点名称
**And** OG 标签内容应该与页面内容一致
**And** OG 图片应该存在且可访问

#### Scenario: Twitter Card 标签

**Given** 用户在 Twitter 分享页面链接
**When** Twitter 爬虫访问页面
**Then** 页面应该包含以下 Twitter Card 标签:
  - `<meta name="twitter:card">` - Card 类型(如 `summary`, `summary_large_image`)
  - `<meta name="twitter:title">` - 页面标题
  - `<meta name="twitter:description">` - 页面描述
  - `<meta name="twitter:image">` - 预览图片
**And** Twitter Card 标签应该与 OG 标签内容一致
**And** 应该提供良好的预览效果

#### Scenario: Favicon 配置

**Given** 用户在浏览器中访问站点
**When** 检查浏览器标签页
**Then** 应该显示站点 favicon
**And** `<head>` 应该包含 favicon link 标签
**And** 应该提供多种尺寸的 favicon(如 16x16, 32x32, 180x180)
**And** favicon 文件应该存在于 `public/` 目录

---

### Requirement: 结构化数据

The site MUST provide Schema.org structured data for pages to help search engines better understand page content.

站点 MUST 为页面提供 Schema.org 结构化数据,帮助搜索引擎更好地理解页面内容。

#### Scenario: 文档页面结构化数据

**Given** 用户访问文档页面
**When** 检查页面 `<head>` 部分
**Then** 应该包含 JSON-LD 格式的结构化数据
**And** 结构化数据类型应该是 `WebPage` 或 `Article`
**And** 应该包含以下字段:
  - `@context`: `https://schema.org`
  - `@type`: `WebPage` 或 `Article`
  - `name`: 页面标题
  - `description`: 页面描述
  - `url`: 页面 URL
  - `inLanguage`: `zh-CN`
  - `datePublished`: 发布日期(可选)
  - `dateModified`: 最后修改日期(可选)
**And** JSON-LD 应该符合 Schema.org 规范

#### Scenario: 博客文章结构化数据

**Given** 用户访问博客文章页面
**When** 检查页面 `<head>` 部分
**Then** 应该包含 JSON-LD 格式的结构化数据
**And** 结构化数据类型应该是 `BlogPosting`
**And** 应该包含以下字段:
  - `@context`: `https://schema.org`
  - `@type`: `BlogPosting`
  - `headline`: 文章标题
  - `description`: 文章描述
  - `image`: 文章封面图(可选)
  - `datePublished`: 发布日期
  - `dateModified`: 最后修改日期
  - `author`: 作者信息
  - `publisher`: 发布者信息
**And** JSON-LD 应该符合 Schema.org BlogPosting 规范

#### Scenario: 结构化数据验证

**Given** 页面包含结构化数据
**When** 使用 Google Rich Results Test 验证
**Then** 应该无错误
**And** 应该识别出结构化数据类型
**And** 应该显示预览效果(如适用)
**And** 当使用 Schema Markup Validator 验证时,应该无错误

---

### Requirement: 搜索引擎集成

The site MUST integrate with mainstream search engine webmaster tools for monitoring and optimizing search performance.

站点 MUST 集成主流搜索引擎的站长工具,以便监控和优化搜索性能。

#### Scenario: Google Search Console 验证

**Given** 站点所有者拥有 Google 账户
**When** 在 Google Search Console 添加站点
**Then** 应该能够验证站点所有权
**And** 应该能够提交 sitemap.xml
**And** 应该能够查看索引状态和搜索性能
**And** 应该能够接收安全问题和手动惩罚的通知

#### Scenario: Bing Webmaster Tools 验证

**Given** 站点所有者拥有 Microsoft 账户
**When** 在 Bing Webmaster Tools 添加站点
**Then** 应该能够验证站点所有权
**And** 应该能够提交 sitemap.xml
**And** 应该能够查看索引状态和 SEO 报告
**And** 应该能够接收 SEO 建议

#### Scenario: 搜索引擎收录

**Given** 站点已提交到搜索引擎
**When** 在 Google 搜索 `site:your-domain.com`
**Then** 应该显示已收录的页面列表
**And** 主要页面(首页、文档、博客)应该被索引
**And** URL 应该指向正确的页面
**And** 页面标题和描述应该准确
**And** 在 Bing 搜索 `site:your-domain.com` 应该有类似结果

---

