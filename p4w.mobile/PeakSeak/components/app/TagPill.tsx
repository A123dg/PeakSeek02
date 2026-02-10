import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/components/app/palette';

type TagPillProps = {
  label: string;
};

export function TagPill({ label }: TagPillProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.chip,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    color: Palette.chipText,
    fontSize: 12,
    fontWeight: '600',
  },
});
