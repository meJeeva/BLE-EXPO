import { BorderRadius, Colors, Spacing } from '@/src/constants/theme';
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppBar from '@/components/AppBar';


const STATS = [
    {
        id: '1',
        label: 'Active Patients',
        value: '156',
        sub: '12 critical • Tap to view',
        iconType: 'pulse',
        iconColor: Colors.Secondary,
    },
    {
        id: '2',
        label: 'Active Alerts',
        value: '23',
        sub: 'Requires action',
        iconType: 'alert',
        iconColor: Colors.Warning,
    },
    {
        id: '3',
        label: 'Active Devices',
        value: '342',
        sub: '98.5% uptime • Tap to view',
        iconType: 'wifi',
        iconColor: Colors.Primary,
    },
    {
        id: '4',
        label: 'Total Users',
        value: '47',
        sub: '+3 this month • Tap to view',
        iconType: 'user',
        iconColor: Colors.Primary,
    },
];

const QUICK_ACTIONS = [
    { id: '1', label: 'Manage Users', sub: '47 users', iconType: 'users', iconColor: Colors.Primary },
    { id: '2', label: 'Manage Devices', sub: '342 devices', iconType: 'wifi', iconColor: Colors.Warning },
    { id: '3', label: 'View Patients', sub: '156 active', iconType: 'pulse', iconColor: Colors.Secondary },
];

const ACTIVITY = [
    { id: '1', name: 'Dr. Sarah Johnson', action: 'Updated patient record', time: '5 min ago' },
    { id: '2', name: 'Nurse Mike Chen', action: 'Assigned device VZ-1234-5678', time: '12 min ago' },
    { id: '3', name: 'Admin John Doe', action: 'Created new user account', time: '1 hour ago' },
];

const ArrowRight = () => (
    <Ionicons name="chevron-forward" size={16} color={Colors.TextSecondary} />
);

const StatCard = ({ label, value, sub, iconType, iconColor, onPress }: typeof STATS[0] & { onPress?: () => void }) => {
    const renderIcon = () => {
        if (iconType === 'pulse') return <Ionicons name="heart" size={20} color={iconColor} />;
        if (iconType === 'alert') return <Ionicons name="warning" size={20} color={iconColor} />;
        if (iconType === 'wifi') return <Ionicons name="wifi" size={20} color={iconColor} />;
        if (iconType === 'user') return <Ionicons name="person" size={20} color={iconColor} />;
        return null;
    };

    return (
        <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.75}
            onPress={onPress}
        >
            <View style={styles.statHeader}>
                <Text style={styles.statLabel}>{label}</Text>
                {renderIcon()}
            </View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statSub}>{sub}</Text>
        </TouchableOpacity>
    );
};

const ActionRow = ({ label, sub, iconType, iconColor }: typeof QUICK_ACTIONS[0]) => {
    const renderIcon = () => {
        const bg = iconType === 'wifi' ? '#FFF8E7' : iconType === 'pulse' ? '#E6F7EE' : Colors.PrimaryLight;
        if (iconType === 'users') return (
            <View style={[styles.actionIconWrap, { backgroundColor: bg }]}>
                <Ionicons name="people" size={20} color={iconColor} />
            </View>
        );
        if (iconType === 'wifi') return (
            <View style={[styles.actionIconWrap, { backgroundColor: bg }]}>
                <Ionicons name="wifi" size={20} color={iconColor} />
            </View>
        );
        if (iconType === 'pulse') return (
            <View style={[styles.actionIconWrap, { backgroundColor: bg }]}>
                <Ionicons name="heart" size={20} color={iconColor} />
            </View>
        );
        return null;
    };

    return (
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.75}>
            {renderIcon()}
            <View style={styles.actionText}>
                <Text style={styles.actionLabel}>{label}</Text>
                <Text style={styles.actionSub}>{sub}</Text>
            </View>
            <ArrowRight />
        </TouchableOpacity>
    );
};

const ActivityItem = ({ name, action, time }: typeof ACTIVITY[0]) => (
    <View style={styles.activityItem}>
        <View style={styles.activityLeft}>
            <Text style={styles.activityName}>{name}</Text>
            <Text style={styles.activityAction}>{action}</Text>
        </View>
        <Text style={styles.activityTime}>{time}</Text>
    </View>
);


export default function AdminDashboard() {
    const router = useRouter();

    const handlePatientClick = () => {
        router.push('/hospital-mode/admin/active-patient-list');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

            <AppBar />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.pageTitle}>Admin Dashboard</Text>

                <View style={styles.statsCard}>
                    <View style={styles.statsGrid}>
                        {STATS.map((s) => (
                            <StatCard
                                key={s.id}
                                {...s}
                                onPress={s.id === '1' ? handlePatientClick : s.id === '3' ? () => router.push('/hospital-mode/admin/active-devices') : s.id === '4' ? () => router.push('/hospital-mode/admin/total-users') : undefined}
                            />
                        ))}
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.sectionCard}>
                    {QUICK_ACTIONS.map((a, i) => (
                        <View key={a.id}>
                            <ActionRow {...a} />
                            {i < QUICK_ACTIONS.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.sectionCard}>
                    {ACTIVITY.map((item, i) => (
                        <View key={item.id}>
                            <ActivityItem {...item} />
                            {i < ACTIVITY.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
                <Text style={styles.fabText}>?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const CARD_SHADOW = {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.Background },

    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 2,
    },
    appBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    logoCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        color: Colors.TextWhite,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    appBarTitle: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        lineHeight: 20,
    },
    appBarSubtitle: {
        fontSize: 12,
        color: Colors.TextSecondary,
        lineHeight: 16,
    },
    appBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconButton: {
        padding: Spacing.xs,
    },
    moonIcon: {
        fontSize: 18,
    },
    logoutButton: {
        backgroundColor: '#FFE8E8',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.md,
    },
    navLeft: { flexDirection: 'row', alignItems: 'center' },
    navTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: Colors.TextPrimary },
    navSub: { fontSize: 11, color: Colors.TextSecondary, marginTop: 1 },
    navRight: { flexDirection: 'row', alignItems: 'center' },
    logoutBtn: {
        borderWidth: 1.5,
        borderColor: Colors.Error,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.sm + 4,
        paddingVertical: 5,
    },
    logoutText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.Error },

    logoSmall: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    logoSmallOuter: {
        width: 36, height: 36, borderRadius: 18,
        borderWidth: 2.5, borderColor: '#F5A623',
        borderBottomColor: 'transparent', borderLeftColor: 'transparent',
        transform: [{ rotate: '-45deg' }],
        justifyContent: 'center', alignItems: 'center',
    },
    logoSmallInner: {
        width: 26, height: 26, borderRadius: 13,
        backgroundColor: Colors.Primary,
        transform: [{ rotate: '45deg' }],
        overflow: 'hidden', justifyContent: 'center', alignItems: 'center',
    },
    logoSmallHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', position: 'absolute', top: 4, left: 5 },
    logoSmallBody: { width: 13, height: 7, borderRadius: 6, backgroundColor: '#fff', position: 'absolute', bottom: 3, left: 3 },
    logoSmallPlusH: { position: 'absolute', right: 3, top: 11, width: 7, height: 2, backgroundColor: '#fff', borderRadius: 1 },
    logoSmallPlusV: { position: 'absolute', right: 6, top: 8, width: 2, height: 7, backgroundColor: '#fff', borderRadius: 1 },

    scrollContent: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl + 20 },

    pageTitle: {
        fontSize: 20, fontFamily: 'Inter_700Bold', color: Colors.TextPrimary,
        paddingTop: Spacing.md, paddingBottom: Spacing.sm + 4,
        backgroundColor: Colors.Surface,
        marginBottom: Spacing.md
    },

    statsCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.Border,
        ...CARD_SHADOW,
        marginBottom: Spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.xs,
    },
    statCard: {
        width: '48.5%',
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.xs,
    },
    statLabel: { fontSize: 12, color: Colors.TextSecondary, fontFamily: 'Inter_500Medium', flex: 1 },
    statValue: { fontSize: 28, fontFamily: 'Inter_700Bold', color: Colors.TextPrimary, lineHeight: 34 },
    statSub: { fontSize: 11, color: Colors.TextSecondary, marginTop: 2, lineHeight: 15 },

    sectionTitle: {
        fontSize: 15, fontFamily: 'Inter_600SemiBold', color: Colors.TextPrimary,
        marginBottom: Spacing.sm + 2,
    },
    sectionCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.Border,
        marginBottom: Spacing.md,
        overflow: 'hidden',
        ...CARD_SHADOW,
    },
    divider: { height: 1, backgroundColor: Colors.Border, marginHorizontal: Spacing.md },

    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    actionIconWrap: {
        width: 40, height: 40, borderRadius: BorderRadius.lg,
        alignItems: 'center', justifyContent: 'center',
        marginRight: Spacing.md,
    },
    actionText: { flex: 1 },
    actionLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: Colors.TextPrimary },
    actionSub: { fontSize: 12, color: Colors.TextSecondary, marginTop: 2 },

    activityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    activityLeft: { flex: 1, marginRight: Spacing.sm },
    activityName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.TextPrimary },
    activityAction: { fontSize: 12, color: Colors.TextSecondary, marginTop: 2 },
    activityTime: { fontSize: 11, color: Colors.TextSecondary, marginTop: 2 },

    fab: {
        position: 'absolute',
        bottom: Spacing.lg,
        right: Spacing.md,
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: Colors.TextSecondary,
        alignItems: 'center', justifyContent: 'center',
        ...CARD_SHADOW,
        elevation: 6,
    },
    fabText: { color: Colors.TextWhite, fontSize: 18, fontFamily: 'Inter_700Bold', lineHeight: 22 },
});