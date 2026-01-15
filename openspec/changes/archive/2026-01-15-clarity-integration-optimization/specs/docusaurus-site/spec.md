# docusaurus-site Specification Delta

## MODIFIED Requirements

### Requirement: Third-Party Analytics Integration

The documentation site MUST support integration with third-party analytics tools through component-level script injection using `react-helmet`. The site MUST also support content region attribution through `data-clarity-region` attributes to enable more granular analytics.

#### Scenario: Clarity analytics script loads via Footer component

- **GIVEN** the Footer component has been swizzled to inject analytics scripts
- **WHEN** any page of the documentation site is loaded
- **THEN** the Microsoft Clarity analytics script MUST be injected into the page `<head>` via `react-helmet`
- **AND** the script MUST load asynchronously to avoid blocking page rendering
- **AND** the script MUST use the Clarity Project ID from the `CLARITY_PROJECT_ID` environment variable
- **AND** no console errors MUST occur related to the script

#### Scenario: Clarity script is injected only when Project ID is configured

- **GIVEN** the Footer component uses environment variables for sensitive configuration
- **WHEN** the application builds and renders
- **THEN** the Clarity script MUST only be injected when `CLARITY_PROJECT_ID` environment variable is set
- **AND** no script tag MUST be present in the HTML when the variable is not set
- **AND** TypeScript type checking MUST pass without errors

#### Scenario: Component-level script injection does not break build process

- **GIVEN** the Clarity script is injected via the swizzled Footer component
- **WHEN** `npm run build` is executed
- **THEN** the build MUST complete successfully
- **AND** no TypeScript errors MUST be reported
- **AND** the built site MUST include the Clarity script in the HTML output
- **AND** the development server (`npm start`) MUST start without errors

#### Scenario: Analytics script is privacy-conscious

- **GIVEN** the Clarity analytics script is integrated via component
- **WHEN** users access the documentation site
- **THEN** the script MUST NOT collect personal identity information (PII) by default
- **AND** user behavior data MUST be anonymized
- **AND** the integration MUST comply with Microsoft Clarity's privacy standards
- **AND** no additional cookies MUST be required for basic functionality

#### Scenario: Clarity content region attribution

- **GIVEN** the DocItem component has been swizzled to add region attributes
- **WHEN** a documentation page is rendered
- **THEN** the main article content MUST include a `data-clarity-region="article"` attribute
- **AND** the attribute MUST be applied to the primary content container element
- **AND** Clarity MUST be able to distinguish user behavior within the article region from other page regions

#### Scenario: Content region attribution is validated

- **GIVEN** the swizzled DocItem component is deployed
- **WHEN** a developer inspects the page HTML using browser developer tools
- **THEN** the `data-clarity-region="article"` attribute MUST be visible on the main content wrapper
- **AND** the attribute MUST NOT cause any HTML validation errors
- **AND** the attribute MUST not affect the visual rendering or styling of the page

#### Scenario: Legacy docusaurus.config.ts scripts configuration is removed

- **GIVEN** the Clarity script has been migrated to component-level injection
- **WHEN** the `docusaurus.config.ts` file is examined
- **THEN** the `scripts` array MUST NOT contain Clarity-related entries
- **AND** the `CLARITY_PROJECT_ID` constant MUST NOT be defined in the config file
- **AND** the configuration MUST remain valid for Docusaurus
