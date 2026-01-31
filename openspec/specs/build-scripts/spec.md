# build-scripts Specification

## Purpose
TBD - created by archiving change migrate-activity-metrics-to-es-modules. Update Purpose after archive.
## Requirements
### Requirement: ES Module Scripts Support

Build scripts in the `scripts/` directory MUST use ES module syntax when the project is configured with `"type": "module"` in `package.json`.

#### Scenario: Script uses ES module imports

**Given** the project has `"type": "module"` in `package.json`
**When** a build script in `scripts/` imports dependencies
**Then** the script MUST use `import` statements instead of `require`
**And** the script MUST use named exports or default exports instead of `module.exports`

#### Scenario: Script loads environment variables

**Given** a build script needs to load environment variables from `.env`
**When** the script is executed
**Then** the script MUST use `import 'dotenv/config'` instead of `require('dotenv').config()`
**And** environment variables MUST be available at script startup

#### Scenario: Script checks if it's the main module

**Given** a build script can be run directly or imported as a module
**When** the script needs to check if it's running as the main module
**Then** the script MUST use ES module equivalent instead of `require.main === module`
**And** MUST implement the check using `process.argv[1] === __filename` with proper `__filename` setup:
```javascript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  // Main module logic
}
```

#### Scenario: Script exports functions

**Given** a build script exports functions for testing or reuse
**When** the script defines exports
**Then** the script MUST use `export { function1, function2 }` syntax
**And** MUST NOT use `module.exports`

#### Scenario: Script imports Node.js core modules

**Given** a build script needs to use Node.js core modules (fs, path, https, etc.)
**When** the script imports these modules
**Then** the script MUST use default import syntax: `import fs from 'fs'`
**And** MUST NOT use `require('fs')`

#### Scenario: Build script execution in CI/CD

**Given** the project is configured as an ES module project
**When** GitHub Actions executes `npm run update-metrics`
**Then** the script MUST execute without `ReferenceError: require is not defined` errors
**And** the script MUST complete successfully and generate the expected output files

#### Scenario: Local development compatibility

**Given** a developer runs build scripts locally
**When** the script is executed with `node scripts/script-name.js` or via npm script
**Then** the script MUST behave identically to CI/CD environment
**And** the script MUST properly load environment variables from `.env` file

