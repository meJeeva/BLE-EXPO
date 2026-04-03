import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../src/store/authStore';
import { Input } from '../src/components/Input';
import { Button } from '../src/components/Button';
import { Colors, Typography, Spacing } from '../src/constants/theme';
import { validateEmail, validatePhone } from '../src/utils/helpers';

export default function Login() {
  const router = useRouter();
  const { requestOtp } = useAuthStore();
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState<'phone' | 'email'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    // Validate input
    if (!identifier.trim()) {
      setError('Please enter your phone or email');
      return;
    }

    const isEmail = identifier.includes('@');
    const type = isEmail ? 'email' : 'phone';

    if (isEmail && !validateEmail(identifier)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isEmail && !validatePhone(identifier)) {
      setError('Please enter a valid phone number (10-15 digits)');
      return;
    }

    setLoading(true);
    try {
      await requestOtp(identifier.trim(), type);
      router.push({ pathname: '/otp', params: { identifier: identifier.trim(), type } });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="fitness" size={48} color={Colors.Primary} />
            </View>
            <Text style={styles.title}>Welcome to VitalZ</Text>
            <Text style={styles.subtitle}>Monitor your health vitals anytime, anywhere</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Phone or Email"
              placeholder="Enter your phone number or email"
              value={identifier}
              onChangeText={(text) => {
                setIdentifier(text);
                setError('');
              }}
              keyboardType={identifier.includes('@') ? 'email-address' : 'phone-pad'}
              autoCapitalize="none"
              error={error}
            />

            <Button
              title="Send OTP"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            />

            <Text style={styles.note}>
              We'll send you a one-time password to verify your identity
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('/hospital-mode')}>
              <Text style={styles.footerLink}>Hospital Mode →</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
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
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  note: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  footer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerLink: {
    ...Typography.Body,
    color: Colors.Primary,
    fontWeight: '600',
  },
});
