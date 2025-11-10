# GidiGo Landing Page Design Guidelines
Replicating Framer Website Aesthetic (https://landio.framer.website/)

## Design Approach
**Reference-Based:** Drawing directly from the Framer template's modern, clean aesthetic with dark backgrounds, smooth animations, and contemporary web design patterns. Adapting the proven layout structure while customizing for GidiGo's local services platform.

## Typography System
**Primary Font:** Inter or DM Sans via Google Fonts CDN
- Hero Headline: 4xl to 6xl (56-72px), font-weight 700, tight line-height (1.1)
- Section Headlines: 3xl to 4xl (36-48px), font-weight 700
- Subheadlines: xl to 2xl (20-30px), font-weight 500
- Body Text: base to lg (16-18px), font-weight 400, line-height 1.6
- Microcopy/Labels: sm to base (14-16px), font-weight 500, uppercase tracking-wide for labels

**Secondary Font:** Source Code Pro for code snippets

## Layout System
**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 (consistent with Framer's rhythm)
- Section Padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Container: max-w-7xl with px-6 to px-8
- Component Spacing: gap-8 to gap-12 for grids
- Card Padding: p-8 to p-12

**Grid System:**
- Hero: Single column centered
- Benefits: 3 columns (lg:grid-cols-3)
- Features: 3 columns (lg:grid-cols-3)
- Testimonials: 3 columns scrollable (lg:grid-cols-3)
- Pricing: 4 cards in row (lg:grid-cols-4)

## Component Library

### Navigation
Fixed top navigation with blur backdrop effect, logo left, nav items center, CTA buttons right. Height: h-16 to h-20. Sticky with scroll-triggered background transition.

### Hero Section
**Layout:** Full viewport height (min-h-screen), centered content with gradient background treatment
- Eyebrow text: Small uppercase label "AI-POWERED LOCAL SERVICES"
- Headline: Large bold text with gradient effect (from accent to lighter shade)
- Subheadline: 2xl, medium opacity, max-w-2xl centered
- Dual CTA buttons: Primary (gradient background with accent color) + Secondary (outlined/ghost style)
- Microcopy: Small text below CTAs with trust indicator
- Hero Visual: Phone mockup image showing Nia interface, positioned center or right with slight tilt/3D effect
- Founder Video: 30-second video thumbnail with play button overlay, positioned bottom of hero or in secondary column

**Images:** Large hero image required - phone mockup displaying GidiGo app interface with Nia AI chat and provider card visible

### Benefits Section (3-Column)
Cards with icon/visual at top, bold heading, descriptive text. Cards have subtle border, rounded-2xl corners, p-8 padding, hover lift effect (translate-y-1 transition).

### Services Section
Mixed layout: larger feature tiles with icons, screenshots, or illustrations. Some tiles span 2 columns for visual variety. Include visual elements like notification mockups, chat interfaces, dashboard previews.

### Code Showcase
Full-width container with dark code editor aesthetic, syntax highlighting using Prism.js or Highlight.js, line numbers, copy button. Background with subtle glow effect around code block.

### Provider Cards
Card-based layout with:
- Provider image (square or rounded)
- Badge indicator (Verified/Pending)
- Name and service type
- Rating display with stars
- One-line description
- Disabled "Book" or "Notify me" button
Grid: 3 columns on desktop (lg:grid-cols-3)

### Case Studies
Large cards with:
- Provider name and category header
- Problem/Result two-column text layout
- Large metric displays (40% increase shown as oversized numbers)
- Provider image thumbnail
Layout: Alternating left/right image placement for visual rhythm

### Integration Logos
Horizontal scrolling carousel with logo cards, grayscale treatment with hover color transition, infinite scroll animation. Logos: Paystack, Flutterwave, WhatsApp, Google Maps.

### Testimonials
3-column grid, each card includes:
- Quote text (larger font, italic)
- Customer photo (circular, 64px)
- Name and location
- 5-star rating
Cards with elevated shadow, rounded-xl

### Pricing Cards
4-column layout (responsive):
- Header with plan name
- Large price display
- "Popular" badge for featured tier
- Feature list with checkmarks
- CTA button at bottom (Paystack link)
- Microcopy for refund policy
Cards with border accent, hover scale effect

### FAQ Accordion
Single column, max-w-3xl centered. Each item expands on click with smooth height transition. Question bold, answer with comfortable line-height.

### Team Section
Grid of team member cards:
- Large portrait image
- Name and role below
- 2-3 columns layout
Images with subtle rounded corners or circular crops

### Footer
3-column layout:
- Company info and description
- Quick links
- Contact information (WhatsApp, email, address)
Legal links at bottom, small text
Social media icons if applicable

## Animations
- Scroll-triggered fade-up animations for sections (entrance)
- Smooth scroll behavior between sections
- Hover effects: card lift (translateY), button scale, subtle glow
- Logo carousel: infinite horizontal scroll
- Minimal, purposeful - avoid excessive motion

## Visual Effects
- Gradient text effects on headlines (accent color gradient)
- Subtle blur backdrop filters for overlays
- Soft shadows for elevated cards
- Gradient backgrounds in hero (radial or linear from accent color)
- Frosted glass effect on navigation and floating elements

## Images
**Required images:**
1. **Hero:** Phone mockup showing GidiGo app interface (Nia chat, provider card) - large, prominent
2. **Provider cards:** Photos for Kiki & Kudi's salon, Nedu's plumbing, Emmy's tutoring
3. **Team section:** Founder photo (Timi)
4. **Founder video:** 30-second video thumbnail with play overlay
5. **Integration logos:** Paystack, Flutterwave, WhatsApp Business, Google Maps (use official brand assets via CDN)
6. **Testimonial photos:** Customer avatars (can use placeholder illustrations initially)

## Accessibility
- Focus visible states on all interactive elements
- Semantic HTML structure with proper heading hierarchy
- Alt text for all images
- Sufficient contrast ratios (test against dark backgrounds)
- Keyboard navigation support for accordions and modals

## Responsive Behavior
- Mobile: Single column stacking for all grids
- Tablet: 2-column layouts for features/testimonials
- Desktop: Full multi-column layouts
- Hero text scales down on mobile (4xl → 2xl)
- Navigation collapses to hamburger menu on mobile
- Pricing cards scroll horizontally on mobile with snap points