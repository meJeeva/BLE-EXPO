import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors, Typography, Spacing, BorderRadius } from "../../../src/constants/theme";

const Tab = createMaterialTopTabNavigator();

interface SessionCardProps {
  name: string;
  id: string;
  duration: string;
  lastData: string;
}

const SessionCard = ({ name, id, duration, lastData }: SessionCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.leftRow}>
          <View style={styles.avatar}>
            <Feather name="user" size={18} color={Colors.Primary} />
          </View>

          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.deviceId}>{id}</Text>
          </View>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={14}
            color={Colors.TextSecondary}
          />
          <Text style={styles.infoText}>Duration: {duration}</Text>
        </View>

        <Text style={styles.lastData}>Last data: {lastData}</Text>
      </View>
    </View>
  );
};

const ActiveSessions = () => {
  return (
    <View style={styles.list}>
      <SessionCard
        name="John Smith"
        id="VTZ-001"
        duration="15 min"
        lastData="2 min ago"
      />

      <SessionCard
        name="Sarah Williams"
        id="VTZ-002"
        duration="32 min"
        lastData="5 min ago"
      />
    </View>
  );
};

const InterruptedSessions = () => {
  return (
    <View style={styles.list}>
      <SessionCard
        name="Mike Johnson"
        id="VTZ-003"
        duration="8 min"
        lastData="1 hour ago"
      />
    </View>
  );
};

const ClosedSessions = () => {
  return (
    <View style={styles.list}>
      <SessionCard
        name="Emily Davis"
        id="VTZ-004"
        duration="45 min"
        lastData="2 hours ago"
      />
    </View>
  );
};

export default function Sessions() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.Primary,
          tabBarInactiveTintColor: Colors.TextSecondary,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.Primary,
            height: 2,
            borderRadius: 2,
          },
          tabBarStyle: {
            backgroundColor: Colors.Surface,
            borderBottomWidth: 1,
            borderBottomColor: Colors.Border,
          },
          tabBarLabelStyle: {
            ...Typography.BodySmall,
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen name="Active" component={ActiveSessions} />
        <Tab.Screen name="Interrupted" component={InterruptedSessions} />
        <Tab.Screen name="Closed" component={ClosedSessions} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },

  headerTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
  },


  list: {
    padding: Spacing.md,
    gap: Spacing.md,
  },

  card: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,

    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },

  name: {
    color: Colors.TextPrimary,
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold'
  },

  deviceId: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.SuccessBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.Secondary,
    marginRight: 4,
  },

  liveText: {
    ...Typography.Caption,
    color: Colors.Secondary,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.sm,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginLeft: 4,
  },

  lastData: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },
});