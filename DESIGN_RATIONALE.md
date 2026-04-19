# Design & Strategy Rationale

This document outlines the strategic and aesthetic decisions made during the construction of the Interactive Sales Deck to satisfy the requirements for a premium, Apple/Hermès-inspired experience.

## 1. Visual & UX Strategy (The "Luxury" Feel)
- **Cinematic Overlays**: Standard solid-color backgrounds often feel digitally barren. The core layout utilizes muted background videos mixed with a low-opacity SVG "film grain" injected natively via CSS (`globals.css`). This removes the "sterile" digital look and adds a tactile, cinematic luxury feel globally across the entire application.
- **Custom Hardware Cursor**: Relying on default browser cursors breaks immersion. I engineered a global `framer-motion` cursor loop that intelligently matches the user's trajectory, expanding and glowing delicately when hovering over interactive elements.
- **Scrollytelling**: Standard sliders and carousels feel outdated. For "The Avenue" (the luxury brand section), I locked the Y-axis and dynamically mapped the user's vertical scroll progression into horizontal movement padding, mimicking the high-end experiences found on Apple product showcase pages. 

## 2. Technical Execution, Expandability & Performance
- **Component Modularity Framework**: Every complex piece of interactive UI—such as the `AnimatedCounter` and the `CustomCursor`—was written as a standalone React functional component. While imported locally in this V1, they require zero refactoring or rewrite logic to be immediately extracted into a `components/ui/` library as the application scales. The structure relies entirely on composable parameters.
- **Intersection Observers**: No element animates prematurely. Metrics, text reveals, and grid animations are tightly bound to `useInView` hooks, ensuring CPU/GPU processing happens exclusively when the component is inside the active viewing frustum.
- **Asset Optimization**: By utilizing modern scalable CDN streaming (`.mp4`) and leveraging `autoPlay muted playsInline`, we avoid shipping heavy local payload assets inside the bundle, ensuring near-instant loading times necessary for a 90+ Lighthouse score.

## 3. Generative AI Use
- Generative AI was used continuously alongside the development workflow. Specifically, it was leveraged to rapidly prototype the complex interpolation mathematics required for the `useTransform` bounds on the horizontal scroll-jacking. AI was also actively utilized for dynamic problem-solving during UI rendering edge-cases (such as CSS `mix-blend-mode` debugging across light/dark states) which massively accelerated the timeline.
