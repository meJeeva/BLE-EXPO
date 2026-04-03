import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { saveAppMode } from '../src/utils/mode';
import { useAuthStore } from '../src/store/authStore';
import { Colors, Typography, Spacing, BorderRadius } from '../src/constants/theme';

export default function ModeSelection() {
  const router = useRouter();
  const { setAppMode } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSelectMode = async (mode: 'HOME' | 'HOSPITAL') => {
    setLoading(true);
    try {
      await saveAppMode(mode);
      setAppMode(mode);
      
      if (mode === 'HOME') {
        router.replace('/login');
      } else {
        router.replace('/hospital-mode');
      }
    } catch (error) {
      console.error('Error saving mode:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="fitness" size={64} color={Colors.Primary} />
          </View>
          <Text style={styles.title}>Welcome to VitalZ</Text>
          <Text style={styles.subtitle}>Choose your mode to get started</Text>
        </View>

        {/* Mode Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.modeCard}
            onPress={() => handleSelectMode('HOME')}
            disabled={loading}
            activeOpacity={0.7}
          >
            <View style={[styles.modeIcon, { backgroundColor: Colors.Primary + '20' }]}>
              <Ionicons name="home" size={48} color={Colors.Primary} />
            </View>
            <Text style={styles.modeTitle}>Home Mode</Text>
            <Text style={styles.modeDescription}>
              Monitor vitals for yourself and your family members at home
            </Text>
            <View style={styles.modeFeatures}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.Secondary} />
                <Text style={styles.featureText}>Family management</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.Secondary} />
                <Text style={styles.featureText}>Device registration</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.Secondary} />
                <Text style={styles.featureText}>Vitals tracking</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeCard}
            onPress={() => handleSelectMode('HOSPITAL')}
            disabled={loading}
            activeOpacity={0.7}
          >
            <View style={[styles.modeIcon, { backgroundColor: Colors.Secondary + '20' }]}>
              <Ionicons name="business" size={48} color={Colors.Secondary} />
            </View>
            <Text style={styles.modeTitle}>Hospital Mode</Text>
            <Text style={styles.modeDescription}>
              Professional mode for healthcare facilities and clinical settings
            </Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.H1,
    fontSize: 28,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.Body,
    color: Colors.TextSecondary,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Spacing.lg,
  },
  modeCard: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.Border,
    alignItems: 'center',
  },
  modeIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modeTitle: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },
  modeDescription: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  modeFeatures: {
    width: '100%',
    gap: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  comingSoonBadge: {
    backgroundColor: Colors.Warning + '20',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
  },
  comingSoonText: {
    ...Typography.BodySmall,
    color: Colors.Warning,
    fontWeight: '600',
  },
});
