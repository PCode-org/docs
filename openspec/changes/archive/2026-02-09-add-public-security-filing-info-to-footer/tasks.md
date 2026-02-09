## 1. 实现

- [ ] 1.1 在 `src/components/StarlightFooter.astro` 的备案信息区块中添加公安备案号链接
- [ ] 1.2 在 `src/components/home/Footer.tsx` 的备案信息区块中添加公安备案号链接
- [ ] 1.3 更新 `StarlightFooter.astro` 的 CSS 样式以支持两个备案链接的并排布局
- [ ] 1.4 更新 `Footer.module.css` 的 CSS 样式以支持两个备案链接的并排布局
- [ ] 1.5 添加适当的响应式样式以确保在不同屏幕尺寸下正常显示
- [ ] 1.6 添加 `aria-label` 属性以提高可访问性
- [ ] 1.7 本地测试：在不同浏览器和屏幕尺寸下验证样式和功能

## 2. 验证

- [ ] 2.1 运行 `npm run build` 确保构建成功
- [ ] 2.2 运行 `npm run typecheck` 确保 TypeScript 类型检查通过
- [ ] 2.3 在开发环境中验证 Footer 显示正确
- [ ] 2.4 测试响应式布局（移动端、平板、桌面）
- [ ] 2.5 验证两个备案链接都能正确打开外部网站
- [ ] 2.6 验证主题切换时样式保持一致

## 3. 文档更新

- [ ] 3.1 更新 `openspec/specs/astro-site/spec.md` 添加公安备案相关场景
- [ ] 3.2 运行 `openspec validate add-public-security-filing-info-to-footer --strict` 验证提案
