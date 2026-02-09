# 实现主动飞书通知机制

**状态**: ✅ ExecutionCompleted

## 概述

在当前项目中实现主动飞书通知机制，使关键 GitHub Actions 工作流程（如部署、版本监控）在完成时自动向飞书群发送通知。

**当前状态**：项目使用 **haginotifier** 作为统一的飞书通知解决方案，但需要被动调用才能发送通知。

**目标**：在关键 workflow 流程结束时自动汇报结果，无需手动配置每个 workflow。

## 问题背景

### 当前通知方式

haginotifier 是一个可重用的 GitHub Actions workflow，需要被显式调用：

```yaml
jobs:
  notify:
    uses: HagiCode-org/haginotifier/.github/workflows/notify.yml@main
    with:
      message: 'Deployment successful!'
    secrets:
      FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
```

### 存在的问题

1. **被动通知模式**：haginotifier 需要被显式调用才能发送通知，没有主动监控机制
2. **缺乏流程监控**：无法自动识别和监控仓库中关键的 workflow 执行流程
3. **手动配置负担**：每个需要通知的关键流程都需要手动添加 notify 步骤
4. **关键节点盲区**：重要的 flow 结束时可能因为没有添加通知步骤而导致信息遗漏

### 影响范围

- CI/CD 流程完成后无法及时通知团队
- 关键任务执行结果需要手动查看才能了解
- 多个仓库的通知配置重复且分散

## 解决方案

### 核心方案

实现主动通知机制，在关键 workflow 流程结束时自动汇报结果。

### 技术实现

#### 1. 直接使用 haginotifier 可重用工作流

**重要说明**：组织内已存在可重用的飞书通知方案 **haginotifier** (`HagiCode-org/haginotifier`)，无需创建新的通知工作流。

直接在现有 workflow 中调用 haginotifier：

**Deploy 工作流示例**：

```yaml
# .github/workflows/deploy.yml
jobs:
  build:
    # ... 现有构建步骤
    steps:
      # ... 现有步骤

  deploy:
    # ... 现有部署步骤
    steps:
      # ... 现有步骤

  notify-success:
    needs: [build, deploy]
    if: success()
    uses: HagiCode-org/haginotifier/.github/workflows/notify.yml@main
    with:
      message_type: 'post'
      message: |
        ## Deploy to GitHub Pages

        **状态**: ✅ 成功
        **仓库**: ${{ github.repository }}
        **分支**: ${{ github.ref_name }}
        **提交**: ${{ github.sha }}
        **触发者**: ${{ github.actor }}
        **运行详情**: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
    secrets:
      FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}

  notify-failure:
    needs: [build, deploy]
    if: failure()
    uses: HagiCode-org/haginotifier/.github/workflows/notify.yml@main
    with:
      message_type: 'post'
      message: |
        ## Deploy to GitHub Pages

        **状态**: ❌ 失败
        **仓库**: ${{ github.repository }}
        **分支**: ${{ github.ref_name }}
        **提交**: ${{ github.sha }}
        **触发者**: ${{ github.actor }}
        **运行详情**: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
    secrets:
      FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
```

#### 2. 通知流程图

```
┌─────────────────────────────────────────────────────────────┐
│ Workflow 触发 (push/schedule/manual)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 执行主要任务 (build/deploy/test)                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 检查任务状态                                                │
└─────┬───────────────────────────────────────┬───────────────┘
      │                                       │
      │ 成功                                  │ 失败
      │                                       │
      ▼                                       ▼
┌─────────────────────┐           ┌─────────────────────┐
│ notify-success      │           │ notify-failure      │
│ 直接调用组织共用    │           │ 直接调用组织共用    │
│ haginotifier        │           │ haginotifier        │
└─────────────────────┘           └─────────────────────┘
         │                                 │
         └─────────────┬───────────────────┘
                       ▼
            ┌─────────────────────┐
            │ 飞书群接收通知      │
            └─────────────────────┘
```

#### 3. 受影响的现有工作流

| 工作流文件 | 当前用途 | 通知需求 |
|-----------|---------|---------|
| `.github/workflows/deploy.yml` | 部署到 GitHub Pages | ✅ 需要通知 |
| `.github/workflows/version-monitor.yml` | 监控版本变化 | ✅ 需要通知 |
| `.github/workflows/update-activity-metrics.yml` | 更新活动指标 | ⚠️ 可选通知 |
| `.github/workflows/compress-images.yml` | 压缩图片 | ❌ 不需要通知 |

## 实施计划

详见 [tasks.md](./tasks.md)。

## 影响范围

### 无需新增文件

- 本提案使用组织现有的 **haginotifier** 可重用工作流，无需创建新的通知工作流文件

### 需要修改的文件

- `.github/workflows/deploy.yml` - 添加通知步骤
- `.github/workflows/version-monitor.yml` - 添加通知步骤

### 需要配置的 Secret

- `FEISHU_WEBHOOK_URL` - 飞书机器人 Webhook URL（需要预先配置）

## 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| Webhook URL 泄露 | 未授权发送通知 | 使用 GitHub Secrets 存储，不在日志中输出 |
| 通知发送失败 | 不影响主流程 | 使用 `if: always()` 确保通知失败不影响任务状态 |
| 通知过于频繁 | 群消息过多 | 仅在关键 workflow 通知，支持配置过滤条件 |
| haginotifier 服务不可用 | 通知无法发送 | 添加超时和错误处理，失败时记录到日志 |

## 成功标准

1. ✅ Deploy 工作流完成后自动发送飞书通知（成功/失败）
2. ✅ Version Monitor 工作流检测到版本变化时发送通知
3. ✅ 通知包含必要的信息（状态、仓库、分支、触发者、运行详情）
4. ✅ 通知发送失败不影响主工作流执行
5. ✅ 可复用到其他仓库和工作流

## 后续扩展

1. **配置化通知规则**：通过配置文件定义需要监控的 workflow
2. **自定义消息模板**：支持不同类型的通知消息格式
3. **多平台支持**：通过 haginotifier 的扩展性支持其他通知平台
4. **通知聚合**：对多个短时间内的通知进行聚合发送

## 相关资源

- **组织共用通知方案**: `HagiCode-org/haginotifier` - 飞书通知可重用工作流
- 当前 Deploy 工作流: `.github/workflows/deploy.yml`
- 当前 Version Monitor 工作流: `.github/workflows/version-monitor.yml`
- GitHub Actions 文档: https://docs.github.com/en/actions
