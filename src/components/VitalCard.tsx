import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';
import { formatTemperature } from '../utils/helpers';

interface VitalCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number | string;
  unit?: string;
  color?: string;
  style?: ViewStyle;
}

export const VitalCard: React.FC<VitalCardProps> = ({
  icon,
  label,
  value,
  unit,
  color = Colors.Primary,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    ...Typography.H1,
    color: Colors.TextPrimary,
  },
  unit: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginLeft: 2,
  },
});
