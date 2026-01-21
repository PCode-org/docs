# Change: 首页展示项目活跃度数据

## Why

当前 Hagicode 文档站点首页无法向用户直观展示项目的活跃程度和使用情况（如 Docker Hub 镜像下载量、活跃用户数、活跃会话数等）。缺乏这些动态数据指标，用户难以快速了解 Hagicode 的社区活跃度和可信度。

通过在首页展示项目活跃度数据，可以：
1. 增强用户对项目的信心
2. 展示社区规模和增长趋势
3. 提供透明的项目健康度指标

## What Changes

- 在首页 Hero Section 下方新增 ActivityMetricsSection 组件，展示项目活跃度数据
- 创建 GitHub Actions 定时工作流，自动获取并更新活跃度数据
- 添加 Docker Hub Pull 数量统计（通过 Docker Hub API）
- 添加 Microsoft Clarity 活跃用户和活跃会话统计（通过 Clarity Data Export API）
- 数据以 JSON 格式存储在 `src/data/activity-metrics.json`，由 GitHub Actions 定期更新并自动创建 PR

## UI 设计变更

### 新增活跃度指标卡片区域

在 Hero Section 和 FeaturesShowcase 之间插入新的 ActivityMetricsSection 组件。

```
┌─────────────────────────────────────────────────────────────────┐
│                         Hero Section                              │
│                    (现有标题、描述、按钮)                          │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    活跃度数据指标                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│   │             │    │             │    │             │        │
│   │   🐳        │    │   👥       │    │   💬        │        │
│   │             │    │             │    │             │        │
│   │  Docker Hub │    │  活跃用户    │    │  活跃会话   │        │
│   │             │    │             │    │             │        │
│   │  12,345     │    │   1,234     │    │   456       │        │
│   │  Pulls      │    │  过去3天    │    │  当前数量   │        │
│   │             │    │             │    │             │        │
│   └─────────────┘    └─────────────┘    └─────────────┘        │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Features Showcase                             │
│                   (现有功能展示区域)                              │
└─────────────────────────────────────────────────────────────────┘
```

### 活跃度指标卡片设计

每个指标卡片包含：
- **图标**：使用 emoji 表示数据类型
- **标题**：数据指标名称（Docker Hub / 活跃用户 / 活跃会话）
- **数值**：当前数据值
- **说明**：数据含义（Pulls / 过去3天 / 当前数量）

### 交互效果

- 卡片悬停时显示边框高亮效果
- 使用 CSS 渐变边框与首页其他卡片保持一致
- 响应式布局：桌面端 3 列，平板端 2 列，移动端 1 列

### 加载状态

- 数据从静态 JSON 文件读取，无加载延迟
- 若数据文件不存在或格式错误，显示占位符或隐藏该指标

## 代码流程变更

### 数据更新流程图

```mermaid
flowchart TD
    A["GitHub Actions 定时触发<br/>每日 UTC 00:00"] --> B[检出代码]
    B --> C[配置 Git 用户信息]
    C --> D["Docker Hub API<br/>获取 Pull 数量"]
    C --> E["Microsoft Clarity API<br/>获取用户/会话数据"]
    D --> F["生成 activity-metrics.json"]
    E --> F
    F --> G["创建新分支<br/>update-activity-metrics-{timestamp}"]
    G --> H[提交数据文件]
    H --> I[推送分支]
    I --> J["创建 Pull Request"]
    J --> K{"PR 是否存在?"}
    K -->|"是"| L["关闭旧 PR"]
    K -->|"否"| M[完成]
    L --> M
```

### 数据获取序列图

```mermaid
sequenceDiagram
    participant GA as GitHub Actions
    participant DH as Docker Hub API
    participant CL as Clarity API
    participant FS as 文件系统

    GA->>DH: GET /v2/repositories/hagicode/hagicode
    DH-->>GA: {"pull_count": 12345}

    GA->>CL: GET /metrics?dateRange=3DAYS
    CL-->>GA: {"users": 1234, "sessions": 456}

    GA->>GA: 合并数据
    GA->>FS: 写入 src/data/activity-metrics.json
```

### 组件数据流图

```mermaid
flowchart LR
    A[activity-metrics.json<br/>静态数据文件] --> B[ActivityMetricsSection<br/>React 组件]
    B --> C[渲染三个指标卡片]

    subgraph "GitHub Actions 自动更新"
        D[定时触发] --> E[获取 API 数据]
        E --> F[更新 JSON 文件]
        F --> G[创建 PR]
    end

    G -.定时更新.-> A
```

## Impact

- **影响范围**: 首页布局、新增数据目录、GitHub Actions 工作流
- **新增文件**:
  - `src/components/home/ActivityMetricsSection.tsx`
  - `src/components/home/activityMetricsSection.module.css`
  - `src/data/activity-metrics.json`
  - `.github/workflows/update-activity-metrics.yml`
  - `scripts/update-activity-metrics.js`
- **修改文件**:
  - `src/pages/index.tsx` - 添加 ActivityMetricsSection 组件
- **依赖新增**:
  - 需要配置 GitHub Secrets: `DOCKER_HUB_USERNAME`、`DOCKER_HUB_PASSWORD`、`CLARITY_API_KEY`
- **数据源**:
  - Docker Hub API (无需认证即可获取公开数据)
  - Microsoft Clarity Data Export API (需要 API Key)
