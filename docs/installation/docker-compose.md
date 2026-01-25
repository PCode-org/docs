---
title: Docker Compose 部署
description: 使用 Docker Compose 一键部署完整的 Hagicode 系统
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker Compose 部署

本指南介绍如何使用 Docker Compose 一键部署完整的 Hagicode 系统。这是**推荐的部署方式**，适合大多数用户，特别是开发、测试和生产环境。

:::note Docker Compose Builder
Docker Compose Builder 现在作为独立工具提供，地址：[https://hagicode-org.github.io/docker-compose-builder/](https://hagicode-org.github.io/docker-compose-builder/)。它提供相同的功能，并定期更新和改进用户体验。
:::

:::info 使用配置生成器
**推荐使用 [Docker Compose Builder (独立站点)](https://hagicode-org.github.io/docker-compose-builder/)**！

通过简单的表单填写，即可快速生成符合您需求的 `docker-compose.yml` 配置文件。生成器支持：
- 自定义端口、容器名称等基础配置
- 选择内置数据库或外部数据库
- 自动配置 Windows/Linux 平台差异
- 智能处理文件权限问题
- **镜像源选择**：支持 Docker Hub（默认）和 Azure Container Registry (ACR) 镜像源

[🚀 立即使用生成器 →](https://hagicode-org.github.io/docker-compose-builder/)
:::

:::tip 推荐方式
Docker Compose 部署是首选的安装方式，具有以下优势：
- 环境隔离，避免依赖冲突
- 一键启动所有服务（PostgreSQL + Hagicode）
- 易于管理和维护
- 适合快速体验和测试
:::

## 前置要求

在开始之前，请确保您的系统已安装 Docker 和 Docker Compose。

### 安装 Docker

<Tabs>
  <TabItem value="win" label="Windows">
    下载并安装 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)

    安装完成后，确保 Docker Desktop 正在运行。
  </TabItem>
  <TabItem value="mac" label="macOS">
    下载并安装 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)

    安装完成后，确保 Docker Desktop 正在运行。
  </TabItem>
  <TabItem value="linux" label="Linux">
    使用您的包管理器安装 Docker：

```bash title="在 Ubuntu/Debian 上安装 Docker"
sudo apt-get update
sudo apt-get install docker.io docker-compose-plugin
```

安装完成后，启动 Docker 服务：

```bash
sudo systemctl start docker
sudo systemctl enable docker
```
  </TabItem>
</Tabs>

### 验证安装

安装完成后，运行以下命令验证 Docker 和 Docker Compose 是否正确安装：

```bash
docker --version
docker compose version
```

## 快速开始

### 1. 生成 Docker Compose 配置文件

:::tip 使用配置生成器
**推荐使用 [Docker Compose Builder (独立站点)](https://hagicode-org.github.io/docker-compose-builder/)** 来生成您的配置文件。

生成器支持：
- 多种 API 提供商选择（智谱 AI、Anthropic 官方、自定义 API）
- 自动配置 API URL 和 Token
- 自定义端口、容器名称等基础配置
- 选择内置数据库或外部数据库
- 自动配置 Windows/Linux 平台差异
- 智能处理文件权限问题

[🚀 立即使用生成器 →](https://hagicode-org.github.io/docker-compose-builder/)
:::

1. 打开 [Docker Compose Builder (独立站点)](https://hagicode-org.github.io/docker-compose-builder/)
2. 根据您的需求填写配置：
   - 选择 API 提供商（智谱 AI、Anthropic 官方或自定义）
   - 配置端口、数据库、工作目录等选项
   - **选择镜像源**：根据您的网络环境选择合适的镜像源
3. 点击生成按钮，获取 `docker-compose.yml` 配置
4. 将生成的配置保存为 `docker-compose.yml` 文件
5. 如果需要，创建 `.env` 文件配置敏感信息

#### 镜像源选择

生成器支持两个镜像源选项：

**Docker Hub（推荐）**
- **镜像地址**：`newbe36524/hagicode:{tag}`
- **适用场景**：适合支持 Docker Hub 镜像加速的用户
- **优点**：官方镜像源，更新及时，访问稳定
- **注意事项**：部分地区可能需要配置镜像加速器

**Azure Container Registry (ACR)**
- **镜像地址**：`hagicode.azurecr.io/hagicode:{tag}`
- **适用场景**：适合本地网络无法访问 Docker Hub 的用户
- **优点**：提供备选镜像源，解决网络访问问题
- **注意事项**：镜像与 Docker Hub 保持同步，但可能存在短暂延迟

:::tip 镜像源选择建议
- **首选 Docker Hub**：如果您的网络环境可以访问 Docker Hub，建议优先使用 Docker Hub 镜像源
- **备选 ACR**：仅在 Docker Hub 访问困难或不稳定时，选择 ACR 镜像源
- **镜像同步**：ACR 镜像与 Docker Hub 保持同步，通常延迟在 1 小时内
- **版本一致性**：两个镜像源的镜像标签保持一致，不用担心版本问题
:::

:::info 获取 API Token
您需要配置 Claude API Token 才能使用 Hagicode：

**智谱 AI（推荐）**：[获取 API Token →](https://www.bigmodel.cn/claude-code?ic=14BY54APZA)
- 国内访问稳定，响应更快
- 性价比高，适合日常使用

**Anthropic 官方**：[获取 API Token →](https://console.anthropic.com/)
- 直接使用 Anthropic 的服务
:::

### 2. 启动服务

在 `docker-compose.yml` 所在目录执行以下命令：

```bash
docker compose up -d
```

此命令将：
- 下载并启动 PostgreSQL 容器
- 下载并启动 Hagicode 应用容器
- 创建并配置网络
- 初始化数据库连接

### 3. 验证服务状态

检查容器是否正在运行：

```bash
docker compose ps
```

您应该看到两个容器都处于 "running" 状态。

查看服务日志：

```bash
# 查看所有服务日志
docker compose logs

# 查看 Hagicode 服务日志
docker compose logs hagicode

# 实时跟踪日志
docker compose logs -f hagicode
```

## 配置说明

如需修改配置（如更改端口、切换 API 提供商等），您可以：

1. 重新使用 [Docker Compose Builder (独立站点)](https://hagicode-org.github.io/docker-compose-builder/) 生成新配置
2. 手动编辑 `docker-compose.yml` 和 `.env` 文件
3. 重启服务使配置生效：

```bash
docker compose restart
```

## 访问应用

### Web 界面

服务启动成功后，通过浏览器访问：

```
http://localhost:45000
```

### 数据库连接

如果您需要直接连接到 PostgreSQL 数据库，可以通过 `docker exec` 命令进入容器：

```bash
# 进入 PostgreSQL 容器并连接到数据库
docker exec -it hagicode-postgres psql -U postgres -d hagicode
```

**容器内连接信息**：
- **主机**: `localhost` 或 `127.0.0.1`（容器内）
- **端口**: `5432`（PostgreSQL 默认端口）
- **用户名**: `postgres`
- **密码**: `postgres`
- **数据库**: `hagicode`

:::tip
PostgreSQL 未暴露到主机端口，这样更安全且避免端口冲突。如需从主机访问数据库，请使用 `docker exec` 命令。
:::

## 后续步骤

现在您已经成功部署了 Hagicode，请继续[创建第一个项目](/docs/quick-start/create-first-project)以开始使用。

如果您更喜欢使用软件包方式部署，请参阅[软件包部署指南](/docs/installation/package-deployment)。
