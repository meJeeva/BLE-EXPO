import React from 'react';
import { Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';
import { Drawer } from 'expo-router/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function CustomDrawerContent({ navigation }: any) {
  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: 'home' as any },
    { id: 'history', title: 'History', icon: 'time' as any },
    { id: 'family', title: 'Family', icon: 'people' as any },
    { id: 'settings', title: 'Settings', icon: 'settings' as any },
  ];

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.drawerItem}
          onPress={() => {
            console.log('item.id', item)
            navigation.navigate(item.id);
            navigation.closeDrawer();
          }}
        >
          <Ionicons name={item.icon} size={24} color={Colors.TextPrimary} />
          <Text style={styles.drawerItemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

export default function TabLayout() {

  const navigation = useNavigation();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.Surface,
          width: 280,
        },
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
        headerTintColor: Colors.Surface,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerLeft: ({ onPress }) => (
          <TouchableOpacity onPress={() => {
            navigation.toggleDrawer();
          }} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={Colors.Surface} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: 'History',
        }}
      />
      <Stack.Screen
        name="family"
        options={{
          title: 'Family',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.Surface,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.TextPrimary,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: Colors.TextPrimary,
  },
  menuButton: {
    marginLeft: 15,
  },
});
