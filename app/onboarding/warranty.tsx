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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../src/services/api';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { Colors, Typography, Spacing } from '../../src/constants/theme';

export default function Warranty() {
  const router = useRouter();
  const params = useLocalSearchParams<{ deviceId: string }>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    purchaseDate: '',
    retailer: '',
    invoiceNumber: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.registerWarranty(params.deviceId, {
        purchase_date: formData.purchaseDate,
        retailer: formData.retailer || undefined,
        invoice_number: formData.invoiceNumber || undefined,
      });

      Alert.alert('Success', 'Warranty registered successfully', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to register warranty');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Register Warranty</Text>
            <Text style={styles.subtitle}>
              Register your device warranty for better support and service
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Purchase Date"
              placeholder="YYYY-MM-DD"
              value={formData.purchaseDate}
              onChangeText={(text) => setFormData({ ...formData, purchaseDate: text })}
            />

            <Input
              label="Retailer (Optional)"
              placeholder="Where did you purchase?"
              value={formData.retailer}
              onChangeText={(text) => setFormData({ ...formData, retailer: text })}
            />

            <Input
              label="Invoice Number (Optional)"
              placeholder="Enter invoice number"
              value={formData.invoiceNumber}
              onChangeText={(text) => setFormData({ ...formData, invoiceNumber: text })}
            />

            <Button
              title="Register Warranty"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading || !formData.purchaseDate}
              style={styles.button}
            />

            <Button
              title="Skip for Now"
              onPress={handleSkip}
              variant="outline"
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
