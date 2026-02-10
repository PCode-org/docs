# Implementation Tasks

## 1. 准备工作

- [ ] 1.1 创建 `apps/website/src/styles/common/` 目录
- [ ] 1.2 备份现有样式表（homepage.css、container.css、desktop.css）
- [ ] 1.3 验证本地开发服务器正常运行

## 2. 创建公共样式模块

- [ ] 2.1 创建 `common/variables.css`
  - 从 homepage.css 提取 CSS 变量定义
  - 包含亮色主题、暗色主题、农历新年主题变量
  - 包含字体、阴影、过渡等基础变量

- [ ] 2.2 创建 `common/animations.css`
  - 提取 `fadeInUp` 动画关键帧
  - 提取 `fadeIn` 动画关键帧
  - 提取 `pulse-badge` 动画关键帧

- [ ] 2.3 创建 `common/background.css`
  - 提取 `.tech-grid-bg` 网格背景样式
  - 提取 `.bgGlow` 光晕背景样式
  - 提取 `.tech-border-glow` 发光边框样式
  - 提取 `.tech-scanlines` 扫描线效果样式

- [ ] 2.4 创建 `common/hero.css`
  - 提取 `.hero` 布局样式
  - 提取 `.hero-content` 内容区样式
  - 提取 `.hero-tagline` 副标题样式
  - 提取 `.hero-features` 特性标签样式
  - 提取 `.hero-cta` CTA 区域样式

- [ ] 2.5 创建 `common/buttons.css`
  - 提取 `.btn-primary` 主按钮样式
  - 提取 `.btn-secondary` 次要按钮样式
  - 提取 `.btn-icon` 图标容器样式
  - 提取 `.btn-link` 链接按钮样式
  - 提取 `.recommended-badge` 推荐标签样式
  - 统一按钮尺寸标准（min-height: 44px，padding: 0.75rem 1.5rem）

- [ ] 2.6 创建 `common/features.css`
  - 提取 `.features` section 样式
  - 提取 `.features-grid` 网格布局样式
  - 提取 `.feature-card` 卡片样式
  - 提取 `.feature-icon-wrapper` 图标包装器样式
  - 统一卡片尺寸标准（padding: 2rem，border-radius: 0.75rem）

- [ ] 2.7 创建 `common/faq.css`
  - 提取 `.faq` section 样式
  - 提取 `.faq-list` 列表样式
  - 提取 `.faq-item` 折叠项样式
  - 提取 `.faq-content` 内容样式
  - 统一折叠面板动画和图标

- [ ] 2.8 创建 `common/themes.css`
  - 提取暗色主题特定覆盖样式
  - 提取农历新年主题特定覆盖样式
  - 确保三个页面主题样式一致

- [ ] 2.9 创建 `common/accessibility.css`
  - 提取 `@media (prefers-reduced-motion)` 规则
  - 统一 `:focus-visible` 样式

## 3. 重构现有样式表

- [ ] 3.1 重构 `homepage.css`
  - 添加公共样式模块的 `@import` 语句
  - 保留首页特定的装饰元素样式
  - 保留首页特定的农历新年主题样式（如 .chinese-cloud-pattern）
  - 移除已提取到公共模块的重复代码

- [ ] 3.2 重构 `container.css`
  - 添加 `@import './homepage.css'` 以继承所有公共样式
  - 保留 Container 页面特定的组件样式
    - `.builder-intro`、`.builder-content`、`.builder-feature`、`.builder-icon`、`.builder-cta`
    - `.mirror-sources`、`.mirror-grid`、`.mirror-card`、`.mirror-header`、`.mirror-command`
    - `.cta-section`、`.cta-buttons`
  - 移除已提取到公共模块的重复代码

- [ ] 3.3 重构 `desktop.css`
  - 添加 `@import './homepage.css'` 以继承所有公共样式
  - 保留 Desktop 页面特定的组件样式
    - `.download-buttons`、`.download-option-wrapper`
    - `.system-requirements`、`.installation-guide`、`.requirements-content`、`.guide-content`
    - `.version-history`、`.version-list`、`.version-item`、`.version-header`、`.version-downloads`
    - `starlight-tabs` 相关样式（.tablist-wrapper、[role='tablist']、.tab、[role='tabpanel']）
    - `.error-message`
  - 移除已提取到公共模块的重复代码

## 4. 统一设计规范

- [ ] 4.1 验证按钮样式一致性
  - 确保 `.btn-primary` 在三个页面中样式一致
  - 确保 `.btn-secondary` 在三个页面中样式一致
  - 统一 min-height、padding、border-radius 等属性

- [ ] 4.2 验证 Feature Card 样式一致性
  - 确保 `.feature-card` 在三个页面中样式一致
  - 统一 padding、border-radius、悬停效果

- [ ] 4.3 验证 FAQ 样式一致性
  - 确保 `.faq-item` 在三个页面中样式一致
  - 统一折叠面板动画、图标、边距

- [ ] 4.4 验证农历新年主题一致性
  - 确保三个页面的农历新年主题覆盖规则一致
  - 统一金色系颜色值和光晕效果

## 5. 测试验证

- [ ] 5.1 启动本地开发服务器
  - 运行 `npm run dev`
  - 访问首页 (`/`)
  - 访问 Container 页面 (`/container/`)
  - 访问 Desktop 页面 (`/desktop/`)

- [ ] 5.2 验证亮色主题
  - 检查所有页面在亮色主题下的显示效果
  - 验证 CSS 变量正确应用

- [ ] 5.3 验证暗色主题
  - 切换到暗色主题
  - 检查所有页面在暗色主题下的显示效果
  - 验证暗色主题覆盖规则正确应用

- [ ] 5.4 验证农历新年主题
  - 切换到农历新年主题
  - 检查所有页面在农历新年主题下的显示效果
  - 验证金色系颜色和光晕效果正确应用

- [ ] 5.5 验证响应式设计
  - 测试移动端视图（max-width: 768px）
  - 测试平板端视图（768px - 1024px）
  - 测试桌面端视图（min-width: 1024px）

- [ ] 5.6 验证可访问性
  - 测试 `prefers-reduced-motion` 媒体查询
  - 测试键盘导航和 `:focus-visible` 样式
  - 验证触摸目标尺寸符合移动设备标准

- [ ] 5.7 运行生产构建
  - 运行 `npm run build`
  - 确保构建成功，无错误或警告

## 6. 文档更新

- [ ] 6.1 更新样式文件注释
  - 为每个公共样式模块添加清晰的注释
  - 说明各模块的用途和依赖关系

- [ ] 6.2 创建样式系统文档（可选）
  - 说明公共样式模块结构
  - 提供样式使用指南
  - 列出设计规范和标准

## 7. 代码审查

- [ ] 7.1 自我审查
  - 检查代码格式和风格一致性
  - 确保所有 TODO 项已完成
  - 验证无遗漏的重复代码

- [ ] 7.2 准备 Pull Request
  - 编写清晰的 PR 描述
  - 说明变更内容和测试结果
  - 提供截图对比（如有必要）
