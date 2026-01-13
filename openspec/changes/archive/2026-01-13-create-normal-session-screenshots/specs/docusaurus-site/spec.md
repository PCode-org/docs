# docusaurus-site Specification Delta

## MODIFIED Requirements

### Requirement: Quick Start Conversation Session Documentation

The documentation site SHALL provide a comprehensive guide for creating and using conversation sessions in PCode, as the third document in the Quick Start series. The guide SHALL include visual demonstrations through screenshots showing actual PCode interface interactions for both read-only and edit modes.

#### Scenario: User creates their first conversation session

- **GIVEN** the user has completed PCode installation
- **AND** the user has created their first project
- **WHEN** the user navigates to the Quick Start - Creating a Conversation Session guide
- **THEN** the guide shall explain how to locate the session list
- **AND** the guide shall explain how to click "Add Chat" button
- **AND** the guide shall show screenshots of the session list interface
- **AND** the guide shall show screenshots of the new conversation window
- **AND** the user shall be able to successfully create a conversation session

#### Scenario: User understands read-only vs. edit mode

- **GIVEN** the user is reading the conversation session guide
- **WHEN** the user reaches the "Understanding Modes" section
- **THEN** the guide shall explain read-only mode is the default
- **AND** the guide shall list what AI can do in read-only mode (read files, analyze, describe)
- **AND** the guide shall list what AI cannot do in read-only mode (modify files)
- **AND** the guide shall provide a practical example with screenshots: "了解一下这个项目" (understand this project)
- **AND** the screenshots shall demonstrate AI analyzing and summarizing project structure in read-only mode
- **AND** the guide shall explain how to switch to edit mode with screenshots
- **AND** the guide shall explain when to use edit mode

#### Scenario: User sees edit mode demonstration

- **GIVEN** the user is reading the conversation session guide
- **WHEN** the user reaches the "Edit Mode" section
- **THEN** the guide shall show screenshots of switching to edit mode
- **AND** the guide shall provide a practical example with screenshots: requesting AI to update README file
- **AND** the screenshots shall demonstrate AI executing code modifications
- **AND** the guide shall explain the permissions available in edit mode
- **AND** the guide shall show the resulting file changes in screenshots

#### Scenario: User learns about session types

- **GIVEN** the user is reading the conversation session guide
- **WHEN** the user reaches the "Session Types" section
- **THEN** the guide shall describe conversation sessions (chat-like interaction)
- **AND** the guide shall briefly mention idea sessions (idea-to-execution workflow)
- **AND** the guide shall clarify that this document covers conversation sessions
- **AND** the guide shall indicate that idea sessions are covered in the next document

#### Scenario: User finds appropriate use cases

- **GIVEN** the user has created a conversation session
- **WHEN** the user reads the "Typical Use Cases" section
- **THEN** the guide shall provide examples for analysis and understanding (project summary, code explanation)
- **AND** the guide shall provide examples for review and feedback (code review, bug spotting)
- **AND** the guide shall provide examples for planning and design (task breakdown, implementation planning)
- **AND** the guide shall provide examples for code changes in edit mode (refactoring, bug fixes)
- **AND** each use case shall reference relevant screenshots

#### Scenario: User accesses Chinese translation

- **GIVEN** the user prefers Chinese language
- **WHEN** the user switches to Chinese (zh-CN)
- **THEN** the conversation session guide shall display in Chinese
- **AND** the title shall be "创建普通会话"
- **AND** all sections shall be translated accurately
- **AND** technical terms shall use consistent Chinese terminology
- **AND** UI elements shall match the actual PCode interface
- **AND** all screenshots shall display correctly in the Chinese version

#### Scenario: User compares with traditional IDEs

- **GIVEN** the user has experience with other AI-powered IDEs
- **WHEN** the user reads the "Comparison with Traditional IDEs" section
- **THEN** the guide shall mention similarity to VS Code Copilot Chat
- **AND** the guide shall mention similarity to Cursor AI chat
- **AND** the guide shall help the user transfer existing knowledge to PCode

#### Scenario: User navigates to next document

- **GIVEN** the user has completed the conversation session guide
- **WHEN** the user reaches the "Next Steps" section
- **THEN** the guide shall provide a preview of idea sessions
- **AND** the guide shall link to the next quick-start document (Creating an Idea Session)
- **AND** the user shall understand the progression from simple chat to advanced workflow

#### Scenario: User views visual workflow diagrams

- **GIVEN** the user is learning about conversation sessions
- **WHEN** the user views the "Understanding Modes" section
- **THEN** the guide shall include a Mermaid flowchart diagram showing mode switching flow
- **AND** the guide shall include Mermaid sequence diagrams for read-only mode workflow
- **AND** the guide shall include Mermaid sequence diagrams for edit mode workflow
- **AND** the diagrams shall visually demonstrate the permission differences between modes

#### Scenario: All screenshots load correctly

- **GIVEN** the conversation session document includes screenshots
- **WHEN** the page loads in a browser
- **THEN** all screenshots SHALL load without broken image errors
- **AND** screenshots SHALL use correct Docusaurus static asset paths (`/img/create-normal-session/*.png`)
- **AND** screenshots SHALL include descriptive alt text for accessibility
- **AND** screenshots SHALL be responsive and display correctly on different screen sizes

#### Scenario: User learns session management

- **GIVEN** the user has created conversation sessions
- **WHEN** the user reaches the session management section
- **THEN** the guide shall show how to delete conversation sessions with screenshots
- **AND** the screenshots shall demonstrate the deletion process
- **AND** the guide shall explain when to delete or archive sessions
