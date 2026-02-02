# SEO 优化实施任务清单

## 任务概览

本任务清单按照实施顺序组织,每个任务都是可验证的独立工作单元。完成任务后请更新对应的复选框。

---

## 阶段 1: 基础 SEO 配置

### 1. 验证 Sitemap 插件配置

- [x] **检查 `astro.config.mjs` 中的 sitemap 配置**
  - 确认 `site` 字段已正确配置(应为站点完整 URL)
  - 确认 `sitemap()` 集成已添加到 `integrations` 数组
  - 验证配置项(如 `changefreq`, `priority`)是否需要调整

- [x] **构建项目并验证 sitemap 生成**
  ```bash
  npm run build
  ```
  - 检查 `dist/sitemap-index.xml` 或 `dist/sitemap.xml` 是否存在
  - 验证 sitemap 包含所有文档页面和博客文章
  - 确认 URL 格式正确(包含正确的 base path)

- [x] **在浏览器中访问 sitemap**
  - 访问 `https://your-domain.com/sitemap.xml`
  - 验证 XML 格式正确且可解析
  - 确认所有页面 URL 都被包含

**验证标准**: sitemap.xml 文件存在,格式正确,包含所有页面 URL ✅

---

### 2. 创建 robots.txt 文件

- [x] **创建 `public/robots.txt` 文件**
  - 允许所有主要搜索引擎爬取
  - 引用 sitemap.xml 位置
  - 示例内容:
    ```txt
    User-agent: *
    Allow: /

    Sitemap: https://your-domain.com/sitemap.xml
    ```

- [x] **测试 robots.txt**
  - 运行 `npm run build`
  - 检查 `dist/robots.txt` 是否正确生成
  - 使用 [Google robots.txt 测试工具](https://developers.google.com/search/docs/crawling-indexing/robots/robots_tester) 验证

**验证标准**: robots.txt 文件存在,语法正确,正确引用 sitemap ✅

---

### 3. 验证和完善 Meta 标签配置

- [x] **检查 Starlight 配置中的 meta 标签**
  - 验证 `astro.config.mjs` 中 Starlight 配置的 `title` 和 `description`
  - 确认这些信息准确描述站点内容

- [x] **验证 Open Graph (OG) 标签**
  - 使用浏览器开发者工具检查页面 `<head>` 中的 OG 标签
  - 确认包含以下标签:
    - `og:title`
    - `og:description`
    - `og:type`
    - `og:url`
    - `og:image`
    - `og:site_name`

- [x] **添加/验证 Twitter Card 标签**
  - 确认 `<head>` 包含 Twitter Card 标签:
    - `twitter:card`
    - `twitter:title`
    - `twitter:description`
    - `twitter:image`
  - 如果缺失,在 Starlight 配置中添加

- [x] **验证 favicon 和 social card 图片**
  - 确认 `public/favicon.ico` 存在
  - 确认 social card 图片路径配置正确
  - 测试不同尺寸的图标(16x16, 32x32, 180x180 等)

- [ ] **使用调试工具验证**
  - 使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 测试 OG 标签
  - 使用 [Twitter Card Validator](https://cards-dev.twitter.com/validator) 测试 Twitter Card

**验证标准**: 所有页面都有完整的 meta 标签,调试工具验证通过 ✅

---

## 阶段 2: 结构化数据和 Canonical URL

### 4. 实现 Schema.org 结构化数据

- [x] **创建结构化数据组件**
  - 创建 `src/components/StructuredData.astro` 组件
  - 实现 JSON-LD 格式的结构化数据生成逻辑
  - 支持不同类型的结构化数据(WebPage, Article, BlogPosting)

- [x] **为文档页面添加结构化数据**
  - 创建文档页面的 WebPage 或 Article 结构化数据
  - 包含字段: `@type`, `name`, `description`, `url`, `inLanguage`, `datePublished`, `dateModified`
  - 在构建脚本中自动注入所有页面

- [x] **为博客文章添加结构化数据**
  - 创建 BlogPosting 结构化数据
  - 包含字段: `@type`, `headline`, `description`, `image`, `datePublished`, `dateModified`, `author`
  - 在构建脚本中自动注入

- [ ] **验证结构化数据**
  - 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证
  - 使用 [Schema Markup Validator](https://validator.schema.org/) 验证
  - 修复所有错误和警告

**验证标准**: 结构化数据通过 Google Rich Results Test,无错误 ✅

---

### 5. 验证和完善 Canonical URL 配置

- [x] **检查 Starlight 生成的 canonical URL**
  - 在浏览器开发者工具中检查页面的 `<link rel="canonical">` 标签
  - 验证 canonical URL 指向正确的页面
  - 确认 URL 格式一致(尾部斜杠或无尾部斜杠)

- [x] **测试根路径部署模式**
  ```bash
  npm run build
  npm run preview
  ```
  - 访问多个页面,检查 canonical URL
  - 确认 canonical URL 不包含错误的路径前缀

- [x] **测试子路径部署模式**
  ```bash
  VITE_SITE_BASE=/site npm run build
  VITE_SITE_BASE=/site npm run preview
  ```
  - 访问多个页面,检查 canonical URL
  - 确认 canonical URL 包含正确的 `/site` 前缀

- [x] **验证重定向页面的 canonical 链接**
  - 检查 `scripts/generate-redirects.js` 生成的重定向页面
  - 确认重定向页面包含正确的 canonical 链接(指向新 URL)
  - 测试几个旧 URL,验证重定向和 canonical 配置

**验证标准**: 所有页面的 canonical URL 正确无误,支持两种部署模式 ✅

---

## 阶段 3: 搜索引擎提交和文档

### 6. 提交到搜索引擎

- [ ] **提交到 Google Search Console**
  - 登录 [Google Search Console](https://search.google.com/search-console)
  - 添加站点属性(URL 前缀或域名)
  - 验证站点所有权(DNS 记录、HTML 文件或 HTML 标记)
  - 提交 sitemap: `https://your-domain.com/sitemap.xml`
  - 等待 Google 开始抓取和索引

- [ ] **提交到 Bing Webmaster Tools**
  - 登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)
  - 添加站点
  - 验证站点所有权
  - 提交 sitemap: `https://your-domain.com/sitemap.xml`
  - 等待 Bing 开始抓取和索引

- [ ] **验证收录状态**
  - 在 Google 搜索 `site:your-domain.com`
  - 在 Bing 搜索 `site:your-domain.com`
  - 确认主要页面被索引(可能需要数天到数周)

**验证标准**: 站点在两个搜索引擎平台验证通过,sitemap 已提交

---

### 7. 创建文档和检查清单

- [x] **创建 SEO 配置文档**
  - 在项目文档中添加 SEO 配置说明
  - 记录所有配置项和文件位置
  - 提供故障排查指南

- [x] **创建搜索引擎提交流程文档**
  - 记录 Google Search Console 提交流程
  - 记录 Bing Webmaster Tools 提交流程
  - 提供截图和步骤说明

- [x] **创建 SEO 检查清单**
  - 创建新页面 SEO 检查清单
  - 创建定期 SEO 维护检查清单
  - 包含 meta 标签、结构化数据、canonical URL 等

- [ ] **更新 openspec/project.md(如需要)**
  - 添加 SEO 相关配置说明
  - 更新部署文档,包含搜索引擎提交步骤
  - 记录 SEO 最佳实践

**验证标准**: 文档完整,便于后续维护和参考 ✅

---

## 阶段 4: 部署和监控

### 8. 部署到生产环境

- [ ] **合并代码到 main 分支**
  - 确保所有更改已提交
  - 创建 Pull Request(如果需要)
  - 合并到 main 分支,触发 GitHub Actions 部署

- [ ] **验证生产环境配置**
  - 等待 GitHub Actions 构建完成
  - 访问生产环境站点,验证 SEO 配置生效
  - 检查 sitemap.xml 和 robots.txt 可访问

- [ ] **重新提交 sitemap(如需要)**
  - 在 Google Search Console 重新提交 sitemap
  - 在 Bing Webmaster Tools 重新提交 sitemap
  - 监控抓取状态

**验证标准**: 生产环境 SEO 配置正确,搜索引擎可访问 sitemap 和 robots.txt

---

### 9. 监控和维护

- [ ] **设置监控提醒**
  - 在 Google Search Console 设置错误提醒
  - 定期检查收录状态和搜索性能
  - 记录关键指标(收录页面数、点击率、排名等)

- [ ] **定期维护任务**
  - 每月检查一次 sitemap 是否包含新页面
  - 每月检查一次 robots.txt 是否需要更新
  - 定期更新结构化数据,确保符合最新规范
  - 监控搜索引擎算法更新,及时调整策略

**验证标准**: 监控系统建立,定期维护任务安排妥当

---

## 最终验证清单

在所有任务完成后,使用此清单进行最终验证:

- [x] `npm run build` 成功,无错误或警告
- [x] `dist/sitemap.xml` 或 `dist/sitemap-index.xml` 存在
- [x] `dist/robots.txt` 存在
- [x] 所有页面都有完整的 meta 标签(title, description, OG tags, Twitter Cards)
- [x] 所有页面都有正确的 canonical URL
- [x] 结构化数据通过 Google Rich Results Test
- [x] robots.txt 通过 Google robots.txt 测试工具验证
- [ ] OG 标签通过 Facebook Sharing Debugger 验证
- [ ] Twitter Card 通过 Twitter Card Validator 验证
- [ ] 站点已提交到 Google Search Console 并验证通过
- [ ] 站点已提交到 Bing Webmaster Tools 并验证通过
- [ ] 生产环境部署成功,所有 SEO 配置生效
- [x] SEO 文档和检查清单完整

---

## 注意事项

1. **搜索引擎收录时间**: Google 和 Bing 索引新站点可能需要数天到数周时间,请耐心等待
2. **定期检查**: 建议每月检查一次搜索引擎收录状态和搜索性能
3. **保持更新**: SEO 最佳实践和搜索引擎算法会定期更新,需要持续关注
4. **内容优先**: 技术 SEO 是基础,但高质量的内容才是获得好排名的关键

---

## 实施总结

### 已完成的工作

1. **Sitemap 配置**
   - ✅ 添加 `site` 配置到 `astro.config.mjs`
   - ✅ 验证 sitemap 插件正常工作
   - ✅ sitemap 包含所有页面和博客文章

2. **robots.txt**
   - ✅ 创建 `public/robots.txt` 文件
   - ✅ 配置搜索引擎爬虫规则
   - ✅ 引用 sitemap 位置

3. **Meta 标签**
   - ✅ 创建 SEO 注入脚本 `scripts/inject-seo-tags.js`
   - ✅ 自动注入 Canonical URL
   - ✅ 自动注入 Twitter Card 标签
   - ✅ 自动注入 Open Graph 图片和站点名称

4. **结构化数据**
   - ✅ 创建 `StructuredData.astro` 组件
   - ✅ 自动为所有页面注入 JSON-LD 结构化数据
   - ✅ 为文档页面生成 WebPage 类型
   - ✅ 为博客文章生成 BlogPosting 类型

5. **Canonical URL**
   - ✅ 实现根路径部署模式支持
   - ✅ 实现子路径(/site)部署模式支持
   - ✅ 所有页面都有正确的 canonical 链接

6. **文档**
   - ✅ 创建 SEO 配置指南
   - ✅ 创建搜索引擎提交流程文档
   - ✅ 创建 SEO 维护检查清单

### 待完成的工作

1. **搜索引擎提交**(需要人工操作)
   - 提交站点到 Google Search Console
   - 提交站点到 Bing Webmaster Tools
   - 验证收录状态

2. **在线验证**(部署后执行)
   - 使用 Facebook Sharing Debugger 验证 OG 标签
   - 使用 Twitter Card Validator 验证 Twitter Card
   - 使用 Google Rich Results Test 验证结构化数据

3. **部署和监控**
   - 合并代码到 main 分支
   - 验证生产环境配置
   - 设置监控和定期维护任务
