# FERRARI 296 GTB — Landing Page (Sitemap + Wireframe)

**Model:** Ferrari 296 GTB · **Color:** Rosso Corsa (red) · **Type:** Single-page portfolio landing page · **Sections:** 5

---

# 01 — Sitemap

## Page hierarchy

- **Home / Landing** (`/`)
    - Section 1 — Hero: scroll-driven cloth-reveal video + one-line copy
    - Section 2 — The Car: horizontal scroll cards (left → right)
    - Section 3 — Performance: numbers strip
    - Section 4 — Gallery: interior + exterior craft
    - Section 5 — CTA + Footer: book a test drive

## Navigation (sticky, minimal)

1. The Car → `#car`
2. Performance → `#performance`
3. Gallery → `#gallery`
4. Test Drive → `#cta` *(pill button, red)*

## Footer links

- Instagram · YouTube
- Privacy · Terms
- © 2026 — Portfolio concept. Not affiliated with Ferrari S.p.A.

---

# 02 — Wireframe (5 sections)

## Section 1 — HERO (100vh, scroll-pinned video)

```
┌──────────────────────────────────────────────┐
│  [LOGO]              The Car  Performance    │
│                      Gallery  [ Test Drive ] │
│                                              │
│        ███████ FULL-SCREEN VIDEO ███████     │
│        █  white room · covered car   █       │
│        █  cloth flies off on scroll  █       │
│        ███████████████████████████████       │
│                                              │
│        "Beauty was hiding here."             │
│         Meet the Ferrari 296 GTB.            │
│                  ▼ scroll                    │
└──────────────────────────────────────────────┘
```

- **Behavior:** hero uses an **image frame sequence** (video converted to frames). Section pins; scroll progress maps to frame index; every frame is drawn on a full-screen `<canvas>` — Apple AirPods-style scrubbing. Copy fades in at ~80% of the sequence.
- **Copy (1 line + sub):**
    - H1: *Beauty was hiding here.*
    - Sub: *Meet the Ferrari 296 GTB.*

## Section 2 — THE CAR (horizontal scroll cards, left → right)

```
┌──────────────────────────────────────────────┐
│  Everything that makes it a Ferrari.         │
│                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────    │
│  │ IMAGE  │ │ IMAGE  │ │ IMAGE  │ │ IMAG     │
│  │ Design │ │ Engine │ │ Sound  │ │ Aero     │
│  │ 1 line │ │ 1 line │ │ 1 line │ │ 1 li     │
│  └────────┘ └────────┘ └────────┘ └──────    │
│   ── cards slide left → right on scroll ──   │
└──────────────────────────────────────────────┘
```

- **Behavior:** section pins; vertical scroll translates the card row horizontally (left → right). Cards scale up slightly as they pass center.
- **Cards (5):**
    1. **Design** — *Every curve has a job.*
    2. **Engine** — *V6 hybrid. 830 horsepower.*
    3. **Sound** — *You hear it before you see it.*
    4. **Aero** — *The air works for you.*
    5. **Interior** — *A cockpit, not a cabin.*

## Section 3 — PERFORMANCE (numbers strip)

```
┌──────────────────────────────────────────────┐
│  Numbers don't lie.                          │
│                                              │
│   830 cv        2.9 s         330 km/h       │
│   power      0–100 km/h      top speed       │
│                                              │
│   [ side profile image, full width ]         │
└──────────────────────────────────────────────┘
```

- **Behavior:** numbers count up when section enters viewport. Dark background (#111), red accents.

## Section 4 — GALLERY (craft + detail shots)

```
┌──────────────────────────────────────────────┐
│  Look closer.                                │
│                                              │
│  ┌──────────────┐  ┌──────┐                  │
│  │   WHEEL      │  │ SEAT │                  │
│  └──────────────┘  └──────┘                  │
│  ┌──────┐  ┌──────────────┐                  │
│  │ BADGE│  │  REAR LIGHT  │                  │
│  └──────┘  └──────────────┘                  │
└──────────────────────────────────────────────┘
```

- **Behavior:** masonry grid; images parallax at different speeds; subtle zoom on hover.

## Section 5 — CTA + FOOTER

```
┌──────────────────────────────────────────────┐
│                                              │
│         Stop scrolling. Start driving.       │
│                                              │
│            [  Book a test drive  ]           │
│                                              │
├──────────────────────────────────────────────┤
│  LOGO · Instagram · YouTube · Privacy · ©    │
└──────────────────────────────────────────────┘
```

- **Copy:** H2: *Stop scrolling. Start driving.* · Button: *Book a test drive*
- **Behavior:** full-bleed front shot of the car as background; button pill-shaped, Rosso red.

---

# 03 — Hero video generation prompt (10 seconds)

<aside>
🎬

**Use as one single prompt** (Veo / Gemini video). Duration: exactly 10 seconds. Output: 8K, 24fps, cinematic.

**v2 fix:** the cloth now lifts off in ONE clean upward motion at the start — progressive per-shot peeling confuses the model and breaks fabric continuity between cuts.

</aside>

```jsx
An ultra-detailed 8K cinematic 10-second luxury car commercial. A red Ferrari 296 GTB sits in the center of a vast empty white room — seamless white walls and floor, soft diffused studio lighting, no windows, no props, no people. At the start, the entire car is hidden under one large light-grey silk cloth.

0–3s: Wide front three-quarter shot, locked camera. The silk cloth lifts straight up off the whole car in one single graceful motion, rising in extreme slow motion like it is being pulled toward the ceiling. The complete glossy Rosso Corsa red Ferrari is revealed underneath in this one shot. The cloth floats up and out of the top of the frame and is never seen again.

3–4.5s: Cut. Slow gimbal glide along the left side of the uncovered car — red door, sculpted side air intake, gleaming dark alloy wheels. Crisp paint reflections move across the body.

4.5–6s: Cut. Slow glide across the rear — rear spoiler, twin round tail lights, FERRARI lettering, sharp 8K reflections on the red surface.

6–7.5s: Cut. Slow glide along the right side profile, full length of the car, soft white light rolling over the Rosso Corsa paint.

7.5–10s: Cut. Final slow push-in toward the front of the car from a low hero angle. The red Ferrari stands perfectly still and fully revealed in the empty white room. Camera settles and the final frame holds on the front of the car.

IMPORTANT: The cloth appears only in the first shot (0–3s). After it flies upward out of frame, every following shot shows the car fully uncovered with no cloth anywhere. The car never moves, never drives, wheels never turn. No people, no text, no captions, no logos other than the Ferrari badges on the car.

Style: 8K ultra-high definition, photorealistic, luxury automotive commercial, RED cinema camera look, shallow depth of field, soft contact shadows under the car, smooth slow gimbal movement, realistic slow-motion silk physics in the first shot only, strong contrast between Rosso Corsa red and pure white studio.
```

**Shot map (for editing reference)**

| Time | Angle | Action |
| --- | --- | --- |
| 0–3s | Front ¾ (locked) | Cloth lifts straight up in one motion — full reveal |
| 3–4.5s | Left side | Glide along uncovered profile |
| 4.5–6s | Rear | Glide across spoiler + tail lights |
| 6–7.5s | Right side | Glide along full profile |
| 7.5–10s | Front push-in, low | Hero hold on final frame |

---

# 04 — Design System (luxury type + palette)

## Typography

| Role | Font | Why |
| --- | --- | --- |
| Display / Headlines | **Italiana** (Google Fonts, free) | High-contrast luxury serif — fashion-house feel, pairs beautifully with red on white |
| Body / UI | **Manrope** (Google Fonts, free) | Clean modern sans — quiet, lets the serif and the car speak |
| Numbers (specs strip) | **Space Grotesk** (Google Fonts, free) | Technical, engineered look for 830 cv / 2.9 s / 330 km/h counters |
| Premium upgrade (optional) | PP Editorial New / Canela (licensed) | If the portfolio piece needs an even more editorial voice later |

**Type rules**

- H1: Italiana, 64–120px, tight tracking, white or near-black depending on section.
- Labels/nav: Manrope, 12–14px, uppercase, letter-spacing 0.15em.
- One serif moment per section maximum — everything else stays sans.

## Color palette

| Token | Hex | Usage |
| --- | --- | --- |
| `--rosso` | `#D40000` | Rosso Corsa — CTAs, accents, count-up numbers. The ONLY loud color |
| `--rosso-deep` | `#9B0000` | Hover state, gradients on red surfaces |
| `--white-room` | `#FAFAF8` | Page background — matches the hero video's white studio |
| `--white` | `#FFFFFF` | Cards, reversed text on dark |
| `--carbon` | `#111111` | Performance section background, primary text |
| `--graphite` | `#2B2B2B` | Secondary dark surfaces, footer |
| `--silk` | `#C9C9C4` | Borders, dividers, muted captions — echoes the silk cloth |
| `--champagne` | `#C8A96A` | Optional micro-accent (thin lines, small labels). Use sparingly |

**Palette rules**

- 90% white/carbon, 8% red, 2% champagne. Luxury = restraint.
- Red never appears as a large background — only the car, CTAs, and numbers.
- Soft shadows only (`0 20px 60px rgba(0,0,0,0.08)`); no hard drop shadows.
- Pill buttons (9999px radius); 2px hairline borders in `--silk`.

---

# 05 — Front-end tech stack (no backend)

<aside>
⚙️

**Recommended:** Vite + React + TypeScript + Tailwind CSS + GSAP ScrollTrigger + Lenis. 100% static — no backend needed. Paste this stack into Google Antigravity as your project setup.

</aside>

## The stack

| Layer | Choice | Why it's the right fit |
| --- | --- | --- |
| Build tool | **Vite** | Instant dev server, simple static build. No backend = no need for Next.js complexity |
| Framework | **React 18 + TypeScript** | Component-based — perfect for a portfolio showcasing components. Antigravity generates React extremely well |
| Styling | **Tailwind CSS** | Fast iteration; define the palette + fonts above as theme tokens once, use everywhere |
| Scroll animation | **GSAP + ScrollTrigger** | THE industry standard for everything in your wireframe: scroll-scrubbed hero video, pinned sections, horizontal card movement, count-up numbers |
| Smooth scrolling | **Lenis** | Buttery inertia scrolling — the single biggest "luxury feel" upgrade. Used by award-winning sites |
| Micro-interactions | **Framer Motion** (optional) | Hover states, fade-ins, button transitions — simpler than GSAP for small touches |
| Hosting | **Vercel / Netlify / GitHub Pages** | Free static hosting — `vite build` output deploys directly |

## Section → technique map

| Section | Technique |
| --- | --- |
| 1 — Hero video reveal | **Canvas frame sequence** (not `video.currentTime`): convert the 10s video to 240 frames, preload as images, ScrollTrigger pin + scrub maps scroll progress → frame index, draw each frame with `canvas.drawImage()`. Guarantees every frame shows; video scrubbing skips frames between keyframes |
| 2 — Cards left → right | ScrollTrigger pin section + animate card row `x` translation; `scale` cards near center |
| 3 — Numbers count-up | GSAP `to()` with `snap` on enter; Space Grotesk tabular numerals prevent layout shift |
| 4 — Gallery parallax | ScrollTrigger scrub with different `y` speeds per image; CSS `scale` on hover |
| 5 — CTA | Fixed full-bleed background + Framer Motion fade-up on copy and button |

## Hero: video → frames conversion recipe

<aside>
🏞️

10s × 24fps = **240 frames**. Use all 240 for maximum smoothness; drop to 120 (every 2nd frame) only if load weight becomes a problem.

</aside>

1. **Extract frames** (ffmpeg):

```bash
ffmpeg -i hero.mp4 -vf "scale=1920:-2" -qscale:v 2 frames/frame_%04d.jpg
```

1. **Compress to WebP** (~60–80% smaller, same quality):

```bash
for f in frames/*.jpg; do cwebp -q 75 "$f" -o "${f%.jpg}.webp"; done
```

1. **Implementation rules:**
    - Name frames `frame_0001.webp` … `frame_0240.webp` in `/public/frames/`.
    - Preload all frames into `Image` objects on mount; show a loading state until ready.
    - Render on `<canvas>` sized to viewport (`object-fit: cover` math), NOT 240 stacked `<img>` tags.
    - Map scroll: `frameIndex = Math.round(progress * 239)`; redraw only when index changes.
    - 1920px width is enough — the canvas upscales cleanly; 240 × 8K frames would be 100MB+.
    - Target budget: ≤15–20MB total; lower `-q` to 65 if above.

## Why not the alternatives

- **Next.js** — built for backends, routing, and SSR you won't use. Adds weight to a single static page.
- **Three.js / R3F** — unnecessary: your hero is a video, not a 3D model. Saves weeks of effort.
- **Plain HTML/CSS/JS** — works, but components (cards, buttons, section blocks) become copy-paste instead of reusable, which defeats the showcase goal.

## Antigravity starter instruction (paste as your first prompt)

```jsx
Create a Vite + React + TypeScript project with Tailwind CSS, GSAP (ScrollTrigger), and Lenis smooth scroll.
Single landing page, 5 sections, no backend, no router.

Design tokens:
- Fonts (Google Fonts): Italiana (display headings), Manrope (body/UI), Space Grotesk (numbers)
- Colors: rosso #D40000, rosso-deep #9B0000, white-room #FAFAF8, carbon #111111, graphite #2B2B2B, silk #C9C9C4, champagne #C8A96A
- Style: 90% white/carbon with red used only for CTAs, numbers, and accents. Pill buttons, hairline silk borders, soft shadows, generous whitespace.

Sections:
1. Hero: 100vh pinned section with a full-screen canvas image-sequence scrub (Apple AirPods style). 240 frames named /public/frames/frame_0001.webp to frame_0240.webp. Preload all frames as Image objects with a loading state. ScrollTrigger pin + scrub maps scroll progress to frame index (Math.round(progress * 239)) and draws the current frame on the canvas with cover-fit scaling; redraw only when the frame index changes. Headline "Beauty was hiding here." fades in at 80% scroll progress with sub "Meet the Ferrari 296 GTB."
2. The Car: pinned horizontal-scroll section; 5 cards (Design, Engine, Sound, Aero, Interior) slide left to right as the user scrolls; cards scale up slightly at center.
3. Performance: dark carbon background; three stats (830 cv, 2.9 s, 330 km/h) count up when entering the viewport, Space Grotesk, red numerals.
4. Gallery: masonry grid of 4 placeholder images with parallax speeds and hover zoom.
5. CTA: full-bleed background image, headline "Stop scrolling. Start driving.", red pill button "Book a test drive", minimal footer.

Make it responsive, smooth, and production-quality.
```