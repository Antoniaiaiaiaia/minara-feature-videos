# DMind Benchmark Video — Design System

> 2026-06-25. Brand-concept motion-art storytelling video. 2 min / 7 scenes / 20 shots.
> Visual = **DMind official site** (white/light, blue, navy ink, Manrope) + Antonia's overlay direction:
> **Nimble motion, lightness, full and varied compositions, and macaron pastels.**

## Source of truth: DMind brand (from dmind.ai)

| Token | Value | Use |
|---|---|---|
| Primary blue | `#375BDC` | structural lines, hero numbers, CTA, logo, links, key emphasis |
| Primary blue (bright) | `#3F5AD5` → hover/glow `#4E6BF0` | button fills, glows |
| Ink (navy) | `#111221` | all headlines & body text |
| Ink-2 | `#5A5C6B` | secondary text / labels |
| BG | `#FFFFFF` | base canvas |
| BG-2 | `#FAFAFA` | panels / cards |
| Border | `#EDEDED` | hairline borders, grid |
| Font | **Manrope** (800 headline / 700 strong / 500 body / 400 caption) | everything. mono = `'JetBrains Mono', ui-monospace` for code/hashes |

Google Fonts: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap')`

## Macaron accent palette (storytelling / data / decoration)

Pastel fills for orbs, chips, domain icons, bars, heatmap cells. Blue stays the hero; macarons are the supporting cast.

| Name | Soft fill | Strong (text/stroke) | Semantic |
|---|---|---|---|
| Mint | `#A8E6CF` | `#27B98A` | good / green / pass / infra-strong |
| Coral | `#FFB3BA` | `#F0566B` | weak / red / risk / security-fail |
| Lavender | `#CFC3F5` | `#7B6BE6` | agents / reasoning |
| Sky | `#AEDBF5` | `#2E8FD6` | on-chain / data |
| Peach | `#FFD3B6` | `#F0894B` | tokenomics / warning |
| Butter | `#FCE7A0` | `#E5B528` | highlight / spark |
| Pink | `#FBC4DD` | `#E86FA8` | memecoins / accent |

## Motion language (Silicon-Valley grade, physical easing)

- **No `linear`** except infinite ambient drift/glow. Everything has acceleration/deceleration.
- Entrances `power3.out`; pop/bounce `back.out(1.6–1.8)`; transitions `power3.inOut`; exits `power2.in`.
- Stagger ~100–140ms. Vary ≥3 eases per scene.
- **Light & airy**: large blurred pastel ambient orbs drift slowly in bg (breathe/orbit) — makes the frame feel full without clutter. Subtle dotted grid texture. Soft shadows `0 20px 60px rgba(17,18,33,.08)`, blue glow `0 0 40px rgba(55,91,220,.25)`.
- Numbers `font-variant-numeric: tabular-nums`, count-up via timeline.

## Hard rules

- **Light background throughout** — even Scene 1 "risk" (storyboard says dark; Antonia's override = light/airy wins). Convey danger via coral, not darkness.
- DMind logo = `assets/dmind-logo.svg` (brain mark, #375BDC). Never redraw.
- Each scene = standalone HTML, `data-composition-id="root"` 1920×1080, paused timeline registered to `window.__timelines["root"]`.
- Deterministic only (mulberry32 seed, no Math.random / Date.now / repeat:-1).
