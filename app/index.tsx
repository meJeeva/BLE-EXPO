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
    // Always navigate to home screen
    router.replace('/mode-selection');
  }, []);

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
