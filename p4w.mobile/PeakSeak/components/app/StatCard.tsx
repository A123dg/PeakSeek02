import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/components/app/palette';

type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 14,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: Palette.subtext,
  },
});
