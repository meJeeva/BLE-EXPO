import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenCapture from 'expo-screen-capture';
import { useAuthStore } from '../src/store/authStore';
import { Colors } from '../src/constants/theme';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { initialize } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });




  useEffect(() => {
    initialize();

    const enableScreenshotBlocking = async () => {
      try {
        // await ScreenCapture.preventScreenCaptureAsync();
      } catch (error) {
      }
    };

    // enableScreenshotBlocking();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.Primary,
            },
            headerTintColor: Colors.Surface,
            headerTitleStyle: {
              fontWeight: '600',
            },
            animation: 'slide_from_right',
          }}
          initialRouteName='index'
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="mode-selection" options={{ headerShown: false }} />

          {/*------------------------------------------ home-mode ------------------------------------------*/}
          <Stack.Screen name="home-mode/login" options={{ headerShown: false }} />
          <Stack.Screen name="home-mode/otp" options={{ headerShown: false }} />
          <Stack.Screen name="home-mode/createUser" options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: Colors.Background,
            },
            headerTintColor: Colors.IconBlack,
            headerShadowVisible: false,
          }} />
          <Stack.Screen name="home-mode/onboarding/device-onboarding" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/device-detect" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/enable-bluetooth" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/searching-device" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/device-found" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/connecting-device" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/connected-successfully" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/onboarding/warranty-registration" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/house-hold/household" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/patient/add-patient" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/drawer" options={{ headerShown: false }} />
          <Stack.Screen name="home-mode/patient/patientsVitals" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/startMeasurement" options={{ headerTitle: 'Start Measurement', headerStyle: { backgroundColor: Colors.Background }, headerTitleAlign: 'center', headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="home-mode/measurementScreen" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />

          {/*---------------------------------------------------------------- hospital-mode------------------------------------------------------------------------- */}

          <Stack.Screen name="hospital-mode" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="admin-dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="patient-list" options={{ headerShown: false }} />
          <Stack.Screen name="patient-details" options={{ headerShown: false }} />
          <Stack.Screen name="users" options={{ headerShown: false }} />
          <Stack.Screen name="hospital/create-user" options={{ headerShown: false }} />
          <Stack.Screen name="hospital/user-details" options={{ headerShown: false }} />
          <Stack.Screen name="hospital/hospital-devices" options={{ headerShown: false }} />
          <Stack.Screen name="hospital/device-details" options={{ headerShown: false }} />
          <Stack.Screen name="hospital/active-device-details" options={{ headerShown: false }} />
          <Stack.Screen name="doctor-dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="doctor-profile" options={{ headerShown: false }} />
          <Stack.Screen name="doctor/patient-list" options={{ headerShown: false }} />
          <Stack.Screen name="doctor/patient-details" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/nurse-dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/create-patient" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/devices" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/scan-ble-devices" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/device-info" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/patient-list" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/patient-details" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/alert-list" options={{ headerShown: false }} />
          <Stack.Screen name="nurse/assign-devices" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
