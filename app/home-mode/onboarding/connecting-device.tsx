import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, BorderRadius } from "../../../src/constants/theme";
import { useRouter } from "expo-router";

const ConnectingDeviceScreen = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [progress, setProgress] = useState(0);

  const router = useRouter();


  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    progressAnim.addListener(({ value }) => {
      setProgress(Math.floor(value * 100));
    });

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => {
      progressAnim.removeAllListeners();
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="smartphone" size={50} color={Colors.Primary} />
          </View>
          <Animated.View
            style={[
              styles.loader,
              { transform: [{ rotate }] },
            ]}
          >
            <Ionicons name="refresh" size={16} color={Colors.Primary} />
          </Animated.View>
        </View>
        <Text style={styles.title}>Connecting...</Text>
        <Text style={styles.subtitle}>
          This may take a few seconds. Please keep your device nearby.
        </Text>
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: progressWidth },
            ]}
          />
        </View>
        <Text style={styles.percent}>{progress}%</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.navigate('/home-mode/onboarding/connected-successfully')}>
          <Text style={styles.buttonText}>Connect to Device</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ConnectingDeviceScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center'
  },

  iconContainer: {
    marginBottom: Spacing.lg,
  },

  iconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  loader: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.Surface,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },

  subtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },

  progressContainer: {
    width: "100%",
    height: 6,
    backgroundColor: Colors.Border,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: Spacing.sm,
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.Primary,
    borderRadius: 3,
  },

  percent: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginTop: Spacing.xs,
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
  },
});