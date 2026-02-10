/**
 * Version utilities for accessing desktop app version information
 * from the Docs application's version-index.json file
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Re-export types from desktop.ts for convenience
export type {
  DesktopIndexResponse,
  DesktopVersion,
  DesktopAsset
} from './desktop';

/**
 * Get the path to the version-index.json file in the Docs app
 * This function resolves the path relative to the shared package location
 *
 * @returns {string} Absolute path to version-index.json
 */
function getVersionIndexPath(): string {
  // Get the directory of the current module (packages/shared/src/)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sharedDir = path.dirname(__dirname); // packages/shared/

  // Navigate from packages/shared/ to apps/docs/public/
  return path.join(sharedDir, '..', 'apps', 'docs', 'public', 'version-index.json');
}

/**
 * Load and parse the version-index.json file from the Docs app
 *
 * @returns {Promise<import('./desktop').DesktopIndexResponse>} Version index data
 * @throws {Error} If the file cannot be read or parsed
 */
export async function getVersionIndex(): Promise<import('./desktop').DesktopIndexResponse> {
  try {
    const versionPath = getVersionIndexPath();
    const content = await fs.readFile(versionPath, 'utf-8');
    return JSON.parse(content) as import('./desktop').DesktopIndexResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load version index: ${error.message}`);
    }
    throw new Error('Failed to load version index: Unknown error');
  }
}

/**
 * Get the latest version string from the version index
 *
 * @returns {Promise<string>} The latest version number (e.g., "v0.1.4")
 * @throws {Error} If no versions are available or the file cannot be read
 */
export async function getLatestVersion(): Promise<string> {
  try {
    const data = await getVersionIndex();

    if (!data.versions || data.versions.length === 0) {
      throw new Error('No versions found in version index');
    }

    return data.versions[0].version;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get latest version: ${error.message}`);
    }
    throw new Error('Failed to get latest version: Unknown error');
  }
}

/**
 * Get version data for a specific version string
 *
 * @param {string} version - Version string to look up (e.g., "v0.1.4")
 * @returns {Promise<import('./desktop').DesktopVersion | undefined>} Version data or undefined if not found
 */
export async function getVersion(version: string): Promise<import('./desktop').DesktopVersion | undefined> {
  try {
    const data = await getVersionIndex();
    return data.versions.find(v => v.version === version);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get version ${version}: ${error.message}`);
    }
    throw new Error(`Failed to get version ${version}: Unknown error`);
  }
}

/**
 * Get all available versions
 *
 * @returns {Promise<string[]>} Array of version strings
 */
export async function getAllVersions(): Promise<string[]> {
  try {
    const data = await getVersionIndex();
    return data.versions.map(v => v.version);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get all versions: ${error.message}`);
    }
    throw new Error('Failed to get all versions: Unknown error');
  }
}
