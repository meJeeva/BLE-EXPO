import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { Colors, Typography, Spacing } from '../../src/constants/theme';

export default function CreateHousehold() {
  const router = useRouter();
  const { fetchBootstrap } = useAuthStore();
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
      
      // Navigate to next step (will be handled by index.tsx)
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create household');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Your Household</Text>
            <Text style={styles.subtitle}>
              Set up your household to start monitoring vitals for your family
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

            <Input
              label="Address (Optional)"
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              style={{ height: 80, textAlignVertical: 'top', paddingTop: 12 }}
            />

            <Button
              title="Continue"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={styles.button}
            />
          </View>
        </ScrollView>
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
  },
});
