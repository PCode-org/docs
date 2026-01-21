# Tasks: Homepage Activity Metrics Display

## 1. Data Layer Implementation

- [x] 1.1 Create `data/` directory if it does not exist
- [x] 1.2 Create initial `data/activity-metrics.json` file with placeholder data structure
- [x] 1.3 Verify JSON file is valid and can be imported by Docusaurus

## 2. React Components Implementation

- [x] 2.1 Create `src/components/home/ActivityMetricsSection.tsx` component
  - Import activity metrics data from JSON file
  - Implement ActivityMetricCard subcomponent for individual metrics
  - Add error handling for missing or invalid data
- [x] 2.2 Create `src/components/home/activityMetricsSection.module.css` stylesheet
  - Define card container layout (flexbox or grid)
  - Implement responsive breakpoints for desktop/tablet/mobile
  - Add gradient border effect matching existing homepage cards
  - Add hover effects (translateY, shadow enhancement)
  - Ensure theme variable usage for light/dark mode compatibility
- [x] 2.3 Verify component renders correctly with sample data
- [x] 2.4 Test responsive behavior on different screen sizes

## 3. Homepage Integration

- [x] 3.1 Modify `src/pages/index.tsx` to import ActivityMetricsSection
- [x] 3.2 Add `<ActivityMetricsSection />` component between HeroSection and FeaturesShowcase
- [x] 3.3 Verify homepage renders without errors
- [x] 3.4 Test component placement and visual consistency with existing sections

## 4. Data Update Script

- [x] 4.1 Create `scripts/update-activity-metrics.js` Node.js script
  - Implement Docker Hub API fetch function
  - Implement Microsoft Clarity API fetch function
  - Implement data merging and JSON file writing logic
  - Add error handling and fallback to previous data
- [x] 4.2 Configure Docker Hub API endpoint and response parsing
  - Use `https://hub.docker.com/v2/repositories/hagicode/hagicode` endpoint
  - Extract `pull_count` from response
- [x] 4.3 Configure Microsoft Clarity API endpoint and authentication
  - Use Clarity Data Export API endpoint
  - Implement Bearer token authentication with `CLARITY_API_KEY`
  - Request metrics with 3-day date range
- [x] 4.4 Implement Git operations in script
  - Create new branch with timestamp name
  - Commit the updated `activity-metrics.json` file
  - Push branch to remote repository
- [x] 4.5 Test script locally with mock or real API data

## 5. GitHub Actions Workflow

- [x] 5.1 Create `.github/workflows/update-activity-metrics.yml` workflow file
  - Configure scheduled trigger (cron: `0 0 * * *` for daily UTC 00:00)
  - Add manual trigger option (`workflow_dispatch`)
- [x] 5.2 Configure workflow permissions
  - Set `permissions: contents: write`
  - Set `permissions: pull-requests: write`
- [x] 5.3 Configure workflow environment variables and secrets
  - Add `CLARITY_API_KEY` secret reference
  - Add `CLARITY_PROJECT_ID` environment variable or secret
  - Add optional `DOCKER_HUB_USERNAME` and `DOCKER_HUB_PASSWORD` secrets
- [x] 5.4 Implement workflow steps
  - Checkout repository code
  - Setup Node.js environment
  - Fetch metrics from APIs directly in workflow
  - Create pull request using GitHub CLI or API
- [x] 5.5 Add workflow step to close previous activity metrics PRs
- [ ] 5.6 Test workflow execution manually via `workflow_dispatch`

## 6. GitHub Secrets Configuration

- [ ] 6.1 Add `CLARITY_API_KEY` to repository secrets
- [ ] 6.2 Add `CLARITY_PROJECT_ID` to repository secrets or environment
- [x] 6.3 (Optional) Add `DOCKER_HUB_USERNAME` and `DOCKER_HUB_PASSWORD` if authentication is required
- [x] 6.4 Verify secrets are correctly referenced in workflow file

## 7. Testing and Validation

- [x] 7.1 Test ActivityMetricsSection component with various data scenarios
  - Valid data from JSON file
  - Missing JSON file (404)
  - Invalid JSON format
  - Missing or null metric values
- [x] 7.2 Test responsive design on multiple devices
  - Desktop view (>1024px)
  - Tablet view (768px-1024px)
  - Mobile view (<768px)
- [x] 7.3 Test theme switching (light/dark mode)
- [x] 7.4 Run local build (`npm run build`) and verify no errors
- [x] 7.5 Run TypeScript check (`npm run typecheck`) and verify no type errors

## 8. Documentation

- [ ] 8.1 Update README.md with information about the activity metrics feature
- [ ] 8.2 Document the GitHub Actions workflow in project documentation
- [ ] 8.3 Add instructions for updating API credentials in secrets
- [ ] 8.4 (Optional) Add a note in `openspec/project.md` about the new automation workflow

## 9. Code Quality

- [x] 9.1 Ensure all new code follows project TypeScript conventions
- [x] 9.2 Ensure all CSS uses project CSS variables
- [x] 9.3 Add inline comments for complex logic in update script
- [x] 9.4 Verify no console errors or warnings in browser dev tools

## 10. Deployment Verification

- [ ] 10.1 Merge pull request with initial implementation
- [ ] 10.2 Verify GitHub Pages deployment succeeds
- [ ] 10.3 Check homepage on deployed site displays activity metrics correctly
- [ ] 10.4 Monitor first scheduled GitHub Actions workflow execution
- [ ] 10.5 Verify pull request is created with updated metrics data
- [ ] 10.6 Merge the metrics update PR and verify data is reflected on site
