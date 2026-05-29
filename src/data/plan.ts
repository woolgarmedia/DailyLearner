export type DayKind = 'lesson' | 'drill' | 'review' | 'production';

export type TimeBlock = { minutes: number; label: string };

export type PlanDay = {
  day: number;
  kind: DayKind;
  title: string;
  topicId?: string;
  blocks: TimeBlock[];
  deliverable: string;
  note?: string;
};

export const PLAN: PlanDay[] = [
  // ============ PHASE 1: FOUNDATIONS (Days 1–12) ============
  {
    day: 1,
    kind: 'lesson',
    title: 'Resolve Interface Tour',
    topicId: 'resolve-interface',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 30, label: 'Open Resolve, click each of the 7 pages, name them aloud' },
      { minutes: 10, label: 'Take the quiz (try for 10/10)' },
      { minutes: 5, label: 'Flashcard review' },
    ],
    deliverable: 'A screenshot of your Edit page with each of the 4 quadrants labelled in a paint app.',
  },
  {
    day: 2,
    kind: 'drill',
    title: 'Resolve Interface — Muscle Memory',
    topicId: 'resolve-interface',
    blocks: [
      { minutes: 10, label: 'Drill: import a random clip, drag to timeline, press Space' },
      { minutes: 40, label: 'Edit any 5 mins of footage into a 60-sec montage using only Shift+Z, Space, A, and arrow keys' },
      { minutes: 10, label: 'Self-check: navigate to each page WITHOUT looking at notes' },
    ],
    deliverable: 'A 60-second montage exported as MP4 — proves you can move from import to export.',
  },
  {
    day: 3,
    kind: 'lesson',
    title: 'Project Settings & Timeline Config',
    topicId: 'project-settings',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Open Project Settings, change resolution and framerate, watch what happens' },
      { minutes: 15, label: 'Build a "template project" you can duplicate later' },
      { minutes: 10, label: 'Take the quiz' },
    ],
    deliverable: 'A "first-impressions-template" project file saved with: 1080p60, AAC audio, named timeline v1_[GameName].',
  },
  {
    day: 4,
    kind: 'drill',
    title: 'Project Settings Practice',
    topicId: 'project-settings',
    blocks: [
      { minutes: 20, label: 'Create 3 new projects with different settings (1080p30, 1080p60, 4K60)' },
      { minutes: 25, label: 'Drag the same clip into each — observe judder where framerates mismatch' },
      { minutes: 15, label: 'Generate proxies for a high-res clip and play it back' },
    ],
    deliverable: 'A 30-sec demo video showing the judder effect when framerate mismatches — keep it as a reminder.',
  },
  {
    day: 5,
    kind: 'review',
    title: 'Week 1 Consolidation',
    blocks: [
      { minutes: 20, label: 'Re-take the Day 1 and Day 3 quizzes — aim for 10/10 on both' },
      { minutes: 20, label: 'Open Resolve from cold start and rebuild your template project from memory' },
      { minutes: 20, label: 'Watch one YouTube DaVinci Resolve tutorial — notice how much vocab you now understand' },
    ],
    deliverable: 'A written one-pager: "What I can now do in Resolve that I could not a week ago."',
  },
  {
    day: 6,
    kind: 'lesson',
    title: 'Basic Cutting — Blade, Trim, Ripple',
    topicId: 'basic-cuts',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 30, label: 'Drill: B-cut a clip into 5 pieces, ripple-delete the middle three' },
      { minutes: 10, label: 'Set I/O points in Source Viewer and drag — feel how much faster it is' },
      { minutes: 10, label: 'Take the quiz' },
    ],
    deliverable: 'A timeline screenshot showing a 30-second sequence built using ONLY I/O point inserts (no timeline blading).',
  },
  {
    day: 7,
    kind: 'drill',
    title: 'The 20-Minute Cut Challenge',
    topicId: 'basic-cuts',
    blocks: [
      { minutes: 5, label: 'Import 10 mins of any footage (gameplay, vlog, anything)' },
      { minutes: 20, label: 'Timer ON: cut to the 3 best minutes using only Blade + Ripple Delete' },
      { minutes: 15, label: 'Watch your cut. Where did you hesitate? Note shortcuts you fumbled.' },
      { minutes: 5, label: 'Flashcard the shortcuts you fumbled until they\'re automatic' },
    ],
    deliverable: 'A 3-minute cut produced in 20 minutes flat. Save it — you\'ll watch this back in 8 weeks.',
  },
  {
    day: 8,
    kind: 'lesson',
    title: 'Capture & Recording Setup (OBS)',
    topicId: 'capture-setup',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 30, label: 'Install OBS Studio. Configure: 1080p60, NVENC, 50–80 Mbps, 3 audio tracks' },
      { minutes: 10, label: 'Build your session checklist (notifications off, Game Mode on, etc.)' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'OBS configured with named scene "First Impressions Capture" and a written 8-item pre-record checklist.',
  },
  {
    day: 9,
    kind: 'drill',
    title: 'First Test Capture',
    topicId: 'capture-setup',
    blocks: [
      { minutes: 10, label: 'Run your pre-record checklist for real' },
      { minutes: 15, label: 'Capture 5 minutes of any game with mic + game audio + chat (Discord with yourself) on separate tracks' },
      { minutes: 25, label: 'Pull into Resolve. Verify: 3 audio tracks visible, no dropped frames, audio in sync' },
      { minutes: 10, label: 'If anything is off, fix OBS and re-test until clean' },
    ],
    deliverable: 'A clean 5-minute test recording in Resolve with confirmed 3 separate audio tracks and 0 dropped frames.',
  },
  {
    day: 10,
    kind: 'lesson',
    title: 'Voice & Mic Technique',
    topicId: 'voice-mic-recording',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 20, label: 'Set up mic 4–6" off-axis, add pop filter or improvised foam' },
      { minutes: 15, label: 'Treat your room with whatever you have (blanket, duvet)' },
      { minutes: 10, label: 'Take the quiz' },
    ],
    deliverable: 'A photo of your mic setup (with measurements) — keep it as a reference for the same setup every session.',
  },
  {
    day: 11,
    kind: 'drill',
    title: 'Voice Recording Comparison',
    topicId: 'voice-mic-recording',
    blocks: [
      { minutes: 15, label: 'Record the SAME 60-sec passage 3 ways: too close, correct (4-6" off-axis), too far' },
      { minutes: 20, label: 'Listen back. Identify plosives, room reverb, sibilance in each take' },
      { minutes: 15, label: 'Record a clean 30-sec "noise print" you can use in Resolve\'s noise reduction' },
      { minutes: 10, label: 'In Resolve Fairlight, apply noise reduction using your noise print' },
    ],
    deliverable: 'A clean 60-sec voice recording at -12 to -6dB peaks with noise reduction applied. This is your baseline reference.',
  },
  {
    day: 12,
    kind: 'review',
    title: 'Phase 1 Quiz Blitz',
    blocks: [
      { minutes: 30, label: 'Re-take all 5 Phase 1 quizzes (resolve-interface, project-settings, basic-cuts, capture-setup, voice-mic-recording)' },
      { minutes: 15, label: 'Any quiz under 10/10 — review the topic content, then retake' },
      { minutes: 15, label: 'Write a "Phase 1 cheat sheet" — every shortcut + every level/dB target on one A4 page' },
    ],
    deliverable: 'A laminated (or just printed) A4 cheat sheet next to your monitor. Phase 1 graduated.',
  },

  // ============ PHASE 2: EDITING CRAFT (Days 13–30) ============
  {
    day: 13,
    kind: 'lesson',
    title: 'Audio Mixing — Levels & Noise Reduction',
    topicId: 'audio-mixing',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Open Fairlight, find the mixer. Set track faders. Watch peaks stay below -3dB' },
      { minutes: 15, label: 'Apply noise reduction to a voice clip using a noise print' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A 90-sec mixed clip: voice at -6dB peaks, music at -18 to -20dB, noise reduction applied.',
  },
  {
    day: 14,
    kind: 'drill',
    title: 'Audio Mix Stress Test',
    topicId: 'audio-mixing',
    blocks: [
      { minutes: 20, label: 'Build a 2-min sequence: voice + game audio + music' },
      { minutes: 15, label: 'Use EQ: roll off below 80Hz on voice, listen for clarity gain' },
      { minutes: 20, label: 'Mix until: voice intelligible, music perceptible but not competing, game audio felt' },
      { minutes: 5, label: 'Play it to someone else. Can they hear every word?' },
    ],
    deliverable: 'A 2-min audio mix approved by a second person ("yes, I can hear everything you said").',
  },
  {
    day: 15,
    kind: 'lesson',
    title: 'Pacing, J-Cuts & L-Cuts',
    topicId: 'pacing-jcuts',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'In Resolve: practice expanding tracks, holding Alt, dragging audio independently' },
      { minutes: 15, label: 'Place 2 markers (M) on a timeline to flag pacing issues' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A 60-sec sequence with at least 2 J-cuts and 2 L-cuts, each labelled with a marker on the timeline.',
  },
  {
    day: 16,
    kind: 'drill',
    title: 'Pacing Surgery',
    topicId: 'pacing-jcuts',
    blocks: [
      { minutes: 25, label: 'Take yesterday\'s 60-sec sequence. Apply the "dead air rule" — kill anything >1.5s of nothing' },
      { minutes: 20, label: 'Add at least 3 more J/L cuts. Watch it back. Does it FEEL faster?' },
      { minutes: 15, label: 'Pick a favourite YouTuber, watch 2 mins. Note every J/L cut you spot' },
    ],
    deliverable: 'A revised, tighter cut + a written list of 5 J/L cuts spotted in a reference video.',
  },
  {
    day: 17,
    kind: 'lesson',
    title: 'Colour Grading — Lift/Gamma/Gain',
    topicId: 'colour-grading',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Open Color page. Identify scopes (Waveform/Parade/Vectorscope) and colour wheels' },
      { minutes: 15, label: 'On any clip, push Lift down, Gamma up, Gain down. See what each does' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'Before/after screenshots of 1 clip — straight from camera vs minimally graded.',
  },
  {
    day: 18,
    kind: 'drill',
    title: 'Five Screenshots, One Look',
    topicId: 'colour-grading',
    blocks: [
      { minutes: 10, label: 'Grab 5 screenshots from a single game' },
      { minutes: 35, label: 'Grade all 5 to look like they belong in the same world — use a serial node structure' },
      { minutes: 15, label: 'Use Grab Still to copy the grade across. Verify visual consistency' },
    ],
    deliverable: 'A 1-image comparison sheet: 5 ungraded screenshots on top row, 5 graded on bottom row.',
  },
  {
    day: 19,
    kind: 'review',
    title: 'Mid-Phase 2 Review',
    blocks: [
      { minutes: 25, label: 'Re-take the audio-mixing, pacing-jcuts, and colour-grading quizzes' },
      { minutes: 20, label: 'Watch a 5-min Luke Stephens clip. Pause every 30 sec. What is he doing pacing-wise? Audio-wise? Grade-wise?' },
      { minutes: 15, label: 'Add your observations to your cheat sheet' },
    ],
    deliverable: 'An updated cheat sheet + 10 timestamped notes on a reference creator video.',
  },
  {
    day: 20,
    kind: 'lesson',
    title: 'Titles, Text & Transitions',
    topicId: 'titles-transitions',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Add a Text+ title, edit font/size/colour. Animate Opacity with two keyframes' },
      { minutes: 15, label: 'Add a cross-dissolve between two clips. Then remove it. Decide if it served the cut' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A 5-sec animated title (your channel name or video title) fading in and out cleanly.',
  },
  {
    day: 21,
    kind: 'drill',
    title: '90-Second Intro Sequence',
    topicId: 'titles-transitions',
    blocks: [
      { minutes: 60, label: 'Build a 90-second intro: animated title reveal + face cam + game footage + lower third with channel name' },
    ],
    deliverable: 'A finished 90-sec intro sequence exported. This becomes the foundation of every future video.',
    note: 'Hard time-box: 60 minutes total. Resist the urge to perfect — this is iteration #1.',
  },
  {
    day: 22,
    kind: 'lesson',
    title: 'Scripting & Voice-Memo Workflow',
    topicId: 'scripting-voice-memos',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 20, label: 'Pick a game you\'ve played. Write its "spine" in 5–7 bullets' },
      { minutes: 15, label: 'Read your hook (first 30 sec of VO) out loud. Rewrite anything that stumbled' },
      { minutes: 10, label: 'Take the quiz' },
    ],
    deliverable: 'A one-page spine for a hypothetical first impressions video + a 30-sec hook script that reads naturally aloud.',
  },
  {
    day: 23,
    kind: 'drill',
    title: 'Record Your First Hook',
    topicId: 'scripting-voice-memos',
    blocks: [
      { minutes: 20, label: 'Set up mic. Record the hook from yesterday in 5 separate takes' },
      { minutes: 20, label: 'In Resolve, splice the best phrases from each take into one performance' },
      { minutes: 15, label: 'Apply noise reduction, set levels, listen back' },
      { minutes: 5, label: 'Send to a friend. Would they keep watching?' },
    ],
    deliverable: 'A polished 30-sec recorded hook + honest feedback from one outside listener.',
  },
  {
    day: 24,
    kind: 'lesson',
    title: 'Face-Cam — Lighting, Framing, Presence',
    topicId: 'face-cam-presence',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 20, label: 'Set up your face cam: eye-level, eyes on upper third, background 3ft behind' },
      { minutes: 20, label: 'Position one soft light at 45°. Test daylight from a window if no light' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A "set" photo of your face-cam setup with light, camera height, background — your replicable studio.',
  },
  {
    day: 25,
    kind: 'drill',
    title: 'Lighting Comparison Test',
    topicId: 'face-cam-presence',
    blocks: [
      { minutes: 15, label: 'Record yourself talking for 60s under: overhead room light only' },
      { minutes: 15, label: 'Same passage with phone torch on desk' },
      { minutes: 15, label: 'Same passage with key light at 45°' },
      { minutes: 15, label: 'Compare all three side-by-side in Resolve. Note the difference' },
    ],
    deliverable: 'A 3-up comparison clip showing the same delivery under 3 lighting setups — proves to yourself why setup #3 is the only acceptable one.',
  },
  {
    day: 26,
    kind: 'review',
    title: 'Phase 2 Mid Review',
    blocks: [
      { minutes: 20, label: 'Re-take the scripting and face-cam quizzes' },
      { minutes: 25, label: 'Pull yesterday\'s footage into Resolve. Apply audio mix, noise reduction, basic grade' },
      { minutes: 15, label: 'Watch your hook from Day 23 again. What\'s improved? What still needs work?' },
    ],
    deliverable: 'A written list of 3 specific things you can now do that you couldn\'t at Day 12.',
  },
  {
    day: 27,
    kind: 'production',
    title: 'Mini Production — Record Day',
    blocks: [
      { minutes: 15, label: 'Write a tight 90-sec spine for a "first impressions of a game" practice video' },
      { minutes: 30, label: 'Record gameplay segment with mic, voice memos, face cam ALL captured' },
      { minutes: 15, label: 'Verify all files landed cleanly in Resolve' },
    ],
    deliverable: 'A folder containing: gameplay footage, voice track, face-cam track, voice memos. Production-grade source material.',
  },
  {
    day: 28,
    kind: 'production',
    title: 'Mini Production — Edit Day',
    blocks: [
      { minutes: 60, label: 'Cut yesterday\'s footage into a 90-sec sequence applying everything: audio mix, J/L cuts, grade, titles' },
    ],
    deliverable: 'A 90-sec polished sequence that you\'d be willing to show another creator. Time-boxed strictly.',
    note: 'This is your first end-to-end test. Don\'t worry about perfect — focus on completing all stages within 60 mins.',
  },
  {
    day: 29,
    kind: 'review',
    title: 'Feedback Day',
    blocks: [
      { minutes: 30, label: 'Send your 90-sec edit to 2 people. Ask: was the audio clear? Was the pacing good? Did the hook land?' },
      { minutes: 20, label: 'Identify your top 3 weaknesses from the feedback' },
      { minutes: 10, label: 'Decide which of those to focus on next week' },
    ],
    deliverable: 'A written list of 3 specific feedback points you will act on.',
  },
  {
    day: 30,
    kind: 'review',
    title: 'Phase 2 Quiz Blitz',
    blocks: [
      { minutes: 40, label: 'Re-take all 6 Phase 2 quizzes — aim for 10/10 on each' },
      { minutes: 15, label: 'Update your cheat sheet with everything from Phase 2' },
      { minutes: 5, label: 'Celebrate. You\'re half way.' },
    ],
    deliverable: 'All Phase 2 quizzes passed + updated 2-page cheat sheet covering Phases 1 & 2.',
  },

  // ============ PHASE 3: PHOTOSHOP & THUMBNAILS (Days 31–40) ============
  {
    day: 31,
    kind: 'lesson',
    title: 'Photoshop Interface & Layers',
    topicId: 'ps-interface',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Create a 1280×720 sRGB canvas. Save as your thumbnail template' },
      { minutes: 15, label: 'Practice: duplicate layer (Ctrl+J), group (Ctrl+G), free transform (Ctrl+T)' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A blank thumbnail template (.PSD) at 1280×720 sRGB, saved with named layers ready for content.',
  },
  {
    day: 32,
    kind: 'drill',
    title: 'Reverse-Engineer a Thumbnail',
    topicId: 'ps-interface',
    blocks: [
      { minutes: 5, label: 'Pick a high-CTR gaming thumbnail you admire (Luke Stephens, Skill Up, ACG)' },
      { minutes: 50, label: 'Recreate it as faithfully as possible in Photoshop using only the techniques you know' },
      { minutes: 5, label: 'Compare your version side-by-side with the original. Where did you fall short?' },
    ],
    deliverable: 'Your recreation + a written 3-bullet list of techniques you still need to learn.',
  },
  {
    day: 33,
    kind: 'lesson',
    title: 'Subject Cutout & Background Removal',
    topicId: 'subject-cutout',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Cut out a photo of yourself using: Remove Background → Quick Select fix → Select and Mask' },
      { minutes: 15, label: 'Check edges against a solid colour. Fix halos' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A clean cutout of YOUR face on transparent background, saved as a Smart Object PSD. This is your reaction-face library asset.',
  },
  {
    day: 34,
    kind: 'drill',
    title: 'Five Cutouts, Half an Hour',
    topicId: 'subject-cutout',
    blocks: [
      { minutes: 30, label: 'Cut out 5 things in 30 minutes: a game character, a logo, a weapon, an environment shot, another photo of you' },
      { minutes: 20, label: 'Score each one 1–5 for edge cleanliness. Identify your weakest type (hair? logos?)' },
      { minutes: 10, label: 'Redo your weakest cutout one more time' },
    ],
    deliverable: '5 cutouts on transparent backgrounds + a written score for each + a note on what to practice more.',
  },
  {
    day: 35,
    kind: 'review',
    title: 'Photoshop Skills Check',
    blocks: [
      { minutes: 20, label: 'Re-take the ps-interface and subject-cutout quizzes' },
      { minutes: 25, label: 'Combine yesterday\'s cutouts into a single canvas. Practice scaling, positioning, blend modes' },
      { minutes: 15, label: 'Browse 20 gaming thumbnails. Identify the patterns: where\'s the face? Where\'s the text? What\'s the background?' },
    ],
    deliverable: 'A pattern-spotting document: top 5 thumbnail layout patterns you observed.',
  },
  {
    day: 36,
    kind: 'lesson',
    title: 'Thumbnail Composition & Psychology',
    topicId: 'thumbnail-design',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Apply the three-second rule — zoom to 15% in Photoshop, force yourself to design for that size' },
      { minutes: 15, label: 'Practice Layer Styles: white stroke on text, drop shadow, gradient overlay' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A draft thumbnail concept that\'s readable and parseable at 15% zoom (the mobile test).',
  },
  {
    day: 37,
    kind: 'drill',
    title: 'Three Thumbnail Concepts',
    topicId: 'thumbnail-design',
    blocks: [
      { minutes: 60, label: 'For a real (or planned) video, design 3 distinct thumbnail concepts — vary the focal element, colour, text placement' },
    ],
    deliverable: '3 thumbnail concepts (1280×720 PNG each) ready to A/B test mentally or with 2 friends.',
  },
  {
    day: 38,
    kind: 'drill',
    title: 'Build a Reusable Thumbnail Template',
    topicId: 'thumbnail-design',
    blocks: [
      { minutes: 50, label: 'Build a PSD template with Smart Object placeholders for: hero image, secondary visual, main text, sub-text' },
      { minutes: 10, label: 'Save with versioned name. Try replacing the smart objects to see how fast a new thumbnail comes together' },
    ],
    deliverable: 'A reusable template PSD that turns a new thumbnail into a 20-min job instead of a 2-hr job.',
  },
  {
    day: 39,
    kind: 'production',
    title: 'Three Thumbnails For Upcoming Videos',
    topicId: 'thumbnail-design',
    blocks: [
      { minutes: 60, label: 'Using your template, design 3 finished thumbnails for next 3 hypothetical videos' },
    ],
    deliverable: 'A 3-pack of usable thumbnails — proves your template + skills are production-ready.',
  },
  {
    day: 40,
    kind: 'review',
    title: 'Phase 3 Quiz Blitz',
    blocks: [
      { minutes: 25, label: 'Re-take all 3 Phase 3 quizzes — aim for 10/10 on each' },
      { minutes: 25, label: 'Update your cheat sheet — add the thumbnail design checklist' },
      { minutes: 10, label: 'Reflect: which is harder for you — editing or design?' },
    ],
    deliverable: 'Phase 3 quizzes passed + a 3-page cheat sheet covering all phases so far.',
  },

  // ============ PHASE 4: YOUTUBE CRAFT (Days 41–50) ============
  {
    day: 41,
    kind: 'lesson',
    title: 'Hooks — Engineering the First 30 Seconds',
    topicId: 'hooks',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 30, label: 'Watch the first 30 sec of 10 high-performing gaming videos. Identify ACP (Attention → Context → Promise)' },
      { minutes: 10, label: 'Take the quiz' },
      { minutes: 5, label: 'Flashcard the three hook types' },
    ],
    deliverable: 'A spreadsheet of 10 videos with hook beats timestamped (e.g. Attention: 0–4s; Context: 4–14s; Promise: 14–28s).',
  },
  {
    day: 42,
    kind: 'drill',
    title: 'Write Ten Hooks',
    topicId: 'hooks',
    blocks: [
      { minutes: 45, label: 'Pick one upcoming video topic. Write 10 different hooks for it (variety: statement, question, clip)' },
      { minutes: 10, label: 'Send the 3 best to a friend. Ask which makes them most curious' },
      { minutes: 5, label: 'Pick a winner. Commit to using it on your next video' },
    ],
    deliverable: '10 written hook drafts + 1 final chosen hook ready to record.',
  },
  {
    day: 43,
    kind: 'lesson',
    title: 'Retention — Open Loops & Pattern Interrupts',
    topicId: 'retention',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 30, label: 'Watch a 10-min video at 1.5x. Note every pattern interrupt (cut, music change, zoom, title)' },
      { minutes: 10, label: 'Take the quiz' },
      { minutes: 5, label: 'Identify the open loops the creator used' },
    ],
    deliverable: 'A written breakdown: count of pattern interrupts in 10 mins + the 2–3 open loops they used.',
  },
  {
    day: 44,
    kind: 'drill',
    title: 'Retention Surgery On Your Own Edit',
    topicId: 'retention',
    blocks: [
      { minutes: 45, label: 'Open your Day 28 mini-production. Add: 1 open loop, 3 more pattern interrupts, remove all remaining dead air' },
      { minutes: 15, label: 'Watch the revised version. Does it pull you forward more?' },
    ],
    deliverable: 'A v2 of your Day 28 sequence with documented retention techniques added.',
  },
  {
    day: 45,
    kind: 'review',
    title: 'Mid-Phase 4 Review',
    blocks: [
      { minutes: 20, label: 'Re-take hooks and retention quizzes' },
      { minutes: 25, label: 'Re-read your Day 23 hook script. Apply ACP structure deliberately. Rewrite if needed' },
      { minutes: 15, label: 'Re-record the improved hook. Listen to old vs new' },
    ],
    deliverable: 'A re-recorded hook that visibly applies ACP structure.',
  },
  {
    day: 46,
    kind: 'lesson',
    title: 'Titles, SEO & Analytics Literacy',
    topicId: 'titles-seo',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Visit YouTube Studio (if you have a channel) or sample data. Find CTR, AVD, Impressions, Watch Time' },
      { minutes: 15, label: 'Search YouTube for "[your game name]" — note autocomplete suggestions, real search demand' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A list of 5 real autocomplete search terms for an upcoming video topic + a structured title using one of them.',
  },
  {
    day: 47,
    kind: 'drill',
    title: 'Title Variations & Chapters',
    topicId: 'titles-seo',
    blocks: [
      { minutes: 30, label: 'Write 5 different titles for your next video. Test them on 3 non-gamer friends — which sparks curiosity?' },
      { minutes: 20, label: 'Plan chapter timestamps for a hypothetical 10-min video (hook, gameplay, deep dive, verdict)' },
      { minutes: 10, label: 'Write description copy with chapters in YouTube format (00:00 Hook, 01:30 ...)' },
    ],
    deliverable: '5 title variations + 1 winner + a fully-written description with chapter timestamps.',
  },
  {
    day: 48,
    kind: 'drill',
    title: 'Analyse a Peer\'s Video',
    blocks: [
      { minutes: 60, label: 'Pick a small gaming channel (under 50k subs). Watch their latest video. Document: hook quality, audio mix, pacing, grade, thumbnail, title. Identify 3 things they do well + 3 things you\'d change' },
    ],
    deliverable: 'A written critique (~300 words) — this trains your editorial eye more than reading another tutorial.',
  },
  {
    day: 49,
    kind: 'review',
    title: 'Phase 4 Reflection',
    blocks: [
      { minutes: 25, label: 'Re-take the titles-seo quiz' },
      { minutes: 20, label: 'Re-read your Day 48 critique. Apply ONE of the "things you\'d change" to your own Day 28 mini-production' },
      { minutes: 15, label: 'Update your cheat sheet with hook + retention + analytics insights' },
    ],
    deliverable: 'An updated cheat sheet + a v3 of the mini-production with one peer-inspired improvement applied.',
  },
  {
    day: 50,
    kind: 'review',
    title: 'Phase 4 Quiz Blitz',
    blocks: [
      { minutes: 30, label: 'Re-take all 3 Phase 4 quizzes — aim for 10/10' },
      { minutes: 20, label: 'Write a one-page channel strategy: niche, target audience, hook formula, posting cadence' },
      { minutes: 10, label: 'You are 50 days in. Look at Day 1. Read what you wrote. Feel the gap.' },
    ],
    deliverable: 'A one-page personal channel strategy document. Phase 4 graduated.',
  },

  // ============ PHASE 5: PRODUCTION SPRINT (Days 51–60) ============
  {
    day: 51,
    kind: 'lesson',
    title: 'Export, Delivery & Upload Settings',
    topicId: 'export-delivery',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'On the Deliver page: configure MP4 / H.264 / 25 Mbps / AAC 48kHz / matching framerate' },
      { minutes: 10, label: 'Save as a preset named "YouTube 1080p60"' },
      { minutes: 10, label: 'Take the quiz' },
    ],
    deliverable: 'A saved YouTube render preset. Never reconfigure these settings again.',
  },
  {
    day: 52,
    kind: 'lesson',
    title: 'Workflow Systems & Time-Boxing',
    topicId: 'workflow-systems',
    blocks: [
      { minutes: 15, label: 'Read the lesson' },
      { minutes: 25, label: 'Build your standard folder structure on disk: /[Game]/Raw, Audio, Music, Exports, Thumbnails, Resolve' },
      { minutes: 15, label: 'Create a "First Impressions Master Template" Resolve project with intro, lower third, grade, titles pre-built' },
      { minutes: 5, label: 'Take the quiz' },
    ],
    deliverable: 'A reusable folder template + a Resolve master template project. Production system online.',
  },
  {
    day: 53,
    kind: 'production',
    title: 'First Real Video — Plan & Script',
    blocks: [
      { minutes: 30, label: 'Pick the game you\'ll cover. Write your spine (5–7 bullets)' },
      { minutes: 20, label: 'Write your hook (ACP structure, ~30 sec script)' },
      { minutes: 10, label: 'Outline your 4 acts. Plan thumbnail concept' },
    ],
    deliverable: 'A one-page production document: spine, hook, 4-act outline, thumbnail concept.',
  },
  {
    day: 54,
    kind: 'production',
    title: 'First Real Video — Record',
    blocks: [
      { minutes: 10, label: 'Run pre-record checklist. Mic check, OBS check, face-cam check' },
      { minutes: 45, label: 'Play the game and record. Capture voice memos for highlights' },
      { minutes: 5, label: 'Timestamp voice memos against gameplay recording' },
    ],
    deliverable: 'Raw footage + voice memos + face-cam — ready for paper edit.',
  },
  {
    day: 55,
    kind: 'production',
    title: 'First Real Video — Rough Cut + Audio',
    blocks: [
      { minutes: 35, label: 'Paper edit from voice memos. Drop the best moments into the timeline using I/O points' },
      { minutes: 25, label: 'Audio mix pass: noise reduction, levels, music bed at -18dB' },
    ],
    deliverable: 'A rough cut with clean audio. Time-boxed — no perfectionism.',
  },
  {
    day: 56,
    kind: 'production',
    title: 'First Real Video — B-Roll + Grade',
    blocks: [
      { minutes: 30, label: 'Add gameplay B-roll over your A-roll commentary. Apply J/L cuts for flow' },
      { minutes: 30, label: 'Colour grade pass: primary correction node, optional LUT at 50%, copy grade across' },
    ],
    deliverable: 'A video that now looks and flows like a real production.',
  },
  {
    day: 57,
    kind: 'production',
    title: 'First Real Video — Titles + Final Review',
    blocks: [
      { minutes: 25, label: 'Add intro title, lower third with channel name, chapter title cards if needed' },
      { minutes: 30, label: 'Watch end-to-end with fresh ears. Note every place you got bored. Fix.' },
      { minutes: 5, label: 'Final pass: audio levels, no dead air, hook lands' },
    ],
    deliverable: 'A finished edit ready to export.',
  },
  {
    day: 58,
    kind: 'production',
    title: 'First Real Video — Thumbnail Day',
    blocks: [
      { minutes: 50, label: 'Open your thumbnail template. Build 2 finished thumbnails for this video' },
      { minutes: 10, label: 'Test both at 15% zoom. Pick the winner. Show 2 friends if unsure' },
    ],
    deliverable: 'A finished thumbnail (1280×720 PNG, sRGB) tested at mobile size.',
  },
  {
    day: 59,
    kind: 'production',
    title: 'First Real Video — Export + QC',
    blocks: [
      { minutes: 40, label: 'Run your saved YouTube render preset. Time the export' },
      { minutes: 15, label: 'Watch the export in full on your phone. Check audio sync, colour, title readability' },
      { minutes: 5, label: 'If anything\'s off, fix in Resolve and re-export' },
    ],
    deliverable: 'A QC\'d MP4 ready to upload + an export-time log entry for your workflow data.',
  },
  {
    day: 60,
    kind: 'production',
    title: 'Upload, Publish, Reflect',
    blocks: [
      { minutes: 20, label: 'Upload to YouTube. Add title, description with chapters, thumbnail, end screen' },
      { minutes: 20, label: 'Schedule or publish. Share with 3 trusted people for honest feedback' },
      { minutes: 20, label: 'Write a "lessons learned" doc: what went well, what to fix in video #2' },
    ],
    deliverable: 'A published (or scheduled) first impressions video + a written reflection doc. The 60-day plan is complete. Your channel is operational.',
    note: 'In 48 hours, check the retention curve. It tells you what to improve for video #2. Start the cycle again.',
  },
];

export function dayByNumber(num: number): PlanDay | undefined {
  return PLAN.find((d) => d.day === num);
}
