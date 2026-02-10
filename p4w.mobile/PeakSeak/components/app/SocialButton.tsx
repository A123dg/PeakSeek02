import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Palette } from '@/components/app/palette';

type SocialButtonProps = {
  label: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
};

export function SocialButton({ label, icon, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 14, 
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Palette.card,
  },
});
