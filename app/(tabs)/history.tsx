import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';
import { useAppStore } from '../../src/store/appStore';
import { Loading } from '../../src/components/Loading';
import { EmptyState } from '../../src/components/EmptyState';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';
import { formatDate, formatTime, formatTemperature } from '../../src/utils/helpers';

export default function History() {
  const {
    currentPatient,
    vitalsHistory,
    vitalsViewMode,
    temperatureUnit,
    setVitalsViewMode,
    fetchVitalsHistory,
  } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPatient) {
      setLoading(true);
      fetchVitalsHistory(currentPatient.id).finally(() => setLoading(false));
    }
  }, [currentPatient]);

  const renderLogView = () => {
    if (vitalsHistory.length === 0) {
      return (
        <EmptyState
          icon="document-text-outline"
          title="No History"
          message="No vitals history available"
        />
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.logContainer}>
        {vitalsHistory.map((vital: any, index: number) => (
          <View key={index} style={styles.logCard}>
            <View style={styles.logHeader}>
              <Text style={styles.logDate}>
                {formatDate(vital.timestamp || new Date())}
              </Text>
              <Text style={styles.logTime}>
                {formatTime(vital.timestamp || new Date())}
              </Text>
            </View>
            <View style={styles.logGrid}>
              <View style={styles.logItem}>
                <Text style={styles.logLabel}>SpO2</Text>
                <Text style={styles.logValue}>{vital.spo2}%</Text>
              </View>
              <View style={styles.logItem}>
                <Text style={styles.logLabel}>HR</Text>
                <Text style={styles.logValue}>{vital.heartRate} bpm</Text>
              </View>
              <View style={styles.logItem}>
                <Text style={styles.logLabel}>HRV</Text>
                <Text style={styles.logValue}>{vital.hrv} ms</Text>
              </View>
              <View style={styles.logItem}>
                <Text style={styles.logLabel}>RR</Text>
                <Text style={styles.logValue}>{vital.respiratoryRate} /min</Text>
              </View>
              <View style={styles.logItem}>
                <Text style={styles.logLabel}>Temp</Text>
                <Text style={styles.logValue}>
                  {formatTemperature(vital.temperature, temperatureUnit)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderChartView = () => {
    if (vitalsHistory.length === 0) {
      return (
        <EmptyState
          icon="analytics-outline"
          title="No Data"
          message="No vitals data to display in chart"
        />
      );
    }

    const chartData = vitalsHistory.map((vital: any, index: number) => ({
      value: vital.heartRate || 0,
      label: index % 5 === 0 ? formatTime(vital.timestamp).slice(0, 5) : '',
    }));

    return (
      <ScrollView contentContainerStyle={styles.chartContainer}>
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Heart Rate</Text>
          <LineChart
            data={chartData}
            height={200}
            width={320}
            color={Colors.Primary}
            thickness={2}
            startFillColor={Colors.PrimaryLight}
            endFillColor={Colors.Surface}
            startOpacity={0.9}
            endOpacity={0.2}
            initialSpacing={10}
            spacing={30}
            yAxisColor={Colors.Border}
            xAxisColor={Colors.Border}
            yAxisTextStyle={{ color: Colors.TextSecondary }}
            xAxisLabelTextStyle={{ color: Colors.TextSecondary }}
            curved
            areaChart
          />
        </View>
      </ScrollView>
    );
  };

  if (!currentPatient) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="person-outline"
          title="No Patient Selected"
          message="Select a family member to view history"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            vitalsViewMode === 'log' && styles.toggleButtonActive,
          ]}
          onPress={() => setVitalsViewMode('log')}
        >
          <Ionicons
            name="list"
            size={20}
            color={vitalsViewMode === 'log' ? Colors.Surface : Colors.TextSecondary}
          />
          <Text
            style={[
              styles.toggleText,
              vitalsViewMode === 'log' && styles.toggleTextActive,
            ]}
          >
            Log
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            vitalsViewMode === 'chart' && styles.toggleButtonActive,
          ]}
          onPress={() => setVitalsViewMode('chart')}
        >
          <Ionicons
            name="stats-chart"
            size={20}
            color={vitalsViewMode === 'chart' ? Colors.Surface : Colors.TextSecondary}
          />
          <Text
            style={[
              styles.toggleText,
              vitalsViewMode === 'chart' && styles.toggleTextActive,
            ]}
          >
            Chart
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading fullScreen />
      ) : vitalsViewMode === 'log' ? (
        renderLogView()
      ) : (
        renderChartView()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.Surface,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  toggleButtonActive: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  toggleText: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: Colors.Surface,
  },
  logContainer: {
    padding: Spacing.md,
  },
  logCard: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  logDate: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    fontWeight: '600',
  },
  logTime: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
  },
  logGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  logItem: {
    width: '33.33%',
    padding: Spacing.xs,
    alignItems: 'center',
  },
  logLabel: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginBottom: 2,
  },
  logValue: {
    ...Typography.Body,
    color: Colors.TextPrimary,
    fontWeight: '600',
  },
  chartContainer: {
    padding: Spacing.md,
  },
  chartCard: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  chartTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
    marginBottom: Spacing.md,
  },
});
