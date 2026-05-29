import { StyleSheet, View } from 'react-native';

import { Fonts, Palette, tagColors, type ColorTag } from '@/constants/theme';
import { T } from '@/components/Typography';

export function Badge({ tag, label }: { tag: ColorTag; label: string }) {
  const { color, bg } = tagColors(tag);
  return (
    <View style={[styles.wrap, { backgroundColor: bg }]}>
      <T variant="label" color={color}>
        {label}
      </T>
    </View>
  );
}

export function HollowBadge({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <View style={[styles.hollow, { borderColor: color }]}>
      <T variant="small" color={color} style={{ fontFamily: Fonts.sansMedium }}>
        {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  hollow: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
});
