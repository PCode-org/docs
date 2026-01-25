# docusaurus-site Spec Delta

## MODIFIED Requirements

### Requirement: GitHub Actions Deployment Workflow

The documentation site MUST use GitHub Actions for continuous deployment to GitHub Pages using the official GitHub Pages deployment actions (`actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`), with a separated build and deploy job structure for improved maintainability and performance.

#### Scenario: Workflow triggers on main branch push

- **GIVEN** the GitHub Actions workflow file exists at `.github/workflows/deploy.yml`
- **WHEN** code is pushed to the `main` branch
- **THEN** the workflow SHALL automatically trigger
- **AND** the workflow SHALL execute the build and deploy jobs

#### Scenario: Workflow uses separated build and deploy jobs

- **GIVEN** the GitHub Actions workflow is executing
- **WHEN** the workflow processes the deployment
- **THEN** the workflow SHALL execute a `build` job first
- **AND** the build job SHALL checkout code, setup Node.js, install dependencies, and build the site
- **AND** the build job SHALL upload the build artifact using `actions/upload-pages-artifact@v3`
- **AND** the workflow SHALL execute a `deploy` job after successful build
- **AND** the deploy job SHALL depend on the build job using `needs: build`
- **AND** the deploy job SHALL deploy the artifact using `actions/deploy-pages@v4`

#### Scenario: Build job uploads correct artifact

- **GIVEN** the build job has completed the site build
- **WHEN** the build job reaches the artifact upload step
- **THEN** the build job SHALL use `actions/upload-pages-artifact@v3`
- **AND** the artifact path SHALL be `./build` (Docusaurus build output directory)
- **AND** the artifact SHALL be uploaded successfully for deployment

#### Scenario: Deploy job uses GitHub Pages environment

- **GIVEN** the deploy job is ready to deploy
- **WHEN** the deploy job executes
- **THEN** the deploy job SHALL be configured with `environment: github-pages`
- **AND** the environment SHALL provide `url: ${{ steps.deployment.outputs.page_url }}`
- **AND** the deployment URL SHALL be available in the workflow run summary

#### Scenario: Workflow uses minimal required permissions

- **GIVEN** the GitHub Actions workflow file is configured
- **WHEN** examining the permissions section
- **THEN** the workflow SHALL have `contents: read` permission (not write)
- **AND** the workflow SHALL have `pages: write` permission
- **AND** the workflow SHALL have `id-token: write` permission
- **AND** the workflow SHALL NOT have unnecessary permissions beyond deployment requirements

#### Scenario: Concurrency controls deployment behavior

- **GIVEN** the workflow is configured with concurrency settings
- **WHEN** multiple deployments are triggered concurrently
- **THEN** the workflow SHALL use `concurrency: group: "pages"`
- **AND** the workflow SHALL set `cancel-in-progress: false` to allow ongoing deployments to complete

#### Scenario: Build process maintains existing configuration

- **GIVEN** the build job is executing
- **WHEN** the build job runs the build steps
- **THEN** the build job SHALL use Node.js version 20
- **AND** the build job SHALL use npm cache with `cache: "npm"`
- **AND** the build job SHALL run `npm ci` to install dependencies
- **AND** the build job SHALL run `npm run build` to generate the static site
- **AND** the build job SHALL pass `CLARITY_PROJECT_ID` secret to the build environment if configured

#### Scenario: GitHub Pages source is configured correctly

- **GIVEN** the repository settings are configured for GitHub Pages
- **WHEN** viewing the Pages settings in GitHub repository
- **THEN** the Source SHALL be set to "GitHub Actions"
- **AND** the source SHALL NOT be set to "Deploy from a branch"
- **AND** no custom source branch (e.g., `gh-pages`) SHALL be configured

#### Scenario: Deployment succeeds without gh-pages branch

- **GIVEN** the workflow has completed successfully
- **WHEN** examining the repository branches
- **THEN** a `gh-pages` branch SHALL NOT exist
- **AND** the site SHALL be deployed successfully to GitHub Pages
- **AND** the deployment SHALL use GitHub's internal deployment infrastructure

#### Scenario: Workflow handles deployment failures gracefully

- **GIVEN** the workflow is executing
- **WHEN** the build job fails (e.g., build errors, test failures)
- **THEN** the deploy job SHALL NOT execute
- **AND** the workflow SHALL report a failure status
- **AND** the previous deployment SHALL remain unchanged
- **AND** the workflow SHALL NOT deploy a broken build

#### Scenario: Node.js version matches project requirements

- **GIVEN** the build job is configuring the Node.js environment
- **WHEN** the build job runs `actions/setup-node@v4`
- **THEN** the `node-version` SHALL be set to "20"
- **AND** the version SHALL meet the project's minimum requirement of Node.js >=18.0
- **AND** the version SHALL align with the reference implementation (docker-compose-builder)

#### Scenario: Environment variables are passed to build

- **GIVEN** the build job is executing the build step
- **WHEN** the build job runs `npm run build`
- **THEN** the build step SHALL have access to `CLARITY_PROJECT_ID` from secrets if configured
- **AND** the environment variable SHALL be available to the Docusaurus build process
- **AND** Microsoft Clarity integration SHALL work correctly in the built site

#### Scenario: Deployment URL is accessible

- **GIVEN** the workflow has completed successfully
- **WHEN** a user accesses the deployment URL provided by the `github-pages` environment
- **THEN** the site SHALL load correctly
- **AND** all static assets SHALL be served
- **AND** all documentation pages SHALL be accessible
- **AND** the site SHALL function identically to the production deployment

#### Scenario: Workflow aligns with reference implementation

- **GIVEN** the workflow is implemented
- **WHEN** comparing `.github/workflows/deploy.yml` with the reference project at `/home/newbe36524/repos/newbe36524/docker-compose-builder/.github/workflows/deploy.yml`
- **THEN** both workflows SHALL use the same deployment pattern (artifact upload + deploy-pages)
- **AND** both workflows SHALL use the same GitHub Actions versions (`@v3` for upload, `@v4` for deploy)
- **AND** both workflows SHALL follow the same separated job structure
- **AND** the implementation SHALL maintain consistency across projects

---

## REMOVED Requirements

### ~~Requirement: GitHub Actions Deployment~~ (REMOVED)

**This requirement has been replaced by the MODIFIED requirement above. The previous requirement using `peaceiris/actions-gh-pages@v3` and `gh-pages` branch deployment is no longer applicable.**

The documentation site MUST use GitHub Actions for continuous deployment to GitHub Pages using the `peaceiris/actions-gh-pages@v3` action, which pushes the built static site to the `gh-pages` branch for publication.

**REMOVED** - This requirement described the old deployment method using `peaceiris/actions-gh-pages@v3` with `gh-pages` branch. It has been replaced by the new MODIFIED requirement using GitHub Pages native deployment with `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`.
