## ADDED Requirements

### Requirement: Empty State as New Version
The system SHALL treat the absence of a previous version state (empty state) as a new version scenario and trigger the version update processing flow.

#### Scenario: First run with empty state creates PR
- **WHEN** the version monitor script runs for the first time
- **AND** no previous version state exists (lastCheckedVersion and lastDeployedVersion are both null)
- **AND** a current version is successfully fetched from the source
- **THEN** the empty state is treated as a version change
- **AND** the script checks for existing pull requests
- **AND** if no PR exists, a new PR is created for the current version

#### Scenario: State file recovery triggers version sync
- **WHEN** the version state file is missing or corrupted
- **AND** the script creates a new initial state with null version values
- **AND** a current version is successfully fetched from the source
- **THEN** the empty state is treated as a version change
- **AND** the version update processing flow is triggered

#### Scenario: Empty state with existing PR skips creation
- **WHEN** the version monitor runs with an empty state
- **AND** an existing PR for the current version is found
- **THEN** no new PR is created
- **AND** the script logs that a PR already exists
- **AND** the script exits successfully

## MODIFIED Requirements

### Requirement: Version State Comparison
The version monitor script SHALL compare the current version against the previous version state to determine if a version change has occurred, treating empty state as a valid version change scenario.

#### Scenario: Empty state compared to current version
- **WHEN** comparing versions when lastVersion is null or undefined
- **AND** currentVersion is a valid version string
- **THEN** the comparison indicates a version change
- **AND** the version update processing flow continues

#### Scenario: Version unchanged
- **WHEN** comparing version "1.2.3" with version "1.2.3"
- **THEN** the comparison returns 0 (equal)
- **AND** no pull request is created

#### Scenario: New version is greater
- **WHEN** comparing version "1.2.4" with version "1.2.3"
- **THEN** the comparison returns 1 (greater)
- **AND** a pull request is created for the new version

#### Scenario: New version is lesser
- **WHEN** comparing version "1.2.2" with version "1.2.3"
- **THEN** the comparison returns -1 (lesser)
- **AND** no pull request is created

#### Scenario: Version with 'v' prefix is handled
- **WHEN** the version string starts with 'v' (e.g., "v1.2.3")
- **THEN** the prefix is stripped before comparison
- **AND** the comparison is performed on the numeric parts only
