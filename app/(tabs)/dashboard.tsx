import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../src/store/appStore';
import { useAuthStore } from '../../src/store/authStore';
import { VitalCard } from '../../src/components/VitalCard';
import { Loading } from '../../src/components/Loading';
import { EmptyState } from '../../src/components/EmptyState';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';
import { formatTemperature } from '../../src/utils/helpers';

export default function Dashboard() {
  const router = useRouter();
  const { bootstrapData } = useAuthStore();
  const {
    currentPatient,
    latestVitals,
    isLoadingVitals,
    temperatureUnit,
    toggleTemperatureUnit,
    fetchLatestVitals,
    fetchVitalsHistory,
    isDemoMode,
  } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Set first patient as current if not set
    if (!currentPatient && bootstrapData?.patients && bootstrapData.patients.length > 0) {
      useAppStore.getState().setCurrentPatient(bootstrapData.patients[0]);
    }
  }, [bootstrapData]);

  useEffect(() => {
    if (currentPatient) {
      fetchLatestVitals(currentPatient.id);
      fetchVitalsHistory(currentPatient.id);
    }
  }, [currentPatient]);

  const handleRefresh = async () => {
    if (!currentPatient) return;
    setRefreshing(true);
    try {
      await fetchLatestVitals(currentPatient.id);
      await fetchVitalsHistory(currentPatient.id);
    } finally {
      setRefreshing(false);
    }
  };

  if (!currentPatient) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="person-add-outline"
          title="No Family Members"
          message="Add a family member to start monitoring vitals"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/patients/add')}
        >
          <Ionicons name="add" size={24} color={Colors.Surface} />
          <Text style={styles.addButtonText}>Add Family Member</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Patient Selector */}
        <TouchableOpacity
          style={styles.patientCard}
          onPress={() => router.push('/(tabs)/family')}
        >
          <View style={styles.patientInfo}>
            <Ionicons name="person-circle" size={48} color={Colors.Primary} />
            <View style={styles.patientDetails}>
              <Text style={styles.patientName}>{currentPatient.full_name}</Text>
              <Text style={styles.patientMeta}>
                {currentPatient.relationship} • {currentPatient.age_years || 'N/A'} years
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.TextSecondary} />
        </TouchableOpacity>

        {isDemoMode && (
          <View style={styles.demoBanner}>
            <Ionicons name="flask" size={20} color={Colors.Warning} />
            <Text style={styles.demoBannerText}>Demo Mode Active - Sample Data</Text>
          </View>
        )}

        {/* Temperature Unit Toggle */}
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Latest Vitals</Text>
          <TouchableOpacity
            style={styles.tempToggle}
            onPress={toggleTemperatureUnit}
          >
            <Text style={styles.tempToggleText}>°{temperatureUnit}</Text>
          </TouchableOpacity>
        </View>

        {/* Vitals Cards */}
        {isLoadingVitals ? (
          <Loading />
        ) : latestVitals ? (
          <View style={styles.vitalsGrid}>
            <VitalCard
              icon="water"
              label="SpO2"
              value={latestVitals.spo2 || '--'}
              unit="%"
              color="#2563EB"
              style={styles.vitalCard}
            />
            <VitalCard
              icon="heart"
              label="Heart Rate"
              value={latestVitals.heartRate || '--'}
              unit="bpm"
              color="#E53935"
              style={styles.vitalCard}
            />
            <VitalCard
              icon="pulse"
              label="HRV"
              value={latestVitals.hrv || '--'}
              unit="ms"
              color="#27AE60"
              style={styles.vitalCard}
            />
            <VitalCard
              icon="leaf"
              label="Resp. Rate"
              value={latestVitals.respiratoryRate || '--'}
              unit="/min"
              color="#F59E0B"
              style={styles.vitalCard}
            />
            <VitalCard
              icon="thermometer"
              label="Temperature"
              value={
                latestVitals.temperature
                  ? formatTemperature(latestVitals.temperature, temperatureUnit)
                  : '--'
              }
              unit=""
              color="#9C27B0"
              style={[styles.vitalCard, { flex: 1 }]}
            />
          </View>
        ) : (
          <EmptyState
            icon="analytics-outline"
            title="No Vitals Data"
            message="No vitals recorded yet for this family member"
          />
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/history' as any)}
            >
              <Ionicons name="time-outline" size={32} color={Colors.Primary} />
              <Text style={styles.actionText}>View History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert('BLE Stub', 'BLE device connection is a stub interface')}
            >
              <Ionicons name="bluetooth-outline" size={32} color={Colors.Primary} />
              <Text style={styles.actionText}>Connect Device</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  scrollContent: {
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
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    marginTop: 2,
  },
  demoBanner: {
    backgroundColor: Colors.Warning + '20',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  demoBannerText: {
    ...Typography.BodySmall,
    color: Colors.Warning,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
  },
  tempToggle: {
    backgroundColor: Colors.Primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  tempToggleText: {
    ...Typography.BodySmall,
    color: Colors.Surface,
    fontWeight: '600',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  vitalCard: {
    width: '48%',
    margin: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  section: {
    marginTop: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  actionText: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    marginTop: Spacing.sm,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: Colors.Primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    margin: Spacing.lg,
  },
  addButtonText: {
    ...Typography.Body,
    color: Colors.Surface,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
});
