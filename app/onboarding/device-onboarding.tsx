import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';

export default function DeviceOnboarding() {
  const router = useRouter();
  const { fetchBootstrap } = useAuthStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [showScanner, setShowScanner] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setShowScanner(false);
    setDeviceId(data);
  };

  const openScanner = async () => {
    if (!permission) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera permission is needed to scan QR codes');
        return;
      }
    }
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera permission is needed to scan QR codes');
        return;
      }
    }
    setShowScanner(true);
  };

  const handleRegisterDevice = async () => {
    if (!deviceId.trim()) {
      setError('Please enter or scan a device ID');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Register device
      await api.registerDevice(deviceId.trim(), 'HOME');
      
      // Step 2: Claim device
      await api.claimDevice(deviceId.trim());

      // Refresh bootstrap data
      await fetchBootstrap();

      // Ask about warranty registration
      Alert.alert(
        'Device Added Successfully',
        'Would you like to register the warranty for this device?',
        [
          {
            text: 'Skip',
            style: 'cancel',
            onPress: () => router.replace('/'),
          },
          {
            text: 'Register',
            onPress: () => router.replace({ pathname: '/onboarding/warranty', params: { deviceId: deviceId.trim() } }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to register device');
    } finally {
      setLoading(false);
    }
  };

  if (showScanner) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          >
            <View style={styles.scannerOverlay}>
              <View style={styles.scannerFrame} />
              <Text style={styles.scannerText}>Position QR code within frame</Text>
            </View>
          </CameraView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowScanner(false)}
          >
            <Ionicons name="close" size={32} color={Colors.Surface} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Your Device</Text>
          <Text style={styles.subtitle}>
            Scan the QR code on your device or enter the ID manually
          </Text>
        </View>

        <TouchableOpacity style={styles.scanCard} onPress={openScanner}>
          <Ionicons name="qr-code-outline" size={64} color={Colors.Primary} />
          <Text style={styles.scanCardTitle}>Scan QR Code</Text>
          <Text style={styles.scanCardSubtitle}>Quick and easy setup</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Input
          label="Device ID"
          placeholder="Enter device ID manually"
          value={deviceId}
          onChangeText={(text) => {
            setDeviceId(text);
            setError('');
          }}
          error={error}
          autoCapitalize="characters"
        />

        <Button
          title="Add Device"
          onPress={handleRegisterDevice}
          loading={loading}
          disabled={loading || !deviceId.trim()}
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
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
  scanCard: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.Primary,
    borderStyle: 'dashed',
  },
  scanCardTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
    marginTop: Spacing.md,
  },
  scanCardSubtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginTop: Spacing.xs,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.Border,
  },
  dividerText: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginHorizontal: Spacing.md,
  },
  button: {
    marginTop: Spacing.md,
  },
  // Scanner styles
  scannerContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
  },
  scannerText: {
    ...Typography.Body,
    color: Colors.Surface,
    marginTop: Spacing.lg,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: Spacing.sm,
  },
});
