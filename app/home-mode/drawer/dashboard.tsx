import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const devices = [
  {
    id: '1',
    name: 'Living Room Device',
    code: 'VTZ-001',
    status: 'Available',
    battery: '85%',
  },
  {
    id: '2',
    name: 'Bedroom Device',
    code: 'VTZ-002',
    status: 'In Use',
    battery: '42%',
  },
];

const members = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Self',
    age: 45,
    time: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    role: 'Spouse',
    age: 42,
    time: '1 day ago',
  },
  {
    id: '3',
    name: 'Emma Smith',
    role: 'Child',
    age: 12,
    time: 'Never',
  },
];

const DeviceCard = ({ item }: any) => {
  const isAvailable = item.status === 'Available';

  return (
    <View style={styles.card}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
      }}>
        <View style={[{
          backgroundColor: Colors.PrimaryLight,
          padding: Spacing.sm,
          borderRadius: 10
        }]}>
          <Ionicons name="phone-portrait" size={20} color={Colors.Primary} />
        </View>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.code}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: isAvailable ? Colors.SuccessStatus : Colors.WarningStatus },
          ]}
        >
          <Ionicons name={isAvailable ? 'checkmark-circle' : 'alert-circle'} size={16} color={isAvailable ? Colors.Info : Colors.Warning} />
          <Text
            style={{
              color: isAvailable ? Colors.Info : Colors.Warning,
              fontSize: 12,
            }}
          >
            {item.status}
          </Text>
        </View>
        <Text style={styles.cardSubtitle}>{item.battery} battery</Text>
      </View>
    </View>
  );
};

const MemberCard = ({ item }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={{ ...Typography.BodySmall, color: Colors.Warning }}>{item.name[0]}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>
          {item.role} • {item.age} years
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Ionicons name="pulse" size={16} color={Colors.TextSecondary} />
        <Text style={styles.cardSubtitle}>{item.time}</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();

  const handleStartMeasurement = () => {
    router.push('/home-mode/startMeasurement');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{
          backgroundColor: Colors.TextWhite,
          padding: Spacing.md,
          paddingBottom: 0
        }}>
          <Text style={styles.header}>RAM</Text>
          <Text style={styles.subHeader}>Welcome back!</Text>
        </View>
        <View style={{
          padding: Spacing.md,
        }}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionIcon}>
                <Ionicons name="phone-portrait" size={20} color={Colors.Primary} />
              </View>
              <Text style={styles.sectionTitle}>Devices</Text>
            </View>
            <Text style={styles.sectionRight}>2 devices</Text>
          </View>

          {devices.map((item) => (
            <DeviceCard key={item.id} item={item} />
          ))}

          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.sectionIcon}>
                <Ionicons name="people" size={20} color={Colors.Primary} />
              </View>
              <Text style={styles.sectionTitle}>Family Members</Text>
            </View>
            <Text style={styles.sectionRight}>+ Add</Text>
          </View>

          {members.map((item) => (
            <MemberCard key={item.id} item={item} />
          ))}

          <TouchableOpacity style={styles.button} onPress={handleStartMeasurement}>
            <Text style={styles.buttonText}>Start Measurement</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: TextStyle;
  subHeader: TextStyle;
  sectionHeader: ViewStyle;
  sectionTitleContainer: ViewStyle;
  sectionTitle: TextStyle;
  sectionIcon: ViewStyle;
  sectionRight: TextStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardSubtitle: TextStyle;
  statusBadge: ViewStyle;
  avatar: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  header: {
    ...Typography.H1,
    color: Colors.TextPrimary,
  },

  subHeader: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginBottom: Spacing.md,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },

  sectionIcon: {
    marginRight: Spacing.sm,
  },

  sectionRight: {
    color: Colors.Primary,
  },

  card: {
    backgroundColor: Colors.Surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    ...Typography.Body,
    color: Colors.TextPrimary,
  },

  cardSubtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.WarningStatus,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  button: {
    backgroundColor: Colors.Primary,
    padding: 16,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
  },

  buttonText: {
    color: Colors.TextWhite,
  },
});