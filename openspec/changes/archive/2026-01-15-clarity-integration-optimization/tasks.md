# Clarity 集成优化 - 实施任务清单

## 1. 准备工作

- [x] 1.1 确认当前 Clarity 项目 ID 已配置在环境变量中
- [x] 1.2 检查 `docusaurus.config.ts` 中现有的 Clarity 脚本配置
- [x] 1.3 确认 `src/theme/` 目录结构存在
- [x] 1.4 检查 `react-helmet` 依赖是否已安装 (`npm ls react-helmet`)

## 2. Swizzle Footer 组件

- [x] 2.1 运行 swizzle 命令 eject Footer 组件
  ```bash
  npm run swizzle @docusaurus/theme-classic Footer -- --eject --typescript
  ```
- [x] 2.2 验证 `src/theme/Footer/index.tsx` 文件已创建
- [x] 2.3 检查组件是否正确导出并编译

## 3. 修改 Footer 组件注入 Clarity 脚本

- [x] 3.1 阅读当前 `Footer/index.tsx` 组件代码
- [x] 3.2 添加必要的导入：
  - `useEffect` from React
- [x] 3.3 读取 `CLARITY_PROJECT_ID` 环境变量
- [x] 3.4 使用 `useEffect` 注入 Clarity 脚本到 `<head>` (使用直接 DOM 操作)
- [x] 3.5 确保脚本仅在 `CLARITY_PROJECT_ID` 存在时加载
- [x] 3.6 验证 TypeScript 类型检查通过

## 4. Swizzle DocItem 组件

- [x] 4.1 运行 swizzle 命令 eject DocItem 组件
  ```bash
  npm run swizzle @docusaurus/theme-classic DocItem -- --eject --typescript
  ```
- [x] 4.2 验证 `src/theme/DocItem/index.tsx` 文件已创建
- [x] 4.3 检查组件是否正确导出并编译

## 5. 修改 DocItem 组件添加区域标记

- [x] 5.1 阅读当前 `DocItem/Layout/index.tsx` 组件代码
- [x] 5.2 定位主内容包裹元素（article 标签）
- [x] 5.3 在主内容元素上添加 `data-clarity-region="article"` 属性
- [x] 5.4 确保不破坏现有组件结构和类型定义

## 6. 清理 docusaurus.config.ts

- [x] 6.1 打开 `docusaurus.config.ts` 文件
- [x] 6.2 移除 `CLARITY_PROJECT_ID` 相关的常量定义
- [x] 6.3 移除 `scripts` 配置中的 Clarity 相关代码
- [x] 6.4 确认其他配置保持不变

## 7. 更新 .env.example

- [ ] 7.1 打开 `.env.example` 文件
- [ ] 7.2 添加或更新 `CLARITY_PROJECT_ID` 环境变量注释说明
- [ ] 7.3 确保不包含实际的项目 ID 值

## 8. 验证集成

- [x] 8.1 运行 `npm run build` 执行生产构建
- [x] 8.2 确认构建成功，无 TypeScript 错误
- [ ] 8.3 使用浏览器访问任意文档页面
- [ ] 8.4 验证 `<head>` 中包含 Clarity 脚本标签
- [ ] 8.5 验证主内容区域存在 `data-clarity-region="article"` 属性
- [ ] 8.6 检查控制台无相关错误信息
- [ ] 8.7 确认 Clarity Dashboard 显示活跃用户

## 9. 构建验证

- [x] 9.1 运行 `npm run build` 执行生产构建
- [x] 9.2 确认构建成功，无 TypeScript 错误
- [x] 9.3 检查构建输出中包含 Clarity 脚本引用

## 10. 文档更新（如需要）

- [ ] 10.1 更新项目 README 中关于 Clarity 配置的说明（如果有）
- [ ] 10.2 在相关开发文档中记录 swizzled 组件的位置和用途

## 11. 测试与验收

- [ ] 11.1 在多个文档页面上验证 Clarity 脚本加载
- [ ] 11.2 在多个文档页面上验证 `data-clarity-region` 属性存在
- [ ] 11.3 验证属性不会影响页面正常渲染和样式
- [ ] 11.4 确认移动端和桌面端均正常显示
- [ ] 11.5 （可选）在 Clarity Dashboard 中等待数据收集，验证区域标记生效
