import React, { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type TimePickerUIProps = {
  label?: string;
  value: string;
  onConfirm: (value: string) => void;
};

const parseTimeString = (value: string) => {
  const [hours = "0", minutes = "0", seconds = "0"] = value.split(":");
  const nextDate = new Date();
  nextDate.setHours(Number(hours) || 0, Number(minutes) || 0, Number(seconds) || 0, 0);
  return nextDate;
};

const formatTimeString = (value: Date) => {
  const hours = `${value.getHours()}`.padStart(2, "0");
  const minutes = `${value.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}:00`;
};

const formatDisplayTime = (value: string) => {
  const [hours = "00", minutes = "00", seconds = "00"] = value.split(":");
  return `${hours}:${minutes}:${seconds}`;
};

export const TimePickerUI = ({ label, value, onConfirm }: TimePickerUIProps) => {
  const [visible, setVisible] = useState(false);
  const [tempTime, setTempTime] = useState(parseTimeString(value));

  const displayValue = useMemo(() => formatDisplayTime(value), [value]);

  const open = () => {
    setTempTime(parseTimeString(value));
    setVisible(true);
  };

  const close = () => setVisible(false);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TouchableOpacity style={styles.input} onPress={open}>
        <Text style={styles.inputText}>{displayValue}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={close} />

        <View style={styles.container}>
          <DateTimePicker
            value={tempTime}
            mode="time"
            display="spinner"
            onChange={(_, nextValue) => {
              if (nextValue) {
                setTempTime(nextValue);
              }
            }}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={close}>
              <Text style={styles.cancel}>Huy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onConfirm(formatTimeString(tempTime));
                close();
              }}
            >
              <Text style={styles.confirm}>Xac nhan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "700",
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#E8EDF5",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  inputText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancel: {
    color: "#DC2626",
    fontWeight: "600",
  },
  confirm: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
