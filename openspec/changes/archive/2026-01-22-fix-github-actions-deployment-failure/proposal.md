# Change: 修复 Update Activity Metrics 工作流失败

## Why

Hagicode Documentation 的 **Update Activity Metrics** GitHub Actions 工作流在最近的执行中失败，导致无法自动更新首页的活动指标数据（Docker Hub 拉取次数、Clarity 活跃用户等）。

### 背景分析

**工作流**: `.github/workflows/update-activity-metrics.yml`
**触发方式**: 每天 UTC 00:00 定时运行，或手动触发
**功能**: 获取 Docker Hub 和 Microsoft Clarity 的活动数据，更新 `data/activity-metrics.json`，并自动创建 PR

### 失败影响

1. **数据过期**: 首页显示的活动指标数据无法自动更新
2. **PR 阻塞**: 自动创建的指标更新 PR 失败，新数据无法合并
3. **监控失效**: 无法通过 GitHub Actions Summary 查看最新指标

### 可能的根因（待日志确认）

- Docker Hub API 端点或认证方式变更
- Microsoft Clarity API 调用失败（密钥过期、API 限制）
- `scripts/update-activity-metrics.js` 脚本中的数据处理逻辑错误
- GitHub Token 权限不足
- 环境变量配置问题（Secrets 未正确设置）

## What Changes

### 修复 `scripts/update-activity-metrics.js` 脚本

- 分析并修复脚本中的具体错误
- 改进错误处理，添加 API 调用失败时的回退机制
- 添加更详细的日志输出便于调试

### 优化 `.github/workflows/update-activity-metrics.yml`

- 验证 GitHub Actions 权限配置是否正确
- 确保所有必需的环境变量/Secrets 已配置
- 添加更好的错误处理步骤，即使失败也能输出有用的诊断信息

### 验证环境配置

- 检查 GitHub Repository Secrets 是否完整：
  - `CLARITY_API_KEY`
  - `HAGICODE_CLARITY_PROJECT_ID`
  - `GITHUB_TOKEN`（自动提供）
- 验证 Docker Hub 仓库信息是否正确

## Impact

### 影响的规格
- `update-activity-metrics-workflow` - 修复指标更新工作流
- `activity-metrics-script` - 改进脚本健壮性

### 影响的文件/目录
- **修改**: `scripts/update-activity-metrics.js` - 修复错误和改进错误处理
- **可能修改**: `.github/workflows/update-activity-metrics.yml` - 添加调试步骤或调整配置
- **输出**: `data/activity-metrics.json` - 更新的指标数据文件

### 预期成果
- Update Activity Metrics 工作流能够成功执行
- 自动创建 PR 更新 `data/activity-metrics.json`
- GitHub Actions Summary 显示最新的活动指标
- 即使部分 API 失败，工作流也能部分成功或提供清晰的错误信息

## Risks & Mitigations

| 风险 | 缓解措施 |
|------|----------|
| API 端点已废弃或认证方式变更 | 查看官方文档，使用最新的 API 端点和认证方式 |
| Secrets 配置错误或过期 | 验证 GitHub Repository Secrets 配置，更新过期密钥 |
| 修复可能引入新的 bug | 本地测试脚本逻辑，验证后再部署 |
| Docker Hub API 限流 | 添加重试逻辑和合理的延迟 |

## Status

**Draft** (待审核)

## Related

- 工作流配置: `.github/workflows/update-activity-metrics.yml`
- 指标脚本: `scripts/update-activity-metrics.js`
- 部署工作流: `.github/workflows/deploy.yml`（不受影响）
- 失败日志: [Azure Blob Storage 链接](https://productionresultssa19.blob.core.windows.net/actions-results/f86d3047-86c3-4c91-9ea0-da9339aa9d18/workflow-job-run-ed942b20-cb15-553e-aeb7-8db08f1452bf/logs/job/job-logs.txt?rsct=text%2Fplain&se=2026-01-22T02%3A19%3A38Z&sig=IXteoEm%2F3g%2B8JNZv%2BFV2Z6vrjJKB%2FX6im7Br6ucEUMs%3D&ske=2026-01-22T02%3A32%3A35Z&skoid=ca7593d4-ee42-46cd-af88-8b886a2f84eb&sks=b&skt=2026-01-22T01%3A32%3A35Z&skv=2025-11-05&sp=r&spr=https&sr=b&st=2026-01-22T02%3A09%3A33Z&sv=2025-11-05)
