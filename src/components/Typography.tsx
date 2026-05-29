import { Text, type TextProps, StyleSheet } from 'react-native';

import { Fonts, Palette } from '@/constants/theme';

type Variant =
  | 'hero'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyMid'
  | 'small'
  | 'label'
  | 'mono';

export function T({
  variant = 'body',
  color,
  style,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  return (
    <Text
      style={[styles[variant], color ? { color } : undefined, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  hero: {
    fontFamily: Fonts.serifBold,
    fontSize: 36,
    lineHeight: 42,
    color: Palette.cream,
  },
  h1: {
    fontFamily: Fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    color: Palette.dark,
  },
  h2: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    color: Palette.dark,
  },
  h3: {
    fontFamily: Fonts.sansSemibold,
    fontSize: 16,
    lineHeight: 22,
    color: Palette.dark,
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: Palette.mid,
  },
  bodyMid: {
    fontFamily: Fonts.sansMedium,
    fontSize: 14,
    lineHeight: 22,
    color: Palette.dark,
  },
  small: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 18,
    color: Palette.muted,
  },
  label: {
    fontFamily: Fonts.monoMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Palette.muted,
  },
  mono: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    color: Palette.dark,
  },
});
