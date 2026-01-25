## 1. 准备与验证

- [ ] 1.1 阅读 docker-compose-builder 项目的 `.github/workflows/deploy.yml` 文件,理解新部署方式
- [ ] 1.2 验证当前 `.github/workflows/deploy.yml` 工作流配置
- [ ] 1.3 确认 GitHub Pages 当前设置状态(Source 为 "Deploy from a branch",分支为 `gh-pages`)
- [ ] 1.4 备份当前工作流文件(保存为 `.github/workflows/deploy.yml.backup`)

## 2. 创建新工作流配置

- [ ] 2.1 重写 `.github/workflows/deploy.yml`,采用双 job 结构
  - [ ] 2.1.1 配置 `build` job:包含 checkout, setup Node.js, install dependencies, build steps
  - [ ] 2.1.2 添加 `Upload artifact` step,使用 `actions/upload-pages-artifact@v3`
  - [ ] 2.1.3 配置 `deploy` job:添加 `needs: build` 依赖
  - [ ] 2.1.4 添加 `environment: github-pages` 配置,包含 deployment URL 输出
  - [ ] 2.1.5 添加 `Deploy to GitHub Pages` step,使用 `actions/deploy-pages@v4`
- [ ] 2.2 更新 permissions 配置
  - [ ] 2.2.1 将 `contents: write` 改为 `contents: read`
  - [ ] 2.2.2 保持 `pages: write` 和 `id-token: write` 不变
- [ ] 2.3 调整 concurrency 配置
  - [ ] 2.3.1 将 `cancel-in-progress: true` 改为 `cancel-in-progress: false`
- [ ] 2.4 更新 Node.js 版本
  - [ ] 2.4.1 从 `node-version: "24"` 调整为 `node-version: "20"` (与 docker-compose-builder 保持一致)
- [ ] 2.5 保持构建命令和环境变量不变
  - [ ] 2.5.1 继续使用 `npm ci` 和 `npm run build`
  - [ ] 2.5.2 继续传递 `CLARITY_PROJECT_ID` secret

## 3. 更新 GitHub Pages 设置

- [ ] 3.1 导航到 GitHub 仓库 Settings → Pages
- [ ] 3.2 将 Source 从 "Deploy from a branch" 改为 "GitHub Actions"
- [ ] 3.3 保存设置并确认变更
- [ ] 3.4 验证 Pages 配置界面显示 "GitHub Actions is building and deploying"

## 4. 触发部署并验证

- [ ] 4.1 提交新工作流文件到 `main` 分支(或创建 PR 测试)
- [ ] 4.2 在 GitHub Actions tab 中验证 workflow 触发
- [ ] 4.3 检查 `build` job 日志,确认构建成功
- [ ] 4.4 检查 `upload artifact` step,确认 `./build` 目录正确上传
- [ ] 4.5 检查 `deploy` job 日志,确认部署成功
- [ ] 4.6 验证 GitHub Pages 环境正确显示 deployment URL
- [ ] 4.7 在浏览器中访问部署 URL,确认站点正常显示
- [ ] 4.8 验证所有页面链接正常,无 404 错误
- [ ] 4.9 验证静态资源(CSS, JS, images)正确加载

## 5. 功能回归测试

- [ ] 5.1 验证 Clarity 分析功能正常工作
- [ ] 5.2 验证所有文档页面可正常访问
- [ ] 5.3 验证侧边栏导航正确显示
- [ ] 5.4 验证搜索功能正常工作
- [ ] 5.5 验证主页 activity metrics 正确显示
- [ ] 5.6 验证所有 Mermaid 图表正确渲染
- [ ] 5.7 验证响应式设计在不同屏幕尺寸下正常工作

## 6. 清理与文档更新

- [ ] 6.1 等待新部署稳定运行至少 24 小时
- [ ] 6.2 删除远程 `gh-pages` 分支(可选)
  - [ ] 6.2.1 通过 GitHub Web UI 或 git 命令删除远程分支
  - [ ] 6.2.2 验证删除后站点仍正常工作
- [ ] 6.3 更新 `openspec/project.md` 中的部署说明章节
  - [ ] 6.3.1 更新 "GitHub Actions CI/CD" 章节
  - [ ] 6.3.2 移除对 `gh-pages` 分支的引用
  - [ ] 6.3.3 添加新 GitHub Pages 设置说明
  - [ ] 6.3.4 更新权限要求说明
  - [ ] 6.3.5 更新部署流程描述
- [ ] 6.4 删除备份文件 `.github/workflows/deploy.yml.backup`(可选)
- [ ] 6.5 运行 `npm run typecheck` 确保无 TypeScript 错误
- [ ] 6.6 运行 `npm run build` 确保本地构建成功

## 7. 完成验证

- [ ] 7.1 验证 GitHub Actions workflow 历史显示绿色 ✓
- [ ] 7.2 验证 GitHub Pages deployment history 显示成功部署
- [ ] 7.3 使用 `openspec validate simplify-github-pages-deployment --strict` 验证 proposal
- [ ] 7.4 确认所有 checklist 项目已完成
- [ ] 7.5 更新 `proposal.md` status 为 "ExecutionCompleted"
- [ ] 7.6 准备归档 proposal(在部署稳定后)
