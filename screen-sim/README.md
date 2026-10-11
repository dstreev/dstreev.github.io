---
title: "Ski Commander screen sim"
type: utility
project: mobile-skier
status: active
created: 2026-10-06
updated: 2026-10-09
tags: [origin/discussion, discussion/draft, ui, lvgl]
sources:
  - "file:///Users/dstreev/projects/arduino/Mobile-Skier/Ski_Commander/LVGL_UI.cpp"
  - "file:///Users/dstreev/projects/arduino/Mobile-Skier/Ski_Commander/LVGL_UI.h"
origin: discussion
discussion_status: draft
summary: "Browser stand-in for the Ski Commander 800×480 UI. The active course, retrieval, waypoint, and live rope stay between reloads. Each user stores a preferred rope. Home can override shorten-after-each-pass for the current set. Drive shows grey speed. Passes can filter by driver or skier and shows the rope."
language: html
entry: index.html
---

# Ski Commander screen sim

## Purpose

Click through the Ski Commander glass without the Teensy or the 7″ panel. The 800×480 area follows `LVGL_UI.cpp` for the tabs. Every tab uses the Drive water palette from [[../../working/2026-10-08-drive-hud|Drive HUD]]: sky over the status and tabs, a horizon line, water behind the pages, amber for the path and primary actions, green for a good fix. Drive itself is the lane view: dashed gate lines, heading path, the next two buoys, and the off-course meter. Fifteen blocks sit on each side of center. The first eight are 6 inches, the next four are 1 foot, and the last three are 3 feet. Lit blocks are green through 1 foot, yellow through 2 feet, orange through 4 feet, and red beyond that. The center block is green while the boat is inside 1 foot. Controls under the bezel are the simulator: scenario, cross-track, heading off the course, along-track, marked or virtual, and a boat nudge.

Sample coordinates are not a saved course and not a live fix. **Virtual Course** is always in the list. Deploy and Retrieve are hidden while it is the active course, and Deploy still refuses it. With an empty buoy list a new selection is Virtual Course. A cold start opens on that course.

The Course page tabs are Courses, Retrieval, and Waypoints. The active course, retrieval, and waypoint stay in this browser under `ski-cmd-picks`. A reload brings those three names back when they are still in the list. An empty waypoint means none is active.

Center Line is the default retrieval point. Its detail reads “Closest point on the course centerline,” and rename and delete do not apply. Retrieve recalls buoys to that line unless an active waypoint is set.

Config has a course-width slider from 7.5 m mini to 11.5 m full in half-meter steps, plus antenna fore/aft, antenna starboard, bow ahead of the pylon, course extension from 1.0× to 1.5× in tenths, and Set reset. Set reset is Off, then 5 minutes through 60. The default is 15 minutes. Off never returns the rope after a break. The width scales the skier buoys only. Extension stretches every Drive buoy along the course from the anchor and does not change width. The pass plot stays on official spacing. The antenna and bow numbers are the hull-LED measurements and do not move the picture. A buoy joins when it is turned on and registers. On a plotted course the large bold line on the right of the Drive sky names the registered buoys that are not on station.

Timing is its own Setup section. Nine sliders start at the shipped rate and run from one tenth of that rate to ten times it. Each row has a `?` that opens what the row changes. GPS and LoRa stay on every pass. The 14:32 pass plot stays at 5 samples a second.

Users is the first Setup section, and opening Setup lands on it. Each person stores a name, a preferred rope, and whether a pass that reaches the exit gates shortens the live rope. Add asks for the name, then those two fields. Edit changes the rope and the flag. Home lines Deploy up with `Driver: <name>` and Retrieve up with `Skier: <name>`, with a gap between the rows. Drive sits at the bottom center. Retrieve uses the same green face as Deploy. The crew faces are light with an amber edge. An empty role reads `-`. Pressing either button picks a name, or None to clear that role. Picking a skier sets the rope line and the Home shorten switch from that person's preference. The switch can be changed for this set and does not rewrite the person. With no skier, the switch is hidden. The choice stays in this browser. A break with no pass, as long as Set reset, puts the rope and the switch back to the skier's preference. **Pass finished**, under the bezel, stands in for the exit gates and also starts that break clock. An early end starts the clock and does not shorten. Each sample pass keeps the driver and the skier that were selected. Passes stays newest first and can filter by driver, skier, or both. Delete asks first: saved passes keep the stored name, and a later feature that pointed at that user will no longer find them. The first visit seeds David driving and Beth skiing, plus Sam, each at 15 off with shortening off. `?view=settings-users` opens that list.

The status bar shows the product name, GPS, and LoRa. Course and buoy status share the top row, course on the left. The buoy-status box hides with Deploy and Retrieve while Virtual Course is active, and the course box stays half width. Under Skier, rope length is a left-to-right line of radio marks colored red, orange, orange/white, yellow, green, blue, violet, white, and pink. That line sits 28 px below the shorten switch. MPH labels them 15, 22, 25, 28, 32, 35, 38, 39.5, and 41. Metric labels them 18.25, 16, 15, 14.25, 13, 12, 11.25, 10.75, and 10.25. The choice starts at 15 and stays in this browser under `ski-cmd-rope`. The session switch and the set-reset minutes stay under `ski-cmd-set`. Each sample pass shows it on the review line as `rope 15 off`, or in meters when the units switch is off. A sample with no rope field shows `rope -`. Drive paints speed at the top center in grey, `32.4 mph` on the water scenario, or kph when the units switch is off. The rope length is the next line, `15 off` or `18.25 m`.

## How to run

Open `index.html` in a browser. No install and no server.

```bash
open /Users/dstreev/projects/sb_personal/projects/mobile-skier/code/screen-sim/index.html
```

Query views for a fixed frame: `?view=home`, `course`, `buoys`, `passes`, `pass`, `settings`, `settings-gps`, `settings-lora`, `settings-imu`, `settings-timing`, `settings-users`, `drive`, `course-detail`, `buoy`. The status name is Ski Commander. `?view=passes` opens the date list. A date opens that day's passes, newest first. `?view=pass` opens the 14:32 plot. A pass plots the boat left to right. The center line is where it should be. The outside lines are the boat guides at 1.15 m, with a 0.5 m scale. Those labels are bold. Small circles mark the 55s in green, the gates and skier balls in red, and the boat guides in yellow. Right is down the page. Skier buoy 1 is on that side, in the margin, so the 1.15 m scale stays readable. The 14:32 sample is 34 mph at 5 samples a second, with pulls of 6 in to 1.5 ft as the skier takes each buoy. Setup centers Config, GPS, LoRa, and IMU. Each section is a set of cards in the same water palette: muted captions, green values, amber controls. `?view=settings` opens Users. `?view=drive` opens 2.1 m left and 8° right, 40 m short of the entry. Add `&mode=hold` for heading-hold, or `&hdg=30` and `&dev=-2.1` for an overshoot. Add `?scenario=cold` for the no-fix screen. `?selftest=1` clicks through and writes PASS/FAIL lines.

## Sources / Related

- Firmware UI: `~/projects/arduino/Mobile-Skier/Ski_Commander/LVGL_UI.cpp`
- Display choice: [[../../working/2026-09-21-ski-commander-dual-mode-display|Dual mode and display]]
