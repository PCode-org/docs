## ADDED Requirements

### Requirement: Docker Container User Permission Consistency Documentation

The Docker Compose deployment documentation MUST include a comprehensive "User Permission Management" section that explains container-to-host user ID mapping issues and provides actionable solutions.

#### Scenario: User encounters permission issues with mounted volumes

- **GIVEN** the user has deployed Hagicode using Docker Compose
- **AND** the user is using the root account on the host machine
- **WHEN** the Hagicode container attempts to write files to the mounted volume
- **THEN** permission errors MAY occur if the container's non-root user cannot write to host-owned files
- **AND** the documentation MUST explain this is caused by user ID mismatch between container and host

#### Scenario: User accesses user permission management section

- **GIVEN** the user is reading the Docker Compose deployment guide
- **WHEN** the user navigates to the "User Permission Management" section
- **THEN** the section MUST be located after the "Configuration Details" section
- **AND** the section MUST include:
  - Why user permissions matter
  - Solution 1: User ID mapping configuration (recommended)
  - Solution 2: Permission settings (quick but less secure)
  - Troubleshooting common permission issues

#### Scenario: User understands the root cause of permission issues

- **GIVEN** the user is experiencing permission problems
- **WHEN** the user reads the "Why User Permissions Matter" subsection
- **THEN** the documentation MUST explain:
  - Docker container user IDs are generated via Hash Code
  - Host container users (root) may not match container non-root users
  - This causes permission inconsistencies for mounted volumes
- **AND** the explanation MUST be written in clear Chinese
- **AND** technical terms MUST be preserved in English where appropriate

#### Scenario: User implements Solution 1 (User ID Mapping)

- **GIVEN** the user has chosen to use the recommended User ID Mapping solution
- **WHEN** the user follows the step-by-step instructions
- **THEN** the documentation MUST provide:
  1. Instructions to obtain the host user ID and group ID: `id username`
  2. Docker Compose configuration example with `PUID` and `PGID` environment variables
  3. Container restart command: `docker compose restart hagicode`
  4. Verification steps to confirm the configuration works
- **AND** the documentation MUST indicate this is the RECOMMENDED solution
- **AND** the documentation MUST explain this solution is more secure and suitable for production

#### Scenario: User implements Solution 2 (Permission Settings)

- **GIVEN** the user has chosen to use the Permission Settings solution for quick setup
- **WHEN** the user follows the step-by-step instructions
- **THEN** the documentation MUST provide:
  1. Instructions to create the working directory with root: `sudo mkdir -p /path/to/repos`
  2. Command to set directory permissions to 777: `sudo chmod 777 /path/to/repos`
  3. Verification command: `ls -la /path/to/repos`
- **AND** the documentation MUST indicate this is a QUICK but LESS SECURE solution
- **AND** the documentation MUST warn about security risks of 777 permissions
- **AND** the documentation MUST specify this is suitable for development environments only

#### Scenario: User troubleshoots permission issues

- **GIVEN** the user is experiencing permission-related errors
- **WHEN** the user reads the "Troubleshooting" subsection
- **THEN** the documentation MUST include a table of common issues with:
  - Problem symptoms (e.g., "Container cannot write files")
  - Possible causes (e.g., "User ID mismatch")
  - Solutions (e.g., "Configure PUID/PGID or set directory permissions")
- **AND** the documentation MUST provide diagnostic commands:
  - Check host file permissions: `ls -la /path/to/repos`
  - Check container user: `docker exec hagicode-app id`
  - Check container file permissions: `docker exec hagicode-app ls -la /app/workdir`

#### Scenario: User sees PUID/PGID in docker-compose.yml example

- **GIVEN** the user is viewing the example docker-compose.yml file
- **WHEN** the user examines the hagicode service environment variables
- **THEN** the example MUST include commented `PUID` and `PGID` environment variables
- **AND** comments MUST explain the purpose of these variables
- **AND** comments MUST reference the User Permission Management section for details
- **EXAMPLE**:
  ```yaml
  environment:
    # User and group IDs for file permissions
    # See User Permission Management section for details
    - PUID=1000
    - PGID=1000
  ```

#### Scenario: Documentation maintains consistency with existing style

- **GIVEN** the Docker Compose deployment guide already exists
- **WHEN** the new User Permission Management section is added
- **THEN** the section MUST use the same markdown formatting conventions
- **AND** the section MUST follow the same Chinese terminology style
- **AND** code blocks MUST use appropriate syntax highlighting (bash, yaml)
- **AND** the section MUST integrate seamlessly with existing content
