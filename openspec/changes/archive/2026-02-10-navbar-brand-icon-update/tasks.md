# 实施任务清单

**关联提案**: [proposal.md](./proposal.md)
**变更 ID**: navbar-brand-icon-update

---

## 任务概览

| 任务 | 预估时长 | 优先级 | 依赖 |
|------|---------|--------|------|
| [TASK-1] 准备正式 Logo 资源 | 30min | P0 | 无 |
| [TASK-2] 更新主站导航栏组件 | 30min | P0 | TASK-1 |
| [TASK-3] 调整导航栏样式 | 20min | P0 | TASK-2 |
| [TASK-4] 同步更新文档站（如需要） | 20min | P1 | TASK-2 |
| [TASK-5] 本地测试验证 | 30min | P0 | TASK-3 |

---

## TASK-1: 准备正式 Logo 资源

**目标**: 从 Desktop 仓库获取并部署 Hagicode 正式品牌 Logo

### 步骤

1. **从 Desktop 仓库复制 Logo**
   - [ ] 定位 Desktop 仓库: `/home/newbe36524/repos/newbe36524/desktop/resources/icons/`
   - [ ] 复制 `32x32.png` (推荐用于导航栏) 到 `apps/website/public/logo.png`
   - [ ] 备选: 复制 `icon.png` (1024x1024) 作为高分辨率版本

2. **验证 Logo 规格**
   - [ ] PNG 格式，32x32 像素（或更大尺寸自适应）
   - [ ] 文件大小 < 10KB
   - [ ] 在深色和浅色背景下都清晰可见

3. **部署到项目**
   - [ ] 将 Logo 复制到 `apps/website/public/logo.png`
   - [ ] 同样复制到 `apps/docs/public/logo.png`（如文档站需要）
   - [ ] 验证文件可通过 `/logo.png` 路径访问

### 可选: SVG 转换

如需要 SVG 格式以获得更好的缩放质量:
- [ ] 使用图片转换工具将 PNG 转换为 SVG
- [ ] 或联系设计团队提供原始 SVG 源文件

### 验收标准

- [ ] `apps/website/public/logo.png` 包含有效 Logo 图像
- [ ] 在浏览器中访问 `http://localhost:3000/logo.png` 可正常显示

---

## TASK-2: 更新主站导航栏组件

**目标**: 将内联 SVG 替换为外部 Logo 引用

### 修改文件

`apps/website/src/components/home/Navbar.tsx`

### 具体变更

**删除内容** (第 140-178 行):
```tsx
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 8L3 12L7 16" ... />
  ...
  <defs>
    <linearGradient id="nav-code-gradient" ...>
      <stop stopColor="#0080FF" />
      <stop offset="1" stopColor="#00FFFF" />
    </linearGradient>
  </defs>
</svg>
```

**替换为**:
```tsx
<img
  src="/logo.png"  // 使用 PNG 格式（或 /logo.svg 如有 SVG 版本）
  alt="Hagicode"
  width="32"
  height="32"
/>
```

### 验收标准

- [ ] 代码变更不包含内联 `<defs>` 或渐变定义
- [ ] `img` 标签包含 `alt` 属性
- [ ] `src` 路径使用绝对路径 `/logo.png`（或 `/logo.svg`）

---

## TASK-3: 调整导航栏样式

**目标**: 确保 Logo 在不同场景下正确显示

### 修改文件

`apps/website/src/components/home/Navbar.module.css`

### 具体变更

**添加/更新样式**:
```css
.logoIcon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoIcon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 确保继承当前文本颜色，适应主题切换 */
  color: currentColor;
}
```

### 验收标准

- [ ] Logo 在导航栏中垂直居中
- [ ] Logo 宽高比为原始比例
- [ ] 深色/浅色主题切换时 Logo 清晰可见

---

## TASK-4: 同步更新文档站（如需要）

**目标**: 确保品牌一致性

### 步骤

1. **检查文档站导航组件**
   - [ ] 定位 `apps/docs/src/components/` 下的导航组件
   - [ ] 确认是否使用相同的内联 SVG

2. **应用相同变更**
   - [ ] 如有内联 SVG，替换为 `/logo.png` 引用
   - [ ] 同步样式调整

3. **部署 Logo 资源**
   - [ ] 从 Desktop 仓库复制 Logo 到 `apps/docs/public/logo.png`

### 验收标准

- [ ] 文档站导航栏显示与主站一致的 Logo
- [ ] 两个站点视觉风格统一

---

## TASK-5: 本地测试验证

**目标**: 全面验证变更正确性

### 功能测试清单

- [ ] 启动开发服务器: `cd apps/website && npm run dev`
- [ ] 访问首页验证 Logo 显示
- [ ] 点击 Logo 验证跳转至首页
- [ ] 切换深色/浅色主题验证 Logo 可见性
- [ ] 调整浏览器窗口宽度验证响应式

### 浏览器兼容性

- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (macOS/iOS)
- [ ] Edge (最新版)

### 构建验证

- [ ] 运行 `npm run build` 确保无构建错误
- [ ] 检查构建输出中 logo.png 被正确复制

### 无障碍测试

- [ ] 使用屏幕阅读器验证 Logo alt 文本正确朗读
- [ ] 键盘导航可访问 Logo 链接

---

## 完成检查

在提交 PR 前确认:

- [ ] 所有任务已完成
- [ ] 代码通过 TypeScript 类型检查
- [ ] 无 ESLint 警告
- [ ] 本地测试全部通过
- [ ] PR 描述关联此提案编号

---

**注意事项**:

1. **Logo 资源来源**: Desktop 仓库位于 `/home/newbe36524/repos/newbe36524/desktop/resources/icons/`
2. **格式选择**: 当前使用 PNG 格式（32x32.png 推荐），如需 SVG 可后续转换或向设计团队申请
3. 确保 `logo.png` 文件已提交到版本控制
4. 如遇到资源加载问题，检查 Astro 静态资源配置
5. Desktop 仓库中的 logo 规格:
   - `32x32.png` - 导航栏推荐尺寸
   - `48x48.png` - 较大显示
   - `64x64.png` - 高 DPI 显示
   - `icon.png` - 1024x1024 主 Logo
