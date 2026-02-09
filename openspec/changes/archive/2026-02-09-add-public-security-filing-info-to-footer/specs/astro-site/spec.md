## MODIFIED Requirements

### Requirement: Homepage Footer Component

The homepage MUST include a Footer component that provides navigation links, copyright information, brand representation, and compliance filing information (ICP and Public Security) at the bottom of the page.

#### Scenario: Footer component rendering on homepage

**Given** a user navigates to the site root (`/`)
**When** the homepage loads
**Then** they MUST see a Footer section at the bottom of the page
**And** the Footer MUST display:
  - Copyright information (© 2026 Hagicode)
  - Navigation links (Docs, Blog, GitHub)
  - Social media links (GitHub icon/link)
**And** the Footer MUST be positioned after the main content area
**And** the Footer MUST use the site's design system (CSS Variables for colors and spacing)

#### Scenario: Footer component rendering on documentation pages

**Given** a user navigates to any documentation page (e.g., `/docs/*`)
**When** the page loads
**Then** they MUST see a Starlight Footer section at the bottom of the page
**And** the Starlight Footer MUST display:
  - Copyright information (© 2026 Hagicode)
  - Navigation links (Product, Quick Links, Community)
  - Starlight default components (EditLink, LastUpdated, Pagination)
**And** the Footer MUST be positioned after the main content area
**And** the Footer MUST use Starlight's design system

#### Scenario: Footer compliance filing information display (Homepage)

**Given** the homepage Footer component (`src/components/home/Footer.tsx`) is rendered
**When** I inspect the filing information section
**Then** the section MUST display both ICP and Public Security filing numbers
**And** the filing information MUST include:
  - **ICP 备案号**: 闽ICP备2026004153号-1 (链接到 https://beian.miit.gov.cn/)
  - **公安备案号**: 闽公网安备35011102351148号 (链接到 https://www.beian.gov.cn/)
**And** both filing numbers MUST be displayed side-by-side on desktop
**And** both filing numbers MUST be stacked vertically on mobile (width < 768px)
**And** both links MUST open in a new tab with `rel="noopener noreferrer"`
**And** both links MUST have appropriate `aria-label` attributes for accessibility

#### Scenario: Footer compliance filing information display (Documentation Pages)

**Given** the Starlight Footer component (`src/components/StarlightFooter.astro`) is rendered
**When** I inspect the filing information section
**Then** the section MUST display both ICP and Public Security filing numbers
**And** the filing information MUST include:
  - **ICP 备案号**: 闽ICP备2026004153号-1 (链接到 https://beian.miit.gov.cn/)
  - **公安备案号**: 闽公网安备35011102351148号 (链接到 https://www.beian.gov.cn/)
**And** both filing numbers MUST be displayed side-by-side on desktop
**And** both filing numbers MUST be stacked vertically on mobile (width < 768px)
**And** both links MUST open in a new tab with `rel="noopener noreferrer"`
**And** both links MUST have appropriate `aria-label` attributes for accessibility

#### Scenario: Footer filing information consistent display across site

**Given** a user navigates between the homepage and documentation pages
**When** they compare the Footer filing information on both pages
**Then** the filing information MUST be consistent across both Footer implementations
**And** both pages MUST display the same ICP filing number (闽ICP备2026004153号-1)
**And** both pages MUST display the same Public Security filing number (闽公网安备35011102351148号)
**And** the layout and styling MUST be visually consistent
**And** both implementations MUST follow the same responsive design patterns

#### Scenario: Footer filing information responsive layout (Homepage)

**Given** the filing information section is displayed on the homepage (`src/components/home/Footer.tsx`)
**When** I view the section on different screen sizes
**Then** on desktop (width >= 768px):
  - Both filing numbers MUST be displayed side-by-side
  - Gap between links MUST be at least 1.5rem
**And** on mobile (width < 768px):
  - Filing numbers MUST be stacked vertically
  - Each link MUST occupy full width
  - Gap between links MUST be at least 0.75rem
**And** the layout MUST use flexbox for proper alignment
**And** all links MUST remain centered in the container

#### Scenario: Footer filing information responsive layout (Documentation Pages)

**Given** the filing information section is displayed on documentation pages (`src/components/StarlightFooter.astro`)
**When** I view the section on different screen sizes
**Then** on desktop (width >= 768px):
  - Both filing numbers MUST be displayed side-by-side
  - Gap between links MUST be at least 1.5rem
**And** on mobile (width < 768px):
  - Filing numbers MUST be stacked vertically
  - Each link MUST occupy full width
  - Gap between links MUST be at least 0.75rem
**And** the layout MUST use flexbox for proper alignment
**And** all links MUST remain centered in the container

#### Scenario: Footer filing information styling consistency (Homepage)

**Given** the homepage Footer supports light and dark themes
**When** I toggle between themes
**Then** both filing links MUST adapt to the current theme
**And** on light theme:
  - Link color MUST be gray
  - Hover color MUST be darker or underline
**And** on dark theme:
  - Link color MUST be gray
  - Hover color MUST be white
**And** the styling MUST match the existing ICP filing link style
**And** transitions MUST be smooth (approximately 200ms)

#### Scenario: Footer filing information styling consistency (Documentation Pages)

**Given** the Starlight Footer uses Starlight's theme system
**When** I toggle between themes
**Then** both filing links MUST adapt to the current theme
**And** on light theme:
  - Link color MUST use `var(--sl-color-gray-3)`
  - Hover color MUST use `var(--sl-color-white)`
**And** on dark theme:
  - Link color MUST use `var(--sl-color-gray-3)`
  - Hover color MUST use `var(--sl-color-white)`
**And** the styling MUST match the existing ICP filing link style in `StarlightFooter.astro`
**And** transitions MUST use `var(--sl-transition-fast)`

#### Scenario: Footer filing information accessibility (Homepage)

**Given** the filing information section is displayed on the homepage (`src/components/home/Footer.tsx`)
**When** I navigate using assistive technologies
**Then** both links MUST have descriptive `aria-label` attributes:
  - ICP: `aria-label="查看 ICP 备案信息"` (View ICP filing information)
  - Public Security: `aria-label="查看公安备案信息"` (View Public Security filing information)
**And** both links MUST be keyboard focusable via Tab key
**And** focus indicators MUST be visible (2px outline with accent color)
**And** color contrast MUST meet WCAG AA standards (4.5:1 for body text)

#### Scenario: Footer filing information accessibility (Documentation Pages)

**Given** the filing information section is displayed on documentation pages (`src/components/StarlightFooter.astro`)
**When** I navigate using assistive technologies
**Then** both links MUST have descriptive `aria-label` attributes:
  - ICP: `aria-label="查看 ICP 备案信息"` (View ICP filing information)
  - Public Security: `aria-label="查看公安备案信息"` (View Public Security filing information)
**And** both links MUST be keyboard focusable via Tab key
**And** focus indicators MUST be visible using Starlight's focus styles
**And** color contrast MUST meet WCAG AA standards (4.5:1 for body text)
