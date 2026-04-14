import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, BorderRadius } from "../../../src/constants/theme"; // adjust path
import { useRouter } from "expo-router";

const EnableBluetooth = () => {

  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="bluetooth" size={36} color={Colors.Primary} />
        </View>
        <Text style={styles.title}>Enable Bluetooth</Text>
        <Text style={styles.description}>
          We need Bluetooth to connect to your VitalZ device{"\n"}
          and monitor your vitals in real-time.
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={12} color={Colors.Primary} />
            </View>
            <Text style={styles.listText}>
              Secure connection with your device
            </Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={12} color={Colors.Primary} />
            </View>
            <Text style={styles.listText}>
              Real-time vitals monitoring
            </Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={12} color={Colors.Primary} />
            </View>
            <Text style={styles.listText}>
              Low power consumption
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.button, { marginBottom: insets.bottom + 20 }]} onPress={() => router.navigate('/home-mode/onboarding/searching-device')}>
        <Text style={styles.buttonText}>Enable Bluetooth</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EnableBluetooth;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.Border,
    marginHorizontal: Spacing.md,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
  },

  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.H2,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },

  description: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  list: {
    width: "100%",
    marginTop: Spacing.md,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },

  listText: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    flex: 1,
  },

  button: {
    position: "absolute",
    bottom: 0,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.Primary,
    paddingVertical: 14,
    borderRadius: BorderRadius.lg,
    alignItems: "center",

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    ...Typography.Body,
    color: Colors.TextWhite,
  },
});