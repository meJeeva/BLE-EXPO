import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/authStore';
import { useAppStore } from '../../src/store/appStore';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';

export default function Settings() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const { isDemoMode, toggleDemoMode } = useAppStore();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Info */}
        <View style={styles.section}>
          <View style={styles.userCard}>
            <View style={styles.avatarLarge}>
              <Ionicons name="person" size={48} color={Colors.Primary} />
            </View>
            <Text style={styles.userName}>{user?.identifier || 'User'}</Text>
            {useAuthStore.getState().appMode && (
              <View style={styles.modeBadge}>
                <Ionicons 
                  name={useAuthStore.getState().appMode === 'HOME' ? 'home' : 'business'} 
                  size={16} 
                  color={Colors.Primary} 
                />
                <Text style={styles.modeText}>
                  {useAuthStore.getState().appMode} Mode
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="flask-outline" size={24} color={Colors.TextPrimary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Demo Mode</Text>
                <Text style={styles.settingDescription}>
                  Generate sample vitals data for testing
                </Text>
              </View>
            </View>
            <Switch
              value={isDemoMode}
              onValueChange={toggleDemoMode}
              trackColor={{ false: Colors.Disabled, true: Colors.Primary }}
              thumbColor={Colors.Surface}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={24} color={Colors.TextPrimary} />
            <Text style={styles.menuText}>Version 1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color={Colors.TextPrimary} />
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.TextSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={24} color={Colors.TextPrimary} />
            <Text style={styles.menuText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.TextSecondary} />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color={Colors.Error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    padding: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
    marginBottom: Spacing.md,
  },
  userCard: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.PrimaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    ...Typography.H1,
    color: Colors.TextPrimary,
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.PrimaryLight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
    gap: Spacing.xs,
  },
  modeText: {
    ...Typography.BodySmall,
    color: Colors.Primary,
    fontWeight: '600',
  },
  settingItem: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  settingLabel: {
    ...Typography.Body,
    color: Colors.TextPrimary,
    fontWeight: '500',
  },
  settingDescription: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginTop: 2,
  },
  menuItem: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  menuText: {
    ...Typography.Body,
    color: Colors.TextPrimary,
    marginLeft: Spacing.md,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Error,
  },
  logoutText: {
    ...Typography.Body,
    color: Colors.Error,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
});
