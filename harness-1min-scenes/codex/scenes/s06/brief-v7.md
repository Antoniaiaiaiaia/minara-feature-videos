# S06 + S07 v7 — library avatars and continuous order-card arrival

User revisions: use https://github.com/dapi-labs/react-nice-avatar for the four agents; the order card should scroll naturally upward from the bottom of the dialogue stream.

- Preview: `_test-v7.html`; composition: `index-v7.html`, `scene-v7.js`, `team-v7.js`, `team-v7.css`. v6 is preserved. Duration remains 22.55 seconds; no new MP4 rendered.
- Actual react-nice-avatar 1.5.0 React components are prerendered into local DOM/SVG. Fixed configurations give Rhea, Atlas, Noor and Sable consistent identities. Generator and locked dependencies: `../../assets/nice-avatar/`. Upstream MIT license is included with the package. No runtime network dependency.
- The same live order card follows the last coordinator reply. At 12.2–13.35 seconds, the conversation and card scroll upward together. At 13.5 seconds, the card transfers to its native chat container with its on-screen position preserved, then settles as the client shell returns. Subsequent confirmation, execution, portfolio and final left exit remain unchanged.
- Verification: `node codex/scenes/s06/verify-v7.mjs` from the project root; screenshots in `verification-v7/`. Checks cover real library avatars, upward motion, continuity at the transfer, backward seeking and the live Review order button.
- Revert: open `_test-v6.html`. Rendering still awaits preview approval.
