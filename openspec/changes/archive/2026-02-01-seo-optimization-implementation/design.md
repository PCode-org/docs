# SEO 优化实施设计文档

## 概述

本文档详细说明 SEO 优化的技术设计和实现方案,包括架构决策、技术选型、实现细节和验证策略。

## 架构决策

### 决策 1: Sitemap 配置方式

**选择**: 使用已安装的 `@astrojs/sitemap` 插件,无需额外安装其他 sitemap 插件。

**理由**:
- `@astrojs/sitemap` 是 Astro 官方插件,与 Astro 5.16 完全兼容
- 已安装在项目中(版本 3.7.0)
- 自动从构建的页面生成 sitemap
- 支持多 sitemap 索引(大型站点)
- 无需手动维护页面列表

**配置要求**:
- `astro.config.mjs` 中需要设置 `site` 字段为完整 URL
- `sitemap()` 集成已添加到 `integrations` 数组
- 需要验证 `site` 配置是否正确

**替代方案**: 手动创建 sitemap.xml
- 优势: 完全控制
- 劣势: 需要手动维护,容易遗漏页面,增加维护成本

---

### 决策 2: 结构化数据实现方式

**选择**: 创建可复用的 Astro 组件,使用 JSON-LD 格式注入结构化数据。

**理由**:
- JSON-LD 是 Google 推荐的格式,易于解析和维护
- Astro 组件可以复用,支持不同类型的结构化数据
- 可以根据页面上下文动态生成结构化数据
- 与 Astro 的零 JS 默认理念一致

**组件设计**:
```
src/components/StructuredData.astro
├── Props:
│   ├── type: 'WebPage' | 'Article' | 'BlogPosting' | ...
│   ├── data: 对应类型的结构化数据对象
│   └── canonicalUrl: 页面的规范 URL
└── 输出: <script type="application/ld+json"> 标签
```

**集成方式**:
- 在主布局文件 `Layout.astro` 中使用
- 根据页面类型传递不同的 props
- 为文档和博客创建不同的结构化数据

**替代方案**: 使用 `astro-seo` 等第三方插件
- 优势: 开箱即用,功能丰富
- 劣势: 增加依赖,可能过度设计,学习成本

---

### 决策 3: robots.txt 位置和内容

**选择**: 在 `public/robots.txt` 创建静态文件,使用简单配置。

**理由**:
- `public/` 目录下的文件会被复制到 `dist/` 根目录
- 无需动态生成,配置简单清晰
- 易于维护和调试
- 支持两种部署模式(根路径和子路径)

**配置内容**:
```txt
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

**注意事项**:
- Sitemap URL 需要根据部署模式动态调整
- 需要使用构建脚本替换 `your-domain.com` 为实际域名
- 或者使用相对路径(部分搜索引擎支持)

**优化方案**: 使用环境变量
- 在 `astro.config.mjs` 中定义站点 URL
- 构建时生成 `robots.txt`,动态替换 Sitemap URL
- 确保 Sitemap URL 与实际部署域名匹配

---

### 决策 4: Meta 标签配置层级

**选择**: 使用 Starlight 的全局配置 + 页面 frontmatter 的双层配置方式。

**理由**:
- Starlight 已提供全局 meta 标签配置
- 页面级别的 frontmatter 可以覆盖全局配置
- 灵活性和维护性的平衡

**配置层级**:
1. **全局配置** (`astro.config.mjs`):
   - `title`: 站点标题
   - `description`: 站点描述
   - `site`: 站点 URL(用于生成 canonical 和 OG URL)
   - `favicon` 和 `social` 配置

2. **页面配置** (frontmatter):
   - `title`: 页面标题
   - `description`: 页面描述(覆盖全局)
   - `image`: 社交分享图片(可选)

3. **自定义组件** (如需要):
   - 对于复杂场景,可以创建自定义 Head 组件
   - 添加额外的 meta 标签

**实现步骤**:
1. 验证 Starlight 全局配置是否完整
2. 检查现有页面的 frontmatter 是否有 description
3. 为缺少 description 的页面补充
4. 验证 OG tags 和 Twitter Cards 是否自动生成

---

## 技术设计

### Sitemap 生成流程

```
astro.config.mjs
    ↓
sitemap() 集成
    ↓
构建时扫描所有路由
    ↓
生成 sitemap-index.xml (如果页面多)
或 sitemap.xml (如果页面少)
    ↓
输出到 dist/sitemap.xml 或 dist/sitemap-index.xml
```

**验证命令**:
```bash
npm run build
ls -la dist/sitemap*
cat dist/sitemap.xml | head -20
```

**预期输出示例**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hagicode.org/</loc>
    <lastmod>2026-01-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hagicode.org/quick-start/installation/</loc>
    <lastmod>2026-01-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 更多 URL -->
</urlset>
```

---

### 结构化数据组件设计

**组件接口**:
```typescript
interface StructuredDataProps {
  type: 'WebPage' | 'Article' | 'BlogPosting' | 'Organization';
  data: {
    name?: string;
    headline?: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
    author?: {
      name: string;
      url?: string;
    };
    image?: string;
    inLanguage?: string;
    publisher?: {
      name: string;
      logo?: string;
    };
  };
}
```

**组件实现**:
```astro
---
---
interface StructuredDataProps {
  type: 'WebPage' | 'Article' | 'BlogPosting' | 'Organization';
  data: Record<string, any>;
  canonicalUrl: string;
}

const { type, data, canonicalUrl } = Astro.props;

const structuredData = {
  '@context': 'https://schema.org',
  '@type': type,
  url: canonicalUrl,
  ...data,
};

const jsonLd = JSON.stringify(structuredData);
---

<script type="application/ld+json" set:html={jsonLd} />
```

**使用示例**:
```astro
// 在文档页面
<StructuredData
  type="WebPage"
  data={{
    name: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastUpdated,
    inLanguage: 'zh-CN',
  }}
  canonicalUrl={canonicalURL}
/>

// 在博客文章
<StructuredData
  type="BlogPosting"
  data={{
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    datePublished: frontmatter.date,
    dateModified: frontmatter.lastUpdated,
    author: {
      name: frontmatter.author || 'HagiCode Team',
    },
    publisher: {
      name: 'HagiCode Docs',
    },
  }}
  canonicalUrl={canonicalURL}
/>
```

---

### Canonical URL 配置

**Starlight 自动生成**:
- Starlight 自动为每个页面生成 `<link rel="canonical">` 标签
- 基于 `site` 配置和当前页面路径
- 支持多语言和相对路径

**验证方法**:
```javascript
// 在浏览器控制台运行
document.querySelector('link[rel="canonical"]')?.href
```

**重定向页面的 Canonical**:
- 现有的重定向脚本(`scripts/generate-redirects.js`)已经包含 canonical 链接
- 重定向页面的 canonical 指向新的 URL
- 需要验证两种部署模式下的 canonical 正确性

**测试场景**:
1. 根路径部署(`VITE_SITE_BASE=/`):
   - 首页 canonical: `https://hagicode.org/`
   - 文档页 canonical: `https://hagicode.org/quick-start/installation/`

2. 子路径部署(`VITE_SITE_BASE=/site`):
   - 首页 canonical: `https://hagicode.org/site/`
   - 文档页 canonical: `https://hagicode.org/site/quick-start/installation/`

---

## 实现细节

### 文件修改清单

1. **新建文件**:
   - `public/robots.txt` - 搜索引擎爬虫规则
   - `src/components/StructuredData.astro` - 结构化数据组件

2. **可能需要修改的文件**:
   - `astro.config.mjs` - 验证和完善 sitemap 和 site 配置
   - `src/layouts/Layout.astro` - 集成结构化数据组件(如果需要)
   - `src/content/config.ts` - 如果需要为 frontmatter 添加 SEO 字段

3. **文档文件**:
   - `docs/seo-config.md` (新建) - SEO 配置文档
   - `docs/search-engine-submission.md` (新建) - 搜索引擎提交流程
   - `openspec/project.md` (更新) - 添加 SEO 相关信息

---

### 环境变量和配置

**现有环境变量**:
- `CLARITY_PROJECT_ID` - Microsoft Clarity 分析 ID(已配置)
- `VITE_SITE_BASE` - 站点基础路径(已配置)

**可能需要的环境变量**:
- `PUBLIC_SITE_URL` - 站点完整 URL(用于 robots.txt 和 sitemap)
  - 可选,如果不设置则使用 `astro.config.mjs` 中的 `site` 配置
  - 构建时可通过脚本动态替换 robots.txt 中的域名

**配置示例**:
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://hagicode.org', // 需要确认或设置
  // ...
});
```

---

### 构建流程集成

**现有构建流程**:
```bash
npm run build
# = astro build && node scripts/generate-redirects.js && node scripts/custom-404.js
```

**可能的增强**:
- 如果需要动态生成 robots.txt,可以在构建脚本中添加:
  ```bash
  node scripts/generate-robots.js
  ```
- 使用环境变量替换 robots.txt 中的域名占位符

**脚本示例** (`scripts/generate-robots.js`):
```javascript
import fs from 'fs';
import path from 'path';

const siteUrl = process.env.PUBLIC_SITE_URL || 'https://hagicode.org';
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(
  path.join(process.cwd(), 'dist', 'robots.txt'),
  robotsTxt
);
```

---

## 验证策略

### 自动化验证

1. **构建验证**:
   ```bash
   npm run build
   ```
   - 确保无构建错误
   - 验证输出文件存在

2. **文件存在性检查**:
   ```bash
   test -f dist/sitemap.xml && echo "✓ sitemap.xml exists"
   test -f dist/robots.txt && echo "✓ robots.txt exists"
   ```

3. **内容验证**:
   ```bash
   grep -q "sitemap.xml" dist/robots.txt && echo "✓ robots.txt references sitemap"
   grep -q "https://hagicode.org" dist/sitemap.xml && echo "✓ sitemap has correct URLs"
   ```

### 手动验证

1. **浏览器验证**:
   - 访问 `https://your-domain.com/sitemap.xml`
   - 访问 `https://your-domain.com/robots.txt`
   - 检查页面源码的 meta 标签和结构化数据

2. **工具验证**:
   - Google Rich Results Test
   - Schema Markup Validator
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - Google robots.txt Tester

3. **搜索引擎验证**:
   - Google Search Console 提交和验证
   - Bing Webmaster Tools 提交和验证
   - 搜索 `site:your-domain.com` 检查收录

---

## 风险和缓解

### 风险 1: Sitemap URL 配置错误

**风险**: sitemap.xml 中的 URL 不正确,导致搜索引擎无法索引页面。

**缓解**:
- 在 `astro.config.mjs` 中正确配置 `site` 字段
- 构建后检查 sitemap.xml 内容
- 在两种部署模式下都进行测试

### 风险 2: 结构化数据格式错误

**风险**: JSON-LD 格式错误,导致结构化数据无效。

**缓解**:
- 使用 Schema.org 验证工具测试
- 确保 JSON 序列化正确
- 在开发和测试环境充分验证

### 风险 3: Canonical URL 不一致

**风险**: Canonical URL 指向错误或不一致,影响 SEO。

**缓解**:
- 测试两种部署模式下的 canonical URL
- 检查重定向页面的 canonical 链接
- 确保所有页面都有唯一的 canonical URL

### 风险 4: 搜索引擎收录延迟

**风险**: 搜索引擎索引新站点需要较长时间,无法立即看到效果。

**缓解**:
- 提前告知相关方收录需要时间
- 设置监控和提醒,及时跟踪收录状态
- 优化内容质量,吸引搜索引擎主动抓取

---

## 性能考虑

1. **构建时间**:
   - Sitemap 生成: 增加很少的开销(扫描路由)
   - 结构化数据生成: 每个页面增加约 1-2KB JSON-LD
   - 总体影响: 可忽略不计

2. **页面大小**:
   - 结构化数据 JSON-LD: 1-2KB per page
   - Meta 标签: 增加 0.5-1KB per page
   - 总体影响: 可接受,有助于 SEO

3. **爬虫友好性**:
   - robots.txt: 减少爬虫抓取不必要的内容
   - sitemap.xml: 帮助爬虫发现所有页面
   - 结构化数据: 帮助搜索引擎理解页面内容

---

## 后续优化

1. **图片 SEO**:
   - 为所有图片添加 alt 属性
   - 优化图片文件大小和格式(WebP)
   - 添加图片 sitemap(可选)

2. **性能优化**:
   - 实施 Core Web Vitals 优化
   - 使用 Lazy Loading 加载图片
   - 优化 CSS 和 JavaScript 加载

3. **内容 SEO**:
   - 定期更新内容
   - 优化标题和描述
   - 增加内部链接

4. **监控和分析**:
   - 设置 Google Analytics 4
   - 监控搜索性能和用户行为
   - 定期审查 SEO 指标

---

## 参考

- [Astro SEO 指南](https://docs.astro.build/en/guides/seo/)
- [Schema.org 完整列表](https://schema.org/schemas.html)
- [Google 搜索中心文档](https://developers.google.com/search/docs)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines)
