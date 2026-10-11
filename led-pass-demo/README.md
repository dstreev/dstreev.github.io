---
title: "LED pass walkthrough"
type: utility
project: mobile-skier
status: active
created: 2026-10-08
updated: 2026-10-09
tags: [origin/discussion, discussion/draft, led, virtual-course]
sources:
  - "[[../../working/2026-10-08-leds-plus-buoys|LEDs plus buoys]]"
origin: discussion
discussion_status: draft
summary: "Scrubbable walkthrough of one hull-LED slalom pass. Above 18 mph both strips flash red twice a second until the pass arms, then the green 55 fill runs to the exit gates."
language: html
entry: index.html
---

# LED pass walkthrough

## Purpose

Step through the hull-LED schedule for one slalom pass. **Next cue** and the scrubber move the bow along the course. Above 18 mph, virtual mode and a plotted course both flash every LED red twice a second until the pass arms. Virtual arms after 3 seconds inside 1 mph and 5°. A plotted course, fixed or hybrid, arms when the bow is 30 m short of the 55s. The green 55 fill starts at that arm.

Bow-to-pylon and pylon-to-transom are sliders. They are not measured yet. Boat speed turns the one-second dark and the quarter-second ball flash into meters.

## How to run

```bash
open /Users/dstreev/projects/sb_personal/projects/mobile-skier/code/led-pass-demo/index.html
```

Arrow keys step cues. Space plays. `?selftest=1` checks the phase sequence.

## Sources / Related

- [[../../working/2026-10-08-leds-plus-buoys|LEDs plus buoys]]
- [[../../sources/files/slalom_course.png|Slalom course sheet]]
