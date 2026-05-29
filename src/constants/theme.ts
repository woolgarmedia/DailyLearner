import { Platform } from 'react-native';

export const Palette = {
  cream: '#F7F4EF',
  dark: '#1A1814',
  mid: '#3D3A34',
  muted: '#7A766E',
  border: '#E0DBD2',
  card: '#FFFFFF',
  cardAlt: '#FAFAF8',
  resolve: '#B85C2A',
  resolveLight: '#FAF0E8',
  photoshop: '#1E6FBB',
  photoshopLight: '#EBF3FB',
  youtube: '#3D7A55',
  youtubeLight: '#EBF5EF',
  allBadge: '#6B3FA0',
  allBadgeLight: '#F0ECF7',
  accent: '#B85C2A',
  flashcardBg: '#FFFBF0',
  flashcardBorder: '#EDD88A',
  flashcardText: '#9A7B0A',
  exerciseBg: '#F0F7FF',
  exerciseBorder: '#A8C9F0',
  exerciseText: '#185FA5',
  quizBg: '#F5F0FF',
  quizBorder: '#C4A8F0',
  quizText: '#6B3FA0',
  tipBg: '#FEF9EC',
  tipBorder: '#F0D878',
  tipAccent: '#D4A800',
  tipText: '#8A6B00',
  success: '#2D7A4F',
  successBg: '#EBF5EF',
  successBorder: '#A8D5B5',
  error: '#B83232',
  errorBg: '#FAEAEA',
  errorBorder: '#E8AAAA',
} as const;

export const Colors = {
  light: {
    text: Palette.dark,
    background: Palette.cream,
    backgroundElement: Palette.card,
    backgroundSelected: Palette.cardAlt,
    textSecondary: Palette.muted,
  },
  dark: {
    text: Palette.dark,
    background: Palette.cream,
    backgroundElement: Palette.card,
    backgroundSelected: Palette.cardAlt,
    textSecondary: Palette.muted,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    sans: 'DMSans_400Regular',
    sansMedium: 'DMSans_500Medium',
    sansSemibold: 'DMSans_600SemiBold',
    serif: 'PlayfairDisplay_600SemiBold',
    serifBold: 'PlayfairDisplay_700Bold',
    mono: 'DMMono_400Regular',
    monoMedium: 'DMMono_500Medium',
    rounded: 'DMSans_400Regular',
  },
  default: {
    sans: 'DMSans_400Regular',
    sansMedium: 'DMSans_500Medium',
    sansSemibold: 'DMSans_600SemiBold',
    serif: 'PlayfairDisplay_600SemiBold',
    serifBold: 'PlayfairDisplay_700Bold',
    mono: 'DMMono_400Regular',
    monoMedium: 'DMMono_500Medium',
    rounded: 'DMSans_400Regular',
  },
}) as Record<string, string>;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
} as const;

export const Radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 16,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 70 }) ?? 0;
export const MaxContentWidth = 800;

export type ColorTag = 'resolve' | 'photoshop' | 'youtube' | 'all';

export function tagColors(tag: ColorTag) {
  switch (tag) {
    case 'resolve':
      return { color: Palette.resolve, bg: Palette.resolveLight };
    case 'photoshop':
      return { color: Palette.photoshop, bg: Palette.photoshopLight };
    case 'youtube':
      return { color: Palette.youtube, bg: Palette.youtubeLight };
    case 'all':
      return { color: Palette.allBadge, bg: Palette.allBadgeLight };
  }
}
