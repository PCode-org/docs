# 为博客添加 RSS 订阅功能

**提案编号:** `blog-rss-subscription-feature`
**状态:** ExecutionCompleted
**创建日期:** 2026-02-10

## 概述

为 Hagicode Documentation 博客模块添加 RSS 2.0 订阅功能，使用户能够通过 RSS 阅读器订阅博客更新。

## 问题陈述

当前博客模块不支持 RSS/Atom 订阅格式，导致以下限制：

- 用户无法通过 RSS 阅读器订阅博客更新
- 内容分发依赖用户主动访问站点
- 无法通过第三方聚合平台自动推送内容
- 影响内容传播效率和用户留存

## 解决方案

### 技术方案

项目已安装 `starlight-blog` 插件（v0.25.2），该插件内置 RSS 生成功能。当前配置中 RSS 被禁用（`rss: false`），仅需启用即可。

### 实施范围

| 组件 | 变更类型 | 说明 |
|------|----------|------|
| `apps/docs/astro.config.mjs` | 配置修改 | 启用 `starlight-blog` RSS 功能 |
| 导航菜单 | UI 更新 | 添加 RSS 订阅入口 |

### RSS Feed 规范

- **格式**: RSS 2.0
- **访问路径**: `/docs/blog/rss.xml` (构建后)
- **内容**: 包含所有已发布的博客文章
- **排序**: 按发布日期降序
- **元数据**: 利用现有 frontmatter (title、date、description、author)

## 影响评估

### 用户体验

- **正面**: 用户可通过 Feedly、Inoreader 等阅读器订阅更新
- **中性**: 无负面影响

### 技术影响

- **构建时间**: 增加约 50-100ms（RSS 生成）
- **部署**: 无需额外配置
- **维护成本**: 零维护（自动生成）

### SEO 优化

- RSS feed 有助于搜索引擎发现和索引新内容
- 支持搜索引擎的自动抓取机制

## 成功标准

1. `/docs/blog/rss.xml` 可正常访问并返回有效的 RSS 2.0 内容
2. RSS 包含所有已发布博客文章的完整元数据
3. 每次构建时 RSS 自动更新
4. 导航菜单包含可访问的订阅链接

## 风险与缓解

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| RSS 格式验证失败 | 低 | 中 | 使用在线验证工具测试 |
| 生成路径冲突 | 低 | 低 | `starlight-blog` 使用标准路径 |
| 性能影响 | 极低 | 极低 | RSS 生成开销可忽略 |

## 参考资料

- [Starlight Blog RSS 文档](https://starlight.blog/guides/rss/)
- [RSS 2.0 规范](https://www.rssboard.org/rss-specification)
