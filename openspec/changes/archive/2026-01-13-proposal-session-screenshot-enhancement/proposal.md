# Change: 添加新建 Proposal 会话的截图到文档中

## Why

当前 `docs/quick-start/proposal-session.md` 文档为纯文本内容，包含 ASCII 文本框模拟 UI 界面和 Mermaid 流程图，但缺乏实际操作界面的可视化截图支持。用户难以直观理解 PCode 提案会话的实际操作界面和工作流程。

项目已在 `static/img/create-proposal-session/` 目录下准备了 26 张截图，涵盖完整的提案会话工作流程。将这些截图应用到文档中可以显著提升用户体验，提供更清晰的视觉参考。

## What Changes

- **在 `docs/quick-start/proposal-session.md` 文档的相应章节添加 26 张截图**
  - 阶段 0：初始化（3 张截图）
  - 阶段 1：优化中（2 张截图）
  - 阶段 2：草稿（1 张截图）
  - 阶段 3：生成中（2 张截图）
  - 阶段 4：审查（10 张截图）
  - 阶段 5：执行中（1 张截图）
  - 阶段 6：执行完成（2 张截图）
  - 阶段 7-8：归档（4 张截图）
  - 生命周期展示（1 张截图）

- **使用 Docusaurus MDX 图片语法**
  ```
  ![图片描述](/img/create-proposal-session/文件名.png)
  ```

- **保留现有的 Mermaid 流程图和 ASCII 文本框**
  - 截图作为补充，不替代现有内容
  - 提供多种形式的文档展示方式

## UI Design Changes

不涉及 UI 界面变更，仅更新文档内容。

## Code Flow Changes

不涉及代码流程变更，仅更新文档内容。

## Impact

- **影响的规范**：无（仅文档更新）
- **影响的代码**：`docs/quick-start/proposal-session.md`
- **影响范围**：文档内容更新，不影响技术架构
- **用户体验提升**：用户可通过实际界面截图快速理解操作流程
- **文档完整性**：补充纯文字描述的不足，提供视觉参考
- **维护一致性**：遵循项目文档风格（参考 `docs/quick-start/installation.md` 和 `create-first-project.md` 的图片使用方式）

## Success Criteria

- [x] 所有 26 张截图正确插入到文档对应章节
- [x] 图片路径正确且可访问（`/img/create-proposal-session/`）
- [x] 图片描述清晰且与上下文相关
- [x] 文档在本地构建成功，图片正常显示
- [x] 文档结构保持清晰，不影响可读性
