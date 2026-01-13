## ADDED Requirements

### Requirement: Cross-Platform Documentation with Tabs Component

Documentation pages that include platform-specific instructions for Windows, macOS, and Linux MUST use Docusaurus Tabs and TabItem components to organize content by platform.

#### Scenario: Installation guide uses Tabs for platform-specific instructions

- **GIVEN** the installation guide (`docs/quick-start/installation.md`) includes instructions for Docker, Node.js, and software package deployment
- **WHEN** a user views the installation guide
- **THEN** the guide MUST use `<Tabs>` and `<TabItem>` components to separate Windows, macOS, and Linux instructions
- **AND** each platform MUST have its own `<TabItem>` with `value` attribute set to "win", "mac", or "linux"
- **AND** each `<TabItem>` MUST have a `label` attribute set to "Windows", "macOS", or "Linux"
- **AND** users can click between platform tabs to view only their operating system's instructions

#### Scenario: Code blocks within TabItems maintain syntax highlighting

- **GIVEN** a TabItem contains command-line instructions
- **WHEN** the TabItem includes a code block for bash or PowerShell commands
- **THEN** the code block MUST use appropriate language tags (`bash`, `powershell`, `csharp`, `fsharp`)
- **AND** Prism.js syntax highlighting MUST be applied correctly within the TabItem
- **AND** the code block MUST display a title attribute when specified (e.g., `title="在 Ubuntu/Debian 上安装 Docker"`)

#### Scenario: Tabs improve mobile reading experience

- **GIVEN** a user is viewing documentation on a mobile device
- **WHEN** the page contains cross-platform instructions organized with Tabs
- **THEN** the user MUST be able to tap on platform labels to switch between platforms
- **AND** the page length MUST be reduced compared to listing all platforms sequentially
- **AND** scrolling MUST be minimized as users only see their selected platform's content

#### Scenario: MDX import statements are present

- **GIVEN** a markdown file uses Tabs components
- **WHEN** the file is parsed as MDX
- **THEN** the file MUST import Tabs and TabItem from `@theme/Tabs` and `@theme/TabItem`
- **AND** the import statements MUST be placed at the top of the file after frontmatter
- **AND** the file extension MAY remain `.md` as Docusaurus supports MDX in `.md` files

#### Scenario: Build validation passes with Tabs

- **GIVEN** documentation files have been updated to use Tabs components
- **WHEN** `npm run build` is executed
- **THEN** the build MUST complete successfully without MDX parsing errors
- **AND** `npm run typecheck` MUST pass without TypeScript errors
- **AND** the build MUST not report any broken links (respecting `onBrokenLinks: 'throw'` configuration)

#### Scenario: Tabs maintain consistency across documentation

- **GIVEN** multiple documentation pages contain cross-platform instructions
- **WHEN** different pages use Tabs components
- **THEN** all Tabs MUST use the same platform naming convention: "Windows", "macOS", "Linux"
- **AND** all TabItem value attributes MUST use consistent naming: "win", "mac", "linux"
- **AND** the visual appearance of Tabs MUST be consistent across all pages

#### Scenario: Search engines can index TabItem content

- **GIVEN** a documentation page uses Tabs to organize platform-specific content
- **WHEN** a user searches for commands or instructions using the site search
- **THEN** search MUST be able to find content within TabItems
- **AND** clicking a search result MUST navigate to the correct page and automatically open the relevant TabItem

#### Scenario: Future documentation follows Tabs convention

- **GIVEN** a contributor is creating new documentation with platform-specific instructions
- **WHEN** the documentation includes Windows, macOS, or Linux specific steps
- **THEN** the contributor MUST use Tabs and TabItem components instead of bullet lists
- **AND** the contributor MUST follow the established naming conventions for values and labels
- **AND** the contributor MUST ensure code blocks within TabItems have appropriate language tags
