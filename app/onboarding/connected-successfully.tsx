import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';
import { useRouter } from 'expo-router';

const ConnectedSuccessfully = () => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Feather name="check" size={28} color={Colors.Secondary} />
        </View>
      </View>
      <Text style={styles.title}>Connected Successfully!</Text>
      <Text style={styles.subtitle}>Your device is ready to use</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Device ID</Text>
        <Text style={styles.value}>VTZ-1254-2025</Text>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="battery" size={16} color={Colors.Secondary} />
            <Text style={styles.rowText}>Battery</Text>
          </View>
          <Text style={styles.rowValue}>85%</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="cpu" size={16} color={Colors.Info} />
            <Text style={styles.rowText}>Firmware</Text>
          </View>
          <Text style={styles.rowValue}>v2.4.1</Text>
        </View>
      </View>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          ✓ Connection established successfully. You can now proceed with device setup.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => router.navigate('/onboarding/warranty')}>
        <Text style={styles.buttonText}>Continue Setup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectedSuccessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    padding: Spacing.lg,
  },

  iconWrapper: {
    alignItems: 'center',
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },

  subtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },

  card: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.Border,
  },

  label: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },

  value: {
    ...Typography.Body,
    color: Colors.TextPrimary,
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
    fontWeight: '600'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  rowText: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginLeft: Spacing.sm,
  },

  rowValue: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    fontWeight: '600'
  },

  banner: {
    backgroundColor: '#E6F9ED',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.lg,
  },

  bannerText: {
    ...Typography.BodySmall,
    color: Colors.Secondary,
    fontWeight: '500'
  },

  button: {
    backgroundColor: Colors.Primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20
  },

  buttonText: {
    ...Typography.H2,
    color: Colors.TextWhite,
  },
});