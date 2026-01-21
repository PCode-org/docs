# Implementation Tasks

## Phase 1: Docker Compose 生成器功能扩展

### 1.1 添加 API 提供商类型定义
- [x] 在 `docker-compose-generator.tsx` 中添加 `AnthropicApiProvider` 类型
- [x] 定义支持的四种提供商：`zai` (智谱 AI，默认)、`anthropic` (官方)、`custom` (自定义)、`host` (主机配置)
- [x] 扩展 `DockerComposeConfig` 接口，添加 API 提供商相关字段
- [x] 定义 ZAI API URL 常量：`https://open.bigmodel.cn/api/paas/v4/`

**Dependencies**: 无
**Validation**: TypeScript 编译通过，类型检查无错误

---

### 1.2 更新默认配置
- [x] 在 `defaultConfig` 中添加 `anthropicApiProvider: 'zai'`（默认智谱 AI）
- [x] 添加 `anthropicAuthToken` 字段（默认为空）
- [x] 添加 `anthropicUrl` 字段（默认为空，zai 提供商会自动预设）
- [x] 确保向后兼容，现有默认行为不变

**Dependencies**: 1.1
**Validation**: 生成器页面加载正常，默认值正确

---

### 1.3 扩展 YAML 生成逻辑
- [x] 修改 `generateYAML` 函数，根据提供商选择生成相应的环境变量
- [x] **核心变更**：所有提供商统一使用 `ANTHROPIC_AUTH_TOKEN` 环境变量
- [x] `anthropic` 提供商：仅生成 `ANTHROPIC_AUTH_TOKEN`，不设置 URL
- [x] `zai` 提供商：生成 `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_URL`（预设 ZAI URL）
- [x] `custom` 提供商：生成 `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_URL`（用户输入）
- [x] `host` 提供商：生成 volume 挂载配置
- [x] 添加注释说明统一使用 `ANTHROPIC_AUTH_TOKEN`

**Dependencies**: 1.2
**Validation**: 生成的 YAML 包含正确的环境变量

---

### 1.4 更新 API 密钥配置 UI
- [x] 重构 "API 密钥" 表单区域为 "Claude API 配置"
- [x] 添加提供商选择下拉菜单
- [x] 添加说明："统一使用 ANTHROPIC_AUTH_TOKEN 环境变量"
- [x] 根据选择动态显示：
  - **智谱 AI（默认）**：显示 Token 输入框，说明会自动设置 ZAI URL
  - **Anthropic 官方**：显示 Token 输入框
  - **自定义 API**：显示 Token 和 URL 两个输入框
  - **主机配置**：显示挂载路径配置
- [x] 为每个提供商添加相应的获取 Token 链接

**Dependencies**: 1.3
**Validation**: UI 交互流畅，字段切换正常

---

## Phase 2: 文档清理和更新

### 2.1 搜索硬编码的 Docker Compose 配置
- [x] 在 `docs/` 目录下搜索包含 Docker Compose 配置的文档
- [x] 搜索包含 `ZAI_API_KEY` 和 `ANTHROPIC_API_KEY` 的文档
- [x] 识别需要清理或更新的文件
- [x] 列出所有受影响的文档路径

**Dependencies**: 无
**Validation**: 完成文档清单

---

### 2.2 清理安装指南中的硬编码配置
- [x] 更新 `docs/installation/docker-compose.md`
- [x] 移除或简化硬编码的 Docker Compose 示例
- [x] 添加引导语，指向 Docker Compose 生成器
- [x] 更新环境变量说明：统一使用 `ANTHROPIC_AUTH_TOKEN`
- [x] 保留必要的概念说明

**Dependencies**: 2.1
**Validation**: 文档构建成功，内容准确

---

### 2.3 更新包部署指南
- [x] 检查 `docs/installation/package-deployment.md`
- [x] 如有硬编码配置，添加生成器引用
- [x] 更新环境变量相关说明
- [x] 确保文档一致性

**Dependencies**: 2.1
**Validation**: 文档构建成功

---

### 2.4 添加 API 提供商说明文档
- [x] 在相关文档中添加 API 提供商选择说明
- [x] 说明不同提供商的适用场景
- [x] 强调统一使用 `ANTHROPIC_AUTH_TOKEN`
- [x] 说明 ZAI 提供商会自动设置 `ANTHROPIC_URL`
- [x] 提供官方 API Token 获取链接

**Dependencies**: 2.2
**Validation**: 文档内容完整，链接有效

---

### 2.5 移除 ZAI_API_KEY 相关说明
- [x] 在文档中搜索 `ZAI_API_KEY` 独立环境变量的说明
- [x] 移除或更新为使用 `ANTHROPIC_AUTH_TOKEN` 的说明
- [x] 确保 ZAI 配置通过 `ANTHROPIC_URL` 来说明

**Dependencies**: 2.1
**Validation**: 文档中不再有 `ZAI_API_KEY` 作为独立环境变量的说明

---

## Phase 3: 样式和用户体验优化

### 3.1 更新 CSS 样式（如需要）
- [x] 检查 `docker-compose-generator.module.css`
- [x] 确保新增 UI 元素样式一致
- [x] 添加提供商相关的样式类（如需要）
- [x] 确保说明文本样式清晰

**Dependencies**: 1.4
**Validation**: 样式渲染正常，无视觉问题

---

### 3.2 添加用户指导文本
- [x] 为每个提供商选项添加说明文字
- [x] 添加 API Token 获取的链接和指引
- [x] 对于 ZAI 提供商，说明会自动设置 API URL
- [x] 确保文案清晰易懂

**Dependencies**: 1.4
**Validation**: 文案准确，链接可访问

---

## Phase 4: 验证和测试

### 4.1 TypeScript 类型检查
- [x] 运行 `npm run typecheck` 确保无类型错误
- [x] 检查所有新增字段的类型定义
- [x] 验证 ZAI API URL 常量定义正确

**Dependencies**: 所有开发任务
**Validation**: typecheck 通过，无错误输出

---

### 4.2 本地开发测试
- [x] 运行 `npm start` 启动开发服务器
- [x] 测试生成器页面加载和交互
- [x] 验证所有提供商选项的功能
- [x] 验证生成的 YAML 环境变量正确

**Dependencies**: 4.1
**Validation**: 页面正常工作，无控制台错误

---

### 4.3 生产构建验证
- [x] 运行 `npm run build` 确保构建成功
- [x] 检查构建输出无警告或错误

**Dependencies**: 4.2
**Validation**: 构建成功，build 目录生成正确

---

### 4.4 链接完整性检查
- [x] 验证所有新增的外部链接可访问
- [x] 检查内部文档链接无 broken links

**Dependencies**: 4.3
**Validation**: 无 broken links

---

## Phase 5: OpenSpec 验证和归档

### 5.1 OpenSpec 验证
- [x] 运行 `openspec validate docker-compose-anthropic-api-support --strict --no-interactive`
- [x] 修复所有验证错误

**Dependencies**: 4.4
**Validation**: OpenSpec 验证通过

---

### 5.2 更新 checklist
- [x] 确认所有任务已完成
- [x] 在 proposal.md 中更新实施状态

**Dependencies**: 5.1
**Validation**: checklist 完整

---

## 执行顺序说明

1. **Phase 1** 必须首先完成，是核心功能实现
2. **Phase 2** 可以与 Phase 3 并行进行
3. **Phase 4** 必须在所有开发任务完成后执行
4. **Phase 5** 是最后的验证和归档步骤

## 并行化机会

- 2.1、2.2、2.3 可以并行执行（在完成 2.1 扫描后）
- 3.1 和 3.2 可以并行执行
- 4.1、4.2、4.3 必须按顺序执行

## 核心变更总结

本次实现的核心变更是**统一使用 `ANTHROPIC_AUTH_TOKEN` 环境变量**：
- 移除 `ZAI_API_KEY` 作为独立环境变量
- 所有提供商（智谱 AI、官方、自定义）都使用 `ANTHROPIC_AUTH_TOKEN`
- 通过 `ANTHROPIC_URL` 区分不同的 API endpoint
- ZAI 提供商自动预设 ZAI API URL
