# 提案: 更新导航栏品牌图标

**状态**: ExecutionCompleted | **类型**: 功能增强 | **优先级**: 中 | **复杂度**: 低

**创建日期**: 2026-02-10
**负责人**: 待分配
**审核人**: 待分配

---

## 概述

将 Hagicode 首站和文档站导航栏中当前使用的内联 SVG 代码符号图标，替换为正式的品牌 Logo 图标资源，以统一品牌视觉形象并提升专业度。

### 问题陈述

当前导航栏使用的是内联代码符号（`< > /`）作为品牌标识：
- 位于 `apps/website/src/components/home/Navbar.tsx:140-178`
- 使用渐变色的代码编辑器符号作为临时品牌图标
- 与 Hagicode 正式品牌标识不一致

### 业务价值

- **品牌一致性**: 统一所有触点的品牌视觉形象
- **用户识别度**: 用户能立即识别 Hagicode 官方站点
- **专业形象**: 传达产品成熟度和可靠性
- **无障碍改进**: 通过 alt 属性提供更好的屏幕阅读器支持

---

## 范围

### 包含内容

| 组件 | 文件路径 | 修改类型 |
|------|---------|---------|
| 主站导航栏 | `apps/website/src/components/home/Navbar.tsx` | 更新 Logo SVG 为外部引用 |
| 导航栏样式 | `apps/website/src/components/home/Navbar.module.css` | 调整 Logo 尺寸样式 |
| Logo 资源 | `apps/website/public/logo.svg` | 填充正式品牌 SVG |
| 文档站导航 | `apps/docs/src/components/*` | 同步更新（如存在） |

### 排除内容

- Favicon 更新（已有独立文件 `favicon.ico`）
- 社交媒体分享图片（`social-card.png`，独立任务）
- Logo 悬停动画效果（后续增强）
- 页脚等其他位置的 Logo（独立任务）

---

## 技术方案

### 架构变更

**当前实现**:
```tsx
// apps/website/src/components/home/Navbar.tsx:140-178
<div className={styles.logoIcon}>
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M7 8L3 12L7 16" ... />
    <path d="M17 8L21 12L17 16" ... />
    <path d="M14 4L10 20" stroke="url(#nav-code-gradient)" ... />
    <defs>
      <linearGradient id="nav-code-gradient" ...>
        <stop stopColor="#0080FF" />
        <stop offset="1" stopColor="#00FFFF" />
      </linearGradient>
    </defs>
  </svg>
</div>
```

**目标实现**:
```tsx
// 使用外部图片文件引用（PNG 或 SVG）
<div className={styles.logoIcon}>
  <img
    src="/logo.png"  // 或 /logo.svg 如有 SVG 版本
    alt="Hagicode"
    width="32"
    height="32"
  />
</div>
```

### Logo 资源来源

正式 Logo 资源位于 **Desktop 仓库** (`/home/newbe36524/repos/newbe36524/desktop`)：

```
desktop/resources/icons/
├── icon.png              # 1024x1024 主 Logo
├── 32x32.png            # 导航栏推荐尺寸
├── 48x48.png            # 较大显示尺寸
├── 64x64.png            # 高 DPI 显示
├── png/                 # 多尺寸 PNG 集合
└── icon.ico             # Windows 图标
```

**注意**: 当前仅有 PNG 格式，如需 SVG 格式需从 PNG 转换或联系设计团队提供源文件。

### 文件依赖

```
Navbar.tsx
    └── imports → /public/logo.png 或 /public/logo.svg (新增)
    └── styles → Navbar.module.css (调整尺寸)

Desktop 仓库
    └── resources/icons/icon.png → 复制/转换至 website/public/
```

### CSS 变更

```css
/* Navbar.module.css */
.logoIcon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 确保 img 标签自适应 */
.logoIcon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

---

## 实施计划

### 任务分解

详见 `tasks.md`

### 执行顺序

1. 准备 Logo 资源
2. 更新主站导航栏组件
3. 调整样式确保尺寸适配
4. 跨站点同步更新（如需要）
5. 本地测试验证

---

## 测试策略

### 功能测试

- [ ] Logo 在首页正确显示
- [ ] Logo 链接跳转至首页
- [ ] 移动端 Logo 尺寸正确
- [ ] 深色/浅色主题下 Logo 清晰可见

### 视觉回归测试

- [ ] Logo 与导航栏其他元素对齐
- [ ] Logo 悬停效果（如存在）正常工作
- [ ] 不同屏幕尺寸下响应式表现

### 兼容性测试

- [ ] Chrome/Edge/Firefox/Safari 最新版本
- [ ] 移动端浏览器（iOS Safari/Chrome Mobile）
- [ ] 屏幕阅读器可访问性（alt 属性正确朗读）

---

## 风险与缓解

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|---------|
| Logo 资源缺失 | 构建失败 | 低 | 在 PR 中验证资源存在 |
| 样式尺寸不适配 | 视觉问题 | 中 | CSS 预设固定尺寸 + object-fit |
| 外部引用延迟 | 加载性能 | 低 | PNG 文件小（~5KB），缓存友好 |
| 文档站导航不同步 | 品牌不一致 | 中 | 同步更新两个站点 |
| 仅有 PNG 无 SVG | 缩放质量 | 中 | 32px 尺寸下 PNG 质量足够，后续可替换 SVG |

---

## 成功标准

1. ✅ 首页导航栏显示正式品牌 Logo
2. ✅ Logo 在所有主题和设备上清晰可见
3. ✅ 无控制台错误或警告
4. ✅ 视觉回归测试通过
5. ✅ 跨站点品牌一致性达成

---

## 时间线

| 阶段 | 预计时长 |
|------|---------|
| 准备 Logo 资源 | 0.5 天 |
| 组件和样式更新 | 0.5 天 |
| 测试验证 | 0.5 天 |
| **总计** | **1.5 天** |

---

## 相关资源

- [OpenSpec 规范](../../../.openspec/README.md)
- [组件开发指南](../../../docs/contributing/components.md)
- [样式系统](../../../docs/contributing/styles.md)

---

**变更历史**

| 版本 | 日期 | 作者 | 变更说明 |
|------|------|------|---------|
| 1.0 | 2026-02-10 | - | 初始提案 |
| 1.1 | 2026-02-10 | - | 更新 Logo 资源来源为 Desktop 仓库 |
