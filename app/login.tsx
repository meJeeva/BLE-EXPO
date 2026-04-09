import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/src/constants/theme';
import { Input } from '@/src/components/Input';
import AnimatedWave from '@/src/components/AnimatedWave';
import { validateEmail, validatePhone } from '@/src/utils/helpers';
import { useAuthStore } from '@/src/store/authStore';

export default function LoginLanding() {
  const [step, setStep] = useState<'landing' | 'phone' | 'email'>('landing');
  const [phone, setPhone] = useState('');
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { requestOtp } = useAuthStore();

  const handlePhoneChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, '');
    const limitedText = cleanedText.slice(0, 15);

    if (text !== limitedText) {
      setShowPhoneWarning(true);
    } else {
      setShowPhoneWarning(false);
    }

    setPhone(limitedText);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);

    if (text && !validateEmail(text)) {
      setShowEmailWarning(true);
    } else {
      setShowEmailWarning(false);
    }
  };

  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  const heartWave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateWave = (animatedValue: Animated.Value, delay: number, duration: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const wave1Animation = animateWave(wave1, 0, 3000);
    const wave2Animation = animateWave(wave2, 1000, 4000);
    const wave3Animation = animateWave(wave3, 2000, 4000);

    wave1Animation.start();
    wave2Animation.start();
    wave3Animation.start();

    const heartAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(heartWave, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(heartWave, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    heartAnimation.start();

    return () => {
      wave1Animation.stop();
      wave2Animation.stop();
      wave3Animation.stop();
      heartAnimation.stop();

      wave1.setValue(0);
      wave2.setValue(0);
      wave3.setValue(0);
      heartWave.setValue(0);
    };
  }, [step]);

  const handleSubmit = async () => {
    setError('');


    if (step === 'phone') {
      if (!phone.trim()) {
        setError('Please enter your phone number');
        return;
      }

      if (!validatePhone(phone)) {
        setError('Please enter a valid phone number (10-15 digits)');
        return;
      }

      setLoading(true);
      try {
        await requestOtp(phone.trim(), 'phone');
        router.push({ pathname: '/otp', params: { identifier: phone.trim(), type: 'phone' } });
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to send OTP');
      } finally {
        setLoading(false);
      }
    } else if (step === 'email') {
      if (!email.trim()) {
        setError('Please enter your email address');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      setLoading(true);
      try {
        await requestOtp(email.trim(), 'email');
        router.push({ pathname: '/otp', params: { identifier: email.trim(), type: 'email' } });
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to send OTP');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        step === 'landing' && (
          <>
            <View style={styles.waveContainer}>
              <AnimatedWave
                style={styles.wave1}
                translateYValue={wave1}
                translateYRange={[0, -30]}
                opacityRange={[0.3, 0.6, 0.3]}
              />
              <AnimatedWave
                style={styles.wave2}
                translateYValue={wave2}
                translateYRange={[0, -40]}
                opacityRange={[0.2, 0.5, 0.2]}
              />
              <AnimatedWave
                style={styles.wave3}
                translateYValue={wave3}
                translateYRange={[0, -35]}
                opacityRange={[0.25, 0.4, 0.25]}
              />
            </View>

            <View style={styles.content}>

              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />

              <View style={styles.titleRow}>
                <Ionicons name="heart" size={24} color={Colors.Primary} />
                <Text style={styles.appName}>VitalZ</Text>
              </View>

              <Text style={styles.tagline}>
                Smart vitals monitoring, anywhere
              </Text>
              <Text style={styles.subTagline}>
                by Yantram Medtech
              </Text>

              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Ionicons name="pulse-outline" size={14} color={Colors.Secondary} />
                  <Text style={styles.badgeText}>Medical Grade</Text>
                </View>

                <View style={styles.badge}>
                  <Ionicons name="shield-checkmark-outline" size={14} color={Colors.Secondary} />
                  <Text style={styles.badgeText}>Certified</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.heartWrapper}>
                <Animated.View
                  style={[
                    styles.heartWaveBorder,
                    {
                      transform: [
                        {
                          scale: heartWave.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.2],
                          }),
                        },
                      ],
                      opacity: heartWave.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.3, 0.1, 0.3],
                      }),
                    },
                  ]}
                />
                <View style={styles.heartCircle}>
                  <Ionicons name="heart-outline" size={46} color={Colors.Warning} />
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  router.navigate('/(tabs)/dashboard')
                }}
              >
                <Ionicons name="call-outline" size={18} color={Colors.TextWhite} />
                <Text style={styles.primaryText}>direct to dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setStep('phone')}
              >
                <Ionicons name="call-outline" size={18} color={Colors.TextWhite} />
                <Text style={styles.primaryText}>Login with Phone</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setStep('email')}
              >
                <Ionicons name="mail-outline" size={18} color={Colors.primaryBackground} />
                <Text style={styles.secondaryText}>Login with Email</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.navigate('/createUser')}>
                <Text style={styles.signupText}>
                  Don’t have an account?{' '}
                  <Text style={styles.signupLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )
      }
      {step === 'phone' && (
        <View style={styles.phoneContainer}>
          <TouchableOpacity onPress={() => setStep('landing')}>
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

          <Text style={styles.title}>Login with Phone</Text>
          <Text style={styles.subtitle}>
            Enter your phone number to Continue
          </Text>

          <View style={styles.inputWithIconContainer}>
            <Ionicons name="call-outline" size={20} color={Colors.InputIcon} style={styles.inputIcon} />
            <Input
              label="Phone Number"
              placeholder="+91 98765 43210"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={15}
              error={showPhoneWarning ? "Please enter a valid phone number" : ""}
              containerStyle={styles.inputWithIconWrapper}
              style={styles.inputWithIcon}
            />
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="warning-outline" size={14} color={Colors.Error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity style={[styles.primaryButton, {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20
          }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.primaryText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 'email' && (
        <View style={styles.phoneContainer}>
          <TouchableOpacity onPress={() => setStep('landing')}>
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

          <Text style={styles.title}>Login with Email</Text>
          <Text style={styles.subtitle}>
            Enter your email and password
          </Text>

          <View style={styles.inputWithIconContainer}>
            <Ionicons name="mail-outline" size={20} color={Colors.InputIcon} style={styles.inputIcon} />
            <Input
              label="Email Address"
              placeholder="john@example.com"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
              error={showEmailWarning ? "Please enter a valid email address" : ""}
              containerStyle={styles.inputWithIconWrapper}
              style={styles.inputWithIcon}
            />
          </View>

          <View style={styles.inputWithIconContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={Colors.InputIcon} style={styles.inputIcon} />
            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              containerStyle={styles.inputWithIconWrapper}
              style={styles.inputWithIcon}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={Colors.InputIcon}
              />
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="warning-outline" size={14} color={Colors.Error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity style={[styles.primaryButton, {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20
          }]}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    justifyContent: 'space-between',
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  wave1: {
    top: -100,
    right: -100,
  },
  wave2: {
    top: '30%',
    left: -150,
  },
  wave3: {
    bottom: '20%',
    right: -120,
  },
  content: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  appName: {
    ...Typography.H1,
    color: Colors.Primary,
    marginBottom: 4,
  },
  tagline: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    fontWeight: '600'
  },
  subTagline: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.Surface,
    padding: 8,
    borderRadius: 20,
  },
  badgeText: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },
  heartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartWaveBorder: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.Primary,
  },
  heartCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  footer: {
    padding: 20,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: Colors.Primary,
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  primaryText: {
    ...Typography.Body,
    color: Colors.TextWhite,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.primaryBackground,
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  secondaryText: {
    ...Typography.Body,
    color: Colors.primaryBackground,
    fontWeight: '500',
  },
  signupText: {
    textAlign: 'center',
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
  },
  signupLink: {
    ...Typography.BodySmall,
    color: Colors.primaryBackground,
    fontWeight: '600',
  },
  // Phone UI
  phoneContainer: {
    flex: 1,
    padding: 20,
  },

  title: {
    ...Typography.H1,
    marginTop: 20,
  },

  subtitle: {
    ...Typography.BodySmall,
    color: Colors.SubtitleText,
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.InputBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    ...Typography.Body,
    color: Colors.TextPrimary,
    fontWeight: '500'
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  warningText: {
    ...Typography.Caption,
    color: Colors.Error,
    flex: 1,
  },
  label: {
    ...Typography.BodySmall,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 5
  },
  inputWithIconContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 38,
    zIndex: 1,
  },
  inputWithIconWrapper: {
    marginBottom: 0,
  },
  inputWithIcon: {
    paddingLeft: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 32,
    padding: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    gap: 6,
  },
  errorText: {
    ...Typography.Caption,
    color: Colors.Error,
    flex: 1,
  },
});