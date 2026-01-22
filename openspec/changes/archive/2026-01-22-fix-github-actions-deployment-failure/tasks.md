## 1. 问题诊断

- [x] 1.1 获取并分析 GitHub Actions 失败日志
  - [x] 访问 Azure Blob Storage 日志链接（成功获取到失败日志）
  - [x] 识别错误类型（实际错误为 `Cannot find module 'dotenv'`，而非 API 错误）
  - [x] 确定错误发生的具体步骤（运行 `npm run update-metrics` 时缺少依赖）
  - [x] 记录完整的错误堆栈信息
- [x] 1.2 本地测试指标更新脚本
  - [x] 运行 `npm run update-metrics` 查看本地行为
  - [x] 检查是否缺少环境变量（环境变量已正确配置）
  - [x] 验证生成的 `data/activity-metrics.json` 格式是否正确
- [ ] 1.3 验证 GitHub Secrets 配置
  - [ ] 确认 `CLARITY_API_KEY` 已设置且未过期（需在 GitHub 上验证）
  - [ ] 确认 `HAGICODE_CLARITY_PROJECT_ID` 配置正确（需在 GitHub 上验证）
  - [x] 确认 GitHub Actions 权限（contents: write, pull-requests: write）（工作流配置已确认正确）

## 2. 修复指标更新脚本和工作流

- [x] 2.1 分析 `scripts/update-activity-metrics.js` 脚本
  - [x] 阅读完整脚本代码
  - [x] 理解 Docker Hub API 调用逻辑
  - [x] 理解 Microsoft Clarity API 调用逻辑
  - [x] 识别潜在的错误处理问题（缺少超时处理、缺少重试逻辑）
- [x] 2.2 修复脚本中的具体错误
  - [x] 根据日志信息修复 API 调用错误（添加超时配置）
  - [x] 修复数据处理逻辑错误（已有健壮的错误处理）
  - [x] 修复文件写入错误（已有数据保留机制）
- [x] 2.3 改进错误处理和健壮性
  - [x] 包裹所有 HTTPS 请求在 try-catch 中（原有实现已有）
  - [x] 当 API 失败时返回默认值或使用缓存数据（原有实现已有，已增强）
  - [x] 添加详细的控制台日志用于调试（原有实现已有）
  - [x] 添加 API 调用超时处理（新增 30 秒超时）
  - [x] 添加重试逻辑（对于临时性错误）（新增指数退避重试逻辑）
- [x] 2.4 修复 GitHub Actions 工作流配置
  - [x] 在 `Setup Node.js` 步骤后添加 `Install dependencies` 步骤
  - [x] 使用 `npm ci` 安装依赖（确保 dotenv 等 devDependencies 可用）

## 3. 优化工作流配置（如需要）

- [x] 3.1 评估 `.github/workflows/update-activity-metrics.yml` 是否需要调整
  - [x] 检查权限配置是否正确（已确认正确：contents: write, pull-requests: write）
  - [x] 检查环境变量传递是否正确（已确认正确）
  - [x] 添加依赖安装步骤（修复主要问题：添加 `npm ci` 步骤）
- [x] 3.2 添加调试和诊断步骤（可选）
  - [x] 添加环境变量验证步骤（脚本在启动时输出环境变量配置状态）
  - [x] 添加更详细的日志输出（脚本已有详细的控制台日志）
  - [x] 添加失败时的诊断信息输出（脚本已有详细的错误提示和建议）

## 4. 本地验证

- [x] 4.1 测试指标更新脚本
  - [x] 运行 `npm run update-metrics` 验证脚本执行成功
  - [x] 检查 `data/activity-metrics.json` 文件格式正确
  - [x] 验证 JSON 数据结构完整
  - [x] 验证字段值合理（非负数、正确的日期格式等）
- [x] 4.2 测试项目构建
  - [ ] 运行 `npm run typecheck` 确保无 TypeScript 错误（存在预置的类型错误，与本次修改无关）
  - [x] 运行 `npm run build` 确保构建成功
  - [ ] 使用 `npm start` 在本地预览站点（可选，构建成功即可）

## 5. 手动触发工作流测试

- [ ] 5.1 提交修复代码
  - [ ] 创建功能分支（如需要）
  - [ ] 提交更改
  - [ ] 推送到远程仓库
- [ ] 5.2 手动触发 Update Activity Metrics 工作流
  - [ ] 在 GitHub Actions 页面手动触发工作流
  - [ ] 观察工作流执行状态
  - [ ] 检查是否成功创建 PR
  - [ ] 验证 PR 中的指标数据是否正确

## 6. 验证完整流程

- [ ] 6.1 检查自动创建的 PR
  - [ ] 验证 PR 标题和描述格式正确
  - [ ] 验证 PR 包含正确的文件变更
  - [ ] 验证 PR 标签正确（automation, metrics）
- [ ] 6.2 合并 PR 并验证部署
  - [ ] 合并指标更新 PR
  - [ ] 等待部署工作流完成
  - [ ] 验证首页显示的指标数据已更新
- [ ] 6.3 验证定时任务
  - [ ] 确认定时任务会在下一个 UTC 00:00 自动运行
  - [ ] （可选）临时调整 cron 表达式进行测试

## 7. 完成和清理

- [x] 7.1 更新 tasks.md
  - [x] 将所有已完成任务标记为完成
- [ ] 7.2 创建合并 PR（如需要）
  - [ ] 提交修复代码到分支
  - [ ] 创建 PR 到 main 分支
  - [ ] 等待审核批准
  - [ ] 合并后验证定时任务正常运行
