# Tasks: Set Chinese as Default Language

## 1. Preparation

- [ ] 1.1 Create Git backup commit before any changes
- [ ] 1.2 Verify current Chinese content exists in `i18n/zh-CN/docusaurus-plugin-content-docs/current/quick-start/`
- [ ] 1.3 Verify current English content in `docs/quick-start/` for comparison
- [ ] 1.4 Research Docusaurus behavior with single-locale i18n configuration

## 2. Content Migration

- [ ] 2.1 Move `i18n/zh-CN/docusaurus-plugin-content-docs/current/quick-start/` to `docs/quick-start/` (backup/rename existing if needed)
- [ ] 2.2 Verify all Chinese files are correctly moved with proper frontmatter
- [ ] 2.3 Verify `_category_.json` is moved and contains Chinese label "快速入门"
- [ ] 2.4 Delete the `docs/quick-start/` (English content if it still exists as a separate directory)
- [ ] 2.5 Delete the entire `i18n/` directory and all its contents
- [ ] 2.6 Verify `docs/` directory now contains only Chinese content

## 3. Configuration Updates

- [ ] 3.1 Update `docusaurus.config.ts` i18n configuration:
  - [ ] Change `defaultLocale` from `'en'` to `'zh-CN'`
  - [ ] Update `locales` array to contain only `['zh-CN']`
  - [ ] Update `localeConfigs` to only include `zh-CN` configuration
- [ ] 3.2 Remove language switcher from `docusaurus.config.ts`:
  - [ ] Locate `localeDropdown` item in `navbar.items`
  - [ ] Remove the entire localeDropdown configuration
- [ ] 3.3 Consider removing i18n config entirely if Docusaurus supports single-locale mode (research first)
- [ ] 3.4 Verify TypeScript compilation passes: `npm run typecheck`

## 4. Build Validation

- [ ] 4.1 Clear Docusaurus cache: `npm run clear`
- [ ] 4.2 Run production build: `npm run build`
- [ ] 4.3 Verify build completes without errors
- [ ] 4.4 Verify no broken links or missing assets in build output
- [ ] 4.5 Start development server: `npm start`
- [ ] 4.6 Navigate to `http://localhost:3000/docs/quick-start/installation`
- [ ] 4.7 Verify Chinese content displays correctly
- [ ] 4.8 Verify no language switcher appears in navbar
- [ ] 4.9 Verify all quick-start documents load without 404 errors

## 5. Documentation Updates

- [ ] 5.1 Update `openspec/project.md` internationalization section:
  - [ ] Change default locale from `en` to `zh-CN`
  - [ ] Update supported locales to only include `zh-CN`
  - [ ] Remove references to English content location
  - [ ] Update documentation structure section to reflect Chinese as default
- [ ] 5.2 Create rollback documentation in a new section of project.md or separate doc

## 6. Post-Migration Cleanup

- [ ] 6.1 Verify no orphaned translation files exist
- [ ] 6.2 Verify `i18n/` directory is completely removed
- [ ] 6.3 Run final build test to ensure everything works
- [ ] 6.4 Commit changes with descriptive commit message

## Success Criteria

- Site builds successfully with `npm run build`
- Chinese content displays correctly at `/docs/` URLs (no `/zh-CN/` prefix)
- No language switcher visible in navbar
- No 404 errors when navigating quick-start documentation
- `i18n/` directory no longer exists in repository
- TypeScript compilation passes without errors
