# 设计文档：Hagicode 默认暗色主题

## 架构设计

### 主题系统工作原理

Docusaurus 3.x 使用以下机制管理主题：

1. **CSS 变量**：在 `src/css/custom.css` 中定义，使用 `data-theme` 属性切换
2. **React Context**：Docusaurus 提供主题上下文用于组件间通信
3. **LocalStorage**：用户主题偏好存储在浏览器本地存储中
4. **Initialization**：应用启动时检查存储的主题偏好

### 当前实现分析

```css
/* 明色主题变量 (默认) */
:root {
  --ifm-color-primary: #2e8555;
  /* ...其他变量 */
}

/* 暗色主题变量 */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  /* ...其他变量 */
}
```

### Mermaid 图表主题配置

```typescript
// docusaurus.config.ts
mermaid: {
  theme: {
    light: 'base',
    dark: 'dark',
  },
},
```

## 解决方案设计

### 方案一：修改 docusaurus.config.ts 配置

Docusaurus 3.x 支持在配置中设置默认主题：

```typescript
// docusaurus.config.ts
themeConfig: {
  colorMode: {
    defaultMode: 'dark',
    disableSwitch: false,
    respectPrefersColorScheme: false, // 忽略系统设置，始终使用默认主题
  },
  // ...其他配置
},
```

**优点**：
- 简单直接，无需编写额外代码
- 官方支持的配置方式
- 与 Docusaurus 升级保持兼容性

**缺点**：
- 灵活性较低，无法实现复杂的初始化逻辑
- 依赖于 Docusaurus 的主题系统实现

### 方案二：自定义主题初始化组件

创建自定义 React 组件来管理主题初始化：

```typescript
// src/components/ThemeInitializer.tsx
import { useEffect } from 'react';

export const ThemeInitializer = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark'; // 默认为暗色主题
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return null;
};
```

然后在应用入口点集成：

```typescript
// src/pages/index.tsx
import { ThemeInitializer } from '@/components/ThemeInitializer';

export default function Home() {
  return (
    <>
      <ThemeInitializer />
      {/* 页面内容 */}
    </>
  );
}
```

**优点**：
- 高度灵活，可以实现复杂的初始化逻辑
- 可以根据需求自定义主题切换行为
- 不依赖于 Docusaurus 主题系统的特定实现

**缺点**：
- 需要编写额外的代码
- 需要维护自定义逻辑
- 可能与 Docusaurus 升级存在兼容性风险

### 方案选择

推荐使用**方案一**（修改 docusaurus.config.ts 配置），因为：

1. 简单直接，符合 Docusaurus 架构
2. 官方支持，升级兼容性好
3. 代码量最少，维护成本低
4. 已满足当前需求

## 详细设计

### 配置修改方案

```typescript
// docusaurus.config.ts
import type { Config } from '@docusaurus/types';
import type { Options as PresetOptions } from '@docusaurus/preset-classic';

const config: Config = {
  // ...其他配置
  themeConfig: {
    // ...其他主题配置
    colorMode: {
      defaultMode: 'dark', // 设置默认暗色主题
      disableSwitch: false, // 保留主题切换功能
      respectPrefersColorScheme: false, // 忽略系统配色方案偏好
    },
    // ...其他配置
  },
};

export default config;
```

### 主题切换组件保留

当前的主题切换功能将保持不变，因为我们设置了 `disableSwitch: false`。

### 持久化存储机制

Docusaurus 会自动将用户的主题偏好存储在 localStorage 中，键为 `theme`。当用户首次访问时，会使用 `defaultMode` 中设置的值。

## 边界情况处理

### 浏览器支持

- 所有现代浏览器均支持 localStorage
- 对于不支持 localStorage 的浏览器，会回退到默认主题

### 系统配色方案

由于设置了 `respectPrefersColorScheme: false`，应用将忽略系统的配色方案偏好，始终使用我们设置的默认主题。

### 主题切换状态

- 用户可以随时切换主题，切换后的状态会保存到 localStorage
- 下次访问时会使用用户上次选择的主题

## 验证方法

### 开发环境验证

```bash
npm start
```

访问 `http://localhost:3000`，观察是否显示暗色主题。

### 生产环境验证

```bash
npm run build
npm run serve
```

访问 `http://localhost:3000`，验证生产构建是否正常。

### 类型检查

```bash
npm run typecheck
```

### 主题切换测试

1. 首次访问 → 暗色主题
2. 点击主题切换按钮 → 切换到明色主题
3. 刷新页面 → 明色主题（已保存到 localStorage）
4. 清除 localStorage → 刷新页面 → 暗色主题（默认）

## 架构决策记录

| 决策项 | 选择 | 原因 |
|--------|------|------|
| 默认主题 | 暗色 | 符合现代开发者工具的设计趋势，降低视觉疲劳 |
| 实现方案 | docusaurus.config.ts 配置 | 官方支持，简单直接，升级兼容性好 |
| 系统配色方案 | 忽略 | 确保一致的用户体验，避免与系统设置冲突 |
| 主题切换 | 保留 | 尊重用户的个性化选择 |
| 持久化存储 | localStorage | Docusaurus 内置机制，无需额外代码 |

## 相关规范

- 参考 Docusaurus 3.x 官方文档：[Color Mode](https://docusaurus.io/docs/api/themes/configuration#color-mode)
- 项目配置文档：`openspec/project.md` 中的 "Configuration & UX" 章节
