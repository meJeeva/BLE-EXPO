import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { Colors, Typography, Spacing } from '../../src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Surface }}>
      <View style={styles.drawerHeader}>
        <View style={styles.headerTop}>
          <View style={styles.logoAndName}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.drawerLogo}
              resizeMode="contain"
            />
            <Text style={styles.appNameLabel}>VitalZ</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={styles.closeBtn}
          >
            <Feather name="x" size={20} color={Colors.TextSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoBox}>
          <View style={styles.userAvatar}>
            <Text style={styles.avatarLetter}>J</Text>
          </View>
          <View>
            <Text style={styles.userNameText}>John Smith</Text>
            <Text style={styles.userRoleText}>Home User</Text>
          </View>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/mode-selection')}>
          <Feather name="log-out" size={18} color={Colors.Error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function TabLayout() {

  const pathname = usePathname();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: pathname === '/devices' ? 'My Devices' : pathname === '/sessions' ? 'Sessions' : pathname === '/alerts' ? 'Alerts' : pathname === '/profile' ? 'Profile' : pathname === '/help' ? 'Help & Support' : '',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          ...Typography.HeaderTitle,
          color: Colors.TextPrimary,
        },
        headerStyle: {
          backgroundColor: Colors.Background,
        },
        drawerLabelStyle: {
          ...Typography.BodySmall,
          fontFamily: 'Inter_600SemiBold',
        },
        drawerActiveTintColor: Colors.Primary,
        drawerActiveBackgroundColor: Colors.PrimaryLight,
        drawerInactiveTintColor: Colors.TextPrimary,
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color }: { color: string }) => <Feather name="grid" size={20} color={color} />
        }}
      />
      <Drawer.Screen
        name="patients"
        options={{
          title: 'Patients',
          drawerIcon: ({ color }: { color: string }) => <Feather name="users" size={20} color={color} />
        }}
      />
      {/* <Drawer.Screen
        name="devices"
        options={{
          title: 'Devices',
          drawerIcon: ({ color }: { color: string }) => <Feather name="bluetooth" size={20} color={color} />
        }}
      />
      <Drawer.Screen
        name="sessions"
        options={{
          title: 'Sessions',
          drawerIcon: ({ color }: { color: string }) => <Feather name="activity" size={20} color={color} />
        }}
      />
      <Drawer.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          drawerIcon: ({ color }: { color: string }) => <Feather name="bell" size={20} color={color} />
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color }: { color: string }) => <Feather name="user" size={20} color={color} />
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          title: 'Help & Support',
          drawerIcon: ({ color }: { color: string }) => <Feather name="help-circle" size={20} color={color} />
        }}
      /> */}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.Surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
    marginBottom: Spacing.md
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  logoAndName: {
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  drawerLogo: {
    width: 48,
    height: 48,
  },
  appNameLabel: {
    ...Typography.H2,
    color: Colors.Primary,
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  userInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.PrimaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Primary + '20',
  },
  avatarLetter: {
    ...Typography.H2,
    color: Colors.Primary,
    fontSize: 20,
  },
  userNameText: {
    ...Typography.Body,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.TextPrimary,
  },
  userRoleText: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginTop: 2,
  },
  drawerFooter: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.Border,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
  },
  logoutText: {
    ...Typography.BodySmall,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.Error,
  },
});