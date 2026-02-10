import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Palette } from '@/components/app/palette';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'ghost';
};

export function PrimaryButton({
  label,
  onPress,
  style,
  variant = 'primary',
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.base,
        variant === 'primary' ? styles.primary : styles.ghost,
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Palette.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  ghostLabel: {
    color: Palette.text,
  },
});
