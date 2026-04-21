# MyGoldenPath — Product Design Document

**Version:** 1.1 | **Date:** 2026-04-21

---

## 1. Product Vision & Mission

**Vision:** A world where personal growth is as engaging and trackable as a video game — for the whole family.

**Mission:** MyGoldenPath transforms life goals into a structured, rewarding daily practice by combining objective-based planning with meaningful gamification — for adults pursuing growth and kids learning to set and achieve goals.

**Elevator Pitch:** MyGoldenPath is a goal-tracking app that organizes your life into meaningful aspects — Work, Family, Self — lets you set annual ambitions, break them into monthly objectives and daily tasks, and rewards every step with collectible gem drops. Parents and kids can use it together: kids earn virtual gems they can trade for real-world rewards set by their parents. It turns the grind of self-improvement into a golden path worth walking.

---

## 2. Target Users & Personas

### Persona 1: Maya, 28 — The Ambitious Professional

- **Role:** Product manager at a mid-size tech company
- **Motivation:** She has a dozen goals rattling around in her head — learn Spanish, get promoted, run a half-marathon — but no system to connect daily effort to long-term outcomes
- **Frustration:** Tried Notion, spreadsheets, and habit trackers. Notion is too flexible (she builds templates instead of working). Habit trackers feel robotic and lose novelty after two weeks
- **What she needs:** Structure that does not feel rigid. A reason to open the app every day that is not guilt

### Persona 2: David, 35 — The Overwhelmed Parent

- **Role:** Software engineer, father of two
- **Motivation:** Wants to be a great dad AND keep investing in himself, but feels like time is a zero-sum game
- **Frustration:** Existing productivity apps treat his life as one bucket. He needs to see that he is progressing across multiple dimensions, not just work
- **What he needs:** Quick daily interaction (under 2 minutes). Visibility into balance across life aspects

### Persona 3: Anika, 22 — The Recent Graduate

- **Role:** Just started her first job, living alone for the first time
- **Motivation:** Wants to build good habits early but does not know what "good" looks like structurally
- **Frustration:** Goal-setting advice is abstract. She needs something concrete and rewarding
- **What she needs:** Guided onboarding. Immediate gratification loop. Low friction to start

### Persona 4: Leo, 12 — The Kid with a Deal

- **Role:** 6th grader, David's son
- **Motivation:** Wants to earn real-world rewards (screen time, outings, treats) by completing his own goals
- **Frustration:** Chore charts are boring. He wants something that feels like a game
- **What he needs:** Simple task list, exciting prize drops, a "shop" where he can spend gems for real rewards his dad sets up

---

## 3. User Problems / Pain Points

| Problem | Evidence | How MyGoldenPath Solves It |
|---|---|---|
| Goals exist in the head but never get structured | 92% of New Year's resolutions fail | Forced hierarchy: Annual > Monthly > Daily |
| Life is multi-dimensional but tools are single-axis | Most apps track habits OR work tasks, never across life aspects | Life Aspects model with customizable categories |
| Progress feels invisible on long-term goals | Users abandon goals because 1% daily progress is imperceptible | Prize drops create immediate positive feedback |
| Monthly reflection is valuable but nobody does it | Requires discipline with no external trigger | Built-in monthly retrospective flow with prompts |
| Habit trackers lose novelty quickly | Average retention for habit apps drops 80% after week 2 | Variable-ratio reward schedule (ethically applied) |
| Users don't know if they are balanced | No tool shows "you spent 80% effort on Work and 0% on Health" | Aspect balance visualization |
| Kids lack motivation for self-improvement | Chore charts are boring, nagging is counterproductive | Kids earn gems tradeable for real rewards — intrinsic meets extrinsic |
| Daily routines feel like a grind | Routine tasks give no sense of accomplishment | Recurring tasks still drop prizes — even brushing teeth can sparkle |

---

## 4. Core Value Proposition

**For** ambitious individuals and families who want to grow across multiple life dimensions, **MyGoldenPath** is a goal-tracking app **that** connects annual ambitions to daily actions through a structured planning cadence and collectible gem rewards. Kids can trade earned gems for real-world prizes set by parents. **Unlike** habit trackers (which are repetitive and flat) or project management tools (which are work-only and clinical), **MyGoldenPath** makes personal growth feel like a game worth playing — for the whole family.

---

## 5. Feature Breakdown

### P0 — MVP (Launch)

| Feature | Description |
|---|---|
| Life Aspects | Default: Work, Family, Self. User can rename, add (max 7), delete, choose icon and color |
| Sub-categories | Pre-populated per aspect (Learning, Workout, Entertainment, Health, Finance, Social, Creative, Spiritual). Customizable |
| Annual Objectives | Free-text objective per aspect. Max 3 per aspect to enforce focus |
| Monthly Objectives | At month start, app prompts user to set 1-3 monthly objectives per aspect, each linked to an annual objective |
| Daily Tasks | User creates tasks linked to monthly objectives. Checkbox completion. No time-of-day enforcement |
| Recurring Tasks | Set daily/weekly routine tasks at start of year or month (e.g., "Run 3km", "Read 30 min", "Practice piano"). Auto-appear on scheduled days without re-entry. Completing them still drops prizes — routine effort deserves reward |
| Prize Drop System | On task completion: random gem drop with weighted rarity. On monthly objective completion: guaranteed higher-tier gem drop |
| Prize Collection | Gallery view of all collected gems with counts, rarity labels, and total collection progress |
| Family Mode & Profiles | Multiple profiles on one device (parent + kids). Each profile has independent aspects, objectives, tasks, and gem collection |
| Reward Shop (Family) | Kids can mark gems as "Redeemed" with a note and date. Show the screen to parent to negotiate a real-world reward. Simple — no catalog, no approval flow |
| Monthly Retrospective | End-of-month prompted flow: completion rates, aspect balance, reflection prompts, summary card |
| Basic Notifications | Monthly objective reminder (1st of month), daily reminder (configurable time), retrospective prompt (last 2 days of month) |

### P1 — Fast Follow (v1.1-1.3)

| Feature | Description |
|---|---|
| Streaks | Daily completion streaks with multiplier effect on drop rates |
| Achievement System | Milestone badges (first objective completed, 7-day streak, all aspects active, etc.) |
| Annual Review | Year-end comprehensive review with stats, top prizes, completion rates |
| Aspect Balance Radar Chart | Visual showing effort distribution across aspects |
| Task Templates | Recurring task patterns (e.g., "Workout 3x/week" auto-generates tasks) |
| Data Export | Export objectives and completion data as CSV or PDF |

### P2 — Future (v2+)

| Feature | Description |
|---|---|
| Social / Accountability Partner | Share progress with one trusted person. NOT a social network |
| AI Objective Suggestions | Based on past patterns, suggest monthly objectives |
| Home Screen Widget | Widget showing today's tasks and streak |
| Prize Trading | Trade duplicate prizes with accountability partner |
| Theming / Customization | Unlock visual themes through prize milestones |
| Calendar Integration | Calendar sync for deadline-based objectives |

---

## 6. User Journey / Key Flows

### Flow 1: First-Time Setup / Onboarding

```
Screen 1: Welcome
  "Welcome to MyGoldenPath. Your life is made of many parts.
   Let's make sure you're growing in all of them."
  [Get Started]

Screen 2: Choose Your Aspects
  Pre-filled: Work, Family, Self (with icons)
  User can: rename, delete, add new (max 7)
  Each aspect has a color (auto-assigned, changeable)
  [Continue]

Screen 3: Set Your First Annual Objective
  "Pick one aspect to start with. What's one big thing you
   want to accomplish this year?"
  [Aspect selector] -> [Free text input]
  "You can add more later. One is enough to begin."
  [Continue]

Screen 4: Your First Monthly Objective
  "It's [current month]. What's one thing you can do this
   month toward that annual goal?"
  [Free text input, auto-linked to the annual objective]
  [Continue]

Screen 5: Your First Task
  "What's one thing you can do TODAY?"
  [Free text input, auto-linked to monthly objective]
  [Start Your Quest]

Screen 6: Prize Introduction
  "Every task you complete has a chance to drop a prize.
   Some are common. Some are legendary."
  [Animation: a golden coin drops]
  "You just earned your first prize. Welcome to MyGoldenPath."
  -> Home screen
```

**Design Decision:** Onboarding forces exactly one objective and one task. Users who set too many goals on day one never return. We optimize for first-day completion, not first-day comprehensiveness.

### Flow 2: Setting Annual Objectives

```
Trigger: Onboarding, January prompt, or manual via Objectives tab

Screen: Annual Objectives
  List of aspects (vertical cards)
  Each card shows:
    - Aspect name + icon + color
    - Current annual objectives (0-3)
    - [+ Add Objective] button (disabled if 3 already set)

  Tapping [+ Add Objective]:
    - Full-screen modal
    - Aspect name at top (non-editable in this context)
    - "What do you want to achieve in [year]?"
    - Free text input (max 200 chars)
    - Optional: sub-category tag selector
    - [Save]

  Edit/delete: swipe on existing objective
```

**Design Decision:** Max 3 annual objectives per aspect. More than 3 goals per domain creates decision paralysis. The constraint is the feature.

### Flow 3: Monthly Objective Planning

```
Trigger: App open on 1st-3rd of month (if no monthly
         objectives set) OR manual

Screen: Monthly Planning
  Header: "[Month Year] -- Plan Your Month"

  For each aspect with annual objectives:
    Card showing:
      - Aspect name
      - Annual objective(s) listed
      - "What will you do THIS MONTH toward this?"
      - [+ Add Monthly Objective] (max 3 per aspect)

  Monthly objective input:
    - Free text (max 150 chars)
    - Linked to which annual objective (dropdown)
    - Optional: measurable target (number + unit)
      e.g., "Run 50 km" -> 50 km -> trackable
    - [Save]

  Bottom: [Finish Planning] -> confirms and returns to home

  If user skips: gentle reminder on day 2 and day 3.
  After day 3: banner on home screen, but no blocking.
```

**Design Decision:** Never block the user from using the app because they have not planned. Blocking creates resentment. Gentle nudges, always escapable.

### Flow 4: Daily Task Completion + Prize Drop

```
Home Screen (default view):
  Header: "[Today's date]" + streak counter (P1)

  Section: "Today's Tasks"
    Grouped by aspect (color-coded left border)
    Each task: checkbox + text + aspect tag
    [+ Add Task] floating button

  On checkbox tap:
    1. Task strikes through with satisfying animation
    2. 500ms delay
    3. Prize drop animation:
       - A chest/orb appears center screen
       - Cracks open to reveal prize
       - Prize name + rarity label + sparkle effect
       - "Collected!" auto-dismisses after 2 seconds
       - OR user taps to dismiss immediately
    4. If this task completes a monthly objective:
       - Bigger animation sequence
       - "Monthly Objective Complete!" banner
       - Guaranteed rare+ prize drop
       - Confetti

  Task creation:
    - Quick-add: text + select monthly objective to link
    - If no monthly objectives: task is "unlinked"
      (still counts, still drops prizes, but flagged
       as unlinked in retrospective)
```

**Design Decision:** Prize animation is skippable but defaults to playing. Users who love it will watch every time. Users who find it annoying can tap through in under 0.5 seconds. Never hold the user hostage for delight.

### Flow 4b: Recurring Tasks (Daily Routines)

```
Trigger: During annual/monthly planning, or via Settings

Setup Screen: "Your Daily Routines"
  "What do you do regularly that supports your goals?"

  Per routine:
    - Task name (e.g., "Run 3km", "Read 30 min",
      "Practice piano")
    - Frequency: Daily / Weekdays / Custom days
    - Link to monthly objective (optional)
    - Aspect (auto-filled if linked)
    - [Save]

  Routines appear automatically on Home each scheduled day.
  User just checks them off — no re-entry needed.
  Each completion still drops a gem.

  Routines can be paused, edited, or deleted anytime.

Example:
  "Practice piano" (Daily, linked to "Pass Grade 5 exam")
  -> Appears every day on Home under SELF
  -> Checking it off drops a gem like any other task
```

**Design Decision:** Routine tasks exist to reward consistency. Even "boring" daily habits deserve gem drops. This builds confidence and joy from tasks people already do — lowering the bar to feel good about their day.

### Flow 6: Reward Shop (Family Mode)

```
Trigger: Kid taps a gem in their Collection

Redemption Flow:
  Kid selects gems they want to redeem
  -> Gems get marked as "Redeemed" (grayed out,
     with a small "Redeemed" label)
  -> A note is attached: "Redeemed on Apr 21"
  -> Kid shows the screen to parent as proof

  Parent and kid agree on the real-world reward
  offline (ice cream, screen time, etc.)

  Redeemed gems stay in collection but are visually
  distinct — they can't be redeemed again.
```

**Design Decision:** Keep it simple. No reward catalog, no approval flow, no notifications. The app just marks gems as redeemed with a note. The real negotiation happens between parent and kid face-to-face — that's the fun part.

### Flow 5: Monthly Retrospective

```
Trigger: Last 2 days of month (notification) or manual

Screen 1: Completion Summary
  "Your [Month] in Review"
  Per aspect:
    - Monthly objectives: X/Y completed
    - Tasks completed: N
    - Progress bar with percentage
  Overall completion rate: X%
  [Next]

Screen 2: Aspect Balance
  Bar chart showing task distribution across aspects
  Insight text:
    "You focused heavily on Work this month.
     Family had no activity. Consider setting a small
     Family goal next month."
  [Next]

Screen 3: Prizes Earned This Month
  Grid of prizes collected, grouped by rarity
  "You earned X prizes this month, including Y [rarest tier]"
  [Next]

Screen 4: Reflection
  "What went well this month?" [Free text -- optional]
  "What will you do differently next month?" [Free text -- optional]
  [Complete Review]

Screen 5: Summary Card
  Shareable card (image) with:
    - Month name, completion rate, top prize, reflection quote
  [Save to Photos] [Share] [Done]
```

**Design Decision:** Reflection inputs are optional. Forced journaling creates anxiety and abandonment. The data summary alone is valuable even without written reflection.

---

## 7. Information Architecture

```
MyGoldenPath
|
+-- Home (default tab)
|   +-- Today's Tasks (grouped by aspect)
|   |   +-- One-off tasks
|   |   +-- Recurring routine tasks (auto-populated)
|   +-- Quick Add Task
|   +-- Streak indicator (P1)
|
+-- Objectives (tab)
|   +-- Annual View
|   |   +-- Per-aspect objective cards
|   +-- Monthly View (current month)
|   |   +-- Monthly objectives with progress
|   |   +-- Linked tasks
|   +-- Recurring Routines setup
|   +-- [+ Set Objectives] CTA
|
+-- Collection (tab)
|   +-- Prize Gallery (grid, sortable by rarity/recency)
|   +-- Collection Stats (total, per-tier counts)
|   +-- Reward Shop (Family Mode — kids spend gems here)
|   +-- Achievements (P1)
|
+-- Review (tab)
|   +-- Current Month Progress
|   +-- Past Month Retrospectives (list)
|   +-- Annual Review (P1)
|
+-- Settings (gear icon, top-right)
    +-- Profile Switcher (parent / kid profiles)
    +-- Life Aspects (manage)
    +-- Sub-categories (manage)
    +-- Recurring Routines (manage)
    +-- Reward Shop Setup (parent only)
    +-- Notifications
    +-- Data Export (P1)
    +-- About
```

**Navigation:** Bottom tab bar with 4 tabs: Home, Objectives, Collection, Review. Settings accessible via gear icon.

---

## 8. Gamification Design

### 8.1 Prize Types & Rarity Tiers

Gems are ordered by approximate real-world value of the mineral/stone they represent. A rich variety keeps drops feeling fresh and collection compelling.

| Tier | Gem | Rarity | Color | Drop Rate (Task) | Drop Rate (Monthly Obj.) |
|---|---|---|---|---|---|
| 1 | Obsidian | Common | Dark gray/glassy | 15% | 0% |
| 2 | Agate | Common | Banded brown | 12% | 0% |
| 3 | Jasper | Common | Red-brown | 10% | 0% |
| 4 | Tiger's Eye | Uncommon | Golden-brown striped | 8% | 0% |
| 5 | Rose Quartz | Uncommon | Soft pink | 7% | 5% |
| 6 | Moonstone | Uncommon | Milky blue glow | 7% | 5% |
| 7 | Jade | Uncommon | Green | 6% | 5% |
| 8 | Turquoise | Rare | Sky blue | 5% | 8% |
| 9 | Amethyst | Rare | Purple | 5% | 8% |
| 10 | Pearl | Rare | Cream/iridescent | 4% | 7% |
| 11 | Opal | Rare | Rainbow shimmer | 4% | 7% |
| 12 | Garnet | Epic | Deep red | 3% | 6% |
| 13 | Golden Coin | Epic | Gold | 3% | 6% |
| 14 | Topaz | Epic | Amber/orange | 2.5% | 6% |
| 15 | Aquamarine | Epic | Pale blue | 2% | 5% |
| 16 | Ruby | Epic | Vivid red | 2% | 5% |
| 17 | Emerald | Legendary | Deep green | 1.5% | 5% |
| 18 | Sapphire | Legendary | Royal blue | 1% | 5% |
| 19 | Alexandrite | Legendary | Color-shifting green/red | 0.5% | 4% |
| 20 | Diamond | Legendary | Brilliant white | 0.5% | 3% |

**Rarity summary:**
- **Common (3):** Obsidian, Agate, Jasper — ~37% of task drops
- **Uncommon (4):** Tiger's Eye, Rose Quartz, Moonstone, Jade — ~28% of task drops
- **Rare (4):** Turquoise, Amethyst, Pearl, Opal — ~18% of task drops
- **Epic (5):** Garnet, Golden Coin, Topaz, Aquamarine, Ruby — ~12.5% of task drops
- **Legendary (4):** Emerald, Sapphire, Alexandrite, Diamond — ~3.5% of task drops

**Every task completion triggers a drop.** There is no "no drop" outcome. Every action is rewarded. The variable is the tier, not whether a reward occurs. This is critical for maintaining the reinforcement loop.

**Note:** The gem list is intentionally expandable. Future updates can introduce seasonal or special-event gems (e.g., Amber for autumn, Peridot for summer, Lapis Lazuli for winter, Citrine for harvest) without disrupting the core rarity curve.

### 8.2 Streak Mechanics (P1)

- **Daily Streak:** Completing at least 1 task per day maintains the streak
- **Streak Multiplier:** After 7 consecutive days, drop rates shift upward by one tier
- **Streak Freeze:** One free freeze per week (auto-applied on a missed day). Additional freezes cost 10 Golden Coins
- **Streak Break:** Counter resets to 0. No punishment. App says: "Welcome back. Every day is a fresh start."

**Design Decision:** Streak breaks must never feel punitive. Apps that shame users for breaking streaks create negative associations. MyGoldenPath resets quietly and warmly.

### 8.3 Achievement / Milestone System (P1)

| Achievement | Trigger | Reward |
|---|---|---|
| First Step | Complete first task | Golden Coin |
| Week Warrior | 7-day streak | Rose |
| Balanced Life | Active tasks in 3+ aspects in one week | Diamond |
| Monthly Master | Complete all monthly objectives | Crystal |
| Collector | Collect 100 total prizes | Diamond |
| Obsidian Hunter | Collect first Obsidian | Special badge |
| Perfect Month | 100% monthly task completion | Obsidian |
| Reflective Mind | Complete 3 monthly retrospectives | Rose |

### 8.4 Progression Design Principles

1. **Every action produces a reward** — the variable is the quality, not the existence
2. **Monthly objectives produce guaranteed better rewards** — creates a "boss battle" feel
3. **Collection is visible and persistent** — prizes are never consumed or lost
4. **No pay-to-win** — prizes cannot be purchased, only earned
5. **Rarity creates stories** — "I got an Obsidian today" is shareable and memorable

---

## 9. Key Metrics / KPIs

### North Star Metric
**Monthly Active Objectives Completion Rate** — percentage of monthly objectives marked complete across all active users.

### Primary Metrics

| Metric | Definition | Target (Month 3) |
|---|---|---|
| D7 Retention | % of new users active on day 7 | 40% |
| D30 Retention | % of new users active on day 30 | 25% |
| Monthly Objective Set Rate | % of MAU who set monthly objectives | 70% |
| Monthly Objective Completion Rate | % of set monthly objectives completed | 50% |
| Daily Task Completion | Avg tasks completed per DAU | 2.5 |
| Retrospective Completion Rate | % of MAU who complete monthly retro | 30% |

### Secondary Metrics

| Metric | Definition |
|---|---|
| Aspect Distribution | How evenly tasks spread across aspects |
| Onboarding Completion | % completing full onboarding |
| Prize Gallery Views / week | How often users browse collection |
| Time in App (daily) | Median daily session time (target: 1-3 min) |

**Design Decision:** We explicitly target low session time. MyGoldenPath is a tool, not a feed. If users spend 10+ minutes daily, we are failing — they should be spending that time on their actual objectives.

---

## 10. Wireframe Descriptions

### Home Screen

```
+-----------------------------+
| MyGoldenPath        Sun Apr 21 |  <- date
|                   Fire 12   |  <- streak (P1)
|-----------------------------|
|                             |
|  WORK                       |  <- aspect header, blue
|  +-------------------------+|
|  | [ ] Draft Q3 proposal   ||  <- checkbox + task
|  | [ ] Review team OKRs    ||
|  +-------------------------+|
|                             |
|  SELF                       |  <- aspect header, green
|  +-------------------------+|
|  | [x] Run 5km             ||  <- completed
|  | [ ] Read 30 min         ||
|  +-------------------------+|
|                             |
|  FAMILY                     |  <- aspect header, orange
|  +-------------------------+|
|  | [ ] Call mom             ||
|  +-------------------------+|
|                             |
|              (+)            |  <- FAB
|                             |
|-----------------------------|
|  Home  Obj   Coll  Review   |  <- bottom tabs
+-----------------------------+
```

### Prize Drop Modal

```
+-----------------------------+
|                             |
|                             |
|         +-------+           |
|         |       |           |  <- glowing chest
|         | * * * |           |
|         +-------+           |
|                             |
|      -- cracks open --      |
|                             |
|            <>               |  <- prize revealed
|          DIAMOND            |     with glow
|           Rare              |     rarity label
|                             |
|         Collected!          |  <- auto-dismiss 2s
|                             |
|   (tap anywhere to close)   |
|                             |
+-----------------------------+
```

### Objectives Screen (Monthly View)

```
+-----------------------------+
|  Objectives                 |
|  [Annual] [Monthly *]       |  <- toggle
|-----------------------------|
|  April 2026                 |
|                             |
|  WORK                       |
|  Annual: "Get promoted to   |
|   senior PM"                |
|  +-------------------------+|
|  | > Lead product launch   ||
|  |   ========-- 75%        ||
|  |   12/16 tasks done      ||
|  +-------------------------+|
|                             |
|  SELF                       |
|  Annual: "Run a half        |
|   marathon"                 |
|  +-------------------------+|
|  | > Run 80km total        ||
|  |   ======---- 60%        ||
|  |   48/80 km              ||
|  +-------------------------+|
|  +-------------------------+|
|  | > Read 2 books          ||
|  |   ========== 100% Done  ||
|  +-------------------------+|
|                             |
|-----------------------------|
|  Home  Obj   Coll  Review   |
+-----------------------------+
```

### Collection Gallery

```
+-----------------------------+
|  Collection                 |
|  Total: 247 prizes          |
|-----------------------------|
|                             |
|  LEGENDARY (2)              |
|  [icon] [icon]              |
|                             |
|  EPIC (14)                  |
|  [icon] [icon] [icon] ...   |
|                             |
|  RARE (38)                  |
|  [icon] [icon] [icon] ...   |
|                             |
|  UNCOMMON (72)              |
|  [collapsed - tap to show]  |
|                             |
|  COMMON (121)               |
|  [collapsed - tap to show]  |
|                             |
|-----------------------------|
|  Home  Obj   Coll  Review   |
+-----------------------------+
```

### Monthly Retrospective

```
+-----------------------------+
|  April 2026 -- In Review    |
|-----------------------------|
|                             |
|  Overall: 73% Complete      |
|                             |
|  +-------------------------+|
|  | Work     ========-- 80% ||
|  | Self     ======---- 60% ||
|  | Family   ========-- 75% ||
|  +-------------------------+|
|                             |
|  Tasks Completed: 48        |
|  Prizes Earned: 52          |
|  Best Prize: Obsidian       |
|                             |
|  +-------------------------+|
|  | "You were most active   ||
|  |  in Work this month.    ||
|  |  Consider giving Self   ||
|  |  more attention in May."||
|  +-------------------------+|
|                             |
|        [Next ->]            |
|                             |
|-----------------------------|
|  Home  Obj   Coll  Review   |
+-----------------------------+
```

---

## 11. Edge Cases & Design Decisions

| Scenario | Decision |
|---|---|
| **User misses monthly planning (days 1-3)** | Persistent but dismissible banner: "You haven't set April objectives yet. [Plan Now]." Never block access. |
| **No annual objectives set** | Allow monthly objectives without annual links. Gentle prompt to set annual ones. |
| **Tasks not linked to any objective** | Allowed. Still earn prize drops. Retrospective notes: "12 of 48 tasks were unlinked." Informational, not judgmental. |
| **User joins mid-year (e.g., August)** | Annual objectives framed as "for the remainder of the year." No guilt about months passed. |
| **All monthly objectives completed early** | Celebration animation. "You crushed April. Add more or enjoy the momentum." No pressure. |
| **Zero activity for entire month** | Next open: "Welcome back. No pressure. Want to plan [current month]?" Previous month shows "No data," not failure. |
| **User deletes aspect with active objectives** | Confirmation dialog. Objectives archived. Prizes kept. Archived data remains in retros. |
| **Timezone** | All dates in local device timezone. |
| **Maximum limits** | Aspects: 7. Annual objectives/aspect: 3. Monthly objectives/aspect: 3. Daily tasks: unlimited (soft warning at 15+). |

---

## 12. Future Roadmap

### v2.0 — Social & Intelligence
- **Accountability Partner:** Pair with one person. See completion rates (not task details). Send encouragement
- **Smart Suggestions:** Based on patterns, suggest next month's objectives
- **Home Screen Widget:** Today's task count, streak, last prize

### v2.5 — Depth
- **Sub-objective decomposition:** Break monthly objectives into milestones with intermediate prize drops
- **Custom prize cosmetics:** Unlock visual themes for prizes based on achievements
- **Journal mode:** Optional daily one-line journal entry attached to task completions

### v3.0 — Platform
- **Web companion:** Read-only dashboard for reviewing progress on desktop
- **API for integrations:** Fitness trackers, reading apps auto-complete tasks
- **Team/Family mode:** Shared family objectives that everyone contributes to

### v3.5 — Intelligence
- **Year-over-year comparison:** "In April 2026 vs 2027, you completed 30% more Self objectives"
- **Predictive completion:** "At your current pace, you'll hit your annual goal by October"
- **Natural language task entry:** "I ran 5km today" auto-creates and links task

---

## Appendix: What MyGoldenPath Is Not

- **Not a habit tracker.** Habits are recurring behaviors. MyGoldenPath tracks goal-directed tasks (though recurring routines are supported as a means to an end)
- **Not a to-do list.** Every task has context: linked to objectives, linked to life aspects
- **Not a social app.** Personal/family tool. No feed, no likes, no public profiles
- **Not a time tracker.** We track completion, not duration. "Did you do it?" not "How long?"
- **Not a parental control app.** Family mode is collaborative, not surveillance. Kids set their own goals; parents set the reward catalog
