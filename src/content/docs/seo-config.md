---
title: SEO 配置指南
description: Hagicode 文档站的 SEO 配置说明,使用社区插件实现 sitemap、robots.txt、meta 标签和结构化数据
---

# SEO 配置指南

本文档介绍 Hagicode 文档站的 SEO(搜索引擎优化)配置,完全使用社区 Astro 插件实现。

## 使用的社区插件

我们使用以下成熟的社区插件来管理 SEO:

- **@astrojs/sitemap** - Astro 官方 sitemap 插件
- **astro-robots-txt** - 自动生成 robots.txt
- **astro-seo** - 统一管理 SEO meta 标签
- **astro-og-canvas** - 动态生成 OG 图片(已安装)

## 插件配置

### 1. Sitemap 插件

在 `astro.config.mjs` 中配置:

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hagicode-org.github.io/site',
  integrations: [
    sitemap(),
  ],
});
```

**生成的文件**:
- `dist/sitemap-index.xml` - sitemap 索引文件
- `dist/sitemap-0.xml` - sitemap 分片文件

### 2. Robots.txt 插件

在 `astro.config.mjs` 中配置:

```javascript
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  integrations: [
    robotsTxt({
      sitemap: 'https://hagicode-org.github.io/site/sitemap-index.xml',
    }),
  ],
});
```

**生成的文件**:
- `dist/robots.txt` - 搜索引擎爬虫规则

### 3. SEO Meta 标签

我们使用 `astro-seo` 插件来管理所有 SEO meta 标签。

**组件位置**: `src/components/StarlightHead.astro`

```astro
---
import { SEO } from 'astro-seo';

const siteTitle = 'Hagicode Docs';
const siteDescription = 'Hagicode 项目文档';
const canonicalUrl = new URL(Astro.url.pathname, Astro.site).href;
const fullImageUrl = 'https://hagicode-org.github.io/site/img/docusaurus-social-card.jpg';
---

<SEO
  title={siteTitle}
  description={siteDescription}
  canonicalURL={canonicalUrl}
  openGraph={{
    url: canonicalUrl,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: fullImageUrl, width: 1200, height: 630, alt: siteTitle }],
    siteName: 'Hagicode Docs',
    locale: 'zh_CN',
  }}
  twitter={{
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    image: fullImageUrl,
  }}
/>
```

### 4. Starlight 集成

在 Starlight 配置中使用自定义 Head 组件:

```javascript
starlight({
  components: {
    Head: './src/components/StarlightHead.astro',
  },
})
```

## 自动注入的 Meta 标签

### Canonical URL

每个页面都会自动添加 canonical 链接:

```html
<link rel="canonical" href="https://hagicode-org.github.io/site/product-overview/" />
```

### Open Graph 标签

```html
<meta property="og:url" content="https://hagicode-org.github.io/site/" />
<meta property="og:title" content="Hagicode Docs" />
<meta property="og:description" content="Hagicode 项目文档" />
<meta property="og:image" content="https://hagicode-org.github.io/site/img/..." />
<meta property="og:site_name" content="Hagicode Docs" />
<meta property="og:locale" content="zh_CN" />
```

### Twitter Card 标签

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://..." />
```

## 构建和部署

### 根路径部署

```bash
npm run build
```

生成的 canonical URL 格式:
- 首页: `https://hagicode-org.github.io/`
- 文档页: `https://hagicode-org.github.io/product-overview/`

### 子路径部署 (/site)

```bash
VITE_SITE_BASE=/site npm run build
```

生成的 canonical URL 格式:
- 首页: `https://hagicode-org.github.io/site/`
- 文档页: `https://hagicode-org.github.io/site/product-overview/`

## SEO 文件位置

构建后,以下 SEO 文件会自动生成在 `dist/` 目录:

| 文件 | 路径 | 说明 |
|------|------|------|
| sitemap | `dist/sitemap-index.xml` | 主 sitemap 索引文件 |
| sitemap | `dist/sitemap-0.xml` | sitemap 分片文件 |
| robots.txt | `dist/robots.txt` | 搜索引擎爬虫规则 |

## 验证 SEO 配置

### 1. 本地验证

构建后检查 `dist/` 目录中的文件:

```bash
npm run build

# 检查 sitemap
cat dist/sitemap-index.xml

# 检查 robots.txt
cat dist/robots.txt

# 检查 meta 标签
grep -o '<meta[^>]*>' dist/index.html | head -20

# 检查 canonical 链接
grep -o '<link rel="canonical"[^>]*>' dist/index.html
```

### 2. 在线工具验证

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Google robots.txt Tester**: https://developers.google.com/search/docs/crawling-indexing/robots/robots_tester

## 自定义 SEO 配置

### 修改站点信息

编辑 `src/components/StarlightHead.astro`:

```javascript
const siteTitle = '你的站点标题';
const siteDescription = '你的站点描述';
const fullImageUrl = 'https://你的域名/img/你的图片.jpg';
```

### 修改站点 URL

编辑 `astro.config.mjs` 中的 `site` 字段和 `robotsTxt` 插件中的 sitemap URL。

### 添加自定义 meta 标签

在 `StarlightHead.astro` 组件中使用 astro-seo 的 `additionalMetaTags` 属性:

```javascript
<SEO
  // ... 其他配置
  additionalMetaTags={[
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
  ]}
/>
```

## 社区插件的优势

### 使用社区插件的好处

1. **维护性好** - 由社区维护,及时更新和修复bug
2. **功能完整** - 经过大量项目验证,功能成熟
3. **类型安全** - TypeScript 支持,减少错误
4. **标准化** - 遵循 Web 标准,兼容性好
5. **零配置** - 安装即可用,最小化配置

### astro-robots-txt

- ✅ 自动生成 robots.txt
- ✅ 支持动态配置
- ✅ 与 sitemap 自动关联
- ✅ 无需手动维护文件

### @astrojs/sitemap

- ✅ 官方插件,稳定可靠
- ✅ 自动扫描所有页面
- ✅ 支持大型站点的 sitemap 索引
- ✅ 自动处理 lastmod 等属性

### astro-seo

- ✅ 统一管理所有 SEO meta 标签
- ✅ TypeScript 类型支持
- ✅ 自动生成正确的标签格式
- ✅ 支持结构化数据
- ✅ 简洁的 API

## 故障排查

### Sitemap 未生成

1. 检查 `astro.config.mjs` 中是否配置了 `site` 字段
2. 确认 `sitemap()` 集成已添加到 `integrations` 数组
3. 运行 `npm run build` 检查是否有错误

### Robots.txt 未生成

1. 检查 `astro-robots-txt` 是否已安装
2. 确认 `robotsTxt()` 集成已添加
3. 检查配置参数是否正确

### Meta 标签缺失

1. 确认 `StarlightHead.astro` 组件配置正确
2. 检查组件是否在 Starlight 的 `components` 配置中
3. 查看 `dist/` 目录中的 HTML 文件源码

## 相关文档

- [搜索引擎提交流程](./search-engine-submission.md)
- [SEO 维护检查清单](./seo-checklist.md)
- [Astro SEO 指南](https://docs.astro.build/en/guides/seo/)
- [astro-seo 文档](https://github.com/jonasmerlin/astro-seo)
- [astro-robots-txt 文档](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt)
- [@astrojs/sitemap 文档](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
