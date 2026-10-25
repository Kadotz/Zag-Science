Zag Science — Next Exercise scroll correction

- Collapse the completed exercise in BOTH portrait and landscape after the workout re-render (prevents remembered panel state from reopening it).
- Landscape: animate the window scroll numerically over 950 ms rather than native smooth scrolling; disable scroll anchoring during transition; add bottom space to allow the next exercise top to align with the top of the visible viewport.
- Preserve the portrait scroll target and its 720 ms animation.
- Preserve the previous guide and graph changes from the supplied base ZIP.

Requires actual iPhone landscape/portrait TestFlight verification; automated tests cannot simulate WebKit scrolling.
