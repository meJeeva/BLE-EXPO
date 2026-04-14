import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography } from "@/src/constants/theme";
import { useRouter } from "expo-router";

const DeviceDetectedScreen = () => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Detected</Text>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="smartphone" size={28} color={Colors.Primary} />
        </View>
        <Text style={styles.deviceName}>VitalZ Device</Text>
        <Text style={styles.deviceId}>VTZ-1254-2025</Text>
        <View style={styles.badge}>
          <MaterialIcons name="info" size={16} color={Colors.Warning} />
          <Text style={styles.badgeText}>Not Registered</Text>
        </View>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          This device needs to be registered to your account before you can
          start monitoring vitals.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/home-mode/onboarding/enable-bluetooth')}>
        <Text style={styles.buttonText}>Register Device</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceDetectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    paddingHorizontal: 16,
  },

  header: {
    marginBottom: 10,
  },

  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    marginBottom: 16,
    marginTop: 20,
  },

  card: {
    backgroundColor: Colors.Background,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    paddingVertical: 35
  },

  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  deviceName: {
    ...Typography.Body,
    color: Colors.TextPrimary,
    marginVertical: 2
  },

  deviceId: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginTop: 4,
    marginBottom: 10,
  },

  badge: {
    backgroundColor: Colors.BadgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },

  badgeText: {
    color: Colors.Warning,
    ...Typography.Caption,
  },

  infoBox: {
    backgroundColor: Colors.PrimaryLight,
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },

  infoText: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },

  button: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    backgroundColor: Colors.Primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.TextWhite,
    ...Typography.Body,
  },
});