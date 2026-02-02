---
title: 搜索引擎提交流程
description: 详细介绍如何将 Hagicode 文档站提交到 Google 和 Bing 搜索引擎,提升站点在搜索结果中的可见性
---

# 搜索引擎提交流程指南

本文档介绍如何将 Hagicode 文档站提交到主流搜索引擎(Google 和 Bing),以提升站点在搜索结果中的可见性。

## 概述

将站点提交到搜索引擎有以下好处:

- **加快收录速度**: 主动告知搜索引擎站点的存在
- **监控索引状态**: 查看哪些页面被索引,哪些被忽略
- **发现 SEO 问题**: 获取爬虫错误、索引覆盖率等报告
- **优化搜索表现**: 查看搜索点击率、关键词排名等数据

## 前置条件

- 站点已部署并可公开访问
- sitemap.xml 已生成并可访问
- robots.txt 已配置并引用 sitemap

## Google Search Console

### 1. 注册和登录

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 使用 Google 账号登录

### 2. 添加站点属性

有两种方式添加站点:

#### 方式一: URL 前缀(推荐)

适用于单一站点或子路径:

1. 点击"添加资源"
2. 选择"网址前缀"
3. 输入站点 URL: `https://hagicode-org.github.io/site/`
4. 点击"继续"

#### 方式二: 域名

适用于主域名及其所有子域名:

1. 点击"添加资源"
2. 选择"网址前缀"(域名验证需要 DNS 配置)
3. 输入域名: `hagicode-org.github.io`

### 3. 验证站点所有权

选择以下任一方式验证:

#### HTML 文件验证(推荐用于 GitHub Pages)

1. 下载 Google 提供的 HTML 验证文件
2. 将文件添加到项目的 `public/` 目录
3. 提交并部署到 GitHub Pages
4. 点击"验证"按钮

#### HTML 标记验证

1. 复制 Google 提供的 meta 标签
2. 添加到 `astro.config.mjs` 或自定义 head 组件
3. 重新构建和部署

### 4. 提交 Sitemap

1. 在 Search Console 左侧菜单,选择"站点地图"
2. 输入 sitemap URL: `sitemap-index.xml`
3. 点击"提交"
4. 等待 Google 开始抓取(通常几小时到几天)

### 5. 请求编入索引

为了加快首页和重要页面的收录:

1. 使用"网址检查"工具
2. 输入页面 URL
3. 点击"请求编入索引"
4. Google 会在几分钟到几小时内抓取该页面

## Bing Webmaster Tools

### 1. 注册和登录

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 使用 Microsoft 账号登录

### 2. 添加站点

1. 点击"添加站点"
2. 输入站点 URL: `https://hagicode-org.github.io/site/`
3. 点击"添加"

### 3. 验证站点所有权

选择以下任一方式:

#### XML 验证文件(推荐)

1. 下载 Bing 提供的 XML 验证文件
2. 将文件添加到项目的 `public/` 目录
3. 提交并部署
4. 点击"验证"

#### Meta 标签验证

1. 复制 Bing 提供的 meta 标签
2. 添加到站点配置
3. 重新构建和部署

### 4. 提交 Sitemap

1. 在左侧菜单,选择"站点地图"
2. 点击"提交站点地图"
3. 输入 sitemap URL: `sitemap-index.xml`
4. 点击"提交"

## 验证提交结果

### Google Search Console

1. **站点地图状态**:
   - 进入"站点地图"部分
   - 检查"已发现的网址"数量
   - 查看是否有错误或警告

2. **索引覆盖率**:
   - 进入"覆盖率"报告
   - 查看"有效"、"错误"、"排除"等状态
   - 修复发现的错误

3. **网址检查**:
   - 输入具体页面 URL
   - 查看该页面是否已被索引
   - 如需要,请求重新编入索引

### Bing Webmaster Tools

1. **站点地图状态**:
   - 查看"已提交的 URL"数量
   - 查看"已编入索引的 URL"数量

2. **SEO 报告**:
   - 查看 SEO 建议
   - 修复发现的问题

## 检查收录状态

### 在 Google 中检查

```bash
# 搜索站点所有已收录的页面
site:hagicode-org.github.io/site

# 搜索特定页面
site:hagicode-org.github.io/site/product-overview
```

### 在 Bing 中检查

```bash
# 在 Bing.com 中搜索
site:hagicode-org.github.io/site
```

## 常见问题

### Q: 提交 sitemap 后多久会被索引?

A: 通常需要几天到几周时间。Google 和 Bing 会根据站点的重要性、更新频率等因素决定抓取频率。

### Q: 如何加快索引速度?

A:
- 主动提交重要页面到"请求编入索引"
- 保持站点内容更新
- 提高质量外部链接
- 确保站点加载速度快

### Q: 为什么有些页面没有被索引?

A: 常见原因:
- 页面质量低或内容稀少
- 被 robots.txt 阻止
- 站点结构问题导致爬虫无法访问
- 新站点需要时间建立信任

### Q: 如何处理索引错误?

A:
1. 在 Search Console 的"覆盖率"报告中查看错误详情
2. 修复错误(如 404、5xx、重定向问题)
3. 修复后重新提交 sitemap 或请求重新索引

## 定期维护

建议每月检查一次:

1. **Search Console**:
   - 查看"覆盖率"报告是否有新增错误
   - 检查"效果"报告了解搜索表现
   - 查看手动操作处罚(如有)

2. **Bing Webmaster Tools**:
   - 查看 SEO 报告
   - 检查爬虫错误
   - 审查关键词排名

3. **搜索收录**:
   - 在 Google 和 Bing 搜索 `site:your-domain`
   - 确认重要页面都被收录

## 相关资源

- [Google Search Central](https://developers.google.com/search)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters)
- [SEO 配置指南](./seo-config.md)
- [SEO 维护检查清单](./seo-checklist.md)
