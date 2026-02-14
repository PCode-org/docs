# Version Extraction Logging

## Overview
The `extractVersionFromData` function in `scripts/version-monitor.js` is responsible for extracting the correct version number from various data structures returned by the version API.

## Problem Fixed
Previously, the function assumed `data.versions[0]` was the latest version without actually comparing all versions. This caused incorrect version detection when:
- The API returned versions in an unordered manner
- The first version in the array was not actually the highest

**Solution**: Now the function iterates through ALL versions to find the true latest using the `compareVersions` function.

## Enhanced Logging

The function now logs detailed information:

### When Found Versions Array
```bash
[INFO] [extractVersionFromData] Found 4 versions in array
[DEBUG] [extractVersionFromData] Versions: v0.1.9, v0.1.10, v0.1.8, v0.1.7
```

### During Version Comparison
```bash
[INFO] [extractVersionFromData] Searching for latest version by comparing all versions...
[DEBUG] [extractVersionFromData] Comparing: "v0.1.10" vs current latest "v0.1.9"
[INFO] [extractVersionFromData] Found newer version: "v0.1.10" > "v0.1.9"
```

### When Using Alternative Fields
```bash
[DEBUG] [extractVersionFromData] Using data.latestVersion field
# or
[DEBUG] [extractVersionFromData] Using data.currentVersion field
# or
[DEBUG] [extractVersionFromData] Using data.release.version field
```

### Result
```bash
[INFO] [extractVersionFromData] Latest version from array: v0.1.10
```

## Test Cases

### Test 1: Unordered Versions Array
**Input**: `[{version: "v0.1.9"}, {version: "v0.1.10"}, {version: "v0.1.8"}, {version: "v0.1.7"}]`

**Expected**: v0.1.10 (highest)

**Logs**:
```
[extractVersionFromData] Found 4 versions in array
[extractVersionFromData] Versions: v0.1.9, v0.1.10, v0.1.8, v0.1.7
[extractVersionFromData] Searching for latest version by comparing all versions...
[extractVersionFromData] Comparing: "v0.1.9" vs current latest "v0.1.9"
[extractVersionFromData] Versions are equal
[extractVersionFromData] Comparing: "v0.1.10" vs current latest "v0.1.9"
[extractVersionFromData] Found newer version: "v0.1.10" > "v0.1.9"
...
[extractVersionFromData] Latest version from array: v0.1.10
```

**Result**: ✅ PASS

### Test 2: latestVersion Field
**Input**: `{latestVersion: "v1.2.0", versions: [...]}`

**Expected**: v1.2.0 (uses `latestVersion` field directly)

**Logs**:
```
[DEBUG] [extractVersionFromData] Using data.latestVersion field
```

**Result**: ✅ PASS

### Test 3: currentVersion Field
**Input**: `{currentVersion: "v2.0.0", versions: [...]}`

**Expected**: v2.0.0 (uses `currentVersion` field directly)

**Logs**:
```
[DEBUG] [extractVersionFromData] Using data.currentVersion field
```

**Result**: ✅ PASS

## Viewing Logs in GitHub Actions

When the version-monitor workflow runs, look for these log patterns:

1. **Extracting version from API response**:
   ```
   [INFO] [extractVersionFromData] Found 12 versions in array
   [INFO] [extractVersionFromData] Searching for latest version by comparing all versions...
   ```

2. **Version comparisons during extraction**:
   ```
   [DEBUG] [extractVersionFromData] Comparing: "v0.1.10" vs current latest "v0.1.9"
   [INFO] [extractVersionFromData] Found newer version: "v0.1.10" > "v0.1.9"
   ```

3. **Final extracted version**:
   ```
   [INFO] [extractVersionFromData] Latest version from array: v0.1.10
   [INFO] Current version from source: v0.1.10
   ```

## Why This Matters

1. **Accurate Version Detection**: The API may return versions in any order. We must compare ALL versions to find the true latest.

2. **Debugging Support**: When version comparison seems wrong, these logs help identify whether:
   - The API data changed format
   - The comparison logic has a bug
   - The versions array is unordered

3. **CI/CD Reliability**: In GitHub Actions, these logs are captured and can be reviewed when debugging version monitor failures.
