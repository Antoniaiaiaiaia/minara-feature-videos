# S04/S05 V8 — double-speed order cards, approved export

Latest instructions: speed up asset click animation by1x, interpreted as2× overall order-card sequence; user explicitly requested direct rendering. Orders run6.5–9.5s, NVDA/CL/BTC/GOLD/SNDK/HOOD each0.5s. ORDER_RATE=2 scales both deterministic rendering and real button-click progression. Opening,2.5× composer close-up/direct left exit, signal wall and monochrome rounded asset logos retained. No sound, per immediately previous request.

Output `../../output/s04-s05-portfolio-orders-v8.mp4`:1920×1080,30fps,285frames,9.500s,10,324,347bytes,H.264,one video stream and no audio. verify.mjs checks all six half-second check states and real accelerated click/exit. Encoded contact sheet visually inspected and ffprobe passed. Prior files retained. Renderer render.mjs uses established browser PNG→FFmpeg workflow.
