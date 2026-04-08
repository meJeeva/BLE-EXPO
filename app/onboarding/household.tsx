import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';

export default function CreateHousehold() {
  const router = useRouter();
  const { logout, fetchBootstrap } = useAuthStore();
  const [householdName, setHouseholdName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};

    if (!householdName.trim()) {
      newErrors.householdName = 'Household name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await api.createHousehold({
        name: householdName.trim(),
        address: address.trim() || undefined,
      });

      // Refresh bootstrap data
      await fetchBootstrap();

      // Navigate to next step
      router.replace('/onboarding/add-patient');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create household');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* home icon */}
          <View style={styles.iconWrapper}>
            <MaterialIcons name="home" size={36} color={Colors.Primary} />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Create Household</Text>
            <Text style={styles.subtitle}>
              Give your household a name to get started
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Household Name *"
              placeholder="e.g., Smith Family"
              value={householdName}
              onChangeText={(text) => {
                setHouseholdName(text);
                setErrors({ ...errors, householdName: '' });
              }}
              error={errors.householdName}
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                You can add family members and manage devices for everyone is your household
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Continue Household"
            // onPress={handleSubmit}
            onPress={() => router.navigate('/onboarding/add-patient')}
            loading={loading}
            disabled={loading}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.H1,
    fontSize: 24,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.Body,
    color: Colors.TextSecondary,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
    padding: Spacing.sm,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
    marginHorizontal: 'auto'
  },

  infoBox: {
    width: "100%",
    backgroundColor: Colors.PrimaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },

  infoText: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.Background,
  },
});
