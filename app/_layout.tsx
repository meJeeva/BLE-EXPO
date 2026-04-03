import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenCapture from 'expo-screen-capture';
import { useAuthStore } from '../src/store/authStore';
import { Colors } from '../src/constants/theme';

export default function RootLayout() {
  const { initialize } = useAuthStore();

  console.log('initialize',initialize)

  useEffect(() => {
    initialize();
    
    // Global screenshot blocking
    const enableScreenshotBlocking = async () => {
      try {
        await ScreenCapture.preventScreenCaptureAsync();
        console.log('Screenshot blocking enabled globally');
      } catch (error) {
        console.error('Error enabling screenshot blocking:', error);
      }
    };
    
    enableScreenshotBlocking();
  }, []);

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
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="otp" options={{ title: 'Verify OTP', headerBackVisible: true }} />
          <Stack.Screen name="onboarding/household" options={{ title: 'Create Household', headerBackVisible: false }} />
          <Stack.Screen name="onboarding/add-patient" options={{ title: 'Add Family Member'}} />
          <Stack.Screen name="onboarding/device-onboarding" options={{ title: 'Add Device' }} />
          <Stack.Screen name="onboarding/warranty" options={{ title: 'Warranty Registration' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="patients/add" options={{ title: 'Add Family Member' }} />
          <Stack.Screen name="patients/edit" options={{ title: 'Edit Family Member' }} />
          <Stack.Screen name="session/[id]" options={{ title: 'Session Details' }} />
          <Stack.Screen name="hospital-mode" options={{ title: 'Hospital Mode' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
