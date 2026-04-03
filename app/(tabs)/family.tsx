import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../src/store/appStore';
import { useAuthStore } from '../../src/store/authStore';
import { EmptyState } from '../../src/components/EmptyState';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';

export default function Family() {
  const router = useRouter();
  const { bootstrapData } = useAuthStore();
  const { currentPatient, setCurrentPatient, fetchPatients, isLoadingPatients } = useAppStore();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPatients();
    setRefreshing(false);
  };

  const patients = bootstrapData?.patients || [];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {patients.length === 0 ? (
          <EmptyState
            icon="people-outline"
            title="No Family Members"
            message="Add family members to monitor their vitals"
          />
        ) : (
          <View>
            {patients.map((patient: any) => (
              <TouchableOpacity
                key={patient.id}
                style={[
                  styles.patientCard,
                  currentPatient?.id === patient.id && styles.activePatientCard,
                ]}
                onPress={() => {
                  setCurrentPatient(patient);
                  router.push('/(tabs)/dashboard');
                }}
              >
                <View style={styles.patientInfo}>
                  <View
                    style={[
                      styles.avatar,
                      currentPatient?.id === patient.id && styles.activeAvatar,
                    ]}
                  >
                    <Ionicons
                      name="person"
                      size={32}
                      color={
                        currentPatient?.id === patient.id
                          ? Colors.Primary
                          : Colors.TextSecondary
                      }
                    />
                  </View>
                  <View style={styles.patientDetails}>
                    <Text style={styles.patientName}>{patient.full_name}</Text>
                    <Text style={styles.patientMeta}>
                      {patient.relationship} • {patient.gender}
                      {patient.age_years && ` • ${patient.age_years} years`}
                    </Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  {currentPatient?.id === patient.id && (
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>Active</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() =>
                      router.push({ pathname: '/patients/edit', params: { id: patient.id } })
                    }
                  >
                    <Ionicons name="create-outline" size={24} color={Colors.TextSecondary} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/patients/add')}
      >
        <Ionicons name="add" size={28} color={Colors.Surface} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  patientCard: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  activePatientCard: {
    borderColor: Colors.Primary,
    borderWidth: 2,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeAvatar: {
    backgroundColor: Colors.PrimaryLight,
  },
  patientDetails: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  patientName: {
    ...Typography.H2,
    color: Colors.TextPrimary,
  },
  patientMeta: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  activeBadge: {
    backgroundColor: Colors.Primary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  activeBadgeText: {
    ...Typography.Caption,
    color: Colors.Surface,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
