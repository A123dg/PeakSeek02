import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  danger?: boolean;
};

type ProfileMenuGroupProps = {
  items: MenuItemProps[];
  footer?: React.ReactNode;
};

export const ProfileMenuGroup = ({ items, footer }: ProfileMenuGroupProps) => (
  <View style={styles.group}>
    {items.map((item, index) => (
      <React.Fragment key={item.title}>
        <TouchableOpacity style={styles.item} onPress={item.onPress}>
          <View style={styles.itemIcon}>
            <Ionicons name={item.icon} size={18} color={item.danger ? "#EF4444" : "#111827"} />
          </View>
          <Text style={[styles.itemTitle, item.danger && styles.itemTitleDanger]}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>
        {index < items.length - 1 ? <View style={styles.divider} /> : null}
      </React.Fragment>
    ))}
    {footer ? <View style={styles.footer}>{footer}</View> : null}
  </View>
);

const styles = StyleSheet.create({
  group: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  itemTitleDanger: {
    color: "#EF4444",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F2F4",
    marginLeft: 64,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
