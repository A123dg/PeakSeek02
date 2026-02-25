import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

interface DatePickerUIProps {
  label?: string
  required?: boolean
  value: Date
  onConfirm: (date: Date) => void
  minimumDate?: Date
  maximumDate?: Date
}

export const DatePickerUI = ({
  label,
  required,
  value,
  onConfirm,
  minimumDate,
  maximumDate,
}: DatePickerUIProps) => {
  const [visible, setVisible] = useState(false)
  const [tempDate, setTempDate] = useState(value)

  const open = () => {
    setTempDate(value)
    setVisible(true)
  }

  const close = () => setVisible(false)

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TouchableOpacity style={styles.input} onPress={open}>
        <Text style={styles.inputText}>
          {value.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={close} />

        <View style={styles.container}>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={(_, date) => {
              if (date) setTempDate(date)
            }}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={close}>
              <Text style={styles.cancel}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onConfirm(tempDate)
                close()
              }}
            >
              <Text style={styles.confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  required: {
    color: 'red',
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 14,
    color: '#111',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancel: {
    color: 'red',
    fontWeight: '600',
  },
  confirm: {
    color: '#007AFF',
    fontWeight: '600',
  },
})