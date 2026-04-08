import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../src/store/authStore';
import { Button } from '../src/components/Button';
import { Colors, Typography, Spacing, BorderRadius } from '../src/constants/theme';
import { API_CONFIG } from '../src/config/api';
import { Ionicons } from '@expo/vector-icons';

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams<{ identifier: string; type: string }>();
  const { verifyOtp } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      const digits = text.slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(params.identifier, otpString);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      // Add your resend OTP API call here
      // await resendOtp(params.identifier);

      // Reset countdown
      setCountdown(30);
      setCanResend(false);

      // Reset timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Clear OTP inputs
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();

    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <TouchableOpacity onPress={() => { }}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>

          <View style={[styles.titleRow, {
            gap: 2,
            marginHorizontal: "auto"
          }]}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>VitalZ</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              We send a code to {params.identifier}
            </Text>
          </View>

          {/* OTP Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                ]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Resend OTP */}
          <TouchableOpacity
            onPress={handleResendOtp}
            disabled={!canResend}
            style={styles.resendContainer}
          >
            <Text style={[styles.resendText, canResend && styles.resendTextActive]}>
              {canResend ? 'Resend OTP' : `Resend OTP in ${countdown}s`}
            </Text>
          </TouchableOpacity>

          {/* Verify Button */}
          <Button
            title="Verify Code"
            onPress={handleVerify}
            loading={loading}
            disabled={loading}
            style={styles.button}
          />



        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    marginVertical: 30
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.TextPrimary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.TextSecondary,
  },

  phone: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.Primary,
    marginTop: 4,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: Colors.TextPrimary,
    borderWidth: 1,
    borderColor: Colors.Border
  },

  otpInputFilled: {
    borderWidth: 1.5,
    borderColor: Colors.Primary,
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: 10,
    borderRadius: 12,
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    marginTop: 20
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.Primary,
    marginBottom: 4,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: Colors.TextSecondary,
  },
  resendTextActive: {
    color: Colors.Primary,
    fontWeight: '600',
  },
});
