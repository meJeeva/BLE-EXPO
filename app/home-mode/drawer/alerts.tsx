import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../../src/constants/theme';
import { Feather } from '@expo/vector-icons';

type Severity = 'high' | 'medium' | 'low';

interface Alert {
  id: string;
  title: string;
  patient: string;
  time: string;
  value: string;
  severity: Severity;
}

const ALERTS: Alert[] = [
  { id: '1', title: 'SpO₂ below 90%', patient: 'Sarah Williams', time: '5 min ago', value: '87%', severity: 'high' },
  { id: '2', title: 'Heart rate elevated', patient: 'John Smith', time: '15 min ago', value: '105 bpm', severity: 'medium' },
  { id: '3', title: 'Temperature slightly high', patient: 'Michael Brown', time: '1 hour ago', value: '37.8°C', severity: 'low' },
  { id: '4', title: 'Respiratory rate abnormal', patient: 'Emma Davis', time: '2 hours ago', value: '28 breaths/min', severity: 'high' },
];

const SEVERITY_CONFIG: Record<Severity, {
  count: number;
  borderColor: string;
  cardBg: string;
  iconBg: string;
  iconColor: string;
  iconName: 'alert-triangle' | 'alert-circle';
  leftBorder: string;
  summaryBg: string;
  summaryBorder: string;
  countColor: string;
}> = {
  high: {
    count: 2,
    borderColor: '#FECACA',
    cardBg: '#FFF8F8',
    iconBg: '#FEE2E2',
    iconColor: Colors.Error,
    iconName: 'alert-triangle',
    leftBorder: Colors.Error,
    summaryBg: '#FFF5F5',
    summaryBorder: '#FECACA',
    countColor: Colors.Error,
  },
  medium: {
    count: 1,
    borderColor: '#FED7AA',
    cardBg: '#FFFDF5',
    iconBg: '#FEF3C7',
    iconColor: Colors.Warning,
    iconName: 'alert-circle',
    leftBorder: Colors.Warning,
    summaryBg: '#FFFBF5',
    summaryBorder: '#FED7AA',
    countColor: Colors.Warning,
  },
  low: {
    count: 1,
    borderColor: '#FEF08A',
    cardBg: '#FEFCE8',
    iconBg: '#FEF9C3',
    iconColor: '#CA8A04',
    iconName: 'alert-circle',
    leftBorder: '#EAB308',
    summaryBg: '#FEFCE8',
    summaryBorder: '#FEF08A',
    countColor: '#CA8A04',
  },
};

const SummaryCard = ({ severity, label }: { severity: Severity; label: string }) => {
  const config = SEVERITY_CONFIG[severity];
  return (
    <View style={[styles.summaryCard, { backgroundColor: config.summaryBg, borderColor: config.summaryBorder }]}>
      <Text style={[styles.summaryCount, { color: config.countColor }]}>{config.count}</Text>
      <Text style={[styles.summaryLabel, { color: config.countColor }]}>{label}</Text>
    </View>
  );
};

const AlertCard = ({ alert }: { alert: Alert }) => {
  const config = SEVERITY_CONFIG[alert.severity];
  return (
    <View style={[styles.alertCard, {
      backgroundColor: Colors.Surface,
      borderColor: config.iconBg,
      borderLeftColor: config.iconBg,
    }]}>
      <View style={styles.alertRow}>
        <View style={[styles.iconWrapper, { backgroundColor: config.iconBg }]}>
          <Feather name={config.iconName} size={14} color={config.iconColor} />
        </View>
        <View style={styles.alertBody}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <View style={styles.metaRow}>
            <Feather name="user" size={11} color={Colors.TextSecondary} />
            <Text style={styles.metaText}>{alert.patient}</Text>
          </View>
          <View style={styles.metaRow}>
            <Feather name="clock" size={11} color={Colors.TextSecondary} />
            <Text style={styles.metaText}>{alert.time}</Text>
          </View>
        </View>
        <Text style={styles.alertValue}>{alert.value}</Text>
      </View>
    </View>
  );
};

export default function AlertsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.summaryRow}>
        <SummaryCard severity="high" label="High" />
        <SummaryCard severity="medium" label="Medium" />
        <SummaryCard severity="low" label="Low" />
      </View>

      {ALERTS.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  container: {
    padding: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    padding: Spacing.sm + 2,
  },
  summaryCount: {
    ...Typography.H1,
  },
  summaryLabel: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginTop: 2,
  },
  alertCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderLeftWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  alertBody: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.TextPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  metaText: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },
  alertValue: {
    ...Typography.Caption,
    color: Colors.TextPrimary,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});