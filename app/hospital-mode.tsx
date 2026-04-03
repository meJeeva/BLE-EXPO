import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../src/constants/theme';

export default function HospitalMode() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Ionicons name="business-outline" size={80} color={Colors.Primary} />
        <Text style={styles.title}>Hospital Mode</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Hospital mode will allow healthcare professionals to monitor multiple patients and manage
          vitals in a clinical setting.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  title: {
    ...Typography.H1,
    fontSize: 28,
    color: Colors.TextPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.H2,
    color: Colors.Primary,
    marginBottom: Spacing.lg,
  },
  description: {
    ...Typography.Body,
    color: Colors.TextSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
