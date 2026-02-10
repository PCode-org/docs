# 主站 Container 落地页面规范

## ADDED Requirements

### Requirement: 容器部署落地页面

主站点 SHALL 提供独立的容器部署落地页面，参照 Desktop 页面的设计风格，为用户提供容器化部署的视觉化介绍和快速部署指引。页面 SHALL 支持多种容器运行时（Docker、Podman 等），而非仅限于 Docker。

#### Scenario: 访问 Container 落地页面
- **WHEN** 用户访问 `/container/` 路径
- **THEN** 显示容器部署落地页面

#### Scenario: 页面包含完整的营销内容
- **WHEN** 用户查看 Container 落地页面
- **THEN** 页面 SHALL 包含 Hero Section、功能特性、容器运行时选择、镜像源选择、快速启动、常见问题等区域

#### Scenario: 页面设计参照 Desktop 页面
- **WHEN** Container 落地页面被创建
- **THEN** 页面 SHALL 使用与 Desktop 页面一致的样式系统、布局结构和组件设计

## ADDED Requirements

### Requirement: Hero Section 展示

Container 落地页面的 Hero Section SHALL 展示页面标题、副标题、镜像源选择按钮、版本信息和功能标签。

#### Scenario: 显示页面标题和副标题
- **WHEN** 用户访问 Container 落地页面
- **THEN** Hero Section SHALL 显示 "Hagicode Container" 标题和 "容器化部署，开箱即用，快速上手" 副标题
- **AND** 标题使用渐变色效果和动画

#### Scenario: 显示镜像源选择按钮
- **WHEN** 用户查看 Hero Section
- **THEN** SHALL 显示 Docker Hub、Azure ACR、阿里云 ACR 三个镜像源按钮
- **AND** 每个按钮可点击跳转到对应镜像源的详细说明

#### Scenario: 显示版本信息
- **WHEN** 用户查看 Hero Section
- **THEN** SHALL 显示最新版本号和支持的架构信息（amd64/arm64）

## ADDED Requirements

### Requirement: 功能特性展示

Container 落地页面 SHALL 展示 6 个核心功能特性卡片，每个卡片包含图标、标题和描述。

#### Scenario: 显示 6 个功能卡片
- **WHEN** 用户查看功能特性区域
- **THEN** SHALL 显示以下 6 个功能卡片：
  - 环境隔离
  - 快速部署
  - 跨平台支持
  - 数据持久化
  - 自动更新
  - 多镜像源

#### Scenario: 功能卡片具有交互动画
- **WHEN** 用户鼠标悬停在功能卡片上
- **THEN** 卡片 SHALL 显示上浮效果和阴影增强
- **AND** 鼠标指针变为 pointer

## ADDED Requirements

### Requirement: 容器运行时选择区域

Container 落地页面 SHALL 使用 Tabs 组件展示不同容器运行时的拉取命令和配置说明，支持 Docker、Podman 等多种运行时。

#### Scenario: 切换容器运行时显示不同内容
- **WHEN** 用户点击不同的容器运行时 Tab
- **THEN** 面板 SHALL 显示对应容器运行时的拉取命令和配置说明

#### Scenario: Docker 显示 docker 命令
- **WHEN** 用户选择 Docker Tab
- **THEN** 面板 SHALL 显示 `docker pull` 和 `docker run` 命令

#### Scenario: Podman 显示 podman 命令
- **WHEN** 用户选择 Podman Tab
- **THEN** 面板 SHALL 显示 `podman pull` 和 `podman run` 命令

#### Scenario: 强调 OCI 兼容性
- **WHEN** 用户查看任何容器运行时 Tab
- **THEN** 说明 SHALL 强调镜像符合 OCI 标准，兼容所有主流容器运行时

## ADDED Requirements

### Requirement: 镜像源选择区域

Container 落地页面 SHALL 使用 Tabs 组件展示不同镜像源的拉取命令和配置说明。

#### Scenario: 切换镜像源显示不同内容
- **WHEN** 用户点击不同的镜像源 Tab
- **THEN** 面板 SHALL 显示对应镜像源的拉取命令和配置说明

#### Scenario: Docker Hub 显示公共镜像命令
- **WHEN** 用户选择 Docker Hub Tab
- **THEN** 面板 SHALL 显示镜像拉取命令和基本运行命令

#### Scenario: Azure ACR 显示认证说明
- **WHEN** 用户选择 Azure ACR Tab
- **THEN** 面板 SHALL 显示登录命令、拉取命令和认证配置说明

#### Scenario: 阿里云 ACR 显示认证说明
- **WHEN** 用户选择阿里云 ACR Tab
- **THEN** 面板 SHALL 显示登录命令、拉取命令和认证配置说明

## ADDED Requirements

### Requirement: 快速启动区域

Container 落地页面 SHALL 使用 Tabs 组件展示单容器部署、Docker Compose 部署和 Podman 部署的步骤说明。

#### Scenario: 切换部署方式显示不同步骤
- **WHEN** 用户点击不同的部署方式 Tab
- **THEN** 面板 SHALL 显示对应部署方式的分步骤说明

#### Scenario: 单容器部署显示基本命令
- **WHEN** 用户选择单容器部署 Tab
- **THEN** 面板 SHALL 显示容器运行命令和参数说明
- **AND** 包含数据持久化配置示例

#### Scenario: Docker Compose 部署显示配置文件
- **WHEN** 用户选择 Docker Compose 部署 Tab
- **THEN** 面板 SHALL 显示 docker-compose.yml 配置文件内容
- **AND** 包含启动和停止命令

#### Scenario: Podman 部署显示 podman 命令
- **WHEN** 用户选择 Podman 部署 Tab
- **THEN** 面板 SHALL 显示 podman 命令和参数说明
- **AND** 注明与 Docker 命令的兼容性

## ADDED Requirements

### Requirement: 常见问题区域

Container 落地页面 SHALL 使用可折叠的 FAQ 列表展示常见问题和答案，包括容器运行时相关的问题。

#### Scenario: FAQ 列表包含容器运行时问题
- **WHEN** 用户查看 FAQ 区域
- **THEN** SHALL 显示以下问题：
  - 容器版本和 Desktop 版本有什么区别？
  - 支持哪些容器运行时？
  - Docker 和 Podman 命令有什么区别？
  - 如何更新容器？
  - 如何配置数据持久化？
  - 支持哪些系统架构？
  - 如何查看容器日志？
  - 容器启动失败怎么办？

#### Scenario: FAQ 可折叠展开
- **WHEN** 用户点击 FAQ 问题
- **THEN** 答案 SHALL 展开显示
- **AND** 再次点击可收起答案

## MODIFIED Requirements

### Requirement: 链接配置

链接管理系统 SHALL 支持容器落地页面的链接配置，使用 `container` 作为链接键名。

#### Scenario: 获取容器页面链接
- **WHEN** 调用 `getLink('container')` 函数
- **THEN** 返回当前环境对应的容器落地页面 URL

#### Scenario: 链接在不同环境下正确解析
- **WHEN** 在开发环境中获取链接
- **THEN** 返回 `http://localhost:4322/container/`
- **WHEN** 在生产环境中获取链接
- **THEN** 返回 `https://hagicode.com/container/`

## MODIFIED Requirements

### Requirement: 主站 Install Button 组件

主站 Install Button 组件的容器链接 SHALL 指向容器落地页面。

#### Scenario: 容器链接指向落地页面
- **WHEN** 用户点击主站 Install Button 的容器选项
- **THEN** 浏览器导航至 `/container/` 落地页面

#### Scenario: 链接文本使用通用术语
- **WHEN** Install Button 渲染容器链接
- **THEN** 链接文本 SHALL 显示 "容器部署" 或 "Container 部署"
- **AND** 不应仅使用 "Docker" 等特定运行时名称

## MODIFIED Requirements

### Requirement: 文档站 Install Button 组件

文档站 Install Button 组件 SHALL 同时提供容器落地页链接和 Docker Compose 文档链接。

#### Scenario: 显示两个容器相关选项
- **WHEN** 用户点击文档站 Install Button 的下拉菜单
- **THEN** 菜单中 SHALL 包含 "容器部署"（落地页）和 "Docker Compose 部署"（文档）两个选项

#### Scenario: 两个选项链接到不同页面
- **WHEN** 用户点击 "容器部署"
- **THEN** 导航至主站容器落地页面
- **WHEN** 用户点击 "Docker Compose 部署"
- **THEN** 导航至文档站 Docker Compose 部署文档
