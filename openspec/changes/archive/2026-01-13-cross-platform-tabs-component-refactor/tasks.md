## 1. 准备工作

- [x] 1.1 阅读 Docusaurus Tabs 组件官方文档,了解最佳实践
- [x] 1.2 备份当前的 `docs/quick-start/` 目录
- [x] 1.3 确认本地开发环境运行正常 (`npm run start`)

## 2. 识别需要重构的文档

- [x] 2.1 审查 `docs/quick-start/installation.md`,标记所有跨平台操作说明
- [x] 2.2 审查 `docs/quick-start/create-first-project.md`,识别平台差异内容
- [x] 2.3 检查其他文档文件是否包含跨平台操作说明
- [x] 2.4 创建重构清单,记录所有需要转换的位置

## 3. 重构 installation.md

- [x] 3.1 在文件顶部添加 Tabs 组件导入语句
  ```md
  import Tabs from '@theme/Tabs';
  import TabItem from '@theme/TabItem';
  ```
- [x] 3.2 重构 "安装 Docker" 部分,将 Windows/macOS/Linux 说明转换为 Tabs
- [x] 3.3 重构 "Node.js 和 npm" 部分,使用 Tabs 组织平台特定的安装说明
- [x] 3.4 重构 "部署软件包" 部分,将平台特定步骤分离到不同 TabItem
- [x] 3.5 重构 "启动服务" 部分,使用 Tabs 区分 Windows 和 Unix-like 系统
- [x] 3.6 重构 "停止服务" 部分,应用 Tabs 组件
- [x] 3.7 验证代码块的语言标签(bash、powershell)正确设置
- [x] 3.8 确保 TabItem 的 value 属性使用一致的命名(win、mac、linux)

## 4. 重构 create-first-project.md

- [x] 4.1 添加 Tabs 组件导入语句(如果文件中包含跨平台内容)
- [x] 4.2 识别并重构所有平台差异的命令或操作
- [x] 4.3 将平台特定的 Git 命令或编辑器操作组织到 Tabs 中
- [x] 4.4 验证重构后的内容在视觉上清晰易读

## 5. MDX 格式验证

- [x] 5.1 确认所有修改的 `.md` 文件支持 MDX 语法
- [x] 5.2 验证 Tabs 组件导入语句位于正确的位置(文件开头,frontmatter 之后)
- [x] 5.3 检查所有 TabItem 的 value 和 label 属性格式正确
- [x] 5.4 确保代码块的语法高亮标签(bash、powershell)在 TabItem 中正常工作

## 6. 构建验证

- [x] 6.1 运行 `npm run build`,确保构建成功无错误
- [x] 6.2 运行 `npm run typecheck`,确保 TypeScript 类型检查通过
- [x] 6.3 检查构建输出,确认无 broken links 警告
- [x] 6.4 验证生产环境构建的文档站点包含正确渲染的 Tabs

## 7. 代码审查和优化

- [x] 7.1 自查所有变更的文件,确保 Tabs 使用一致
- [x] 7.2 验证所有平台标签名称统一使用 "Windows"、"macOS"、"Linux"
- [x] 7.3 检查是否有遗漏的跨平台说明未转换为 Tabs
- [x] 7.4 确保代码示例在所有平台下保持准确和可执行性
- [x] 7.5 优化 TabItem 内容的可读性,添加必要的说明文字

## 8. 文档更新

- [x] 8.1 在 `README.md` 或贡献指南中记录 Tabs 组件的使用约定
- [x] 8.2 为未来的文档作者创建 Tabs 使用示例或模板
- [x] 8.3 更新文档维护指南,说明如何添加新的跨平台说明

## 完成标准

所有任务完成后:
- ✅ 所有包含跨平台操作的文档已使用 Tabs 组件重构
- ✅ 生产构建无错误 (`npm run build` 和 `npm run typecheck` 通过)
- ✅ 所有链接正常工作,无 broken links
- ✅ Tabs 使用一致,遵循统一的命名规范
- ✅ 代码示例在所有平台下准确且可执行
