# DMind Benchmark video — Design specification

> Two-minute DMind Benchmark launch film (KDD 2026).
> Reference: the Amoeboids explainer by What A Story, using immersive deep-blue 3D / 2.5D. Do not reuse its recurring guide sphere.
> Colors, typography, motion, and composition approved on 2026-06-25. Updated that day.

## 0. Style

**Glass-like elements float in deep-blue 3D space. The camera moves slowly through depth; every movement has weight and easing.** Brand blue `#3F5AD5` leads. Mint supplies energy, highlights, and the financial meaning of growth or passing a threshold.

The reference teaches atmosphere and motion: a blue world, glass glow, easing, depth-of-field parallax, slow drift, and transitions. Actual objects must come from the DMind storyboard: contract code, heatmaps, agent nodes, rankings, source dots, and nine domains. Do not import gears, document icons, podiums, or guide spheres merely because the reference uses them. Section 4 is a technique library, not a required object list.

## 1. Color system

### 1.1 Fixed website brand anchors

| Role | Hex | Use |
|---|---|---|
| Brand blue | `#3F5AD5` / `#3a5bd0` | Logo, solid CTA, key brand elements, emphasized words |
| Ink | `#121221` / `#15181f` | Deep background shadows and text on white |
| White | `#FFFFFF` | Text and glass highlights |

**Do not use Minara colors in DMind.** The `#EB53FF → #FF538E → #FF9A32` purple/pink/orange gradient belongs to Minara; its earlier use here was a mistake. DMind uses blue `#3F5AD5` with cyan `#3FD6C6` for energy and highlights. Emphasis is blue. Scene 7 follows the other DMind video's light ending: blue and black type, brain logo, white cards, and chips.

### 1.2 Film-world palette

A **deep-blue radial-gradient space** is bright in the center, dark at its edges, and vignetted. Scenes inhabit this blue universe.

| Role | Hex | Description |
|---|---|---|
| Bright radial center | `#4B4DFE` | Royal-blue center glow |
| Dark radial edge | `#121B6A` | Deep indigo at the edges |
| Deepest corners | `#0C1142` → `#121221` | Corners fading into brand ink |
| Royal mid | `#3C3DD2` / `#3754BE` | Midtones of solid 3D columns and platforms |
| Mint | `#6DD6CC` | Glass cores, energy, highlights, data lines |
| Cyan glow | `#13FBFE` | Brightest sphere/edge highlights and glowing outlines |
| Green | `#34CB66` | Dotted globe, passing scores, growth; financial strength |
| Lilac | `#B57AFF` | Secondary data color and blue/purple/mint gradient accents |
| Sky | `#8DCDFF` | Light-blue glass faces and column highlights |
| Primary text | `#FFFFFF` | Headings and body |
| Secondary text | `#C5CBF5` | Pale periwinkle subtitles and supporting text |

### 1.3 Proposed danger and warning colors

The reference is almost entirely blue and green. DMind needs to show vulnerable code, security columns, sub-80 scores, and losses. Introduce restrained warm red without changing the overall cool palette.

| Role | Proposed hex | Use |
|---|---|---|
| Danger / weakness | `#FF5C7A` | Pink-red coordinated with blue/purple: vulnerable code, security columns, below-80 scores, losses |
| Warning | `#FFB454` | Warm orange for thresholds and warning lines, such as the 80-point line |

These are the only warm colors. Use them only for risk or problems, in small areas such as one code line, badge, or line. Lock them after approval.

### 1.4 Gradient recipes

- **Glow core / glass highlight:** radial `#13FBFE` core → `#6DD6CC` → transparent; outer glow `#6DD6CC`, blur 40px. Use for glass, data spheres, and glow points, not a recurring guide sphere.
- **Capsule bars:** bottom-to-top linear `#3F5AD5` → `#6DD6CC`; rounded top highlight `#8DCDFF`.
- **Background:** radial `#4B4DFE` at center 35% → `#1B2078` → `#0C1142` at the edge. Avoid full-screen linear gradients because of H.264 banding; use radial gradients with local glows.
- **Glass cards:** translucent `rgba(255,255,255,0.08–0.14)`, backdrop blur, and a 1px `rgba(255,255,255,0.25)` highlight border.

## 2. Typography

The reference uses rounded geometric sans-serif type, medium weight, and open tracking: calm and friendly, rather than an ultra-heavy website display face.

- **Family:** Poppins, a close free match with rounded geometry and a double-storey a. Load with `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap')`.
- **Alternatives:** Gilroy or Quicksand for a rounder look; the website font if closer brand matching is desired. This film consistently uses Poppins.
- **Weights:** headings `500–600`, emphasis `700`, body/subtitles `400–500`. Avoid 800-weight headings.
- **Tracking:** headings `letter-spacing: 0.01–0.02em`.
- **Numbers:** `font-variant-numeric: tabular-nums` keeps scores and counters stable.
- **Colors:** white `#FFFFFF`, secondary `#C5CBF5`, with mint `#6DD6CC` or cyan emphasis.

This project-specific Poppins choice supersedes the Minara video convention of Geist.

## 3. Motion

**Slow, stable, weighted, and eased.** Avoid abrupt or constant-speed translations; aim for a polished explainer's physical feel.

**Prefer GSAP 3D:** `perspective`, `translateZ` (GSAP `z`), `rotationX/Y/Z`, and `transformPerspective` for genuine depth, pushes, and flips. Do not approximate depth solely with 2D scale. Camera moves use perspective and z-axis travel, as in Scene 3's final card flight.

### 3.1 Signature techniques

1. **Depth of field / rack focus:** blurred foreground and background; focus follows the narrative. Card groups have distinct blur layers.
2. **Slow idle drift:** cards and icons slowly float or rotate, keeping the frame alive.
3. **Camera moves and parallax:** foreground, middle ground, and background travel at different speeds. Push slowly toward the subject.
4. **Glow / bloom / bokeh:** glowing elements, drifting defocused background lights, and lens flare at key moments.

The recurring guide sphere was removed from the direction on 2026-06-25. Connect scenes through camera moves, transitions, and elements handing attention to one another. Mint remains the energy/highlight color.

### 3.2 GSAP easing

- Entrance moves/fades: `power3.out`; small sphere/icon/card arrivals: `back.out(1.5–1.7)`.
- Camera and transitions: `power2.inOut` to `power3.inOut`.
- Disappearing or accelerating exits: `power2.in`.
- Idle float: `sine.inOut` with yoyo. HyperFrames requires finite repeats, never `repeat:-1`.
- Counters: `power1.out`, then hold.
- No `linear`, except special cases such as a continuous glow sweep.

### 3.3 Rhythm

Keep the film relatively slow with breathing room. Stagger entrances by 120–180ms. Data moments are emotional peaks: bars grow, the dotted globe lights up, or a ranking forms. Make these slower, larger, and glowing.

### 3.4 Whole-film rhythm: 118s reference review

The original review sampled the reference at one frame per second, producing 118 frames. Assets: `assets/reference/ref.mp4` and `sheet_01/02.png`.

1. **Opening, 0–5s:** a fast montage through floating glass cards and incoming geometry establishes the 3D world.
2. **Quiet connective beats:** empty blue background, one short caption, and slow camera movement recur between larger scenes, as at 19–24s and 60–66s. These pauses provide breathing room. For DMind, use camera moves/fades and one narrated sentence, without a guide sphere.
3. **Slow middle scenes:** dotted globe → icon array → capsule bars → glass dashboards → podium → isometric cubes → pixel pyramid. Give each enough hold time.
4. **Wordmark as a beat marker:** short brand beats between major sections.
5. **Long ending hold:** the reference's 111–118s ending holds centered wordmark, URL, and lens flare over a blue gradient for about seven seconds. DMind's logo, KDD 2026, and open-source link should hold 5–7s.

The two contact sheets let you inspect specific moments. Frame 001 is approximately 0s; each cell advances one second.

## 4. Technique library

Choose techniques for the actual storyboard content. The examples are not mandatory objects.

| Technique | Implementation | Storyboard use |
|---|---|---|
| Energy sphere / glow point | Radial cyan-to-mint gradient and outer glow | Rising/converging data spheres, key highlights; never a recurring guide sphere |
| Glass dashboards | Translucency, backdrop blur, parallax drift, focus layers | Contract audits, on-chain data, benchmark panels; shots 2/8/10 |
| Dotted globe with rising spheres | Blue globe, green dot map, spheres on light beams | 39 sources, open-source community, global downloads; shots 6/18 |
| Capsule bars | Blue-to-mint rounded gradient bars over grid | 31-model ranking, agent scores, before/after fine-tuning; shots 10/14/17 |
| Circular icon array | Squircle glass icons in a glowing circle | Nine domains, five agents, tool skills; shots 5/13 |
| 3D columns / podium | Glass cylinders with top glow rings | Model/agent podiums and ranking comparison; shots 12/15 |
| Isometric glowing cubes | Isometric cubes with bright top faces | Dataset scale and question structure; shots 3/7 |
| Pixel-step pyramid | Blue/purple steps with apex halo | Growth, vision, closing aspiration; shot 20 |
| Centered logo ending | Deep-blue gradient, wordmark, lens flare | Opening logo and final hold; shots 4/20 |

### 4.1 Composition

- Generous empty space, one focal point, layered depth. Few well-chosen elements; glow and focus create layers.
- Large rounded cards and squircle icons, glass surfaces, no hard edges or heavy shadows. Use glow in place of shadows.
- Short text, centered or close to its subject, white and medium-weight.

## 5. HyperFrames feasibility

The reference uses true C4D/Octane 3D. HyperFrames uses HTML/CSS/GSAP and cannot directly match photorealistic 3D rendering.

- **Close matches:** radial blue backgrounds; glow/bloom through box-shadow and radial gradients; backdrop-filter glass; bokeh; capsule bars; dotted globes using CSS/SVG and spherical distortion; circular icon arrays; GSAP MotionPath; layered blur and parallax.
- **Approximation or pre-rendering:** realistic reflections on glass spheres, cylinders, and isometric cubes. CSS radial-gradient spheres can approximate the look. Pre-rendered PNGs or transparent sequences can be composited for more fidelity; CSS 3D transforms approximate isometric cubes.
- **Production recommendation:** pre-render hero podiums and realistic glass spheres when higher-quality reflections matter. Build backgrounds, cards, bars, globes, spheres, and icons directly in HyperFrames. Identify shots needing pre-rendered material before production.

## Sources

Brand anchors were sampled from dmind.ai. World colors, typography, motion, and composition were derived from 13 supplied Amoeboids reference frames by What A Story, with pixel-level sampling of key colors. The red semantic palette remained a proposal awaiting approval in the original specification.
