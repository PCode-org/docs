## ADDED Requirements

### Requirement: Bilibili Video Player Component

The homepage MUST include a Bilibili video player component that displays the "每天哈基半小时，AI多任务编程实战" demonstration video with proper responsive design and theme support.

#### Scenario: Video player displays on homepage

- **GIVEN** a user navigates to the homepage
- **WHEN** the page loads completely
- **THEN** a Bilibili video player section SHALL be displayed on the homepage
- **AND** the section SHALL include a title "编程实战演示视频"
- **AND** the section SHALL include a description "观看《每天哈基半小时，AI多任务编程实战》"
- **AND** a Bilibili embedded player SHALL be displayed in a responsive container

#### Scenario: Bilibili player loads with correct video

- **GIVEN** the Bilibili video player component is rendered
- **WHEN** the component initializes
- **THEN** the player SHALL load video with bvid `BV1pirZBuEzq`
- **AND** the player SHALL load video part 1 (`p=1`)
- **AND** the player SHALL use external embed mode (`isOutside=true`)
- **AND** the player SHALL support fullscreen viewing

#### Scenario: Video player matches homepage design

- **GIVEN** the Bilibili video player component is rendered
- **WHEN** comparing the video player to other homepage sections
- **THEN** the video player SHALL use the same gradient border effect as other cards
- **AND** the video player SHALL have the same border-radius (24px)
- **AND** the video player SHALL use the same shadow effects (`var(--pc-card-shadow)`)
- **AND** the section title SHALL use the same gradient text effect

#### Scenario: Video player is responsive

- **GIVEN** the Bilibili video player is displayed
- **WHEN** viewed on different screen sizes
- **THEN** on desktop (>1024px) the video container SHALL have a max-width of 900px
- **AND** on tablet (768px-1024px) the video container SHALL have a max-width of 700px
- **AND** on mobile (<768px) the video container SHALL span the full width with 1rem padding
- **AND** the video SHALL maintain a 16:9 aspect ratio at all screen sizes

#### Scenario: Video player respects theme changes

- **GIVEN** a user is viewing the homepage
- **WHEN** the user switches between light and dark themes
- **THEN** the video player container SHALL update to match the new theme
- **AND** the video player SHALL use CSS variables for colors
- **AND** no hardcoded colors SHALL ignore theme settings

#### Scenario: Video player is accessible

- **GIVEN** the Bilibili video player is displayed
- **WHEN** a user navigates using a keyboard
- **THEN** the iframe SHALL have a proper title attribute describing the content
- **AND** the video SHALL be keyboard accessible
- **AND** the section SHALL have descriptive heading for screen readers

#### Scenario: Bilibili player iframe is properly configured

- **GIVEN** the Bilibili video player component is rendered
- **WHEN** the iframe is created
- **THEN** the iframe SHALL use `scrolling="no"`
- **AND** the iframe SHALL use `border="0"`
- **AND** the iframe SHALL use `frameborder="no"`
- **AND** the iframe SHALL use `framespacing="0"`
- **AND** the iframe SHALL support fullscreen (`allowfullscreen="true"`)
