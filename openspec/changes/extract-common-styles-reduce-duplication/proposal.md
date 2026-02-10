# Change: 提取公共样式减少重复代码

## Why

项目包含三个主要页面（首页、Container、Desktop），每个页面都有独立的样式表（`homepage.css`、`container.css`、`desktop.css`），总代码量约 2492 行。这些页面共享相同的设计系统（HUD/Sci-Fi FUI + Glassmorphism）和 CSS 变量系统，但存在约 60-70% 的重复代码。

重复代码导致：
- **维护困难**：修改公共样式需要在多个文件中同步更改
- **设计不一致**：Container 和 Desktop 页面的某些样式实现与首页有细微差异
- **代码膨胀**：大量重复代码增加项目大小和维护成本

## What Changes

### 新增文件

1. **`apps/website/src/styles/common/`** - 公共样式目录
   - `variables.css` - CSS 变量定义（亮色/暗色/农历新年主题）
   - `animations.css` - 动画关键帧（fadeInUp、fadeIn、pulse-badge）
   - `background.css` - 背景装饰元素（tech-grid-bg、bgGlow、tech-border-glow、tech-scanlines）
   - `hero.css` - Hero Section 公共样式
   - `buttons.css` - 按钮组件样式（btn-primary、btn-secondary、btn-icon、btn-link、recommended-badge）
   - `features.css` - Feature Card 样式
   - `faq.css` - FAQ 组件样式
   - `themes.css` - 主题覆盖样式（暗色/农历新年）
   - `accessibility.css` - 可访问性样式（prefers-reduced-motion、focus-visible）

### 修改文件

1. **`apps/website/src/styles/homepage.css`** - 重构为公共样式 + 首页特定样式
   - 导入所有公共样式模块
   - 保留首页特定的装饰元素样式
   - 保留首页特定的农历新年主题样式

2. **`apps/website/src/styles/container.css`** - 重构为公共样式 + Container 页面特定样式
   - 导入公共样式（通过 homepage.css）
   - 保留 Container 页面特定的组件样式（builder-intro、mirror-sources、mirror-command、cta-section）

3. **`apps/website/src/styles/desktop.css`** - 重构为公共样式 + Desktop 页面特定样式
   - 导入公共样式（通过 homepage.css）
   - 保留 Desktop 页面特定的组件样式（download-buttons、system-requirements、version-history、starlight-tabs）

### 设计统一规范

以首页样式为标准，统一以下设计细节：

| 组件 | 统一标准 |
|------|----------|
| 按钮 | `min-height: 44px`，`padding: 0.75rem 1.5rem`，`border-radius: 0.5rem` |
| Feature Card | `padding: 2rem`，`border-radius: 0.75rem`，统一悬停效果 |
| FAQ | 统一折叠面板动画、图标、边距 |
| 间距 | Section padding: `5rem 0` |
| 动画 | 统一 `fadeInUp` 参数和延迟时间 |

## Impact

### Affected Specs

- `specs/website-styles/spec.md` - 网站样式系统规范（新建）

### Affected Code

**新增文件**：
- `apps/website/src/styles/common/variables.css`
- `apps/website/src/styles/common/animations.css`
- `apps/website/src/styles/common/background.css`
- `apps/website/src/styles/common/hero.css`
- `apps/website/src/styles/common/buttons.css`
- `apps/website/src/styles/common/features.css`
- `apps/website/src/styles/common/faq.css`
- `apps/website/src/styles/common/themes.css`
- `apps/website/src/styles/common/accessibility.css`

**修改文件**：
- `apps/website/src/styles/homepage.css`
- `apps/website/src/styles/container.css`
- `apps/website/src/styles/desktop.css`

**不受影响文件**：
- 各页面的 `.astro` 组件文件（仅修改样式导入路径）
- 组件级 `.module.css` 文件（如 `HeroSection.module.css` 等）
- `apps/docs` 站点的任何文件

### 预期收益

**代码减少**
- 估计减少约 **60-70%** 的重复代码（约 1300-1500 行）
- 当前总行数：512 + 784 + 1196 = **2492 行**
- 重构后估计：约 **800-1000 行**（包含公共样式表）

**可维护性提升**
- 公共样式统一管理，修改一处即可影响所有页面
- 清晰的模块划分，便于定位和修改
- 减少因重复代码导致的不一致问题

**设计一致性**
- 统一的设计系统，确保所有页面视觉一致
- 以首页为基准，确保最佳实践得到复用

### 实施风险

**低风险**
- 样式抽象不会改变现有视觉效果
- 通过 `@import` 保持向后兼容
- 渐进式重构，可逐步验证

**测试要求**
- 本地开发服务器测试所有三个页面
- 验证三种主题（亮色/暗色/农历新年）正确应用
- 响应式断点测试
- 可访问性功能验证
