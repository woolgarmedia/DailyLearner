import { Pressable, StyleSheet } from 'react-native';

import { Fonts, Palette, Radius } from '@/constants/theme';
import { T } from '@/components/Typography';

type Variant = 'primary' | 'secondary' | 'success';

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
}: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'success' && styles.success,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.4 },
      ]}>
      <T
        style={{
          fontFamily: Fonts.sansMedium,
          fontSize: 14,
          color:
            variant === 'secondary' ? Palette.dark : Palette.cream,
        }}>
        {label}
      </T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Palette.dark,
  },
  secondary: {
    backgroundColor: Palette.cardAlt,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  success: {
    backgroundColor: Palette.success,
  },
});
