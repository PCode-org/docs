# Version Monitor Specification Delta

## MODIFIED Requirements

### Requirement: Version Index File Updates
The version monitor script SHALL update all version index files across the monorepo when a new version is detected from the source API.

#### Scenario: New version detected - both files updated
- **WHEN** the version monitor detects a version newer than the local version
- **THEN** both `apps/docs/public/version-index.json` and `apps/website/public/version-index.json` SHALL be updated with the same version data
- **AND** both files SHALL be written atomically (either both succeed or both fail)

#### Scenario: Write failure - rollback
- **WHEN** writing to one of the version index files fails
- **THEN** the script SHALL exit with an error
- **AND** no partial update SHALL occur (both files must be updated or neither)

### Requirement: Local Version Comparison
The version monitor script SHALL compare the source API version against the local version from the primary version index file.

#### Scenario: Version comparison reads primary file
- **WHEN** loading the local version for comparison
- **THEN** the script SHALL read from `apps/docs/public/version-index.json` as the primary source
- **AND** this file SHALL be used to determine if an update is needed

## ADDED Requirements

### Requirement: Atomic Multi-File Version Updates
The version monitor script SHALL ensure version data consistency across all version index files in the monorepo.

#### Scenario: Successful dual-file update
- **GIVEN** a new version has been detected from the source API
- **WHEN** the version data is written to the local files
- **THEN** the same version data SHALL be written to `apps/docs/public/version-index.json`
- **AND** the same version data SHALL be written to `apps/website/public/version-index.json`
- **AND** both files SHALL contain identical content

#### Scenario: GitHub Actions stages both files
- **GIVEN** the version monitor script has successfully updated both version files
- **WHEN** the GitHub Actions workflow creates a commit
- **THEN** both `apps/docs/public/version-index.json` and `apps/website/public/version-index.json` SHALL be staged
- **AND** the commit message SHALL reference the new version
