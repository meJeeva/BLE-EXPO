import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../src/store/authStore';
import { Colors } from '../src/constants/theme';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';


const lightHeader = {
  headerTitle: '',
  headerStyle: { backgroundColor: Colors.Background },
  headerTintColor: Colors.IconBlack,
  headerShadowVisible: false,
} as const;

const hiddenHeader = { headerShown: false } as const;

export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.Primary },
            headerTintColor: Colors.Surface,
            headerTitleStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 18 },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" options={hiddenHeader} />
          <Stack.Screen name="mode-selection" options={hiddenHeader} />

          <Stack.Screen name="home-mode/login" options={hiddenHeader} />
          <Stack.Screen name="home-mode/otp" options={hiddenHeader} />
          <Stack.Screen name="home-mode/createUser" options={lightHeader} />

          <Stack.Screen name="home-mode/onboarding/device-onboarding" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/device-detect" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/enable-bluetooth" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/searching-device" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/device-found" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/connecting-device" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/connected-successfully" options={lightHeader} />
          <Stack.Screen name="home-mode/onboarding/warranty-registration" options={lightHeader} />

          <Stack.Screen name="home-mode/house-hold/household" options={lightHeader} />
          <Stack.Screen name="home-mode/patient/add-patient" options={lightHeader} />
          <Stack.Screen name="home-mode/patient/patientsVitals" options={lightHeader} />
          <Stack.Screen name="home-mode/drawer" options={hiddenHeader} />
          <Stack.Screen
            name="home-mode/startMeasurement"
            options={{
              ...lightHeader,
              headerTitle: 'Start Measurement',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen name="home-mode/measurementScreen" options={lightHeader} />

          <Stack.Screen name="hospital-mode/hospital-mode" options={lightHeader} />

          <Stack.Screen name="hospital-mode/admin/admin-dashboard" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/active-patient-list" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/active-patient-details" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/active-devices" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/connected-device-details" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/active-device-details" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/total-users" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/total-user-details" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/admin/create-user" options={hiddenHeader} />

          <Stack.Screen name="hospital-mode/doctor/doctor-dashboard" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/doctor/doctor-profile" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/doctor/patient-list" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/doctor/patient-details" options={hiddenHeader} />

          <Stack.Screen name="hospital-mode/nurse/nurse-dashboard" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/create-patient" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/devices" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/scan-ble-devices" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/assign-devices" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/device-details" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/patient-list" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/patient-details" options={hiddenHeader} />
          <Stack.Screen name="hospital-mode/nurse/alert-list" options={hiddenHeader} />
        </Stack>

        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});