# Daily Learner

A personal learning app: structured 60-day path through DaVinci Resolve, Photoshop, and YouTube craft for gaming first-impressions content. ~1 hour per day, with quizzes, exercises, and concrete daily deliverables.

Built with Expo Router so it can be installed on any device via Expo Go or built natively, and updated over-the-air via EAS Update.

## Stack

- Expo SDK 56 / React Native 0.85
- expo-router (file-based routes)
- TypeScript
- AsyncStorage for progress persistence
- expo-updates for OTA
- Google Fonts: Playfair Display, DM Sans, DM Mono

## Running locally

```bash
npm install
npx expo start
```

Then either scan the QR with Expo Go on Android, or press `a` to launch the Android emulator.

## First-time EAS setup

To wire this project up to your EAS account:

```bash
# from C:/dev/DailyLearner
npx eas login          # if not already logged in
npx eas init           # creates the project on EAS and writes the project id back into app.json
```

`eas init` will set `extra.eas.projectId` and `updates.url` inside `app.json` automatically.

## Pushing an OTA update

**Automatic (via GitHub Actions):** every push to `main` runs `.github/workflows/eas-update.yml`, which type-checks the project and publishes an OTA update to the `production` channel. The phone picks it up on next cold start.

To enable this, set one GitHub repo secret:

1. Create a personal access token at https://expo.dev/settings/access-tokens (give it Update permissions for the `tailorbyte/daily-learner` project).
2. In GitHub → Settings → Secrets and variables → Actions → New repository secret, name it `EXPO_TOKEN` and paste the token.

The workflow skips when only docs, scripts, workflows, or `eas.json` change — so cosmetic README edits don't burn an OTA. You can also trigger it manually from the Actions tab via the "Run workflow" button.

**Manual:** if you prefer a one-off publish without going through git:

```bash
npx eas update --branch production --message "Describe the change"
```

## Building the Android APK / AAB for your phone

You need to do this:
- Once initially (to install the app)
- Any time native dependencies are added or removed
- Whenever `version` in `app.json` is bumped (since `runtimeVersion` is tied to `appVersion`)

> ⚠️ **v1.1.0 requires a rebuild.** Daily reminders use `expo-notifications` and `@react-native-community/datetimepicker`, both of which are native modules. The bump from 1.0.0 → 1.1.0 ensures the OTA update for this feature is NOT delivered to the older 1.0.0 APK (which would crash on the new code). Build the v1.1.0 APK before expecting OTAs to work.

```bash
# Development build (install on phone, then JS updates come via `eas update`)
npx eas build --profile preview --platform android

# When the build finishes, EAS gives you a download link or QR code.
# Install the APK on your phone, open it, and OTA updates take over from there.
```

## Project structure

```
src/
├── app/
│   ├── _layout.tsx              # Root stack, loads Google Fonts
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab bar
│   │   ├── index.tsx            # Learning Path
│   │   ├── plan.tsx             # 60-Day Plan
│   │   └── completed.tsx        # Completed Quizzes
│   ├── topic/[id].tsx           # Topic detail
│   ├── quiz/[id].tsx            # Quiz screen
│   └── day/[num].tsx            # Day detail
├── components/                  # Reusable UI (Card, Badge, Button, T, ProgressBar)
├── constants/
│   └── theme.ts                 # Palette, Fonts, Spacing, Radius
├── data/
│   ├── phases.ts                # Phase metadata
│   ├── topics.ts                # 19 topics (steps, shortcuts, memory, tips)
│   ├── quizzes.ts               # ~190 quiz questions
│   └── plan.ts                  # 60-day plan with time blocks + deliverables
└── store/
    └── progress.ts              # AsyncStorage-backed progress store + useProgress hook
```

## Adding content over time

- **New topics:** append to `src/data/topics.ts` and `src/data/quizzes.ts`, then push an OTA update — no rebuild needed.
- **Plan changes:** edit `src/data/plan.ts`, push OTA.
- **Visual tweaks:** edit `src/constants/theme.ts`, push OTA.

Native config (`app.json` plugins, packages, permissions) requires a fresh `eas build`.

## Storage

All progress is in `AsyncStorage` under `daily_learner_state_v1`:

```ts
{
  passedTopics: Record<string, true>,
  attempts: Record<string, Array<{score, total, passed, date}>>,
  completedDays: Record<number, true>,
  currentDay: number
}
```

No cloud sync. If you wipe the app, you lose progress — by design (local-first).
