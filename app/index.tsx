import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';
import { Loading } from '../src/components/Loading';
import { Colors, Typography } from '../src/constants/theme';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading, bootstrapData, appMode } = useAuthStore();

  useEffect(() => {
    console.log('isloading',isLoading)
    if (isLoading) return;

    console.log('app mode', appMode);

    // First check: Is mode selected?
    if (!appMode) {
      router.replace('/mode-selection');
      return;
    }

    // Second check: Is user authenticated?
    if (!isAuthenticated) {
      if (appMode === 'HOME') {
        router.replace('/login');
      } else {
        router.replace('/hospital-mode');
      }
      return;
    }

    // Third check: For HOME mode, check bootstrap and route accordingly
    if (appMode === 'HOME') {
      console.log('bootstrapData',bootstrapData)
      console.log('appMode',appMode)
      if (bootstrapData) {
        const { onboardingState } = bootstrapData;

        if (!onboardingState.hasHousehold) {
          router.replace('/onboarding/household');
        } else if (!onboardingState.hasAnyPatient) {
          router.replace('/onboarding/add-patient');
        } else if (!onboardingState.hasClaimedDevice) {
          router.replace('/onboarding/device-onboarding');
        } else {
          router.replace('/(tabs)/dashboard');
        }
      }
    } else {
      // HOSPITAL mode - go to placeholder
      router.replace('/hospital-mode');
    }
  }, [isAuthenticated, isLoading, bootstrapData, appMode]);

  return (
    <View style={styles.container}>
      <Loading fullScreen />
      <Text style={styles.text}>VitalZ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.H1,
    color: Colors.Surface,
    marginTop: 16,
  },
});
