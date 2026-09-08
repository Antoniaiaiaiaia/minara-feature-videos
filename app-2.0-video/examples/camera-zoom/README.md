# Camera Zoom — Canonical Project Example

## Trigger phrase

When Antonia says **“camera zoom”**, use this pattern by default.

## Canonical source

- Source composition: `tests/agent-chat-v01/index.html`
- Review player: `the local preview player`
- Reference shot: the camera pushes into the bottom input field in Scene 03.

## Motion contract

1. Put the complete phone and all of its UI inside one camera rig wrapper.
2. Anchor that wrapper at the frame center with a zero-size center anchor.
3. Move only the rig with GSAP transform aliases: `x`, `y`, and `scale`.
4. Keep `transform-origin: 50% 50%` so the device behaves like one camera subject.
5. Use `power3.inOut` for a controlled acceleration and settle with no overshoot.
6. Internal UI remains locked to the phone. Do not animate its children to fake camera movement.

Default 1920×1080 values copied from the approved Agent Chat shot:

```js
const tl = gsap.timeline({ paused: true });

tl.set("#camera-rig", { x: 0, y: 0, scale: 0.96 })
  .to("#camera-rig", {
    x: 0,
    y: -756,
    scale: 2.25,
    duration: 0.78,
    ease: "power3.inOut",
  }, 0.28);
```

The later reframe from input close-up to the answer layout uses the same rule:

```js
tl.to("#camera-rig", {
  x: -570,
  y: 0,
  scale: 0.95,
  duration: 0.46,
  ease: "power3.inOut",
}, 1.82);
```

## Forbidden defaults

Unless Antonia explicitly asks for them, do not add:

- rotation or 3D tilt;
- independent UI-element drift;
- parallax layers;
- spring, bounce, or overshoot easing;
- random camera shake;
- motion trails, afterimages, or speed lines;
- extra zoom beats after the target framing is reached.

If a future layout differs, preserve the same motion language and adjust only the final `x`, `y`, and `scale` needed to frame the requested element.

## Demo

Open `index.html`. Click **Replay camera zoom** to replay the approved movement.
