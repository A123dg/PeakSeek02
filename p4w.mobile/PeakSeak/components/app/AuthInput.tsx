import { useMemo, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Palette } from '@/components/app/palette'

type AuthInputRule = {
  id: string
  validate: (value: string) => boolean
  message: string
}

type AuthInputProps = {
  label: string
  placeholder?: string
  value?: string
  onChangeText?: (value: string) => void
  secureTextEntry?: boolean
  required?: boolean
  error?: string
  rules?: AuthInputRule[]
  sanitizeInput?: (value: string) => string
  validateOnChange?: boolean
  onRuleErrorsChange?: (errors: string[]) => void
  trimOnBlur?: boolean
}

export function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  required,
  error,
  rules = [],
  sanitizeInput,
  validateOnChange = true,
  onRuleErrorsChange,
  trimOnBlur = true,
}: AuthInputProps) {
  const [ruleError, setRuleError] = useState<string | undefined>(undefined)
  const displayError = useMemo(() => error ?? ruleError, [error, ruleError])
  const showError = !!displayError

  const handleChangeText = (text: string) => {
    const nextValue = sanitizeInput ? sanitizeInput(text) : text

    if (validateOnChange && rules.length > 0) {
      const ruleErrors = rules
        .filter((rule) => !rule.validate(nextValue))
        .map((rule) => rule.message)

      setRuleError(ruleErrors[0])
      onRuleErrorsChange?.(ruleErrors)
    } else {
      setRuleError(undefined)
      onRuleErrorsChange?.([])
    }

    onChangeText?.(nextValue)
  }

  const handleBlur = () => {
    if (!trimOnBlur || value == null) return
    const trimmedValue = value.trim()
    if (trimmedValue !== value) {
      handleChangeText(trimmedValue)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Palette.subtext}
        style={[
          styles.input,
          showError && styles.inputError,
        ]}
        value={value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
      />

      {showError && <Text style={styles.errorText}>{displayError}</Text>}
    </View>
  )
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
  required: {
    color: '#EF4444',
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
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444',
  },
})
