import type { ColorTag } from '@/constants/theme';

export type MemoryCard =
  | { kind: 'flashcard'; text: string }
  | { kind: 'exercise'; text: string }
  | { kind: 'quiz'; text: string };

export type Shortcut = { action: string; keys: string };

export type Topic = {
  id: string;
  phase: number;
  iconTag: ColorTag;
  icon: string;
  title: string;
  checklistLabel: string;
  steps: string[];
  shortcuts?: Shortcut[];
  memory: MemoryCard[];
  tip?: { title: string; body: string };
};

export const TOPICS: Topic[] = [
  // ============================================
  // PHASE 1 — RESOLVE & RECORDING FOUNDATIONS
  // ============================================
  {
    id: 'resolve-interface',
    phase: 1,
    iconTag: 'resolve',
    icon: '🎬',
    title: 'The Resolve Interface & Page Structure',
    checklistLabel: 'Resolve: Interface & Page Structure',
    steps: [
      'Open Resolve and identify the seven pages: Media, Cut, Edit, Fusion, Color, Fairlight, Deliver. Each page is a specialised workspace — you won\'t need them all right away.',
      'Learn the Edit page layout: Source Viewer (top left), Timeline Viewer (top right), Media Pool (bottom left), Timeline (bottom right). This is your main workspace.',
      'Set up a new project: File → New Project. Name it by game title. Learn where Resolve stores project files (not the video files — just the project data).',
      'Understand the difference between the Media Pool (where your raw clips live) and the Timeline (where your edit lives). These are linked but not the same thing.',
      'Import your first footage: Media Pool → right-click → Import Media. Drag a clip to the timeline. Press Space to play.',
      'Learn the Inspector panel (top right when a clip is selected): this is where you adjust clip properties like position, scale, and speed.',
    ],
    shortcuts: [
      { action: 'Play / Pause', keys: 'Space' },
      { action: 'Move one frame left/right', keys: '← →' },
      { action: 'Move to clip start/end', keys: 'Home / End' },
      { action: 'Fit timeline to window', keys: 'Shift + Z' },
      { action: 'Zoom timeline in/out', keys: 'Ctrl + Scroll' },
      { action: 'Undo', keys: 'Ctrl + Z' },
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What are the 7 Resolve pages?" — Back: Media, Cut, Edit, Fusion, Color, Fairlight, Deliver. Make a physical card. Quiz yourself until it\'s instant.',
      },
      {
        kind: 'exercise',
        text: 'Close Resolve. Open it. Without looking at notes, navigate to each page by clicking its tab. Then navigate back to Edit. Do this 5 times daily for a week.',
      },
      {
        kind: 'quiz',
        text: 'Draw the Edit page layout from memory on paper: label the four quadrants. Check it against the real thing. Redo until perfect.',
      },
    ],
    tip: {
      title: 'Gaming tip',
      body: 'When you first open Resolve, record a 5-minute screen capture of yourself just exploring the interface with no goal. Rewatch it a week later — you\'ll be amazed how much you\'ve internalised.',
    },
  },
  {
    id: 'project-settings',
    phase: 1,
    iconTag: 'resolve',
    icon: '⚙️',
    title: 'Project Settings & Timeline Configuration',
    checklistLabel: 'Resolve: Project Settings & Timelines',
    steps: [
      'Open Project Settings (gear icon bottom right). Go to Master Settings. Understand Resolution (1920×1080 for HD, 3840×2160 for 4K) and Frame Rate — match these to your game capture settings.',
      'Learn why mismatched frame rates cause judder. If you capture at 60fps, your timeline should be 60fps. For YouTube, exporting at 60fps is standard for gaming.',
      'Set up your timeline: In the Edit page, right-click in the Media Pool → New Timeline. Name it "v1_[GameName]". Use this naming convention consistently.',
      'Understand proxy workflows: for high-res game footage, Resolve can create smaller proxy files for editing, then relink to full quality for export. Learn: Clip menu → Proxy → Generate Proxy Media.',
      'Save your preferences as a template project you can duplicate for each new video.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What resolution and framerate should I set for a YouTube gaming video?" — Back: 1920×1080 or 3840×2160, 60fps. Keep this on your desk.',
      },
      {
        kind: 'exercise',
        text: 'Create 3 different projects with different settings. Practice opening Project Settings and changing the frame rate, then explain to yourself out loud why it matters.',
      },
    ],
  },
  {
    id: 'basic-cuts',
    phase: 1,
    iconTag: 'resolve',
    icon: '✂️',
    title: 'Basic Cutting — Blades, Trims & Ripple Edits',
    checklistLabel: 'Resolve: Blades, Trims & Ripple Edits',
    steps: [
      'Learn the four main tools in the Edit page toolbar: Selection tool (A), Trim tool (T), Blade tool (B), and Snapping (N). Know what each does before using them.',
      'Practice the Blade tool (B): click anywhere on a clip to split it into two. This is the most fundamental cut. Split a clip, then delete the unwanted section.',
      'Learn Ripple Delete: after deleting a clip, the gap closes automatically. Right-click a clip → Ripple Delete, or select the gap and press Delete.',
      'Master the Trim tool (T): hover over a clip edge to drag it shorter or longer. This extends or contracts the clip non-destructively — it doesn\'t delete footage permanently.',
      'Practice the "paper edit" workflow: watch your raw footage, note timestamps of your best reactions and moments, then build your first rough cut using only those moments.',
      'Learn to set In and Out points in the Source Viewer (I and O keys) before dragging clips to the timeline — this is faster than cutting on the timeline.',
    ],
    shortcuts: [
      { action: 'Selection tool', keys: 'A' },
      { action: 'Trim tool', keys: 'T' },
      { action: 'Blade tool (split clip)', keys: 'B' },
      { action: 'Set In point', keys: 'I' },
      { action: 'Set Out point', keys: 'O' },
      { action: 'Ripple Delete', keys: 'Backspace' },
      { action: 'Toggle snapping', keys: 'N' },
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What\'s the difference between Delete and Ripple Delete?" — Back: Delete leaves a gap. Ripple Delete removes the clip AND closes the gap, pulling everything after it forward.',
      },
      {
        kind: 'exercise',
        text: 'Import 10 minutes of any footage. Set a timer for 20 minutes. Cut it down to the 3 most interesting minutes using only the Blade and Ripple Delete. Repeat weekly.',
      },
      {
        kind: 'quiz',
        text: 'Without looking: what key switches to Blade tool? What key sets an In point? What does "N" do? Write it on paper. If you hesitate on any, it\'s not muscle memory yet.',
      },
    ],
  },
  {
    id: 'capture-setup',
    phase: 1,
    iconTag: 'resolve',
    icon: '🎥',
    title: 'Capture & Recording Setup — OBS / NVIDIA',
    checklistLabel: 'Recording: Clean Game Capture Setup',
    steps: [
      'Pick your capture tool: NVIDIA ShadowPlay (zero overhead, instant replay) or OBS Studio (flexible scenes and separate audio tracks). For first impressions, OBS gives you the most control.',
      'Set capture resolution to match your monitor — 1920×1080 or 2560×1440 — at 60fps. Match your Resolve timeline to this exactly to avoid judder.',
      'Configure codec: NVENC H.264 (fast, hardware-accelerated on RTX cards) at 50–80 Mbps. Higher bitrate captures more game detail; you can always compress on export.',
      'Critical: set up SEPARATE audio tracks for game audio, mic, and Discord/voice chat. In OBS → Settings → Output → Recording → Audio Track 1+2+3. This lets you mix or mute each independently in Resolve.',
      'Test your capture: record a 60-second sample, drag into Resolve, check for dropped frames (Inspector → Clip Attributes), audio sync, and that all 3 audio tracks landed separately.',
      'Build a "session checklist": close Chrome tabs, disable notifications, set Windows Game Mode on, check headset volume, hit record BEFORE you boot the game. Run through this every time.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "Why use separate audio tracks for game, mic, and chat?" — Back: So you can mix levels independently in post (e.g. duck game audio under voice, mute chat entirely if a friend swore on tape).',
      },
      {
        kind: 'exercise',
        text: 'Record a 5-minute gameplay test. Pull it into Resolve. Verify: 3 distinct audio tracks visible, no dropped frames, audio in sync with video. If anything\'s off — fix OBS settings before you ever record a real video.',
      },
      {
        kind: 'quiz',
        text: 'Without looking at OBS, write down: target resolution, target framerate, target bitrate, codec, number of audio tracks. If you can\'t recall any of these, your capture setup isn\'t locked in yet.',
      },
    ],
    tip: {
      title: 'Don\'t skip this',
      body: 'A bad capture pipeline is unfixable in post. 4 hours of editing genius can\'t save mic audio recorded with game audio bleed. Spend a full day getting the capture right before you film anything that matters.',
    },
  },
  {
    id: 'voice-mic-recording',
    phase: 1,
    iconTag: 'resolve',
    icon: '🎙️',
    title: 'Voice & Mic Recording Technique',
    checklistLabel: 'Recording: Voice & Mic Technique',
    steps: [
      'Position the mic 4–6 inches from your mouth, slightly off-axis (pointed at your cheek, not straight at your lips). This reduces plosives ("p" and "b" pops) without compromising clarity.',
      'Use a pop filter or foam windscreen. £8 from Amazon. Non-negotiable — plosives are the #1 unfixable audio problem in gaming videos.',
      'Set your gain so your loudest moments peak at -12dB to -6dB, never hitting 0dB. Check this in OBS\'s audio meter or your audio interface. Test by reacting loudly — if it clips, lower the gain.',
      'Treat your room cheaply: blankets on hard surfaces, foam panels behind/beside you. The bare minimum: record under a duvet for a comedy "blanket fort" test — that\'s your acoustic ceiling. Anything worse means your room is too live.',
      'Always wear closed-back headphones while recording — game audio leaking from open-backs into your mic is brutal to remove in post.',
      'Record a 30-second "noise print" of dead silence at the start of every session. You\'ll use this in Resolve\'s Fairlight Noise Reduction to remove room hum cleanly.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "Where should peak voice levels sit?" — Back: -12dB to -6dB. Never touch 0dB. Loud reactions count.',
      },
      {
        kind: 'exercise',
        text: 'Record yourself reading the same 60-second passage 3 ways: 1) mic 2 inches from mouth straight-on, 2) mic 6 inches off-axis with pop filter, 3) standing 2 feet away. Listen back. The middle one should win obviously. That\'s now your baseline.',
      },
      {
        kind: 'quiz',
        text: 'What is a plosive? What\'s a noise print? Why do open-back headphones cause problems while recording? If you fumble any of these, watch a 5-min mic basics YouTube video before moving on.',
      },
    ],
    tip: {
      title: 'Audio is content',
      body: 'Viewers will forgive blurry footage. They will NOT forgive bad mic audio. If you fix one technical thing on your channel this month, fix this.',
    },
  },

  // ============================================
  // PHASE 2 — EDITING CRAFT
  // ============================================
  {
    id: 'audio-mixing',
    phase: 2,
    iconTag: 'resolve',
    icon: '🔊',
    title: 'Audio Mixing — Levels, Noise Reduction & Music',
    checklistLabel: 'Resolve: Audio Mixing & Noise Reduction',
    steps: [
      'Go to the Fairlight page. Learn the Mixer panel — each track has a fader (volume), and the Master output shows your total level. Watch the meters: peaks should hit around -6dB to -3dB, never clip (go red).',
      'Understand the target: YouTube\'s loudness normalisation targets -14 LUFS. Don\'t obsess over this early — just keep your voice clear and consistent, music significantly under it.',
      'Apply noise reduction to your voice track: right-click clip → Adjust Clip Attributes, or use the Fairlight FX panel → Noise Reduction. First select a "noise print" from a silent moment, then apply.',
      'Learn to set a track volume: right-click the fader in the mixer → Set Volume, or automate volume with keyframes on the timeline (the line on top of each audio clip).',
      'Music layering: import background music as a new audio track below your voice. Drop its level to around -18 to -20dB so it doesn\'t compete. Fade it in/out using handles at clip edges.',
      'Use the Equaliser (FX → Equaliser) to roll off low rumble from your voice track below 80Hz, and cut any harsh frequencies around 2–4kHz if your voice sounds harsh.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What dB should my music sit at under my voice?" — Back: Around -18 to -20dB, so the voice is clearly dominant. Flashcard the LUFS target too: -14 LUFS for YouTube.',
      },
      {
        kind: 'exercise',
        text: 'Take a 2-minute clip of yourself talking. Add a music track. Mix them together so the voice is clearly intelligible at a normal listening level. Play it to someone else and ask if they can hear everything you say.',
      },
      {
        kind: 'quiz',
        text: 'Listen to your favourite YouTube gaming channel. Pause randomly. Ask: is the voice above the music? Can I hear game audio? Where are SFX sitting? Reverse-engineer the mix.',
      },
    ],
    tip: {
      title: 'Key insight',
      body: 'Bad audio is the number one reason people click away from gaming videos. Spend 40% of your editing time on audio before you worry about colour grading or effects.',
    },
  },
  {
    id: 'pacing-jcuts',
    phase: 2,
    iconTag: 'resolve',
    icon: '🎞️',
    title: 'Pacing, J-Cuts & L-Cuts',
    checklistLabel: 'Resolve: Pacing, J-Cuts & L-Cuts',
    steps: [
      'Understand pacing: gaming commentary should cut frequently during action, and breathe during exploration or story beats. Watch your retention curve in YouTube analytics — steep drops = pacing problems.',
      'Learn a J-cut: the incoming audio starts before the incoming video. The next clip\'s VO begins while you\'re still watching the previous clip\'s footage. This creates seamless flow.',
      'Learn an L-cut: the outgoing audio continues after the outgoing video ends. You\'ve cut to new footage, but you\'re still hearing the previous clip\'s commentary. Classic for reactions and storytelling.',
      'To make a J-cut in Resolve: expand the audio and video tracks (click the expand icon on the track). Hold Alt while dragging the audio edge independently of the video edge.',
      'Practice the "dead air rule": if there\'s more than 1.5 seconds of nothing happening in your gameplay footage or VO, cut it or B-roll over it.',
      'Learn to use markers on the timeline (M key) to flag sections that need pacing work — watch the whole rough cut and mark problem areas, then return to fix them.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "J-cut vs L-cut — which audio comes early?" — Back: J-cut = incoming audio arrives early (think J: the bottom is forward). L-cut = outgoing audio lingers (the bottom extends past).',
      },
      {
        kind: 'exercise',
        text: 'Edit a 3-minute sequence using at least 3 J-cuts and 3 L-cuts deliberately. Label them on the timeline with markers. Watch it back and feel where the flow is natural vs jarring.',
      },
    ],
  },
  {
    id: 'colour-grading',
    phase: 2,
    iconTag: 'resolve',
    icon: '🎨',
    title: 'Colour Grading Basics',
    checklistLabel: 'Resolve: Colour Grading Basics',
    steps: [
      'Navigate to the Color page. Learn the three panels: Node graph (top right), Colour wheels (bottom), and Scopes (top left — Waveform, Parade, Vectorscope).',
      'Learn the three colour correction tools: Lift (shadows), Gamma (midtones), Gain (highlights) on the colour wheels. Understand which part of the image each affects.',
      'Use the Waveform scope to ensure your highlights aren\'t clipping (above 1023) and your shadows have detail (above 0). This is "legal" range for broadcast — but for gaming content, minor clipping in highlights is often acceptable.',
      'Apply a LUT (Look Up Table) as a starting point for style: Colour page → LUTs panel → drag a LUT onto a node. Dial it back to 40–70% opacity for subtlety. Free gaming LUTs exist online.',
      'Create a "serial node" structure: Node 1 = primary correction (exposure/white balance), Node 2 = LUT, Node 3 = creative look. Keep them separate so you can toggle each independently.',
      'Use "Copy Grade" to apply the same grade to all clips: select a graded clip → right-click → Grab Still, then apply that still to other clips. This ensures visual consistency across your video.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "Lift / Gamma / Gain — what do they affect?" — Back: Lift = shadows (dark areas). Gamma = midtones. Gain = highlights (bright areas). Think of them as a three-zone system.',
      },
      {
        kind: 'exercise',
        text: 'Grade 5 different game screenshots using only the Lift/Gamma/Gain wheels — no LUTs. Your goal: make them all look like they\'re from the same world. Screenshot before/after pairs.',
      },
      {
        kind: 'quiz',
        text: 'Watch a YouTube gaming video with high production value (e.g., Luke Stephens). Pause on a gameplay shot. Describe the colour grade: is it warm or cool? Crushed blacks or lifted? Saturated or desaturated?',
      },
    ],
  },
  {
    id: 'titles-transitions',
    phase: 2,
    iconTag: 'resolve',
    icon: '🖋️',
    title: 'Titles, Text & Transitions',
    checklistLabel: 'Resolve: Titles & Transitions',
    steps: [
      'Add a title: Effects Library (left panel) → Titles → drag "Text+" onto your timeline above a video clip. Double-click to edit. Learn to change font, size, colour, and position in the Inspector.',
      'Learn Fusion titles vs simple Titles: Fusion titles (the ones with F icon) allow animation, but start with simple Titles until you\'re comfortable.',
      'Animate a title: with a Text+ clip selected, move the playhead to the start, click the keyframe diamond in Inspector for "Position" or "Opacity", then move to a later point and change the value. Resolve creates an animation between the two.',
      'Understand the transitions rule: cut is king. 90% of your edits should be straight cuts. Use transitions (dissolves, dips to black) sparingly — only when they serve the story, not to cover up bad edits.',
      'Add a cross-dissolve: select the cut between two clips → Effects Library → Video Transitions → Dissolve → drag onto the cut point. Adjust duration in Inspector.',
      'Create lower thirds (name cards): use a Fusion composition to make an animated lower third. Or download a free template — search "DaVinci Resolve free lower thirds". Customise to match your brand.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "When should I use a transition other than a straight cut?" — Back: Only when it serves a narrative purpose (time passing = dissolve, scene change = dip to black). Never to hide lazy editing.',
      },
      {
        kind: 'exercise',
        text: 'Edit a 90-second intro sequence for your channel. Include: an animated title reveal, your face cam, game footage, and a lower third with your channel name. Use maximum one transition.',
      },
    ],
  },
  {
    id: 'scripting-voice-memos',
    phase: 2,
    iconTag: 'resolve',
    icon: '📝',
    title: 'Scripting & Voice-Memo Workflow',
    checklistLabel: 'Workflow: Scripting & Voice Memos',
    steps: [
      'Before you play: write a "spine" — 5–7 bullet points the video MUST hit (the hook, the systems you\'ll cover, the verdict). This stops you waffling for 2 hours and editing for 8.',
      'During play: use your phone\'s voice memo app to capture reactions OFF-MIC mid-session. "That moment with the boss was sick — use it." These become your edit waypoints.',
      'Right after the session: open the voice memos and timestamp them against your gameplay recording. This is your paper edit — a 15-min job that saves 4 hours of scrubbing footage later.',
      'For the voiceover script: write in spoken English, not written English. Read it OUT LOUD. If a sentence is hard to say, it\'s wrong. Cut subordinate clauses and turn statements into reactions.',
      'Structure your VO in four acts: Hook (the strongest opinion, upfront) → First Impressions (what hit you immediately) → Deep Look (mechanics, story, systems) → Verdict (the answer the viewer came for).',
      'Record VO in passes, not one take: read each bullet 2–3 times, keep the best read. Splice in post. Trying to nail a 10-minute monologue in one take is how you waste a whole afternoon.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What\'s the 4-act structure for first impressions?" — Back: Hook → First Impressions → Deep Look → Verdict. Memorise it; you\'ll use it for every video.',
      },
      {
        kind: 'exercise',
        text: 'Pick a game you\'ve already played. Write its first impressions spine in under 10 minutes — 5 bullets max. Then record the hook (first 30 seconds of VO) only. Listen back. If it doesn\'t make YOU want to keep watching, rewrite.',
      },
      {
        kind: 'quiz',
        text: 'Without looking: name the 4 acts. What\'s a "spine"? Why record VO in passes? If you can\'t answer in 30 seconds, write your script template now — kebab-list, 4 sections, one page max.',
      },
    ],
    tip: {
      title: 'The 10x rule',
      body: 'A 1-hour script preparation saves 10 hours of editing chaos. Editors don\'t fix bad scripts; they bury them. Prep the spine; do not skip this step.',
    },
  },
  {
    id: 'face-cam-presence',
    phase: 2,
    iconTag: 'resolve',
    icon: '📷',
    title: 'Face-Cam — Lighting, Framing & Presence',
    checklistLabel: 'Recording: Face-Cam & On-Camera Presence',
    steps: [
      'Lighting first: a single soft light source 45° in front of you and slightly above eye line. A £30 LED panel beats any "pro" mic if your face is in the shot. Daylight through a window works too — face toward it, never away.',
      'Framing: eyes on the upper third of the frame (rule of thirds). Headroom small, not big. Background ~3 feet behind you so it falls out of focus on a decent webcam/DSLR.',
      'Background: never a blank wall. A bookshelf, plants, a poster — anything with depth. But not cluttered. Aim for "intentional clutter".',
      'Camera at eye level. Pointing up at you = creepy interrogation. Pointing down = childlike. Even with a webcam, prop it up.',
      'On-camera presence: pick a single focal point (lens) and stay there. Looking at your second monitor reads as evasive. Energy level: 20% above your real-life baseline. The camera flattens enthusiasm.',
      'Wardrobe: solid colours read better than patterns on camera. Avoid pure white (blooms) and pure black (kills your shadow detail). Mid-tones photograph well.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "Where should my key light be positioned?" — Back: 45° in front of you, slightly above eye line. Soft, not harsh. The shape of the light matters more than the brand.',
      },
      {
        kind: 'exercise',
        text: 'Record yourself talking for 60 seconds at the same desk under: 1) overhead room lights only, 2) phone torch on the desk, 3) a single soft light at 45°. Watch all three. The third one looks 5x more professional. That\'s your new setup.',
      },
      {
        kind: 'quiz',
        text: 'What\'s wrong with: a webcam below eye level? Pure white shirt on camera? Looking at your second monitor while filming? Pure white wall behind you? If you can\'t name what\'s wrong with each, rewatch a "YouTube lighting basics" tutorial.',
      },
    ],
    tip: {
      title: 'The face is the channel',
      body: 'Viewers subscribe to faces, not videos. Two minutes setting up a light is the highest-leverage thing you do every recording day.',
    },
  },

  // ============================================
  // PHASE 3 — PHOTOSHOP & THUMBNAILS
  // ============================================
  {
    id: 'ps-interface',
    phase: 3,
    iconTag: 'photoshop',
    icon: '🖼️',
    title: 'Photoshop Interface & Layers',
    checklistLabel: 'Photoshop: Interface & Layers',
    steps: [
      'Set up your thumbnail canvas: File → New → 1280×720 pixels, 72dpi, RGB colour, sRGB colour space. Save this as a template.',
      'Learn the Layers panel (right side). Understand the layer stacking order — layers on top obscure layers below. Every element in a professional thumbnail is on its own layer.',
      'Master the Move tool (V) and Transform (Ctrl+T). Learn Free Transform: scale, rotate, flip. Hold Shift while scaling to constrain proportions (pre-CC Photoshop), or hold Shift to distort in newer versions — check your version.',
      'Learn layer types: raster layers (photos), adjustment layers (non-destructive corrections), text layers, and smart object layers (embedded objects that can be scaled without quality loss).',
      'Practice grouping layers: select multiple → Ctrl+G. Name every group and layer descriptively ("Background", "Character", "Text-Main", "Text-Sub"). Organised layers = faster workflow.',
      'Learn Blend Modes on layers: Normal, Multiply (darkens), Screen (lightens), Overlay (contrast). Overlay on a colour layer above a photo adds a tint while preserving texture.',
    ],
    shortcuts: [
      { action: 'Move tool', keys: 'V' },
      { action: 'Free Transform', keys: 'Ctrl + T' },
      { action: 'Undo / Step back', keys: 'Ctrl + Z / Ctrl + Alt + Z' },
      { action: 'Duplicate layer', keys: 'Ctrl + J' },
      { action: 'Select all on layer', keys: 'Ctrl + A' },
      { action: 'Merge visible', keys: 'Ctrl + Shift + E' },
      { action: 'Quick select tool', keys: 'W' },
      { action: 'Brush tool', keys: 'B' },
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What blend mode darkens? Lightens? Adds contrast?" — Back: Multiply = darkens. Screen = lightens. Overlay = contrast. Memorise as: M-S-O (Multiply-Screen-Overlay).',
      },
      {
        kind: 'exercise',
        text: 'Recreate a thumbnail from a channel you respect using only Photoshop. Don\'t publish it — this is pure learning. Deconstruct how they achieved the look layer by layer.',
      },
    ],
  },
  {
    id: 'subject-cutout',
    phase: 3,
    iconTag: 'photoshop',
    icon: '✂️',
    title: 'Subject Cutout & Background Removal',
    checklistLabel: 'Photoshop: Subject Cutout',
    steps: [
      'Learn the three main selection tools: Quick Selection (W), Object Selection (also W, second option in toolbar), and the Pen tool (P). Start with Quick Selection for speed.',
      'Use Select and Mask (Select menu → Select and Mask) to refine edges after making a rough selection. Use the Refine Edge Brush to handle hair and complex edges.',
      'Learn Remove Background (Properties panel when a layer is selected → Remove Background). This uses AI — it\'s not perfect but gives you 80% of the work done instantly.',
      'After a cutout, add a solid colour layer below the subject to check edge quality. Look for halos (fringes of the old background). Fix with Select and Mask or the Decontaminate Colors option.',
      'Practice the Pen tool for hard-edged objects like game characters, logos, or objects with straight edges. It\'s slower but produces the cleanest results.',
      'Save your cutout as a Smart Object before placing in your thumbnail composition — this preserves the original and lets you scale without quality loss.',
    ],
    memory: [
      {
        kind: 'exercise',
        text: 'Cut out 10 different subjects over two weeks: your face, a game character, a weapon, a logo, an environment screenshot. Rate your edge quality 1–5 after each. Track improvement.',
      },
      {
        kind: 'quiz',
        text: 'When should you use Quick Selection vs Pen tool? Answer: Quick Selection = organic shapes, complex edges, portraits. Pen tool = geometric shapes, hard edges, logos, product shots.',
      },
    ],
    tip: {
      title: 'Gaming thumbnails tip',
      body: 'A crisp cutout of your face reacting is the single most click-driving element in gaming thumbnails. Spend real time learning this skill — it pays dividends on every video.',
    },
  },
  {
    id: 'thumbnail-design',
    phase: 3,
    iconTag: 'photoshop',
    icon: '⚡',
    title: 'Thumbnail Composition & Design Psychology',
    checklistLabel: 'Photoshop: Thumbnail Composition',
    steps: [
      'Learn the three-second rule: a thumbnail must communicate its subject in three seconds on a mobile screen. Zoom out to 15% in Photoshop to simulate mobile size. If it\'s unclear at that size, redesign.',
      'Study the core compositional elements of high-CTR gaming thumbnails: strong contrasting background, a face with an exaggerated expression (or a key visual from the game), and 2–5 words maximum in large, bold text.',
      'Learn colour contrast principles: use a dark background with light text, or vice versa. The most common high-CTR gaming thumbnails use near-black or dark gradient backgrounds with one vivid accent colour.',
      'Master Layer Styles for text: right-click text layer → Blending Options → Stroke (adds outline), Drop Shadow, and Gradient Overlay. A white stroke on black text makes it readable on any background.',
      'Understand visual hierarchy: the viewer\'s eye should travel: Face/key visual → Text → Secondary element. Achieve this through size, contrast, and position (eyes scan left to right, top to bottom).',
      'Build a template system: create a Photoshop file with smart object placeholders (double-click to replace the image). This cuts thumbnail creation time from 2 hours to 20 minutes once you have a template you like.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What are the three elements of a high-CTR gaming thumbnail?" — Back: 1) Expressive face or key visual. 2) High-contrast background. 3) 2–5 bold words. Order: face first, text second.',
      },
      {
        kind: 'exercise',
        text: 'Design three different thumbnail concepts for your next video. Show them to 3 people and ask which makes them most curious. Note which design elements drove curiosity — repeat those.',
      },
      {
        kind: 'quiz',
        text: 'Go to YouTube. Pick 5 videos with over 500k views. Screenshot each thumbnail. Identify: (a) the main focal element, (b) the text, (c) the background treatment. What patterns emerge?',
      },
    ],
  },

  // ============================================
  // PHASE 4 — YOUTUBE CRAFT
  // ============================================
  {
    id: 'hooks',
    phase: 4,
    iconTag: 'youtube',
    icon: '🎯',
    title: 'Hooks — Engineering the First 30 Seconds',
    checklistLabel: 'YouTube: Engineering the Hook',
    steps: [
      'Understand why the hook is everything: YouTube\'s algorithm weighs the first 30 seconds of watch time heavily. A viewer who stays for 30 seconds is far more likely to watch 50% or more.',
      'Learn the three hook types for first impressions content: (a) Bold statement hook ("This game surprised me in ways I didn\'t expect"), (b) Question hook ("Is this the best RPG of the year?"), (c) Clip hook (show the most surprising moment from the game upfront).',
      'Structure your hook in three beats: Attention (0–5 seconds, visual or statement that grabs), Context (5–15 seconds, who you are and what you\'re covering), Promise (15–30 seconds, what they\'ll get from watching).',
      'Watch your own retention curves obsessively. The drop-off in the first 30 seconds is your hook score. If you\'re losing 40% of viewers before the 30-second mark, rewrite and re-edit the hook.',
      'Avoid the intro trap: don\'t start with your channel name, logo animation, or "hey guys welcome back". Start with the content. The channel intro can come after the hook if at all.',
      'Practice writing three different hooks for the same video, then decide which to use. Treat your hook like a headline — a copywriter writes 20 headlines before picking one.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What are the three beats of a strong hook?" — Back: Attention (0–5s) → Context (5–15s) → Promise (15–30s). ACP: Attention, Context, Promise.',
      },
      {
        kind: 'exercise',
        text: 'Watch the first 30 seconds of 10 Luke Stephens videos. Timestamp exactly when each of the three beats lands. You\'ll start to see the pattern become a formula you can apply.',
      },
    ],
    tip: {
      title: 'The recut habit',
      body: 'After your video has been live for 48 hours, look at the retention curve drop-off. If it\'s steep in the first 30 seconds, your next video\'s hook is your #1 priority to improve.',
    },
  },
  {
    id: 'retention',
    phase: 4,
    iconTag: 'youtube',
    icon: '📈',
    title: 'Retention — Open Loops, Pattern Interrupts & Pacing',
    checklistLabel: 'YouTube: Open Loops & Retention',
    steps: [
      'Learn open loops: tease something early that you don\'t resolve until later. "And by the end of this video, I\'ll tell you whether I think this game is worth your time and money." The viewer can\'t leave without that answer.',
      'Understand pattern interrupts: every ~90 seconds, the viewer\'s brain needs a reset. This can be a cut to gameplay, a change in music, a zoomed-in reaction, or a title card. Variety prevents autopilot-watching.',
      'Learn B-roll technique: B-roll is footage played over your commentary (A-roll). For gaming first impressions, this is mostly gameplay footage. Cut to relevant gameplay moments as you describe them — don\'t just show your face the whole time.',
      'Study the "four-act structure" for first impressions videos: (1) Hook + Setup, (2) First gameplay impressions + core loop, (3) Deepest dive (story, systems, mechanics), (4) Verdict + call to action.',
      'Remove dead air ruthlessly: any moment in your video where nothing is happening (silence, waiting, loading screens, repetitive gameplay) kills retention. Cut it, speed it up with a freeze-frame, or talk over it.',
      'Use music intentionally: build a music arc for the video. Quieter during thoughtful analysis, slightly more energetic during exciting gameplay moments. Music telegraphs emotion to the viewer.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What is an open loop in YouTube editing?" — Back: A question, promise, or tease introduced early that the viewer must stay to see resolved. It creates forward momentum through the video.',
      },
      {
        kind: 'quiz',
        text: 'Watch any of your finished videos. Every time you feel slightly bored, pause and timestamp it. Those are your retention problem points. Identify what you\'d change. This trains your editorial eye.',
      },
    ],
  },
  {
    id: 'titles-seo',
    phase: 4,
    iconTag: 'youtube',
    icon: '🔍',
    title: 'Titles, SEO & Analytics Literacy',
    checklistLabel: 'YouTube: Titles, SEO & Analytics',
    steps: [
      'Understand the two discovery modes: Search (people search for "[Game Name] review/first impressions") and Browse (YouTube recommends your video to relevant audiences). Gaming first impressions relies heavily on Search early on.',
      'Learn title structure for gaming first impressions: "[Game Name] First Impressions — [Compelling Angle]". Example: "Crimson Desert First Impressions — Is It Actually Good?" The game name must be exact for search.',
      'Research search demand: type your game title into YouTube search and look at autocomplete suggestions. Those are real searches. Include the most relevant one in your title naturally.',
      'Learn the five core analytics metrics: Click-Through Rate (CTR), Average View Duration (AVD), Impressions, Watch Time, and Subscriber conversion. In YouTube Studio → Analytics → Overview.',
      'Understand what to optimise: CTR × AVD = your video\'s success score. A 5% CTR with 55% AVD beats a 10% CTR with 15% AVD. Both matter, but AVD is the deeper signal of content quality.',
      'Use chapters (timestamps in the description) to improve watch experience and SEO. YouTube displays chapter markers in the progress bar and in search snippets.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "What are the 5 core YouTube analytics metrics?" — Back: CTR, AVD, Impressions, Watch Time, Subscriber Conversion. Make an acronym: CIAWS — Click, Impressions, AVD, Watch time, Subscribers.',
      },
      {
        kind: 'exercise',
        text: 'Write 5 different title variations for your next video. Show them to people outside the gaming space and ask which makes them most curious. The least "gamer-brained" title often wins a wider audience.',
      },
    ],
  },

  // ============================================
  // PHASE 5 — ADVANCED & WORKFLOW
  // ============================================
  {
    id: 'export-delivery',
    phase: 5,
    iconTag: 'resolve',
    icon: '📦',
    title: 'Export, Delivery & YouTube Upload Settings',
    checklistLabel: 'Resolve: Export & YouTube Settings',
    steps: [
      'Navigate to the Deliver page. Create your first render preset. Choose: Format = MP4, Codec = H.264 or H.265 (H.265 is smaller file size, better quality, but slower to encode).',
      'YouTube-optimised settings: Resolution 1920×1080 (or 3840×2160 for 4K), Frame Rate = same as timeline (60fps for gaming), Bitrate = Automatic or set manually to 20–25 Mbps for 1080p60.',
      'Enable "Export Audio" in the deliver settings. Set audio to AAC, 48kHz, stereo. These are YouTube\'s preferred audio specs.',
      'Save your render preset by clicking the preset save button — you should never have to configure this again from scratch.',
      'Understand render time: H.265 encodes slowly. For a 10-minute video, expect 15–45 minutes depending on your hardware. Schedule renders for when you\'re away from your desk.',
      'Before uploading: watch the exported file in full on a different device (phone or TV). Check for: audio sync, missing sections, colour accuracy, title card readability at small size.',
    ],
    memory: [
      {
        kind: 'flashcard',
        text: 'Front: "YouTube export settings — Format, Codec, Bitrate, Audio?" — Back: MP4, H.264 or H.265, 20–25 Mbps (1080p60), AAC 48kHz stereo. Laminate this and put it by your monitor.',
      },
      {
        kind: 'exercise',
        text: 'Export the same 5-minute video in both H.264 and H.265. Compare file sizes and visual quality. This makes the trade-off real and memorable — you\'ll never forget it.',
      },
    ],
  },
  {
    id: 'workflow-systems',
    phase: 5,
    iconTag: 'all',
    icon: '🗂️',
    title: 'Building a Repeatable Editing Workflow',
    checklistLabel: 'Workflow: Repeatable Editing System',
    steps: [
      'Build a folder structure for every video: /[Game Name]/Raw Footage | Audio | Music | Exports | Thumbnails | Resolve Project. Every video, identical structure. Never waste time looking for files.',
      'Create a "first impressions" Resolve template project: pre-configured with your standard colour grade, title style, lower third, and intro/outro placeholders. Duplicate it for each new video.',
      'Establish an editing order: (1) Rough cut from voice memos, (2) Audio mix, (3) B-roll layer, (4) Colour grade, (5) Titles and graphics, (6) Final review, (7) Export. Don\'t skip steps or do them out of order.',
      'Time-box each stage: rough cut = 60 mins max. Audio = 30 mins. B-roll = 45 mins. Grade = 30 mins. Graphics = 20 mins. Review = 20 mins. Total: under 4 hours per video. Track your actual time to improve.',
      'Build a music library: curate 20–30 tracks across moods (action, ambient, discovery, tension, uplifting). Know them well enough to reach for the right one without searching. Epidemic Sound, Artlist, or free options like YouTube Audio Library.',
      'Create an "end-of-video" checklist: before every upload, run through it. Check audio levels, captions, thumbnail at small size, title, description, chapters, and end screen.',
    ],
    memory: [
      {
        kind: 'exercise',
        text: 'For your first 5 videos, log the actual time spent on each editing stage. At the end of video 5, you\'ll have a personal baseline to optimise against. Time-tracking is the fastest way to improve your workflow.',
      },
      {
        kind: 'quiz',
        text: 'Without looking, write down the 7-step editing order from memory. If you hesitate, you haven\'t internalised the workflow yet — write it out daily until it\'s automatic.',
      },
    ],
    tip: {
      title: 'The compound effect',
      body: 'Shaving 30 minutes off your edit workflow seems trivial. Over 52 videos a year, that\'s 26 hours reclaimed. Systems compound — invest time in building them early.',
    },
  },
];

export const TOPIC_IDS = TOPICS.map((t) => t.id);

export function topicById(id: string) {
  return TOPICS.find((t) => t.id === id);
}

export function topicsByPhase(phase: number) {
  return TOPICS.filter((t) => t.phase === phase);
}
