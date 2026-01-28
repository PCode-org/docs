## ADDED Requirements

### Requirement: Docker Compose 文档视频教程

Docker Compose 部署文档 SHALL 包含 B站视频教程资源，以提供可视化的部署过程演示，帮助用户更直观地理解 Docker Compose 的使用方法。

#### Scenario: 文档显示视频教程
- **WHEN** 用户阅读 Docker Compose 部署文档
- **THEN** 文档顶部显示视频教程模块
- **AND** 视频标题为 "Docker Compose 部署演示"
- **AND** 视频描述为 "通过视频学习如何使用 Docker Compose 一键部署 Hagicode 系统"
- **AND** 视频使用 B站嵌入播放器展示
- **AND** 视频地址为 `https://www.bilibili.com/video/BV19967B6EHr`

#### Scenario: 视频播放器响应式显示
- **WHEN** 用户在不同设备上查看文档
- **THEN** 视频播放器保持响应式布局
- **AND** 在桌面端容器最大宽度适应内容区域
- **AND** 在移动端播放器宽度占满屏幕
- **AND** 视频保持 16:9 宽高比

#### Scenario: 视频嵌入符合规范
- **WHEN** 文档被解析为 MDX
- **THEN** 视频嵌入使用 iframe 或 React 组件实现
- **AND** 使用 Docusaurus 支持的方式嵌入
- **AND** 播放器配置正确的参数（如 autoplay=0）
- **AND** 播放器可全屏观看

#### Scenario: 视频内容补充说明
- **WHEN** 用户查看视频教程
- **THEN** 视频下方有文字说明补充视频内容
- **AND** 说明包含视频的主要内容概要
- **AND** 说明包含视频时长信息
- **AND** 与文档其他内容风格一致

#### Scenario: 文档结构完整
- **WHEN** 用户阅读完整的 Docker Compose 部署文档
- **THEN** 视频教程模块不影响文档的完整性
- **AND** 原有内容保持完整
- **AND** 视频作为辅助资源增强学习体验
