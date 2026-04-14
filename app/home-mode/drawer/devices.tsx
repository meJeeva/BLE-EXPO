import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Typography, Spacing, BorderRadius } from "../../../src/constants/theme";

interface DeviceCardProps {
  title: string;
  id: string;
  status: string;
  battery: string;
  statusColor: string;
}

const DeviceCard = ({ title, id, status, battery, statusColor }: DeviceCardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="phone-portrait-outline" size={20} color={Colors.Primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.deviceTitle}>{title}</Text>
        <Text style={styles.deviceId}>{id}</Text>

        <View style={styles.row}>
          <View style={styles.statusRow}>
            <View
              style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}
            >
              <View
                style={[styles.dot, { backgroundColor: statusColor }]}
              />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {status}
              </Text>
            </View>
          </View>

          <View style={styles.batteryContainer}>
            <View
              style={[styles.dot, { backgroundColor: Colors.TextSecondary, height: 4, width: 4, marginRight: 0 }]}
            />
            <Text style={styles.battery}>{battery} battery</Text>
          </View>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={Colors.TextSecondary} />
    </TouchableOpacity>
  );
};

const AddDeviceCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconBox, styles.addIcon]}>
        <Ionicons name="add" size={20} color={Colors.Warning} />
      </View>

      <View style={styles.content}>
        <Text style={styles.addTitle}>Add New Device</Text>
        <Text style={styles.addSubtitle}>
          Register another VitalZ device
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={Colors.TextSecondary} />
    </TouchableOpacity>
  );
};

export default function Devices() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registered Devices</Text>
      <Text style={styles.subHeader}>
        Select a device to start monitoring or add a new device
      </Text>

      <View style={styles.list}>
        <DeviceCard
          title="Living Room Device"
          id="VTZ-2024-0001"
          status="Available"
          battery="85%"
          statusColor={Colors.Info}
        />

        <DeviceCard
          title="Bedroom Device"
          id="VTZ-2024-0002"
          status="In Use"
          battery="42%"
          statusColor={Colors.Warning}
        />

        <AddDeviceCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },

  header: {
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
    ...Typography.H1,
  },

  subHeader: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginBottom: Spacing.lg,
  },

  list: {
    gap: Spacing.md,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },

  addIcon: {
    backgroundColor: Colors.WarningStatus,
  },

  content: {
    flex: 1,
  },

  deviceTitle: {
    color: Colors.TextPrimary,
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold'
  },

  deviceId: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginVertical: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    ...Typography.Caption,
  },

  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  battery: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },

  addTitle: {
    color: Colors.Primary,
    fontFamily: 'Inter_600SemiBold'
  },

  addSubtitle: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },
});