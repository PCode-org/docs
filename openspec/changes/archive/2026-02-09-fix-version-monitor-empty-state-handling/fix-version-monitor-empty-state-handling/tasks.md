## 1. Implementation

### 1.1 修复空状态处理逻辑

- [ ] 1.1.1 Modify version comparison logic in `scripts/version-monitor.js`
  - Remove the early return when `lastVersion` is null (lines 504-510)
  - Allow empty state to proceed through the version update processing flow
- [ ] 1.1.2 Verify version comparison handles empty state correctly
  - Ensure `compareVersions(currentVersion, null)` or comparison with undefined is handled
  - Add explicit null/undefined check in comparison logic if needed

### 1.2 实现本地版本数据文件同步

- [ ] 1.2.1 Create local version data file
  - Create `public/version-index.json` with initial version data
  - Add file to git tracking
- [ ] 1.2.2 Modify version monitor script to sync local data
  - Add function to update `public/version-index.json` when new version is detected
  - Ensure the file is committed to the PR along with version state changes
- [ ] 1.2.3 Update `src/utils/desktop.ts` to use local file
  - Modify `fetchDesktopVersions()` to read from local file first
  - Add fallback to online API for development environments (optional)
  - Ensure the function works in both build-time and runtime contexts

## 2. Testing

### 2.1 空状态处理测试

- [ ] 2.1.1 Test first run scenario (empty state)
  - Delete or rename `.github/version-state.json`
  - Run version monitor script
  - Verify PR is created for current version
- [ ] 2.1.2 Test state file recovery scenario
  - Corrupt or delete version state file during operation
  - Run version monitor script
  - Verify proper recovery and PR creation
- [ ] 2.1.3 Test empty state with existing PR
  - Manually create a PR for the current version
  - Delete version state file
  - Run version monitor script
  - Verify no duplicate PR is created
- [ ] 2.1.4 Test normal version update (regression test)
  - Set up valid version state with old version
  - Run version monitor script with new version available
  - Verify PR is created correctly

### 2.2 本地版本数据文件同步测试

- [ ] 2.2.1 Verify local version data file is created and committed
  - Check that `public/version-index.json` exists in PR
  - Verify file content matches the online version data
- [ ] 2.2.2 Test build process with local data
  - Run local build with `public/version-index.json` present
  - Verify build completes successfully without network calls
  - Verify desktop page shows correct version information
- [ ] 2.2.3 Test build resilience
  - Temporarily make online API unavailable
  - Run build process
  - Verify build still succeeds using local data

## 3. Validation

- [ ] 3.1 Run `openspec validate fix-version-monitor-empty-state-handling --strict`
- [ ] 3.2 Verify proposal passes all validation checks
- [ ] 3.3 Test complete workflow end-to-end
  - Version Monitor detects new version
  - Local version data file is updated
  - PR is created with both files
  - Build process uses local data successfully
