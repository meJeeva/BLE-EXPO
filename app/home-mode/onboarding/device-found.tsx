import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, BorderRadius } from "../../../src/constants/theme";
import { useRouter } from "expo-router";

const DeviceFound = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.successWrapper,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Ionicons name="checkmark" size={26} color={Colors.Secondary} />
        </Animated.View>
        <Text style={styles.title}>Device Found!</Text>
        <Text style={styles.subtitle}>Ready to connect</Text>
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.deviceIcon}>
              <MaterialIcons name="smartphone" size={22} color={Colors.Primary} />
            </View>

            <View>
              <Text style={styles.deviceName}>VitalZ Device</Text>
              <Text style={styles.deviceId}>VTZ-1254-2025</Text>
            </View>
          </View>
          <View style={styles.signalWrapper}>
            <Ionicons name="cellular" size={16} color={Colors.Secondary} />
            <Text style={styles.signalText}>Strong</Text>
          </View>

        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Your device has been found. Tap the button below to establish a secure connection.
          </Text>
        </View>

      </View>
      <TouchableOpacity style={[styles.button, { marginBottom: insets.bottom + 20 }]} onPress={() => router.navigate('/home-mode/onboarding/connecting-device')}>
        <Text style={styles.buttonText}>Connect to Device</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default DeviceFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.Border,
    marginHorizontal: Spacing.md,
  },

  content: {
    flex: 1,
    alignItems: "center",
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },

  successWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.SuccessBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    marginBottom: 4,
  },

  subtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginBottom: Spacing.lg,
  },

  card: {
    width: "100%",
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: Spacing.md,
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },

  deviceName: {
    ...Typography.Body,
    color: Colors.TextPrimary,
  },

  deviceId: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },

  signalWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  signalText: {
    ...Typography.Caption,
    color: Colors.Secondary,
    marginLeft: 4,
  },

  infoBox: {
    width: "100%",
    backgroundColor: Colors.PrimaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },

  infoText: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
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