import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/components/app/palette';

type TagPillProps = {
  label: string;
  activeTab?: boolean;
};

export function TagPill({ label, activeTab }: TagPillProps) {
  return (
    <View style={[styles.container, activeTab && styles.activeContainer]}>
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
  activeContainer: {
    backgroundColor: Palette.primary,
  },
  
});
