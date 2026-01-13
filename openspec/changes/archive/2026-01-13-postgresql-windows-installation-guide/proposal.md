# Change: 新增在 Windows 上安装 PostgreSQL 数据库的教程

## Why

当前 PCode 文档站点缺少相关依赖软件的安装指南，特别是 PostgreSQL 数据库的安装教程。虽然安装截图已准备就绪（11 张完整流程截图位于 `static/img/install-postgres-windows/`），但缺少对应的文档结构和使用说明，增加了用户环境准备的学习成本。

## What Changes

- **新增文档分类**: "其他软件安装"（Related Software Installation）
  - 创建 `docs/related-software-installation/` 目录
  - 配置 `_category_.json` 元数据文件
  - 在侧边栏中添加新分类

- **新增 PostgreSQL 安装教程**: 在 Windows 平台上安装 PostgreSQL
  - 创建 `docs/related-software-installation/postgresql/` 子目录
  - 编写 `install-on-windows.md` 文档，集成 11 张安装步骤截图
  - 按照安装流程顺序组织内容（从安装界面设置到完成）
  - 使用 MDX 格式，配合图片展示每个关键步骤
  - 包含必要的 frontmatter（title, description）

## Impact

- **Affected specs**: docusaurus-site
- **Affected code**:
  - New: `docs/related-software-installation/_category_.json`
  - New: `docs/related-software-installation/postgresql/install-on-windows.md`
  - New: `docs/related-software-installation/postgresql/_category_.json`
  - Modified: `sidebars.ts` (添加新分类配置)
- **User experience**: 用户可在文档站点直接获取 PostgreSQL 安装指南，降低环境准备门槛
- **Documentation completeness**: 补充依赖软件安装文档，完善文档体系
- **Maintainability**: 清晰的目录结构便于后续扩展其他软件安装教程（Node.js, Git 等）
- **No breaking changes**: 新增文档不影响现有文档结构和功能

## Extensibility

该结构支持未来添加更多相关软件的安装教程：
- Node.js 安装教程 → `docs/related-software-installation/nodejs/`
- Git 安装教程 → `docs/related-software-installation/git/`
- 其他依赖软件 → 按软件名称创建子目录
