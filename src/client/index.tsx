/**
 * 客户端模块入口点
 * 用于配置 Docusaurus 的客户端初始化代码
 */

import type { ClientModule } from '@docusaurus/types';
import { initializeTheme } from './ThemeInitializer';

// 立即执行主题初始化
initializeTheme();

const module: ClientModule = {
  // 可以在这里添加路由更新等生命周期钩子
};

export default module;