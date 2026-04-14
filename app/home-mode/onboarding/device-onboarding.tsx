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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { api } from '../../../src/services/api';
import { useAuthStore } from '../../../src/store/authStore';
import { Input } from '../../../src/components/Input';
import { Button } from '../../../src/components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../../../src/constants/theme';

export default function DeviceOnboarding() {
  const router = useRouter();
  const { logout, fetchBootstrap } = useAuthStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [showScanner, setShowScanner] = useState(true);
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

  const handleClaimDevice = async () => {
    if (!deviceId.trim()) {
      setError('Please enter or scan a device ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.claimDevice(deviceId.trim());

      await fetchBootstrap();
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to claim device');
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
          router.replace('/home-mode/login');
        },
      },
    ]);
  };

  const handleRegisterDevice = async () => {
    if (!deviceId.trim()) {
      setError('Please enter or scan a device ID');
      return;
    }

    setLoading(true);
    try {
      await api.registerDevice(deviceId.trim(), 'HOME');
      await api.claimDevice(deviceId.trim());
      await fetchBootstrap();
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
            onPress: () => router.replace({ pathname: '/home-mode/onboarding/warranty-registration', params: { deviceId: deviceId.trim() } }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to register device');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Scan Device QR</Text>
          <Text style={styles.subtitle}>
            Scan the QR code on the back of your device
          </Text>
        </View>

        {
          showScanner && (
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
                  <View style={styles.scannerFrame}>
                    <MaterialIcons name="qr-code-scanner" size={80} color={Colors.TextSecondary} />
                  </View>
                  <Text style={styles.scannerText}>Position QR code within frame</Text>
                </View>
              </CameraView>
            </View>
          )
        }

        {showScanner && <TouchableOpacity onPress={() => {
          setShowScanner(false);
        }}>
          <Text style={[styles.manualEntryText, {
            marginTop: Spacing.lg, fontFamily: 'Inter_600SemiBold'
          }]}><Text style={{ ...Typography.H1 }}>ⲧ  </Text> Enter device ID manually</Text>
        </TouchableOpacity>}


        {!showScanner && <Input
          label="Device ID"
          placeholder="VTZ-XXXX-XXXX"
          value={deviceId}
          onChangeText={(text) => {
            setDeviceId(text);
            setError('');
          }}
          error={error}
          autoCapitalize="characters"
        />}

        {
          !showScanner && (
            <TouchableOpacity onPress={() => setShowScanner(true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10 }}>
              <Ionicons name="arrow-back" size={20} color={Colors.Primary} />
              <Text style={styles.manualEntryText}>
                Back to scanner
              </Text>
            </TouchableOpacity>
          )
        }


        <Button
          title="Add Device"
          // onPress={handleRegisterDevice}
          onPress={() => {
            router.replace({ pathname: '/home-mode/onboarding/device-detect' as any, params: { deviceId: deviceId.trim() } })
          }}
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
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.BodySmall,
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
  scannerContainer: {
    flex: 0.9,
  },
  camera: {
    flex: 1,
    borderRadius: BorderRadius.lg,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: Colors.Overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerText: {
    ...Typography.BodySmall,
    color: Colors.Surface,
    marginTop: Spacing.lg,
    position: 'absolute',
    bottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: Colors.Overlay,
    borderRadius: 50,
    padding: Spacing.sm,
  },
  manualEntryText: {
    ...Typography.BodySmall,
    color: Colors.Primary,
    textAlign: 'center',
  },
});
