# Change: 简化 GitHub Pages 部署流程

## Why

Hagicode 文档站当前通过 GitHub Actions 自动部署到 GitHub Pages 的 `gh-pages` 分支。这种部署方式依赖 `peaceiris/actions-gh-pages@v3` action 进行分支推送操作,虽然功能正常,但增加了仓库管理的复杂度:

- 需要维护额外的 `gh-pages` 分支,占用仓库存储空间
- Git 历史被分散在多个分支,不利于代码审查和历史追踪
- 部署流程依赖第三方 action 进行分支推送,增加维护依赖
- 每次部署需要完整的 git 推送操作,相对较慢

参考项目 `/home/newbe36524/repos/newbe36524/docker-compose-builder` 采用了更现代的部署方式,直接使用 GitHub Pages 的原生部署功能,无需独立的发布分支。这种方式更简洁、更符合 GitHub 推荐的最佳实践。

## What Changes

### 工作流优化

- **迁移到 GitHub Pages 原生部署**: 使用 `actions/upload-pages-artifact@v3` 和 `actions/deploy-pages@v4` 替代 `peaceiris/actions-gh-pages@v3`
- **移除 gh-pages 分支依赖**: 部署不再需要创建和维护 `gh-pages` 分支
- **优化工作流结构**: 采用分离的 build 和 deploy job,提升可维护性和并发性能
- **调整权限配置**: 从 `contents: write` 调整为 `contents: read`,保持 `pages: write` 和 `id-token: write`

### 实施细节

1. **调整 `.github/workflows/deploy.yml` 工作流配置**:
   - 替换部署 action: `peaceiris/actions-gh-pages@v3` → `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`
   - 重构为两个 job: `build` (构建并上传 artifact) 和 `deploy` (部署 artifact)
   - 添加 `github-pages` environment 配置
   - 调整 concurrency 设置: `cancel-in-progress: false`
   - 更新 permissions: `contents: read`, `pages: write`, `id-token: write`

2. **更新 GitHub Pages 配置**:
   - 在 GitHub 仓库设置中,将 Source 从 "Deploy from a branch" 改为 "GitHub Actions"
   - 确保 Pages 设置正确配置为使用 GitHub Actions 作为部署来源

3. **清理 gh-pages 分支**(可选,在部署成功后):
   - 删除远程 `gh-pages` 分支
   - 更新文档说明,移除对 gh-pages 分支的引用

## Impact

### 影响的规格

- `docusaurus-site` - 更新部署工作流需求,从分支推送模式改为 GitHub Pages 原生部署模式

### 影响的文件/目录

- **修改**: `.github/workflows/deploy.yml` - 完全重写工作流配置
- **更新**: `openspec/project.md` - 更新部署说明章节
- **可选删除**: 远程 `gh-pages` 分支(在验证新部署成功后)

### 预期成果

- **简化仓库结构**: 移除对 `gh-pages` 分支的依赖,减少维护成本和存储占用
- **保持部署自动化**: 继续在推送到 `main` 分支时自动触发部署
- **提升部署速度**: GitHub Pages 原生部署通常比分支推送更快
- **增强一致性**: 与 docker-compose-builder 等其他项目保持一致的部署方式
- **降低维护依赖**: 移除对第三方 action (`peaceiris/actions-gh-pages`) 的依赖
- **提升安全性**: 使用最小权限原则 (`contents: read` 而非 `write`)

### 兼容性

- **构建流程不变**: 仍然使用 `npm ci` → `npm run build` 生成静态站点
- **构建产物路径不变**: `./build` 目录(仅调整为上传 artifact 的路径配置)
- **触发条件不变**: 推送到 `main` 分支时自动部署
- **环境变量支持**: 继续支持 `CLARITY_PROJECT_ID` secret

### 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| GitHub Pages 设置配置错误 | 部署失败 | 提供详细的设置说明和验证步骤 |
| 权限配置不正确 | workflow 失败 | 明确列出所需权限并验证 |
| 与现有 workflow 冲突 | 并发问题 | 使用 `concurrency: group: "pages"` 控制 |
| 部署产物路径错误 | 空白部署 | 验证 Docusaurus 构建输出目录 |

## Related Changes

- 参考 implementation: `/home/newbe36524/repos/newbe36524/docker-compose-builder/.github/workflows/deploy.yml`
- GitHub 官方文档: [Configuring a publish source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publish-source-for-your-github-pages-site)
- GitHub Actions 官方文档: [Deploying to GitHub Pages with the deploy-pages action](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-environments)

## Status

**Pending Approval**
