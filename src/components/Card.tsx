import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';

import { Palette, Radius } from '@/constants/theme';

export function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

export function PressableCard({
  onPress,
  children,
  style,
  testID,
}: {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewProps['style'];
  testID?: string;
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        style,
        pressed && { backgroundColor: Palette.cardAlt },
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.card,
    borderColor: Palette.border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
});
