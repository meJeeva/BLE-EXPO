import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from './../../src/constants/theme';

const CONTACT_OPTIONS = [
  { id: '1', label: 'Call Support', sub: 'Available 24/7', icon: 'phone' },
  { id: '2', label: 'Live Chat', sub: 'Response within 5 min', icon: 'message-circle' },
  { id: '3', label: 'Email Support', sub: 'support@vitalz.com', icon: 'mail' },
] as const;

const FAQ_SECTIONS = [
  {
    id: 'ble',
    title: 'BLE Connection',
    icon: 'bluetooth' as const,
    items: [
      'Device not connecting?',
      'Connection keeps dropping?',
      'How to pair a new device?',
    ],
  },
  {
    id: 'battery',
    title: 'Battery & Power',
    icon: 'battery-charging' as const,
    items: [
      'How long does battery last?',
      "Device won't charge?",
      'Battery draining quickly?',
    ],
  },
  {
    id: 'data',
    title: 'Data & Sync',
    icon: 'refresh-cw' as const,
    items: [
      'Data not uploading?',
      'How to sync offline data?',
      'Clear device backlog?',
    ],
  },
];


const ContactItem = ({
  label,
  sub,
  icon,
  isLast,
  onPress,
}: {
  label: string;
  sub: string;
  icon: keyof typeof Feather.glyphMap;
  isLast?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={[styles.contactItem, !isLast && styles.itemBorder]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.contactLeft}>
      <View style={[styles.iconBox, {
        borderRadius: 99,
        borderWidth: 0,
      }]}>
        <Feather name={icon} size={15} color={Colors.TextWhite} />
      </View>
      <View>
        <Text style={styles.contactName}>{label}</Text>
        <Text style={styles.contactSub}>{sub}</Text>
      </View>
    </View>
    <Feather name="chevron-right" size={16} color={Colors.Disabled} />
  </TouchableOpacity>
);

const FaqSection = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: keyof typeof Feather.glyphMap;
  items: string[];
}) => (
  <View style={styles.card}>
    <View style={styles.faqHeader}>
      <View style={[styles.iconBox, {
        borderWidth: 0,
        backgroundColor: Colors.Background
      }]}>
        <Feather name={icon} size={15} color={Colors.Primary} />
      </View>
      <Text style={styles.faqTitle}>{title}</Text>
    </View>

    {items.map((item, index) => (
      <TouchableOpacity
        key={item}
        style={[
          styles.faqItem,
          index !== items.length - 1 && styles.faqItemBorder
        ]}
        activeOpacity={0.7}
      >
        <Text style={styles.faqItemText}>{item}</Text>
        <Feather name="chevron-right" size={14} color={Colors.Disabled} />
      </TouchableOpacity>
    ))}
  </View>
);


export default function Help() {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Contact Support</Text>

        <View style={styles.card}>
          {CONTACT_OPTIONS.map((opt, index) => (
            <ContactItem
              key={opt.id}
              label={opt.label}
              sub={opt.sub}
              icon={opt.icon}
              isLast={index === CONTACT_OPTIONS.length - 1}
              onPress={() => { }}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>

        {FAQ_SECTIONS.map((section) => (
          <FaqSection
            key={section.id}
            title={section.title}
            icon={section.icon}
            items={section.items}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerApp}>VitalZ App v2.4.1</Text>
          <Text style={styles.footerCopy}>© 2026 Yantrm Medtech</Text>
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
  container: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  pageTitle: {
    ...Typography.H2,
    color: Colors.TextPrimary,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.Surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.Border,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contactName: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  contactSub: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginTop: 2,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryBackground
  },
  sectionLabel: {
    ...Typography.Caption,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
    paddingLeft: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  faqTitle: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
  },
  faqItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  faqItemText: {
    ...Typography.Caption,
    color: Colors.TextPrimary,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  footerApp: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
  },
  footerCopy: {
    ...Typography.Caption,
    color: Colors.Disabled,
    fontSize: 10,
    marginTop: 2,
  },
});