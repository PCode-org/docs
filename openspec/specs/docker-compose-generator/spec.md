# docker-compose-generator Specification

## Purpose
TBD - created by archiving change docker-compose-image-source-selection. Update Purpose after archive.
## Requirements
### Requirement: 镜像源选择功能

Docker Compose 生成器 SHALL 提供镜像源选择功能，允许用户在 Docker Hub 和 Azure Container Registry (ACR) 之间选择适合的镜像源。

#### Scenario: 用户选择 Docker Hub 镜像源

- **WHEN** 用户在 Docker Compose 生成器中选择" Docker Hub"作为镜像源
- **THEN** 生成的 docker-compose.yml 文件中的镜像地址为 `newbe36524/hagicode:{tag}`
- **AND** 生成的配置包含"Docker 官方镜像源"的说明注释
- **AND** YAML 文件格式与现有生成格式保持一致

#### Scenario: 用户选择 ACR 镜像源

- **WHEN** 用户在 Docker Compose 生成器中选择"Azure Container Registry"作为镜像源
- **THEN** 生成的 docker-compose.yml 文件中的镜像地址为 `hagicode.azurecr.io/hagicode:{tag}`
- **AND** 生成的配置包含"ACR 镜像源，与 Docker Hub 同步"的说明注释
- **AND** YAML 文件格式与 Docker Hub 镜像源生成的格式一致

#### Scenario: 默认镜像源为 Docker Hub

- **WHEN** 用户首次打开 Docker Compose 生成器页面
- **THEN** 镜像源选择器默认选中"Docker Hub"
- **AND** 生成的 YAML 预览使用 Docker Hub 镜像地址
- **AND** 界面显示 Docker Hub 为推荐选项

---

### Requirement: 镜像源配置信息展示

Docker Compose 生成器 SHALL 为每个镜像源选项提供清晰的配置信息和使用建议，帮助用户根据自身网络环境选择合适的镜像源。

#### Scenario: 显示镜像源说明文字

- **WHEN** 用户查看镜像源选择器
- **THEN** Docker Hub 选项显示"Docker 官方镜像源，推荐使用"
- **AND** ACR 选项显示"备选镜像源，与 Docker Hub 保持同步"
- **AND** 每个选项的说明文字清晰可读

#### Scenario: 显示网络环境建议

- **WHEN** 用户查看镜像源选择器
- **THEN** Docker Hub 选项显示网络环境建议："适合支持 Docker Hub 镜像加速的用户"
- **AND** ACR 选项显示网络环境建议："适合本地网络无法访问 Docker Hub 的用户"
- **AND** 建议文字帮助用户做出正确选择

#### Scenario: 标记推荐镜像源

- **WHEN** 用户查看镜像源选择器
- **THEN** Docker Hub 选项显示"推荐"标记
- **AND** ACR 选项不显示推荐标记
- **AND** 推荐标记醒目但不干扰用户选择

---

### Requirement: 镜像源选择实时预览

Docker Compose 生成器 SHALL 在用户切换镜像源时，实时更新 YAML 预览中的镜像地址。

#### Scenario: 切换镜像源时更新预览

- **WHEN** 用户在镜像源选择器中切换选项
- **THEN** YAML 预览区域立即更新镜像地址
- **AND** 更新延迟不超过 100 毫秒
- **AND** 其他配置项保持不变

#### Scenario: 预览镜像地址格式正确

- **WHEN** 用户选择任意镜像源并查看 YAML 预览
- **THEN** 镜像地址格式为 `{imagePrefix}:{tag}`
- **AND** 镜像标签与用户配置的 `imageTag` 一致
- **AND** 镜像地址前后无多余空格或换行

---

### Requirement: 用户选择持久化

Docker Compose 生成器 SHALL 使用 LocalStorage 保存用户的镜像源选择，在用户下次访问时自动恢复。

#### Scenario: 保存用户选择的镜像源

- **WHEN** 用户在镜像源选择器中选择一个选项
- **THEN** 选择结果保存到浏览器的 LocalStorage
- **AND** 保存的键名为 `docker-compose-image-registry`
- **AND** 保存值为镜像源 ID（`docker-hub` 或 `azure-acr`）

#### Scenario: 恢复用户上次选择的镜像源

- **WHEN** 用户再次打开 Docker Compose 生成器页面
- **AND** LocalStorage 中存在保存的镜像源选择
- **THEN** 镜像源选择器自动恢复为上次选择的值
- **AND** YAML 预览使用恢复的镜像源配置
- **AND** 界面加载时无闪烁或延迟

#### Scenario: 首次访问使用默认值

- **WHEN** 用户首次访问 Docker Compose 生成器页面
- **AND** LocalStorage 中不存在保存的镜像源选择
- **THEN** 镜像源选择器使用默认值（Docker Hub）
- **AND** 不会将默认值写入 LocalStorage，直到用户主动选择

#### Scenario: LocalStorage 不可用时降级处理

- **WHEN** 浏览器不支持或禁用 LocalStorage
- **THEN** 生成器正常工作，使用默认镜像源（Docker Hub）
- **AND** 不显示错误提示或警告
- **AND** 功能不受影响（仅无法持久化选择）

---

### Requirement: 镜像源文档说明

Docker Compose 部署文档 SHALL 包含镜像源选择的详细说明和最佳实践指导。

#### Scenario: 文档说明镜像源区别

- **WHEN** 用户阅读 Docker Compose 部署文档
- **THEN** 文档包含"Docker Hub"和"ACR"两个镜像源的说明
- **AND** 说明每个镜像源的特点和适用场景
- **AND** 解释 ACR 镜像与 Docker Hub 的同步关系

#### Scenario: 文档提供镜像源选择指导

- **WHEN** 用户阅读 Docker Compose 部署文档
- **THEN** 文档包含"如何选择镜像源"部分
- **AND** 提供明确的决策建议（优先 Docker Hub，无法访问时选择 ACR）
- **AND** 说明网络环境对镜像源选择的影响

#### Scenario: 文档更新生成器使用说明

- **WHEN** 用户阅读 Docker Compose 部署文档中的生成器使用部分
- **THEN** 说明包含镜像源选择步骤
- **AND** 展示镜像源选择器的界面截图或示例
- **AND** 说明默认镜像源为 Docker Hub

