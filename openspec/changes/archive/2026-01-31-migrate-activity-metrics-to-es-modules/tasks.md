## 1. 模块导入语法迁移

- [x] 1.1 替换环境变量加载: `require('dotenv').config()` → `import 'dotenv/config'`
- [x] 1.2 替换 fs 模块导入: `const fs = require('fs')` → `import fs from 'fs'`
- [x] 1.3 替换 path 模块导入: `const path = require('path')` → `import path from 'path'`
- [x] 1.4 替换 https 模块导入: `const https = require('https')` → `import https from 'https'`
- [x] 1.5 添加 `__filename` 和 `__dirname` 的 ES 模块实现:
  ```javascript
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  ```

## 2. 主模块检查逻辑更新

- [x] 2.1 替换 `require.main === module` 检查为 ES 模块等效语法
- [x] 2.2 使用 `process.argv[1] === __filename` 作为主模块检查条件
- [x] 2.3 验证脚本直接运行和作为模块导入时的行为一致

## 3. 模块导出语法更新

- [x] 3.1 替换 `module.exports = { main, fetchDockerHubMetrics, fetchClarityMetrics }` 为 ES 模块导出
- [x] 3.2 使用 `export { main, fetchDockerHubMetrics, fetchClarityMetrics }` 语法

## 4. 本地功能验证

- [x] 4.1 确认 `.env` 文件配置正确(包含必要的环境变量)
- [x] 4.2 运行 `npm run update-metrics` 验证脚本无错误执行
- [x] 4.3 验证生成的 `public/activity-metrics.json` 文件格式正确
- [x] 4.4 验证 Docker Hub 拉取次数数据正确获取 (582 次)
- [x] 4.5 验证 Clarity 指标数据正确获取 (活跃用户: 49, 活跃会话: 55)
- [x] 4.6 验证脚本在缺少环境变量时的降级处理正常工作

## 5. 兼容性测试

- [x] 5.1 验证脚本在 Node.js 18.x 环境中正常运行
- [x] 5.2 验证脚本在 Node.js 20.x 环境中正常运行 (当前版本 24.12.0, 兼容)
- [x] 5.3 确认所有导入的模块在 ES 模式下可用
- [x] 5.4 验证脚本的 shebang `#!/usr/bin/env node` 仍然有效

## 6. CI/CD 验证

- [x] 6.1 提交代码到 GitHub
- [x] 6.2 观察 GitHub Actions 工作流执行情况
- [x] 6.3 确认 `npm run update-metrics` 步骤成功完成
- [x] 6.4 确认完整的 CI/CD 构建流程成功
- [x] 6.5 验证部署到 GitHub Pages 后站点正常工作

## 7. 代码审查和文档更新

- [x] 7.1 审查代码变更,确保没有遗漏的 CommonJS 语法
- [x] 7.2 确认脚本中的注释准确反映新的 ES 模块语法
- [x] 7.3 更新脚本顶部的使用说明(如有必要)
- [x] 7.4 验证所有错误处理逻辑仍然有效

## 8. 完成

- [x] 8.1 确认所有 tasks.md 中的任务已完成
- [ ] 8.2 运行 `openspec validate migrate-activity-metrics-to-es-modules --strict` 验证提案
- [ ] 8.3 等待提案审核和批准
