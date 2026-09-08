# Minara Cross-Sectional Factors — Chinese

Chinese localized HTML scenes, baked-in Chinese video renders, and shared visual assets for the Minara Strategy Studio cross-sectional factors video.

## Preview

Serve this directory with Python's standard library, then open a scene HTML file:

```sh
python3 -m http.server 8000 --directory .
```

The HTML scenes load GSAP and Geist from their public CDNs. Local assets are under `assets/`; the MP4 files retain the Chinese on-screen text and narration. The source text and localized media are intentionally preserved in Chinese.

The public copy excludes disposable frame grabs, private session context, dependency caches, browser state, secrets, and local absolute paths.

