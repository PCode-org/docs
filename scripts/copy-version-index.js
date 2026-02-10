#!/usr/bin/env node

/**
 * Copy version-index.json from Docs app to Website app
 * This ensures the Website app has access to the same version data during build
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const SOURCE_FILE = path.join(rootDir, 'apps', 'docs', 'public', 'version-index.json');
const TARGET_DIR = path.join(rootDir, 'apps', 'website', 'public');
const TARGET_FILE = path.join(TARGET_DIR, 'version-index.json');

async function main() {
  try {
    // Ensure target directory exists
    await fs.mkdir(TARGET_DIR, { recursive: true });

    // Copy the file
    await fs.copyFile(SOURCE_FILE, TARGET_FILE);

    console.log(`✅ Copied version-index.json to ${TARGET_FILE}`);
  } catch (error) {
    console.error(`❌ Failed to copy version-index.json: ${error.message}`);
    process.exit(1);
  }
}

main();
