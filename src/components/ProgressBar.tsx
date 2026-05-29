import { StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';

export function ProgressBar({
  percent,
  height = 6,
}: {
  percent: number;
  height?: number;
}) {
  return (
    <View style={[styles.wrap, { height }]}>
      <View
        style={[
          styles.fill,
          { width: `${Math.max(0, Math.min(100, percent))}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Palette.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Palette.accent,
    borderRadius: 4,
  },
});
