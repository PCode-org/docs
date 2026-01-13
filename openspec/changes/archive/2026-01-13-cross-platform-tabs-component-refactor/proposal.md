# Change: 使用 Tabs 组件重构跨平台文档

## Why

当前 PCode 文档站点在快速开始指南和其他文档中,使用列表形式展示不同操作系统(Windows、Linux、macOS)的操作说明,导致:
- 用户需要在不相关的系统说明中查找自己的操作系统,内容冗长
- 对比查看不同平台的操作步骤困难
- 移动端阅读体验不佳,需要频繁滚动
- 文档维护成本高,相同步骤需要在多处重复

使用 Docusaurus 的 Tabs 组件可以显著改善用户体验,让用户快速切换到自己的操作系统视图,减少无关信息干扰。

## What Changes

- 将所有包含 Windows/Linux/macOS 分支说明的代码块转换为 Docusaurus `Tabs` 和 `TabItem` 组件
- 重构 `docs/quick-start/` 目录下的安装和配置文档
- 每个平台对应一个独立的 TabItem,包含平台特定的操作说明和代码块
- 保留现有的 Prism.js 语法高亮,支持 bash、powershell 等语言标签
- 确保所有 `.md` 文件支持 MDX 格式
- 验证构建过程无错误(`npm run build` 和 `npm run typecheck`)
- 保持现有链接完整性,不破坏 `onBrokenLinks: 'throw'` 配置要求

## UI Design Changes

### Tabs 组件结构示例

```md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="win" label="Windows">
    Windows 相关的操作说明或代码块
  </TabItem>
  <TabItem value="mac" label="macOS">
    macOS 相关的操作说明或代码块
  </TabItem>
  <TabItem value="linux" label="Linux">
    Linux 相关的操作说明或代码块
  </TabItem>
</Tabs>
```

### 改进后的阅读体验

**Before** (当前列表形式):
```
#### 安装 Docker

- **Windows**: 下载并安装 Docker Desktop for Windows
- **macOS**: 下载并安装 Docker Desktop for Mac
- **Linux**: 使用您的包管理器安装 Docker
```bash title="在 Ubuntu/Debian 上安装 Docker"
sudo apt-get update
sudo apt-get install docker.io docker-compose
```
```

**After** (使用 Tabs):
```
#### 安装 Docker

<Tabs>
  <TabItem value="win" label="Windows">
    下载并安装 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
  </TabItem>
  <TabItem value="mac" label="macOS">
    下载并安装 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
  </TabItem>
  <TabItem value="linux" label="Linux">
    使用您的包管理器安装 Docker

    ```bash title="在 Ubuntu/Debian 上安装 Docker"
    sudo apt-get update
    sudo apt-get install docker.io docker-compose
    ```
  </TabItem>
</Tabs>
```

### 移动端体验改进

- 用户只需点击平台标签,无需滚动查看不相关内容
- 减少页面长度,提升移动端阅读流畅度
- 支持触摸滑动切换平台标签

## Impact

### 受影响的文档

- `docs/quick-start/installation.md` - 安装指南包含大量跨平台操作说明
- `docs/quick-start/create-first-project.md` - 项目创建指南可能涉及平台差异
- 未来文档中涉及跨平台操作的内容

### 技术约束

- **MDX 兼容**: 所有变更的 `.md` 文件需要支持 MDX 格式
- **类型安全**: 确保 Tabs 组件导入正确,不影响 TypeScript 构建检查
- **构建验证**: 必须通过 `npm run build` 和 `npm run typecheck` 无错误
- **链接完整性**: 保持 `onBrokenLinks: 'throw'` 配置要求,不破坏现有链接

### 用户体验改进

- **可读性**: 用户可快速定位到自己操作系统的说明
- **对比性**: 方便用户对比不同平台的操作步骤
- **维护性**: 集中管理平台差异,修改时只需更新对应 TabItem
- **一致性**: 统一所有跨平台说明的展示方式

### OpenSpec 考量

此变更属于文档内容优化,不涉及新增功能或架构变更:
- 不需要修改 `openspec/specs/` 中的规范
- 实施完成后可归档到 `openspec/changes/archive/`
- 不影响 PCode 系统的功能行为

### 风险评估

- **低风险**: 仅涉及文档内容重构,不影响代码逻辑
- **可回滚**: 如果 Tabs 组件出现问题,可快速回滚到列表形式
- **兼容性**: Docusaurus 3.x 原生支持 Tabs 组件,无需额外依赖
