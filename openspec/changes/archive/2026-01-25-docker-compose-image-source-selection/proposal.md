# Change: Docker Compose 镜像源选择功能

## 元数据

- **变更 ID**: `docker-compose-image-source-selection`
- **状态**: Proposed
- **创建时间**: 2026-01-25
- **作者**: AI Assistant

## 概述

为 Docker Compose 生成器添加镜像源选择功能，支持用户在 Docker Hub 和 Azure Container Registry (ACR) 之间选择适合的镜像源。该功能将提升不同网络环境下用户的部署体验，解决 Docker Hub 访问受限问题。

### 问题陈述

当前 Docker Compose 生成器存在以下限制：

1. **单一镜像源依赖**：仅支持 Docker Hub (`newbe36524/hagicode`)
2. **网络访问受限**：部分地区的用户无法稳定访问 Docker Hub
3. **缺少备选方案**：当 Docker Hub 镜像拉取失败时，用户无法快速切换到其他镜像源
4. **用户体验不一致**：支持 Docker Hub 镜像加速的用户与无法访问的用户缺少差异化配置选项

这些问题导致：
- 部署失败率高（特别是中国大陆用户）
- 用户需要手动修改配置文件更换镜像源
- 增加支持成本和用户挫败感
- 无法利用已同步到 ACR 的镜像资源

### 解决方案概述

在 Docker Compose 生成器中增加镜像源选择功能：

1. **添加镜像源选项**：提供 Docker Hub 和 ACR 两个镜像源选项
2. **默认配置保持兼容**：继续使用 Docker Hub 作为默认镜像源
3. **用户界面优化**：添加清晰的下拉选择框和说明文字
4. **自动镜像地址替换**：根据选择的镜像源自动生成对应的镜像地址

## 范围

### 包含范围

1. **Docker Compose 生成器页面增强**
   - 在 `src/pages/docker-compose-generator.tsx` 中添加镜像源选择功能
   - 更新类型定义，添加 `ImageRegistry` 类型
   - 在 UI 中添加镜像源下拉选择框

2. **镜像源配置**
   - 支持 Docker Hub 镜像源（默认）：`newbe36524/hagicode:{tag}`
   - 支持 ACR 镜像源：`hagicode.azurecr.io/hagicode:{tag}`
   - 每个选项包含清晰的说明文字

3. **YAML 生成逻辑更新**
   - 根据选择的镜像源动态生成镜像地址
   - 保持生成的 YAML 文件格式一致性

4. **用户界面更新**
   - 在生成器表单中添加镜像源选择区域
   - 提供镜像源说明和网络环境建议
   - 更新实时预览以反映镜像源变化

5. **文档更新**
   - 更新 `docs/installation/docker-compose.md` 文档
   - 添加镜像源选择的说明和最佳实践

### 排除范围

1. **Docker Hub 镜像加速配置**（用户自行配置 Docker daemon）
2. **ACR 镜像的持续同步**（已有自动化流程）
3. **镜像源健康检查**（不包含实时可用性检测）
4. **其他镜像源支持**（仅支持 Docker Hub 和 ACR）
5. **已有配置迁移**（不提供旧配置自动迁移工具）

### 受影响组件

- **`src/pages/docker-compose-generator.tsx`**: Docker Compose 生成器页面
- **`src/pages/docker-compose-generator.module.css`**: 生成器样式（可能需要微调）
- **`docs/installation/docker-compose.md`**: Docker Compose 部署文档

## 成功标准

1. **功能完整性**
   - 用户可以在生成器界面选择镜像源
   - 生成的 YAML 文件使用正确的镜像地址
   - 默认选择为 Docker Hub（保持向后兼容）

2. **用户体验**
   - 镜像源选项有清晰的说明文字
   - 用户了解何时选择哪个镜像源
   - 界面保持简洁，不增加使用复杂度

3. **文档质量**
   - 文档清晰说明镜像源选择的最佳实践
   - 说明 ACR 镜像与 Docker Hub 的同步关系
   - 提供网络环境选择的指导

4. **向后兼容性**
   - 现有用户无需修改配置（默认行为不变）
   - 生成的 YAML 文件格式保持一致
   - 不破坏现有部署流程

## 影响分析

### 收益

1. **提升部署成功率**
   - 无法访问 Docker Hub 的用户可以选择 ACR 镜像源
   - 减少因网络问题导致的部署失败

2. **改善用户体验**
   - 用户可根据网络环境选择最优镜像源
   - 提供灵活的部署选项
   - 降低支持成本

3. **充分利用资源**
   - 利用已同步的 ACR 镜像资源
   - 提供镜像源的冗余保障

4. **为未来扩展做准备**
   - 建立镜像源选择的框架
   - 未来可轻松添加更多镜像源选项

### 风险

1. **ACR 镜像同步延迟**
   - **风险**：ACR 镜像可能与 Docker Hub 存在同步延迟
   - **缓解措施**：在文档中说明镜像源同步关系，建议用户优先选择 Docker Hub，仅在无法访问时选择 ACR

2. **用户选择困惑**
   - **风险**：用户可能不清楚应该选择哪个镜像源
   - **缓解措施**：提供清晰的说明文字和网络环境建议，明确推荐顺序

3. **镜像版本一致性**
   - **风险**：两个镜像源的版本标签可能不一致
   - **缓解措施**：确保镜像同步流程包含版本标签同步，在文档中说明版本对应关系

### 破坏性变更

无 - 这是纯功能性增强，保持向后兼容。

### 迁移路径

不适用 - 现有配置无需迁移。

## 依赖关系

### 外部依赖

- **ACR 镜像同步**：依赖现有的 GitHub Actions 工作流（`sync-docker-acr.yml`）
- **ACR 镜像可用性**：确保 ACR 中的镜像是最新的且可访问

### 内部依赖

- 现有 `docker-compose-generator.tsx` 的配置生成逻辑
- 现有的 YAML 生成函数 `generateYAML()`
- 现有的表单状态管理

### 相关变更

- `openspec/changes/archive/2026-01-25-github-actions-docker-acr-sync/`: ACR 镜像同步自动化
- `openspec/changes/archive/2026-01-20-docker-compose-generator-page/`: 原始生成器页面创建

## 实现说明

### 镜像源配置定义

```typescript
type ImageRegistry = 'docker-hub' | 'azure-acr';

interface RegistryConfig {
  id: ImageRegistry;
  name: string;
  description: string;
  imagePrefix: string;
  recommended: boolean;
  networkAdvice: string;
}

const REGISTRIES: Record<ImageRegistry, RegistryConfig> = {
  'docker-hub': {
    id: 'docker-hub',
    name: 'Docker Hub',
    description: 'Docker 官方镜像源，推荐使用',
    imagePrefix: 'newbe36524/hagicode',
    recommended: true,
    networkAdvice: '适合支持 Docker Hub 镜像加速的用户'
  },
  'azure-acr': {
    id: 'azure-acr',
    name: 'Azure Container Registry',
    description: '备选镜像源，与 Docker Hub 保持同步',
    imagePrefix: 'hagicode.azurecr.io/hagicode',
    recommended: false,
    networkAdvice: '适合本地网络无法访问 Docker Hub 的用户'
  }
};
```

### YAML 生成逻辑变更

修改 `generateYAML()` 函数中的镜像地址生成部分：

```typescript
// 原来（固定使用 Docker Hub）:
lines.push(`    image: newbe36524/hagicode:${config.imageTag}`);

// 修改后（根据选择的镜像源动态生成）:
const imagePrefix = REGISTRIES[config.imageRegistry].imagePrefix;
lines.push(`    image: ${imagePrefix}:${config.imageTag}`);
```

### UI 组件结构

在生成器表单中添加镜像源选择区域：

```
┌─────────────────────────────────────────────────────┐
│ 镜像源选择                                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  镜像源 *                                            │
│  ┌───────────────────────────────────────────┐     │
│  │ Docker Hub（推荐）              ▼         │     │
│  └───────────────────────────────────────────┘     │
│  ✓ Docker 官方镜像源                                │
│   适合支持 Docker Hub 镜像加速的用户                │
│                                                     │
│  [切换到 ACR 镜像源]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 默认配置

```typescript
const defaultConfig: DockerComposeConfig = {
  // ... 其他现有配置
  imageRegistry: 'docker-hub', // 新增：默认使用 Docker Hub
  // ...
};
```

## 替代方案

### 替代方案 1：仅添加文档说明手动修改

**方法**：在文档中说明如何手动修改 `docker-compose.yml` 更换镜像源

**拒绝理由**：
- 用户体验差，需要手动编辑配置文件
- 容易出现配置错误
- 无法提供实时预览和验证
- 不符合用户友好的设计理念

### 替代方案 2：自动检测镜像源可用性

**方法**：在生成器中添加镜像源健康检查，自动选择可用的镜像源

**拒绝理由**：
- 增加实现复杂度
- 可能引发跨域访问问题
- 健康检查结果可能随时间变化，导致不一致
- 用户明确知道自己的网络环境，无需自动检测

### 替代方案 3：支持多个镜像源同时配置

**方法**：在生成的 YAML 中配置多个镜像源，Docker 自动选择

**拒绝理由**：
- Docker Compose 不支持原生多镜像源配置
- 需要额外的脚本或工具实现
- 增加配置复杂度和维护成本
- 可能导致镜像版本不一致

## 未决问题

1. **ACR 镜像访问权限**
   - **问题**：ACR 镜像是否需要登录凭据？
   - **假设**：ACR 镜像为公共访问，无需凭据。如果需要凭据，将增加配置复杂度

2. **镜像同步频率**
   - **问题**：ACR 与 Docker Hub 的镜像同步频率和延迟是多少？
   - **假设**：已有自动化同步流程，延迟在可接受范围内（小时级别）

3. **镜像标签一致性**
   - **问题**：ACR 和 Docker Hub 的镜像标签是否完全一致？
   - **假设**：镜像同步流程确保所有标签（包括 `latest`）保持一致

4. **镜像源选择持久化**
   - **问题**：是否需要保存用户的镜像源选择偏好？
   - **决策**：使用 LocalStorage 保存用户选择，提升用户体验

## 参考

- Docker Compose 生成器页面：`src/pages/docker-compose-generator.tsx`
- Docker Compose 部署文档：`docs/installation/docker-compose.md`
- ACR 同步工作流：`.github/workflows/sync-docker-acr.yml`
- OpenSpec 指南：`openspec/AGENTS.md`
- 设计指南：`openspec/PROPOSAL_DESIGN_GUIDELINES.md`
