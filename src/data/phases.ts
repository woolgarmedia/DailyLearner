import type { ColorTag } from '@/constants/theme';

export type Phase = {
  number: number;
  tag: ColorTag;
  badgeLabel: string;
  title: string;
  subtitle: string;
};

export const PHASES: Phase[] = [
  {
    number: 1,
    tag: 'resolve',
    badgeLabel: 'DaVinci Resolve & Recording',
    title: 'Foundations — Resolve & Recording',
    subtitle: 'Get comfortable in the editor and set up clean capture before you make a single video. Weeks 1–3.',
  },
  {
    number: 2,
    tag: 'resolve',
    badgeLabel: 'DaVinci Resolve',
    title: 'Editing Craft — Pacing, Audio & Polish',
    subtitle: 'This is where good editors are made. Plus scripting and on-camera presence. Weeks 3–7.',
  },
  {
    number: 3,
    tag: 'photoshop',
    badgeLabel: 'Photoshop',
    title: 'Photoshop & Thumbnail Design',
    subtitle: 'A great thumbnail is the most important marketing decision you make per video. Weeks 5–8.',
  },
  {
    number: 4,
    tag: 'youtube',
    badgeLabel: 'YouTube Craft',
    title: 'YouTube Craft — Hooks, Retention & Structure',
    subtitle: 'The editing is the vehicle. This is the destination. Weeks 6–9.',
  },
  {
    number: 5,
    tag: 'all',
    badgeLabel: 'Advanced & Workflow',
    title: 'Advanced Techniques & Efficient Workflow',
    subtitle: 'Speed and systems — producing better videos without burning out. Weeks 9–12.',
  },
];
