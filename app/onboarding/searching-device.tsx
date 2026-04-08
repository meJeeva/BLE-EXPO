import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, BorderRadius } from "../../src/constants/theme"
import { useRouter } from "expo-router";

const SearchingDeviceScreen = () => {
  const scale1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(0)).current;
  const opacity1 = useRef(new Animated.Value(0.4)).current;
  const opacity2 = useRef(new Animated.Value(0.4)).current;

  const signalAnim = useRef(new Animated.Value(0)).current;

        const router = useRouter();
  

  useEffect(() => {
    const createRipple = (scale: Animated.Value, opacity: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 3000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(scale, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createRipple(scale1, opacity1, 0).start();
    createRipple(scale2, opacity2, 800).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(signalAnim, {
          toValue: -5,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(signalAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.animationWrapper}>
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{ scale: scale1 }],
                opacity: opacity1,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{ scale: scale2 }],
                opacity: opacity2,
              },
            ]}
          />
          <View style={styles.iconWrapper}>
            <MaterialIcons name="smartphone" size={32} color={Colors.Primary} />
          </View>
          <Animated.View
            style={[
              styles.signalIcon,
              { transform: [{ translateY: signalAnim }] },
            ]}
          >
            <Ionicons name="wifi" size={16} color={Colors.Primary} />
          </Animated.View>

        </View>
        <Text style={styles.title}>Searching for Device..</Text>
        <Text style={styles.subtitle}>
          Looking for nearby VitalZ devices
        </Text>
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>Tips:</Text>
          <Text style={styles.tip}>• Keep your device powered on</Text>
          <Text style={styles.tip}>• Stay within 10 feet of the device</Text>
          <Text style={styles.tip}>• Make sure Bluetooth is enabled</Text>
        </View>
  <TouchableOpacity style={styles.button} onPress={() => router.navigate('/onboarding/device-found')}>
        <Text style={styles.buttonText}>go to device found</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchingDeviceScreen;

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

  animationWrapper: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  ripple: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.Primary,
  },

  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  signalIcon: {
    position: "absolute",
    top: 40,
    right: 40,
  },

  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
  },

  subtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginBottom: Spacing.lg,
  },

  tipsBox: {
    width: "100%",
    backgroundColor: Colors.PrimaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },

  tipsTitle: {
    ...Typography.BodySmall,
    fontWeight: "600",
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
  },

  tip: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginBottom: 2,
  },

    button: {
    position: "absolute",
    bottom: Spacing.lg,
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
    fontWeight: "600",
  },
});