# Implementation Tasks

## 1. 创建 Container 落地页面
- [x] 1.1 在 `apps/website/src/pages/container/` 目录下创建 `index.astro` 文件
- [x] 1.2 添加 SEO 元数据（title、description、og:tags）
- [x] 1.3 导入必要的组件和样式（Navbar、Footer、homepage.css、container.css）
- [x] 1.4 添加 Clarity 分析组件
- [x] 1.5 配置主题初始化脚本（与 Desktop 页面保持一致）

## 2. 实现 Hero Section
- [x] 2.1 添加页面标题 "Hagicode Container"
- [x] 2.2 添加副标题 "容器化部署，开箱即用，快速上手"
- [x] 2.3 创建镜像源选择按钮区域（Docker Hub、Azure ACR、阿里云 ACR）
- [x] 2.4 添加版本信息显示（最新版本号、支持的架构）
- [x] 2.5 添加功能标签（环境隔离、一键部署、快速启动）
- [x] 2.6 添加科技感背景装饰元素（tech-grid-bg、bgGlow）

## 3. 实现功能特性区域
- [x] 3.1 创建 6 个功能卡片
- [x] 3.2 添加功能图标（复用或创建新图标组件）
- [x] 3.3 为每个功能添加标题和描述
  - 环境隔离：容器化部署，避免依赖冲突
  - 快速部署：一键启动，无需复杂配置
  - 跨平台支持：支持 amd64/arm64 架构
  - 数据持久化：支持 Volume 挂载，数据不丢失
  - 自动更新：支持 watchtower 自动更新
  - 多镜像源：Docker Hub、Azure ACR、阿里云 ACR

## 4. 实现容器运行时选择区域
- [x] 4.1 使用 Starlight Tabs 组件创建容器运行时切换
- [x] 4.2 为 Docker 添加拉取命令和说明
- [x] 4.3 为 Podman 添加拉取命令和说明
- [x] 4.4 添加其他兼容运行时的说明（如适用）
- [x] 4.5 强调镜像的 OCI 兼容性

## 5. 实现镜像源选择区域
- [x] 5.1 使用 Starlight Tabs 组件创建镜像源切换
- [x] 5.2 为 Docker Hub 添加拉取命令和说明
- [x] 5.3 为 Azure ACR 添加拉取命令和认证说明
- [x] 5.4 为阿里云 ACR 添加拉取命令和认证说明
- [x] 5.5 确保代码块语法高亮正确

## 6. 实现快速启动区域
- [x] 6.1 使用 Starlight Tabs 组件创建部署方式切换
- [x] 6.2 添加单容器部署步骤说明
- [x] 6.3 添加 Docker Compose 部署步骤说明
- [x] 6.4 添加 Podman 部署步骤说明
- [x] 6.5 为每个步骤添加命令示例和说明
- [x] 6.6 添加数据持久化配置示例

## 7. 实现常见问题区域
- [x] 7.1 创建 FAQ 列表结构
- [x] 7.2 添加常见问题及答案：
  - 容器版本和 Desktop 版本有什么区别？
  - 支持哪些容器运行时？
  - Docker 和 Podman 命令有什么区别？
  - 如何更新容器？
  - 如何配置数据持久化？
  - 支持哪些系统架构？
  - 如何查看容器日志？
  - 容器启动失败怎么办？
- [x] 7.3 使用 `<details>` 和 `<summary>` 创建可折叠问答

## 8. 创建/更新样式文件
- [x] 8.1 创建 `apps/website/src/styles/container.css` 或复用 `desktop.css`
- [x] 8.2 确保 Hero Section 样式与 Desktop 页面一致
- [x] 8.3 确保功能卡片样式和动画效果
- [x] 8.4 确保 Tabs 组件在各主题下正确显示
- [x] 8.5 确保 FAQ 样式和交互效果
- [x] 8.6 添加响应式设计支持（移动端适配）

## 9. 更新链接配置
- [x] 9.1 在 `packages/shared/src/links.ts` 的 `SITE_LINKS` 中添加 `container` 配置
- [x] 9.2 配置开发环境链接（dev: `http://localhost:4322/container/`）
- [x] 9.3 配置生产环境链接（prod: `https://hagicode.com/container/`）
- [x] 9.4 设置 `external: false`（内部链接）

## 10. 更新主站点 Install Button 组件
- [x] 10.1 在 `apps/website/src/components/home/InstallButton.tsx` 中更新容器链接
- [x] 10.2 将容器链接指向新的 `container` 配置
- [x] 10.3 更新链接文本为"容器部署"或"Container 部署"
- [x] 10.4 确保链接在新落地页面发布后正常工作

## 11. 更新文档站点 Install Button 组件
- [x] 11.1 在 `apps/docs/src/components/InstallButton.tsx` 中同步更新
- [x] 11.2 添加容器落地页链接选项
- [x] 11.3 保持 Docker Compose 文档链接选项
- [x] 11.4 确保两个选项都可见且清晰

## 12. 验证和测试
- [x] 12.1 运行 `npm run typecheck` 确保 TypeScript 类型检查通过
- [x] 12.2 运行 `npm run build` 确保构建无错误
- [x] 12.3 本地测试：`npm run dev` 验证新页面可访问
- [x] 12.4 测试根路径部署场景（默认）
- [x] 12.5 测试子路径部署场景（`npm run dev:site`）
- [x] 12.6 验证 Install Button 中的容器链接正确跳转到新页面
- [x] 12.7 测试各主题下的页面显示效果（light、dark、lunar-new-year）
- [x] 12.8 测试移动端响应式布局
- [x] 12.9 测试 Tabs 组件切换功能（容器运行时、镜像源、部署方式）
- [x] 12.10 测试 FAQ 折叠/展开功能
