/**
 * 主题初始化逻辑 - 设置默认暗色主题
 * 该模块在应用启动时运行，确保首次访问时使用暗色主题
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const DEFAULT_THEME = 'dark';

export function initializeTheme() {
  if (ExecutionEnvironment.canUseDOM) {
    // 检查 localStorage 中是否有用户的主题偏好
    const storedTheme = localStorage.getItem('theme');

    // 如果没有存储的主题（首次访问），设置为默认暗色主题
    if (!storedTheme) {
      // 设置 data-theme 属性
      document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
      // 存储到 localStorage
      localStorage.setItem('theme', DEFAULT_THEME);
    } else {
      // 如果有存储的主题，确保与当前 DOM 一致
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }
}

// 立即执行初始化
initializeTheme();