import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';

const user = {
  name: 'John Smith',
  role: 'Home User',
  initials: 'J',
  organization: 'RAM',
  phone: '+91 98765 43210',
  email: 'john.smith@email.com',
};

const accountStats = [
  { label: 'Member since', value: 'January 2026' },
  { label: 'Devices registered', value: '2' },
  { label: 'Total sessions', value: '47' },
];

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
}) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconBox}>
      <Feather name={icon} size={15} color={Colors.TextSecondary} />
    </View>
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const MenuItem = ({
  icon,
  label,
  onPress,
  isLast,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
  isLast?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuLeft}>
      <View style={styles.menuIconBox}>
        <Feather name={icon} size={15} color={Colors.TextSecondary} />
      </View>
      <Text style={styles.menuText}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={16} color={Colors.Disabled} />
  </TouchableOpacity>
);

export default function Profile({ navigation }: any) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>
            <View>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileRole}>{user.role}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <InfoRow icon="briefcase" label="Organization" value={user.organization} />
          <InfoRow icon="phone" label="Phone" value={user.phone} />
          <InfoRow icon="mail" label="Email" value={user.email} />
        </View>

        <Text style={styles.sectionLabel}>Settings</Text>
        <View style={[styles.card, styles.compactCard]}>
          <MenuItem icon="user" label="Edit Profile" onPress={() => {}} isLast />
        </View>
        <View style={[styles.card, styles.compactCard]}>
          <MenuItem icon="briefcase" label="Manage Organization" onPress={() => {}} isLast />
        </View>

        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.card}>
          {accountStats.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.accountRow,
                index !== accountStats.length - 1 && styles.accountRowBorder
              ]}
            >
              <Text style={styles.accountKey}>{item.label}</Text>
              <Text style={styles.accountVal}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.Background,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: Spacing.md,
    padding: 4,
  },
  topBarTitle: {
    ...Typography.Body,
    color: Colors.TextPrimary,
  },
  container: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.Border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.Info,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.H1,
    color: Colors.TextWhite,
  },
  profileName: {
    ...Typography.H2,
    color: Colors.TextPrimary,
  },
  profileRole: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.Border,
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingVertical: 6,
  },
  infoIconBox: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.Border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    ...Typography.Caption,
    color: Colors.Disabled,
    marginBottom: 2,
  },
  infoValue: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  sectionLabel: {
    ...Typography.Caption,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
    paddingLeft: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm + 2,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm + 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.Border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 1,
  },
  accountRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  compactCard: {
    padding: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  accountKey: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },
  accountVal: {
    ...Typography.Caption,
    color: Colors.TextPrimary,
  },
});