# Minara Cross-Sectional Factors

Public English source and rendered media for the Minara Strategy Studio cross-sectional factors video.

## Preview

Serve this directory with Python's standard library, then open `index.html` or any `scene*.html` file:

```sh
python3 -m http.server 8000 --directory .
```

The HTML scenes load GSAP and Geist from their public CDNs. The `assets/` directory contains the local avatar, stock logos, and title background video required by the scenes. Versioned MP4 files are retained as reviewable renders.

The public copy excludes disposable frame grabs and local screenshot-capture helpers. Private session context, dependency caches, browser state, secrets, and local absolute paths are also excluded.

