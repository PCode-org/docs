# Docker Compose Anthropic API Support

## Overview

扩展 Docker Compose 生成器以支持 Anthropic API Token 配置，提供多种 API 提供商选项，并移除文档中硬编码的部署配置。

## Problem

当前 Docker Compose 生成器存在以下限制：

1. **单一 API 提供商**：仅支持智谱 AI API Key，用户无法选择官方 Anthropic API 或其他自定义 API
2. **配置入口分散**：Token 配置与 Docker 部署配置耦合，缺乏统一的 API 配置体验
3. **硬编码部署配置**：文档中包含固定的 Docker Compose 配置示例，维护成本高且容易过时
4. **用户体验问题**：缺乏清晰的 API 提供商选择指导和环境变量说明

## Solution

### 1. Anthropic API Token 多提供商支持

在 Docker Compose 生成器中添加 API 提供商选择功能，统一使用 `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_URL` 的配置方式：

| 提供商选项 | 环境变量配置 | 配置方式 |
|-----------|-------------|---------|
| Anthropic 官方 | `ANTHROPIC_AUTH_TOKEN` | 用户输入官方 API token |
| 智谱 AI（默认） | `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_URL` | 预设 ZAI API URL，用户输入 token |
| 自定义 API | `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_URL` | 用户输入自定义 URL 和 token |
| 主机配置 | 自动检测 | 从挂载的配置文件读取 |

**核心变更**：统一使用 `ANTHROPIC_AUTH_TOKEN` 环境变量，不再使用单独的 `ZAI_API_KEY`。不同提供商通过 `ANTHROPIC_URL` 区分（官方 API 可省略 URL）。

### 2. 统一 Token 配置界面

重构 API 密钥配置部分：

- 统一使用 "Anthropic API Token" 作为主要配置项
- 添加 API 提供商选择下拉菜单
- 根据选择的提供商动态显示：
  - **Anthropic 官方**：仅显示 Token 输入框
  - **智谱 AI**：显示 Token 输入框，预设 ZAI API URL
  - **自定义 API**：显示 Token 和 URL 两个输入框
  - **主机配置**：显示挂载路径配置
- 默认使用智谱 AI（向后兼容）

### 3. 移除硬编码部署配置

- 清理文档中的固定 Docker Compose 示例
- 添加引导语，引导用户使用生成器动态生成配置
- 更新安装文档，强化生成器作为配置入口

## Scope

### In Scope

1. 修改 Docker Compose 生成器组件，添加 API 提供商选择功能
2. 更新环境变量生成逻辑，统一使用 `ANTHROPIC_AUTH_TOKEN`，根据需要添加 `ANTHROPIC_URL`
3. 更新 UI 文案和用户指导
4. 清理文档中的硬编码 Docker Compose 配置
5. 添加 API 提供商说明和使用指导
6. 支持主机配置选项（挂载配置文件）
7. 移除 `ZAI_API_KEY` 相关的独立环境变量说明

### Out of Scope

1. 后端 API 配置验证逻辑（不在前端文档站点范围内）
2. 新的 API 提供商集成（如需要后端支持）
3. 现有部署配置的破坏性变更（保持向后兼容）

## Impact

### 用户体验

- **更灵活的 API 选择**：用户可根据需求选择不同的 API 提供商
- **简化的配置流程**：统一的配置入口，清晰的步骤指导
- **更好的可发现性**：通过生成器引导用户完成配置

### 维护性

- **降低维护成本**：移除硬编码配置，减少文档更新需求
- **统一配置源**：生成器成为配置的唯一真实来源
- **向后兼容**：现有用户配置不受影响

### 技术债务

- 清理技术债务：移除硬编码的部署配置
- 建立清晰的配置管理模式

## Dependencies

- 无外部依赖
- 需要确保现有 Docker Compose 生成器功能不受影响

## Risks

1. **UI 复杂度增加**：添加提供商选择可能增加界面复杂度
   - 缓解措施：保持默认选项不变，仅在需要时显示额外选项

2. **向后兼容性**：现有用户可能依赖当前配置方式
   - 缓解措施：保持智谱 AI 为默认选项，不破坏现有流程

3. **文档更新遗漏**：可能存在未被发现的硬编码配置
   - 缓解措施：全面搜索并验证所有相关文档

## Success Criteria

1. Docker Compose 生成器支持选择 API 提供商
2. 生成的配置统一使用 `ANTHROPIC_AUTH_TOKEN` 环境变量
3. 智谱 AI 和自定义 API 提供商自动生成 `ANTHROPIC_URL`
4. 用户界面清晰易懂，包含必要的说明和引导
5. 文档中不再包含硬编码的 Docker Compose 部署配置
6. 现有功能不受影响，向后兼容
7. 不再使用 `ZAI_API_KEY` 作为独立环境变量
