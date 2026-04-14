import { BorderRadius, Colors, Spacing } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';


type Role = 'Admin' | 'Doctor' | 'Nurse';


const MoonIcon = () => (
  <View style={styles.moonIcon}>
    <View style={styles.moonOuter} />
    <View style={styles.moonCutout} />
  </View>
);

const Checkbox = ({ checked, onPress }: { checked: boolean; onPress: () => void }) => (
  <TouchableOpacity style={styles.checkboxWrapper} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </View>
  </TouchableOpacity>
);

export default function HospitalMode() {
  const [selectedRole, setSelectedRole] = useState<Role>('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const roles: Role[] = ['Admin', 'Doctor', 'Nurse'];

  const getEmailPlaceholder = () => {
    if (selectedRole === 'Admin') return 'admin@hospital.com';
    if (selectedRole === 'Doctor') return 'doctor@hospital.com';
    return 'nurse@hospital.com';
  };

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

      <View style={styles.topRight}>
        <TouchableOpacity activeOpacity={0.7}>
          <MoonIcon />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{
                height: 80,
                width: 80
              }}
            />
            <Text style={styles.appTitle}>VitalZ Hospital Mode</Text>
            <Text style={styles.appSubtitle}>
              Secure mobile access for healthcare professionals
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Select Your Role</Text>
            <View style={styles.roleRow}>
              {roles.map((role) => {
                const isActive = selectedRole === role;
                return (
                  <TouchableOpacity
                    key={role}
                    style={[styles.roleBtn, isActive && styles.roleBtnActive]}
                    onPress={() => setSelectedRole(role)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.roleBtnText, isActive && styles.roleBtnTextActive]}>
                      {role}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.label, { marginTop: Spacing.md }]}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={getEmailPlaceholder()}
                placeholderTextColor={Colors.InputIcon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text style={[styles.label, { marginTop: Spacing.md }]}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors.InputIcon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.rememberRow}>
              <View style={styles.rememberLeft}>
                <Checkbox checked={rememberMe} onPress={() => setRememberMe(!rememberMe)} />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signInBtn} activeOpacity={0.85} onPress={() => {
              if (selectedRole === 'Admin')
                router.navigate('/admin-dashboard')
              else if (selectedRole === 'Doctor') {
                router.navigate('/doctor-dashboard')
              }
              else {
                router.navigate('/nurse/nurse-dashboard')
              }
            }}>
              <Text style={styles.signInText}>
                Sign In as {selectedRole}
              </Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.demoNote}>
            Demo Mode: Select any role and click "Sign In" to explore
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  topRight: {
    position: 'absolute',
    top: 52,
    right: Spacing.md,
    zIndex: 10,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },

  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.TextPrimary,
    marginTop: Spacing.md,
    letterSpacing: 0.2,
  },
  appSubtitle: {
    fontSize: 14,
    color: Colors.SubtitleText,
    marginTop: Spacing.xs,
    textAlign: 'center',
    lineHeight: 20,
  },
  // ── Moon ──
  moonIcon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moonOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.TextSecondary,
    position: 'absolute',
  },
  moonCutout: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.Background,
    position: 'absolute',
    top: 0,
    right: 0,
  },

  // ── Card ──
  card: {
    width: '100%',
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.Border,
  },

  // ── Label ──
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },

  // ── Role Selector ──
  roleRow: {
    flexDirection: 'row',
    backgroundColor: Colors.Background,
    borderRadius: BorderRadius.lg,
    padding: 4,
    gap: 4,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  roleBtnActive: {
    backgroundColor: Colors.Primary,
    shadowColor: Colors.Primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  roleBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.TextSecondary,
  },
  roleBtnTextActive: {
    color: Colors.TextWhite,
    fontWeight: '600',
  },

  // ── Input ──
  inputWrapper: {
    borderWidth: 1,
    borderColor: Colors.InputBorder,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.Surface,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  input: {
    fontSize: 14,
    color: Colors.TextPrimary,
    paddingVertical: 0,
  },

  // ── Remember Row ──
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkboxWrapper: {
    padding: 2,
  },
  checkboxBox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: Colors.Border,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.Surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: Colors.Primary,
    borderColor: Colors.Primary,
  },
  checkmark: {
    color: Colors.TextWhite,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  rememberText: {
    fontSize: 13,
    color: Colors.TextSecondary,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.Primary,
    fontWeight: '500',
  },

  // ── Sign In Button ──
  signInBtn: {
    backgroundColor: Colors.Primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.Primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  signInText: {
    color: Colors.TextWhite,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // ── Demo Note ──
  demoNote: {
    fontSize: 12,
    color: Colors.SubtitleText,
    textAlign: 'center',
    marginTop: Spacing.lg,
    lineHeight: 18,
    paddingHorizontal: Spacing.md,
  },
});