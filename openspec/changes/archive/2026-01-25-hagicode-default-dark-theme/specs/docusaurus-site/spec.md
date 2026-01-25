## MODIFIED Requirements

### Requirement: 设置应用默认主题为暗色模式

Hagicode 文档应用 SHALL 默认使用暗色主题作为首次访问用户的初始视觉体验。系统 SHALL 检查 localStorage 中的主题偏好设置，若不存在则必须使用暗色主题作为默认值。

#### Scenario: 用户首次访问时显示暗色主题

**Given** 用户首次访问 Hagicode 文档网站
**And** 浏览器 localStorage 中不存在主题偏好设置

**When** 页面加载完成

**Then** 网站显示暗色主题作为默认主题
**And** 页面所有元素使用暗色主题配色方案
**And** 主题切换按钮显示当前状态

#### Scenario: 保留用户手动主题选择

**Given** 用户已访问过网站并手动切换到明色主题
**And** 主题偏好已保存在 localStorage 中

**When** 用户刷新页面或再次访问网站

**Then** 网站显示用户上次选择的明色主题（而非默认暗色主题）
**And** 主题切换按钮功能正常
**And** 用户可以随时切换回暗色主题

#### Scenario: 主题切换状态持久化存储

**Given** 用户当前正在浏览网站

**When** 用户点击主题切换按钮在明色和暗色主题之间切换
**And** 刷新页面

**Then** 网站保持用户最后选择的主题状态
**And** 主题偏好正确存储在 localStorage 中
**And** 页面刷新后无需重新选择主题

#### Scenario: 忽略系统配色方案设置

**Given** 用户操作系统配色方案设置为明色模式
**And** 用户首次访问网站（无 localStorage 记录）

**When** 网站初始化主题

**Then** 网站忽略系统配色方案偏好
**And** 显示暗色主题作为默认主题
**And** 用户可以手动切换到明色主题

