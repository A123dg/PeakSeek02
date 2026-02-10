import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Palette } from '@/components/app/palette';

type AuthInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
};

export function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: AuthInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Palette.subtext}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: Palette.subtext,
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingHorizontal: 14,
    fontSize: 15,
    color: Palette.text,
  },
});
