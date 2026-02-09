# 实施任务清单

## 概述

本文档列出了实现主动飞书通知机制的具体实施任务。

**核心方案**：在关键 GitHub Actions 工作流中直接调用组织共用的 **haginotifier** 可重用工作流发送飞书通知。

**重要说明**：使用 `HagiCode-org/haginotifier` 组织共用的通知方案，无需创建新的通知工作流文件。

## 任务列表

### 阶段 1：准备和验证

- [ ] **1.1 验证 haginotifier 可用性**
  - 确认 haginotifier 仓库可访问：`HagiCode-org/haginotifier`
  - 验证可重用 workflow 的调用方式
  - 检查支持的输入参数和 secrets
  - **预期结果**：了解 haginotifier 的完整用法
  - **验证方式**：查看 haginotifier 仓库文档

- [ ] **1.2 配置飞书 Webhook URL**
  - 在目标飞书群中添加自定义机器人
  - 获取 Webhook URL
  - 在仓库设置中添加 Secret：`FEISHU_WEBHOOK_URL`
  - **预期结果**：Secret 配置完成
  - **验证方式**：GitHub 仓库 Settings > Secrets and variables > Actions

- [ ] **1.3 测试 haginotifier 调用**
  - 创建测试 workflow 验证 haginotifier 调用
  - 测试成功通知
  - 测试失败通知
  - **预期结果**：确认 haginotifier 调用方式正确
  - **验证方式**：手动运行测试 workflow，检查飞书群消息

- [ ] **1.4 分析现有工作流结构**
  - 列出所有现有 GitHub Actions 工作流
  - 识别需要添加通知的关键工作流
  - 分析每个工作流的结构和依赖关系
  - **预期结果**：明确需要修改的工作流清单
  - **验证方式**：代码审查

### 阶段 2：设计通知消息模板

- [ ] **2.1 设计通用通知消息格式**
  - 设计通知消息模板结构
  - 包含关键信息：状态、仓库、分支、触发者、运行详情
  - 支持成功和失败状态的不同展示
  - **预期结果**：消息模板设计完成
  - **验证方式**：查看 haginotifier 支持的消息格式

- [ ] **2.2 为不同工作流定制消息**
  - 为 Deploy 工作流设计专用消息模板
  - 为 Version Monitor 工作流设计专用消息模板
  - **预期结果**：每个工作流有专属的通知消息
  - **验证方式**：模板文档审查

### 阶段 3：集成到 Deploy 工作流

- [ ] **3.1 分析 Deploy 工作流结构**
  - 查看当前 `.github/workflows/deploy.yml`
  - 理解现有的 job 依赖关系
  - 确定添加通知步骤的位置
  - **预期结果**：明确修改点
  - **验证方式**：代码审查

- [ ] **3.2 添加成功通知**
  - 在 deploy.yml 中添加 `notify-success` 作业
  - 直接调用 `HagiCode-org/haginotifier/.github/workflows/notify.yml@main`
  - 配置 `needs: [build, deploy]` 依赖
  - 配置 `if: success()` 条件
  - **预期结果**：成功通知作业添加完成
  - **验证方式**：代码审查

  ```yaml
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
  ```

- [ ] **3.3 添加失败通知**
  - 在 deploy.yml 中添加 `notify-failure` 作业
  - 直接调用 `HagiCode-org/haginotifier/.github/workflows/notify.yml@main`
  - 配置 `needs: [build, deploy]` 依赖
  - 配置 `if: failure()` 条件
  - **预期结果**：失败通知作业添加完成
  - **验证方式**：代码审查

- [ ] **3.4 测试 Deploy 工作流通知**
  - 触发 Deploy 工作流
  - 验证成功时收到通知
  - 验证失败时收到通知（可临时引入错误）
  - **预期结果**：两种场景的通知都能正常发送
  - **验证方式**：检查飞书群消息

### 阶段 4：集成到 Version Monitor 工作流

- [ ] **4.1 分析 Version Monitor 工作流结构**
  - 查看当前 `.github/workflows/version-monitor.yml`
  - 理解监控逻辑和 PR 创建流程
  - 确定添加通知的时机
  - **预期结果**：明确修改点
  - **验证方式**：代码审查

- [ ] **4.2 添加版本检测通知**
  - 为版本变化检测添加通知
  - 直接调用 `HagiCode-org/haginotifier/.github/workflows/notify.yml@main`
  - 区分发现新版本和未发现新版本
  - **预期结果**：版本检测通知添加完成
  - **验证方式**：代码审查

  ```yaml
  notify-version-update:
    needs: monitor
    if: steps.monitor.outputs.pr_created == 'true'
    uses: HagiCode-org/haginotifier/.github/workflows/notify.yml@main
    with:
      message_type: 'post'
      message: |
        ## Version Monitor

        **状态**: 🔄 发现新版本
        **新版本**: ${{ steps.monitor.outputs.new_version }}
        **仓库**: ${{ github.repository }}
        **PR 链接**: ${{ steps.monitor.outputs.pr_url }}
    secrets:
      FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
  ```

- [ ] **4.3 添加监控失败通知**
  - 为监控失败添加通知
  - 直接调用 `HagiCode-org/haginotifier/.github/workflows/notify.yml@main`
  - 包含错误信息摘要
  - **预期结果**：失败通知添加完成
  - **验证方式**：代码审查

- [ ] **4.4 测试 Version Monitor 工作流通知**
  - 手动触发 Version Monitor 工作流
  - 验证各种场景的通知
  - **预期结果**：所有场景的通知都能正常发送
  - **验证方式**：检查飞书群消息

### 阶段 5：优化和测试

- [ ] **5.1 优化通知消息格式**
  - 使用富文本格式（post）提升可读性
  - 添加状态图标和颜色
  - 优化链接和按钮
  - **预期结果**：通知消息清晰美观
  - **验证方式**：查看飞书群消息效果

- [ ] **5.2 添加通知去重逻辑**
  - 避免短时间内的重复通知
  - 配置通知频率限制（如需要）
  - **预期结果**：减少不必要的通知噪音
  - **验证方式**：测试频繁触发场景

- [ ] **5.3 测试各种边界情况**
  - 测试 Webhook URL 无效
  - 测试网络超时
  - 测试 haginotifier 服务不可用
  - **预期结果**：所有边界情况都有合理的错误处理
  - **验证方式**：模拟各种故障场景

- [ ] **5.4 添加通知开关配置**
  - 支持通过环境变量或配置文件控制通知开关
  - 允许在特定环境（如 PR）禁用通知
  - **预期结果**：灵活的通知控制
  - **验证方式**：测试不同配置下的通知行为

- [ ] **5.5 性能优化**
  - 确保通知步骤不增加显著的工作流执行时间
  - 优化消息构建逻辑
  - **预期结果**：通知步骤轻量高效
  - **验证方式**：检查工作流执行时间

### 阶段 6：文档和部署

- [ ] **6.1 更新项目文档**
  - 在 README 中添加通知机制说明
  - 记录如何配置新的通知
  - 说明如何获取和配置 Webhook URL
  - **预期结果**：文档完整清晰
  - **验证方式**：文档审查

- [ ] **6.2 创建使用指南**
  - 编写如何在其他仓库中使用此通知机制的指南
  - 提供配置示例
  - 列出常见问题和解决方案
  - **预期结果**：便于其他仓库复用
  - **验证方式**：按照指南在新仓库中测试

- [ ] **6.3 创建 Pull Request**
  - 提交所有变更到新分支
  - 创建详细的 PR 描述
  - 包含通知效果截图
  - **预期结果**：PR 创建成功
  - **验证方式**：PR 审查

- [ ] **6.4 部署到生产环境**
  - 合并 PR 到主分支
  - 验证生产环境通知功能
  - 监控通知发送情况
  - **预期结果**：生产环境通知正常工作
  - **验证方式**：触发实际工作流并检查通知

### 阶段 7：验证和监控

- [ ] **7.1 验证完整通知流程**
  - 触发 Deploy 工作流，检查通知
  - 触发 Version Monitor 工作流，检查通知
  - 验证所有关键信息都包含在通知中
  - **预期结果**：完整的通知流程验证通过
  - **验证方式**：实际工作流测试

- [ ] **7.2 监控通知效果**
  - 观察通知发送频率
  - 收集团队反馈
  - 调整通知策略（如需要）
  - **预期结果**：通知机制满足团队需求
  - **验证方式**：团队反馈和持续监控

- [ ] **7.3 建立通知维护流程**
  - 定期检查 haginotifier 更新
  - 维护 Webhook URL 有效性
  - 记录通知异常情况
  - **预期结果**：可持续维护的通知系统
  - **验证方式**：建立维护检查清单

## 实施注意事项

### 开发原则

1. **非侵入性**：通知步骤不应影响现有工作流的正常执行
2. **可配置性**：支持通过配置控制通知行为
3. **可复用性**：设计为可在其他仓库中复用
4. **错误隔离**：通知失败不影响主工作流状态

### 安全考虑

1. **Secret 保护**：Webhook URL 存储在 GitHub Secrets 中
2. **日志安全**：避免在日志中输出敏感信息
3. **权限最小化**：仅授予通知步骤必要的权限

### 回滚计划

如果部署后发现严重问题：
1. 删除或注释掉通知步骤
2. 不影响现有工作流功能
3. 重新部署即可回滚

### 已知限制

1. **通知延迟**：工作流完成后可能有几秒到几分钟的延迟
2. **消息长度限制**：飞书消息有长度限制，需要控制消息大小
3. **Webhook 稳定性**：依赖飞书 Webhook 服务的稳定性

## 预计工时

- 阶段 1：1-2 小时
- 阶段 2：0.5-1 小时（设计消息模板）
- 阶段 3：1-2 小时
- 阶段 4：1-2 小时
- 阶段 5：2-3 小时
- 阶段 6：1 小时
- 阶段 7：持续进行

**总计**：约 6-10 小时（不含持续监控）

**说明**：由于使用组织共用的 haginotifier，无需创建新的通知工作流，相比原计划节省约 2-3 小时。
