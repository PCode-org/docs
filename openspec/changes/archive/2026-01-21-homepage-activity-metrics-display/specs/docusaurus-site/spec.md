## ADDED Requirements

### Requirement: Homepage Activity Metrics Display

The documentation site MUST include an activity metrics section on the homepage that displays project activity data including Docker Hub pull count, active users count, and active sessions count. The metrics SHALL be loaded from a static JSON file and updated automatically via GitHub Actions.

#### Scenario: Activity metrics section displays on homepage

- **GIVEN** a user navigates to the Hagicode documentation homepage
- **WHEN** the page loads completely
- **THEN** an activity metrics section SHALL be displayed between the Hero Section and Features Showcase
- **AND** the section SHALL include a heading "📊 项目活跃度" or "Project Activity Metrics"
- **AND** three metric cards SHALL be displayed in a horizontal row

#### Scenario: Docker Hub pull count is displayed

- **GIVEN** the activity metrics section is rendered
- **WHEN** the Docker Hub metric card is displayed
- **THEN** the card SHALL include a whale emoji (🐳) or similar icon
- **AND** the card SHALL display the title "Docker Hub"
- **AND** the card SHALL display the pull count value from `activity-metrics.json`
- **AND** the card SHALL display "Pulls" as the value description
- **AND** the pull count SHALL represent the total download count from Docker Hub

#### Scenario: Active users count is displayed

- **GIVEN** the activity metrics section is rendered
- **WHEN** the active users metric card is displayed
- **THEN** the card SHALL include a users emoji (👥) or similar icon
- **AND** the card SHALL display the title "活跃用户"
- **AND** the card SHALL display the active users value from `activity-metrics.json`
- **AND** the card SHALL display "过去3天" (Last 3 days) as the value description
- **AND** the users count SHALL represent active users from Microsoft Clarity

#### Scenario: Active sessions count is displayed

- **GIVEN** the activity metrics section is rendered
- **WHEN** the active sessions metric card is displayed
- **THEN** the card SHALL include a speech bubble emoji (💬) or similar icon
- **AND** the card SHALL display the title "活跃会话"
- **AND** the card SHALL display the active sessions value from `activity-metrics.json`
- **AND** the card SHALL display "当前数量" (Current Count) as the value description
- **AND** the sessions count SHALL represent active sessions from Microsoft Clarity

#### Scenario: Metric cards match homepage design system

- **GIVEN** the activity metrics section is rendered on the homepage
- **WHEN** comparing the metric cards to other homepage elements
- **THEN** the cards SHALL use the same border-radius (24px) as other feature cards
- **AND** the cards SHALL display a gradient border effect on hover
- **AND** the cards SHALL use site CSS variables for colors and shadows
- **AND** the cards SHALL adapt properly to light and dark themes

#### Scenario: Activity metrics section is responsive

- **GIVEN** the activity metrics section is displayed on the homepage
- **WHEN** viewed on different screen sizes
- **THEN** on desktop (>1024px) cards SHALL be displayed in 3 columns
- **AND** on tablet (768px-1024px) cards SHALL be displayed in 3 columns
- **AND** on mobile (<768px) cards SHALL be stacked vertically in a single column
- **AND** cards SHALL scale to fit their container at all screen sizes

#### Scenario: Activity metrics are loaded from static JSON file

- **GIVEN** the ActivityMetricsSection component is mounted
- **WHEN** the component initializes
- **THEN** the component SHALL import data from `@site/src/data/activity-metrics.json`
- **AND** the JSON file SHALL contain `dockerHub.pullCount`, `clarity.activeUsers`, and `clarity.activeSessions` properties
- **AND** the data SHALL be rendered without additional API requests
- **AND** the page SHALL not block rendering while loading metrics

#### Scenario: Activity metrics handle missing or invalid data

- **GIVEN** the ActivityMetricsSection component attempts to load data
- **WHEN** the `activity-metrics.json` file does not exist or contains invalid JSON
- **THEN** the component SHALL gracefully handle the error
- **AND** the component MAY display placeholder values (0 or "-")
- **AND** the component SHALL NOT cause the page to crash
- **AND** console errors MAY be logged for debugging

#### Scenario: Metric cards display hover effects

- **GIVEN** the activity metrics section is displayed
- **WHEN** a user hovers over a metric card
- **THEN** the card SHALL display a visual hover effect
- **AND** the effect SHALL use CSS transitions
- **AND** the effect SHALL not cause layout shifts
- **AND** the effect SHALL be consistent across all three metric cards

---

### Requirement: Activity Metrics Data File

The documentation site MUST include a `activity-metrics.json` data file that stores project activity metrics in a structured format. The file SHALL be automatically updated by a GitHub Actions workflow.

#### Scenario: Activity metrics JSON file exists

- **GIVEN** the documentation site is built
- **WHEN** the build process accesses `src/data/activity-metrics.json`
- **THEN** the file SHALL exist in the `src/data/` directory
- **AND** the file SHALL contain valid JSON data
- **AND** the file SHALL include a `lastUpdated` timestamp property

#### Scenario: JSON file contains required metrics structure

- **GIVEN** the `activity-metrics.json` file exists
- **WHEN** the file is parsed
- **THEN** the file SHALL contain a `dockerHub` object with `pullCount` and `repository` properties
- **AND** the file SHALL contain a `clarity` object with `activeUsers`, `activeSessions`, and `dateRange` properties
- **AND** the file SHALL contain a `lastUpdated` ISO 8601 timestamp

#### Scenario: JSON data format is valid

- **GIVEN** the `activity-metrics.json` file is read by the application
- **WHEN** the JSON is parsed
- **THEN** `pullCount` SHALL be a number greater than or equal to 0
- **AND** `activeUsers` SHALL be a number greater than or equal to 0
- **AND** `activeSessions` SHALL be a number greater than or equal to 0
- **AND** `lastUpdated` SHALL be a valid ISO 8601 date string

#### Scenario: Example JSON structure

- **GIVEN** a new `activity-metrics.json` file is created
- **WHEN** the file is populated with initial data
- **THEN** the file SHALL follow this structure:
```json
{
  "lastUpdated": "2026-01-21T00:00:00Z",
  "dockerHub": {
    "pullCount": 12345,
    "repository": "hagicode/hagicode"
  },
  "clarity": {
    "activeUsers": 1234,
    "activeSessions": 456,
    "dateRange": "3Days"
  }
}
```

---

### Requirement: GitHub Actions Activity Metrics Update Workflow

The documentation site MUST include a GitHub Actions workflow that automatically fetches activity metrics from external APIs and updates the `activity-metrics.json` file via pull request.

#### Scenario: Workflow runs on daily schedule

- **GIVEN** the GitHub Actions workflow file exists at `.github/workflows/update-activity-metrics.yml`
- **WHEN** the scheduled trigger time is reached (UTC 00:00 daily)
- **THEN** the workflow SHALL automatically execute
- **AND** the workflow SHALL check out the repository code
- **AND** the workflow SHALL fetch the latest activity metrics

#### Scenario: Workflow fetches Docker Hub pull count

- **GIVEN** the GitHub Actions workflow is running
- **WHEN** the workflow executes the Docker Hub data fetching step
- **THEN** the workflow SHALL make a GET request to `https://hub.docker.com/v2/repositories/hagicode/hagicode` (or configured repository)
- **AND** the workflow SHALL extract the `pull_count` value from the API response
- **AND** the workflow SHALL handle API errors gracefully

#### Scenario: Workflow fetches Microsoft Clarity metrics

- **GIVEN** the GitHub Actions workflow is running
- **WHEN** the workflow executes the Clarity data fetching step
- **THEN** the workflow SHALL make a request to the Microsoft Clarity Data Export API
- **AND** the workflow SHALL authenticate using the `CLARITY_API_KEY` secret
- **AND** the workflow SHALL request metrics for the `CLARITY_PROJECT_ID` with a 3-day date range
- **AND** the workflow SHALL extract active users and active sessions from the response

#### Scenario: Workflow creates and commits data file

- **GIVEN** the workflow has successfully fetched metrics from all sources
- **WHEN** the workflow writes the data file
- **THEN** the workflow SHALL create or update `src/data/activity-metrics.json`
- **AND** the file SHALL contain the combined metrics from all data sources
- **AND** the file SHALL include the current timestamp as `lastUpdated`
- **AND** the file SHALL be valid JSON

#### Scenario: Workflow creates pull request for data update

- **GIVEN** the workflow has written the updated `activity-metrics.json` file
- **WHEN** the workflow creates a pull request
- **THEN** the workflow SHALL create a new Git branch named `update-activity-metrics-{timestamp}`
- **AND** the workflow SHALL commit the data file with a descriptive commit message
- **AND** the workflow SHALL push the branch to the repository
- **AND** the workflow SHALL create a pull request with a descriptive title
- **AND** the pull request title SHALL include the date and summary of changes

#### Scenario: Workflow handles API failures gracefully

- **GIVEN** the GitHub Actions workflow is executing
- **WHEN** an external API request fails (Docker Hub or Clarity)
- **THEN** the workflow SHALL log the error
- **AND** the workflow MAY use the previous day's values as fallback
- **AND** the workflow SHALL still create a pull request if at least one data source succeeded
- **AND** the workflow SHALL fail the run if all data sources fail

#### Scenario: Workflow can be triggered manually

- **GIVEN** the GitHub Actions workflow file exists
- **WHEN** a user triggers the workflow manually via `workflow_dispatch`
- **THEN** the workflow SHALL execute immediately
- **AND** the workflow SHALL follow the same steps as the scheduled execution
- **AND** the workflow SHALL create a new pull request with updated metrics

#### Scenario: Workflow has required permissions

- **GIVEN** the GitHub Actions workflow is configured
- **WHEN** the workflow attempts to create branches and pull requests
- **THEN** the workflow SHALL have `contents: write` permission
- **AND** the workflow SHALL have `pull-requests: write` permission
- **AND** the workflow SHALL be able to push branches and create PRs

#### Scenario: Workflow uses environment variables for API credentials

- **GIVEN** the GitHub Actions workflow is configured
- **WHEN** the workflow accesses external APIs
- **THEN** the workflow SHALL read `CLARITY_API_KEY` from GitHub Secrets
- **AND** the workflow SHALL read `CLARITY_PROJECT_ID` from GitHub Secrets or environment variable
- **AND** the workflow SHALL NOT hardcode API credentials in the workflow file
- **AND** optional `DOCKER_HUB_USERNAME` and `DOCKER_HUB_PASSWORD` MAY be used if authentication is required

#### Scenario: Workflow creates a new PR if previous PR exists

- **GIVEN** an older activity metrics pull request already exists
- **WHEN** the workflow executes and creates a new pull request
- **THEN** the workflow MAY close the previous pull request
- **AND** the workflow SHALL create a new pull request with the latest data
- **AND** this ensures only one activity metrics PR is active at a time
