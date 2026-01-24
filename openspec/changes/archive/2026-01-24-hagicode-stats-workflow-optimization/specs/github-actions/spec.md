## ADDED Requirements

### Requirement: 固定统计更新分支

系统 SHALL 使用固定的分支名称 `metrics-update` 用于首页统计数据的更新工作流。

#### Scenario: 每次工作流运行使用固定分支
- **WHEN** GitHub Actions 工作流运行以更新首页统计数据
- **THEN** 系统创建或重用名称为 `metrics-update` 的分支
- **AND** 避免创建带有时间戳或随机标识符的临时分支

#### Scenario: 分支名称一致性
- **WHEN** 查看仓库的分支列表
- **THEN** 统计更新工作流只使用一个固定的 `metrics-update` 分支
- **AND** 无 `update-activity-metrics-*` 格式的临时分支

### Requirement: 强制推送策略

系统 SHALL 使用强制推送策略确保统计更新分支的内容始终是最新的完整数据。

#### Scenario: 删除旧分支后强制推送
- **WHEN** 工作流运行时检测到远程仓库已存在 `metrics-update` 分支
- **THEN** 系统先删除远程 `metrics-update` 分支
- **AND** 然后使用 `--force-with-lease` 强制推送本地修改

#### Scenario: 直接强制推送新分支
- **WHEN** 工作流运行时远程仓库不存在 `metrics-update` 分支
- **THEN** 系统直接创建新分支并强制推送

#### Scenario: 确保数据一致性
- **WHEN** 统计数据更新后
- **THEN** 远程 `metrics-update` 分支的内容完全反映最新的统计数据
- **AND** 无历史提交的增量积累

### Requirement: 工作流优化

系统 SHALL 优化 GitHub Actions 工作流以支持固定分支和强制推送策略。

#### Scenario: 分支管理逻辑
- **WHEN** 执行统计更新工作流
- **THEN** 工作流包含以下步骤:
  - 检查并删除旧的远程 `metrics-update` 分支(如果存在)
  - 创建或重置本地 `metrics-update` 分支
  - 提交最新的统计数据
  - 使用 `--force-with-lease` 强制推送到远程

#### Scenario: PR 管理保持不变
- **WHEN** 工作流完成统计数据更新
- **THEN** 系统关闭旧的 PR 并创建新的 PR
- **AND** PR 始终从 `metrics-update` 分支合并到 `main` 分支
- **AND** PR 包含完整的指标变化对比和摘要信息

### Requirement: 可追溯性保障

系统 SHALL 确保统计数据的变化历史可追溯,尽管使用强制推送策略。

#### Scenario: PR 历史记录
- **WHEN** 查看仓库的 PR 列表
- **THEN** 每个统计更新都有对应的 PR
- **AND** PR 包含完整的指标变化对比表格和摘要

#### Scenario: Main 分支历史
- **WHEN** 查看 `main` 分支的 `data/activity-metrics.json` 文件历史
- **THEN** 文件历史记录了所有统计数据的变更
- **AND** 可以通过 git log 查看每个版本的详细信息

### Requirement: 错误处理和稳定性

系统 SHALL 具备错误处理和稳定性保障机制。

#### Scenario: 远程分支删除失败
- **WHEN** 尝试删除远程 `metrics-update` 分支失败
- **THEN** 工作流继续执行后续步骤
- **AND** 强制推送可能会失败并报告错误

#### Scenario: 强制推送失败
- **WHEN** 使用 `--force-with-lease` 强制推送失败
- **THEN** 工作流报告失败原因
- **AND** 保留本地修改以便调试

#### Scenario: 工作流并发控制
- **WHEN** 多个统计更新工作流同时运行
- **THEN** 系统通过 `concurrency` 设置确保只有一个工作流执行
- **AND** 避免并发导致的分支和数据冲突

## MODIFIED Requirements

### Requirement: GitHub Actions 工作流配置

系统 SHALL 优化 `.github/workflows/update-activity-metrics.yml` 文件以实现上述要求。

#### Scenario: 使用固定分支名称
- **WHEN** 查看工作流配置
- **THEN** 分支创建步骤使用固定的 `metrics-update` 名称
- **AND** 不再使用 `update-activity-metrics-$(date +%s)` 格式

#### Scenario: 添加远程分支删除步骤
- **WHEN** 查看工作流配置
- **THEN** 在推送步骤之前添加删除远程分支的逻辑
- **AND** 使用 `git ls-remote` 检查分支是否存在

#### Scenario: 强制推送配置
- **WHEN** 查看工作流配置
- **THEN** 推送步骤使用 `--force-with-lease` 参数
- **AND** 明确指定分支名称为 `metrics-update`

#### Scenario: PR 创建配置
- **WHEN** 查看工作流配置
- **THEN** PR 创建步骤明确使用 `--head "metrics-update"` 而非变量
