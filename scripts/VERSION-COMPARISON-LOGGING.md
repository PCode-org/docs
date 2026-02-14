# Version Comparison Logging Guide

## Overview
The version monitor script (`scripts/version-monitor.js`) includes detailed logging to help debug and verify version comparison behavior, especially useful in CI/CD environments like GitHub Actions.

## Viewing Logs

### In GitHub Actions

1. Go to the **Actions** tab in your repository
2. Click on a workflow run (e.g., "Update Version Index" or "Version Comparison Edge Case Tests")
3. Click on the job you want to inspect
4. Expand the step logs to see detailed output

### Locally

Run the test script to see detailed logging:

```bash
node scripts/test-version-comparison.js
```

Or run the version monitor directly:

```bash
node scripts/version-monitor.js
```

## Log Format

All logs are prefixed with level indicators:

- `[DEBUG]` - Detailed parsing information (only visible when debugging)
- `[INFO]` - High-level operations and results
- `[WARN]` - Warnings about potentially problematic inputs
- `[ERROR]` - Errors that prevent operations

## Log Examples

### Version Comparison

When comparing two versions, you'll see:

```
============================================================
VERSION COMPARISON START
============================================================
Local version: "v0.1.9"
Current version: "v0.1.10"
Critical edge cases to verify:
  - Multi-digit comparison (e.g., v0.1.9 vs v0.1.10)
  - Multi-digit version numbers (e.g., v1.10.0 vs v1.9.9)
  - Pre-release comparison (e.g., alpha < beta < rc < stable)
------------------------------------------------------------
[INFO] [compareVersions] Comparing versions: "v0.1.10" vs "v0.1.9"
[DEBUG] [parseSemver] Parsing version: "v0.1.10"
[DEBUG] [parseSemver] Removed 'v' prefix: "0.1.10"
[DEBUG] [parseSemver] Parsed numbers: major=0, minor=1, patch=10
[DEBUG] [parseSemver] Result: 0.1.10
...
[INFO] [compareVersions] Patch version differs: 10 vs 9 => v0.1.10 > v0.1.9
------------------------------------------------------------
📊 Version comparison result: "v0.1.10" > "v0.1.9"
🔄 Version changed: v0.1.9 -> v0.1.10
============================================================
```

### Prerelease Comparison

When comparing prerelease versions:

```
[INFO] [compareVersions] Comparing versions: "v1.0.0-beta" vs "v1.0.0"
[DEBUG] [parseSemver] Parsing version: "v1.0.0-beta"
[DEBUG] [parseSemver] Parsed numbers: major=1, minor=0, patch=0
[DEBUG] [parseSemver] Parsed prerelease: [beta]
...
[INFO] [compareVersions] Major version differs: 1 vs 1 => (same)
[INFO] [compareVersions] Minor version differs: 0 vs 0 => (same)
[INFO] [compareVersions] Patch version differs: 0 vs 0 => (same)
[DEBUG] [comparePrerelease] a=[beta] (prerelease) < b=[] (stable)
[INFO] [compareVersions] Prerelease differs: [beta] vs [] => v1.0.0-beta < v1.0.0
```

## Edge Cases Logged

The logging specifically highlights these important test cases:

### 1. String Comparison Bug Fix
**Problem**: `v0.1.9` vs `v0.1.10` - Using string comparison, "9" > "10"
**Solution**: Parse as numbers and compare numerically: `9 < 10`

**Expected Log**:
```
[INFO] [compareVersions] Patch version differs: 10 vs 9 => v0.1.10 > v0.1.9
✅ PASS: v0.1.9 < v0.1.10 (correct numeric comparison)
```

### 2. Multi-Digit Version Numbers
**Problem**: `v1.10.0` vs `v1.9.9` - Using string comparison, "10" < "9"
**Solution**: Compare minor versions numerically: `10 > 9`

**Expected Log**:
```
[INFO] [compareVersions] Minor version differs: 10 vs 9 => v1.10.0 > v1.9.9
✅ PASS: v1.9.9 < v1.10.0 (correct minor version comparison)
```

### 3. Prerelease vs Stable
**Problem**: Prerelease versions should be less than stable versions
**Solution**: Empty prerelease array (stable) has higher priority than non-empty

**Expected Log**:
```
[DEBUG] [comparePrerelease] a=[beta] (prerelease) < b=[] (stable)
[INFO] [compareVersions] Prerelease differs: [beta] vs [] => v1.0.0-beta < v1.0.0
✅ PASS: v1.0.0-beta < v1.0.0 (correct prerelease comparison)
```

## Testing Edge Cases

Run the automated test script:

```bash
node scripts/test-version-comparison.js
```

This will test:
1. ✅ v0.1.9 vs v0.1.10 (numeric string comparison)
2. ✅ v1.10.0 vs v1.9.9 (multi-digit version comparison)
3. ✅ v1.99.99 vs v2.0.0 (major version comparison)
4. ✅ v1.0.0-beta vs v1.0.0 (prerelease vs stable)

## Troubleshooting

### Logs Not Appearing

Make sure you're running the script with Node.js:
```bash
node scripts/version-monitor.js
```

### Version Comparison Seems Wrong

Check the debug logs to see how versions are being parsed:
```bash
node scripts/test-version-comparison.js 2>&1 | grep -E "(parseSemver|compareVersions)"
```

### Test Failures

If tests fail, check:
1. Is the version format correct? (e.g., `v1.2.3` or `1.2.3`)
2. Are the comparison operators correct? (-1 for less, 0 for equal, 1 for greater)
3. Check the full test output for detailed comparison logs

## GitHub Actions Integration

The workflow `.github/workflows/version-comparison-test.yml` automatically:

1. Runs on changes to version-monitor.js
2. Executes all edge case tests
3. Reports results in the workflow summary
4. Shows detailed logs for debugging

Check the Actions tab to see the latest test results!
