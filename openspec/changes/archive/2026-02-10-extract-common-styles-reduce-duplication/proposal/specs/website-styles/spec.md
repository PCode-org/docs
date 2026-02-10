## ADDED Requirements

### Requirement: Common Styles Module Structure
The website SHALL provide a modular CSS architecture for shared styles across all pages.

#### Scenario: Module organization
- **WHEN** organizing shared styles
- **THEN** create `apps/website/src/styles/common/` directory with the following modules:
  - `variables.css` - CSS variable definitions
  - `animations.css` - Animation keyframes
  - `background.css` - Background decoration elements
  - `hero.css` - Hero section styles
  - `buttons.css` - Button component styles
  - `features.css` - Feature card styles
  - `faq.css` - FAQ component styles
  - `themes.css` - Theme override styles
  - `accessibility.css` - Accessibility styles

#### Scenario: Module import order
- **WHEN** importing common modules in page stylesheets
- **THEN** modules SHALL be imported in the following order:
  1. variables.css
  2. animations.css
  3. background.css
  4. Component-specific modules (hero.css, buttons.css, features.css, faq.css)
  5. themes.css
  6. accessibility.css

### Requirement: CSS Variables System
The website SHALL define a comprehensive CSS variable system for theming.

#### Scenario: Light theme variables
- **WHEN** light theme is active
- **THEN** the system SHALL provide color variables for:
  - `--color-background` - Main background color
  - `--color-surface` - Surface/element background
  - `--color-surface-glass` - Glassmorphism surface
  - `--color-surface-hover` - Hover state surface
  - `--color-text` - Primary text color
  - `--color-text-secondary` - Secondary text color
  - `--color-text-muted` - Muted text color
  - `--color-border` - Border color
  - `--color-border-light` - Light border variant
  - `--color-primary` - Primary accent color
  - `--color-primary-dark` - Dark primary variant

#### Scenario: Dark theme variables
- **WHEN** `[data-theme='dark']` is applied
- **THEN** the system SHALL override color variables for dark mode

#### Scenario: Lunar New Year theme variables
- **WHEN** `[data-theme='lunar-new-year']` is applied
- **THEN** the system SHALL override color variables with golden/red palette

### Requirement: Animation System
The website SHALL provide consistent animations across all pages.

#### Scenario: FadeInUp animation
- **WHEN** fade-in-up effect is needed
- **THEN** the system SHALL provide `fadeInUp` keyframe animation that:
  - Starts with opacity 0 and translateY(20px)
  - Ends with opacity 1 and translateY(0)
  - Has configurable duration and delay

#### Scenario: FadeIn animation
- **WHEN** fade-in effect is needed
- **THEN** the system SHALL provide `fadeIn` keyframe animation that:
  - Starts with opacity 0 and translateY(-10px)
  - Ends with opacity 1 and translateY(0)

#### Scenario: Pulse badge animation
- **WHEN** a pulsing badge effect is needed
- **THEN** the system SHALL provide `pulse-badge` keyframe animation for recommended badges

### Requirement: Background Decoration Elements
The website SHALL provide reusable background decoration styles.

#### Scenario: Tech grid background
- **WHEN** tech grid background is applied
- **THEN** `.tech-grid-bg` class SHALL render:
  - Linear gradient grid pattern with 40px spacing
  - Light border color for grid lines
  - Full coverage of parent element

#### Scenario: Background glow effect
- **WHEN** background glow is applied
- **THEN** `.bgGlow` class SHALL render:
  - Gradient glow effect using `--gradient-glow` variable
  - Full coverage of parent element

### Requirement: Hero Section Styles
The website SHALL provide consistent hero section styles across all pages.

#### Scenario: Hero layout
- **WHEN** `.hero` class is applied
- **THEN** the element SHALL have:
  - Relative positioning
  - Center-aligned text
  - Minimum height of 60vh
  - Flexbox column layout with centered content

#### Scenario: Hero content
- **WHEN** `.hero-content` class is applied
- **THEN** the element SHALL have:
  - Relative positioning with z-index 1
  - FadeInUp animation on load

#### Scenario: Hero tagline
- **WHEN** `.hero-tagline` class is applied
- **THEN** the element SHALL have:
  - Font size of 1.25rem
  - Secondary text color
  - Bottom margin of 2rem

#### Scenario: Hero features
- **WHEN** `.hero-features` class is applied
- **THEN** the element SHALL have:
  - Flexbox layout with gap
  - Centered content
  - Flexible wrapping for responsive design

### Requirement: Button Component Styles
The website SHALL provide consistent button styles across all pages.

#### Scenario: Primary button
- **WHEN** `.btn-primary` class is applied
- **THEN** the button SHALL have:
  - Minimum height of 44px (touch target size)
  - Padding of 0.75rem 1.5rem
  - Border radius of 0.5rem
  - Primary gradient background
  - Glow shadow effect
  - Transform on hover (-2px Y translation)

#### Scenario: Secondary button
- **WHEN** `.btn-secondary` class is applied
- **THEN** the button SHALL have:
  - Same sizing as primary button
  - Secondary styling (border or different background)
  - Consistent hover effects

#### Scenario: Icon button
- **WHEN** `.btn-icon` class is applied
- **THEN** the element SHALL have:
  - Inline-flex layout
  - Aligned items with gap

#### Scenario: Link button
- **WHEN** `.btn-link` class is applied
- **THEN** the element SHALL have:
  - Primary color text
  - No default underline
  - Underline on hover
  - Focus visible outline

#### Scenario: Recommended badge
- **WHEN** `.recommended-badge` class is applied
- **THEN** the badge SHALL have:
  - Gradient background (orange/red for visibility)
  - White text color
  - Small font size (0.7rem)
  - Uppercase text with letter spacing
  - Pulse animation
  - Shadow effect

### Requirement: Feature Card Styles
The website SHALL provide consistent feature card styles across all pages.

#### Scenario: Feature card
- **WHEN** `.feature-card` class is applied
- **THEN** the card SHALL have:
  - Padding of 2rem
  - Border radius of 0.75rem
  - Glassmorphism background
  - Border with theme color
  - Transform on hover (-4px Y translation)
  - Enhanced shadow on hover
  - Focus visible outline

#### Scenario: Features grid
- **WHEN** `.features-grid` class is applied
- **THEN** the grid SHALL have:
  - Auto-fit columns with minimum 280px width
  - Gap of 2rem between items
  - Responsive single column on mobile

#### Scenario: Feature icon wrapper
- **WHEN** `.feature-icon-wrapper` class is applied
- **THEN** the wrapper SHALL have:
  - Width and height of 64px
  - Bottom margin of 1rem

### Requirement: FAQ Component Styles
The website SHALL provide consistent FAQ accordion styles across all pages.

#### Scenario: FAQ list
- **WHEN** `.faq-list` class is applied
- **THEN** the list SHALL have:
  - Flex column layout
  - Gap of 1rem between items
  - Top margin of 1.5rem

#### Scenario: FAQ item
- **WHEN** `.faq-item` class is applied
- **THEN** the item SHALL have:
  - Border with theme color
  - Border radius of 0.5rem
  - Border color transition on hover to primary color
  - Overflow hidden for child elements

#### Scenario: FAQ summary
- **WHEN** `.faq-item summary` is styled
- **THEN** the summary SHALL have:
  - Cursor pointer
  - Surface background
  - Padding of 1rem 1.5rem
  - Custom expand/collapse icon (+/−)
  - Icon rotation on open
  - Focus visible outline
  - Background transition on hover

#### Scenario: FAQ content
- **WHEN** `.faq-content` class is applied
- **THEN** the content SHALL have:
  - Padding of 1.5rem
  - Top border
  - FadeIn animation on open

### Requirement: Theme System
The website SHALL provide theme override styles for dark and Lunar New Year themes.

#### Scenario: Dark theme overrides
- **WHEN** `[data-theme='dark']` selector is used
- **THEN** the system SHALL override:
  - All component colors for dark background
  - Text colors for dark mode readability
  - Border and surface colors for dark mode
  - Primary accent color if needed

#### Scenario: Lunar New Year theme overrides
- **WHEN** `[data-theme='lunar-new-year']` selector is used
- **THEN** the system SHALL override:
  - Hero titles with golden gradient
  - Buttons with red background and golden borders
  - Feature cards with golden borders
  - Links with golden colors and glow effects
  - All text colors with golden/cream palette

### Requirement: Accessibility Styles
The website SHALL provide accessibility enhancements for all users.

#### Scenario: Reduced motion support
- **WHEN** user prefers reduced motion (`prefers-reduced-motion: reduce`)
- **THEN** the system SHALL:
  - Reduce all animation durations to 0.01ms
  - Limit animation iterations to 1
  - Reduce transition durations to 0.01ms
  - Preserve fade opacity transitions without transform

#### Scenario: Focus visible styles
- **WHEN** interactive elements receive keyboard focus
- **THEN** the system SHALL provide:
  - 2px solid outline with primary color
  - 2px outline offset for visibility
  - Consistent focus styles across all components

#### Scenario: Touch target sizing
- **WHEN** buttons and interactive elements are sized
- **THEN** touch targets SHALL have:
  - Minimum height of 44px on desktop
  - Minimum height of 48px on mobile
  - Minimum width of 44px where applicable

### Requirement: Responsive Design System
The website SHALL provide consistent responsive breakpoints across all pages.

#### Scenario: Mobile breakpoint
- **WHEN** viewport width is 768px or less
- **THEN** the system SHALL:
  - Use single column layouts
  - Increase touch target sizes
  - Adjust font sizes for readability
  - Optimize spacing for mobile screens

#### Scenario: Tablet breakpoint
- **WHEN** viewport width is between 768px and 1024px
- **THEN** the system SHALL:
  - Use two column layouts for grids
  - Maintain touch target sizes
  - Adjust spacing for tablet screens

#### Scenario: Desktop breakpoint
- **WHEN** viewport width is 1024px or greater
- **THEN** the system SHALL:
  - Use multi-column layouts
  - Optimize for desktop viewing
  - Maximize content width to 1200px

### Requirement: Page Stylesheet Integration
The website SHALL integrate common styles into page-specific stylesheets.

#### Scenario: Homepage stylesheet
- **WHEN** `homepage.css` is loaded
- **THEN** it SHALL:
  - Import all common style modules
  - Retain homepage-specific styles
  - Retain homepage-specific theme overrides

#### Scenario: Container page stylesheet
- **WHEN** `container.css` is loaded
- **THEN** it SHALL:
  - Import `homepage.css` to inherit all common styles
  - Define Container page-specific component styles
  - Not duplicate common styles

#### Scenario: Desktop page stylesheet
- **WHEN** `desktop.css` is loaded
- **THEN** it SHALL:
  - Import `homepage.css` to inherit all common styles
  - Define Desktop page-specific component styles
  - Not duplicate common styles

### Requirement: Design Consistency Standards
The website SHALL maintain consistent design standards across all pages.

#### Scenario: Button consistency
- **WHEN** buttons appear on any page
- **THEN** all buttons SHALL have:
  - Minimum height of 44px
  - Padding of 0.75rem 1.5rem
  - Border radius of 0.5rem
  - Consistent hover and active states

#### Scenario: Feature card consistency
- **WHEN** feature cards appear on any page
- **THEN** all cards SHALL have:
  - Padding of 2rem
  - Border radius of 0.75rem
  - Consistent hover effects
  - Consistent animation delays

#### Scenario: FAQ consistency
- **WHEN** FAQ components appear on any page
- **THEN** all FAQs SHALL have:
  - Consistent collapse/expand animation
  - Consistent icon design
  - Consistent padding and margins

#### Scenario: Section spacing consistency
- **WHEN** sections appear on any page
- **THEN** all sections SHALL have:
  - Padding of 5rem 0 for vertical spacing
  - Consistent heading styles
  - Consistent content alignment

#### Scenario: Animation consistency
- **WHEN** fade animations are used
- **THEN** all animations SHALL:
  - Use standard fadeInUp keyframes
  - Have consistent timing functions
  - Follow consistent delay patterns (0.2s, 0.4s, 0.6s, etc.)
