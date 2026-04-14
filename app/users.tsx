import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme';
import AppBar from '@/components/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const USERS = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        role: 'Doctor',
        department: 'Cardiologist',
        email: 'sarah.j@hospital.com',
        contact: '+1-234-567-8901',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Nurse Mike Chen',
        role: 'Nurse',
        department: 'Pediatric',
        email: 'mike.c@hospital.com',
        contact: '+1-234-567-8902',
        status: 'Active',
    },
    {
        id: '3',
        name: 'Dr. Emily White',
        role: 'Specialist',
        department: 'NICU',
        email: 'emily.w@hospital.com',
        contact: '+1-234-567-8903',
        status: 'Active',
    },
];

const UserCard = ({ item, onPress }: { item: typeof USERS[0]; onPress?: () => void }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userRole}>
                    {item.role} • {item.department}
                </Text>
            </View>
            <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{item.status}</Text>
            </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Email</Text>
                <Text style={styles.footerValue}>{item.email}</Text>
            </View>
            <View style={styles.footerItem}>
                <Text style={styles.footerLabel}>Contact</Text>
                <Text style={styles.footerValue}>{item.contact}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


export default function UsersScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

    const filteredUsers = USERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

            <AppBar />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.pageHeader}>
                    <View style={styles.pageHeaderLeft}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>Users</Text>
                    </View>
                    <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/hospital/create-user')}>
                        <Text style={styles.createBtnText}>+ Create</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {USERS.map((user) => (
                        <UserCard
                            key={user.id}
                            item={user}
                            onPress={() => router.push('/hospital/user-details')}
                        />
                    ))}
                </ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    // App Bar
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
        fontWeight: '700',
    },
    appBarTitle: {
        fontSize: 16,
        fontWeight: '700',
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
    logoutText: {
        color: Colors.Error,
        fontSize: 14,
        fontWeight: '600',
    },


    container: { flex: 1 },
    contentContainer: {
    },

    // Page Header
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.Surface,
        padding: Spacing.md,
        marginBottom: Spacing.xs,
        justifyContent: 'space-between',
    },
    backArrow: {
        fontSize: 20,
        color: Colors.TextPrimary,
    },
    pageTitle: {
        ...Typography.H2,
        color: Colors.TextPrimary,
    },

    scroll: { flex: 1 },
    scrollContent: {
        padding: Spacing.md,
        gap: Spacing.md,
    },

    /* User Card */
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    cardHeaderLeft: {
        flex: 1,
        marginRight: Spacing.sm,
    },
    userRole: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },
    activeBadge: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.md,
        paddingVertical: 3,
        alignSelf: 'flex-start',
    },
    activeBadgeText: {
        ...Typography.Caption,
        color: Colors.TextWhite,
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.sm,
    },
    cardFooter: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    footerItem: {
        flex: 1,
    },
    footerLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    footerValue: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },
    pageHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        paddingRight: Spacing.sm,
    },
    userName: {
        ...Typography.Body,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
        marginBottom: 2,
    },
    createBtn: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.md,
    },
    createBtnText: {
        ...Typography.BodySmall,
        color: Colors.TextWhite,
        fontFamily: 'Inter_600SemiBold',
    },
});
