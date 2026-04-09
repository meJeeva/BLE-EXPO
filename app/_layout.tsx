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
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="otp" options={{ headerShown: false }} />
          <Stack.Screen name="createUser" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }}/>
          <Stack.Screen name="onboarding/device-detect" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/enable-bluetooth" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/searching-device" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/device-found" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/household" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/connecting-device" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/connected-successfully" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/add-patient" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/device-onboarding" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="onboarding/warranty" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="patients/add" options={{ title: 'Add Family Member' }} />
          <Stack.Screen name="patients/edit" options={{ title: 'Edit Family Member' }} />
          <Stack.Screen name="session/[id]" options={{ title: 'Session Details' }} />
          <Stack.Screen name="hospital-mode" options={{ title: 'Hospital Mode' }} />
          <Stack.Screen name="startMeasurement" options={{ headerTitle: 'Start Measurement', headerStyle: { backgroundColor: Colors.Background }, headerTitleAlign: 'center', headerTintColor: Colors.IconBlack }} />
          <Stack.Screen name="measurementScreen" options={{ headerTitle: '', headerStyle: { backgroundColor: Colors.Background }, headerTintColor: Colors.IconBlack }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
