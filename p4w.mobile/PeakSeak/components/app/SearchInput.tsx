import { StyleSheet, TextInput, View } from 'react-native';

import { Palette } from '@/components/app/palette';

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
};

export function SearchInput({ placeholder, value, onChangeText }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Palette.subtext}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 14,
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  input: {
    fontSize: 15,
    color: Palette.text,
  },
});
