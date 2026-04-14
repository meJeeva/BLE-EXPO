import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'

const NurseDashboard = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />
            <View style={styles.dashboardHeader}>
                <Text style={styles.dashboardTitle}>Nurse Dashboard</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                <TouchableOpacity style={[styles.navCard, {
                    backgroundColor: Colors.PrimaryLight
                }]}>
                    <View>
                        <Text style={[styles.navCardTitle, {
                            color: Colors.TextSecondary
                        }]}>Welcome back,</Text>
                        <Text style={[styles.navCardSubtitle, { ...Typography.H1, color: Colors.TextPrimary }]}>Nurse Mick chen</Text>
                    </View>
                </TouchableOpacity>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Quick Actions</Text>
                    <View style={styles.quickActionsRow}>
                        <TouchableOpacity style={styles.quickActionBtn} onPress={() => {
                            router.navigate('/hospital-mode/nurse/create-patient')
                        }}>
                            <View style={styles.quickActionIcon}>
                                <Ionicons name="person-add-outline" size={22} color={Colors.Primary} />
                            </View>
                            <Text style={styles.quickActionText}>Create Patient</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickActionBtn} onPress={() => {
                            router.navigate('/hospital-mode/nurse/devices')
                        }}>
                            <View style={styles.quickActionIcon}>
                                <Ionicons name="wifi" size={24} color={Colors.Warning} />
                            </View>
                            <Text style={styles.quickActionText}>Add Device</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickActionBtn} onPress={() => {
                            router.navigate('/hospital-mode/nurse/assign-devices')
                        }}>
                            <View style={styles.quickActionIcon}>
                                <MaterialCommunityIcons name="link-variant" size={24} color={Colors.Secondary} />
                            </View>
                            <Text style={styles.quickActionText}>Assign Device</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {/* Active Patients */}
                    <View style={styles.statCard}>
                        <View style={styles.statCardHeader}>
                            <Text style={styles.statCardLabel}>Active Patients</Text>
                            <Feather name="activity" size={16} color={Colors.primaryBackground} />
                        </View>
                        <Text style={styles.statCardValue}>42</Text>
                        <Text style={styles.statCardSubtext}>On this shift</Text>
                    </View>

                    {/* Pending Alerts */}
                    <View style={styles.statCard}>
                        <View style={styles.statCardHeader}>
                            <Text style={styles.statCardLabel}>Pending Alerts</Text>
                            <Ionicons name="information-circle-outline" size={16} color={Colors.primaryBackground} />
                        </View>
                        <Text style={[styles.statCardValue, { color: Colors.TextPrimary }]}>5</Text>
                        <Text style={styles.statCardSubtext}>Requires action</Text>
                    </View>

                    {/* Devices Syncing */}
                    <View style={styles.statCard}>
                        <View style={styles.statCardHeader}>
                            <Text style={styles.statCardLabel}>Devices Syncing</Text>
                            <Ionicons name="wifi" size={16} color={Colors.primaryBackground} />
                        </View>
                        <Text style={styles.statCardValue}>38</Text>
                        <Text style={styles.statCardSubtext}>2 offline</Text>
                    </View>

                    {/* Low Battery */}
                    <View style={styles.statCard}>
                        <View style={styles.statCardHeader}>
                            <Text style={styles.statCardLabel}>Low Battery</Text>
                            <Ionicons name="battery-dead-outline" size={16} color={Colors.primaryBackground} />
                        </View>
                        <Text style={styles.statCardValue}>3</Text>
                        <Text style={styles.statCardSubtext}>Need replacement</Text>
                    </View>
                </View>

                {/* View Patients */}
                <TouchableOpacity style={styles.navCard} onPress={() => {
                    router.navigate('/hospital-mode/nurse/patient-list')
                }}>
                    <View>
                        <Text style={styles.navCardTitle}>View Patients</Text>
                        <Text style={styles.navCardSubtitle}>42 active patients</Text>
                    </View>
                    <Feather name="activity" size={20} color={Colors.Primary} />
                </TouchableOpacity>

                {/* Active Alerts */}
                <TouchableOpacity style={styles.navCard} onPress={() => {
                    router.navigate('/hospital-mode/nurse/alert-list')
                }}>
                    <View>
                        <Text style={styles.navCardTitle}>Active Alerts</Text>
                        <Text style={[styles.navCardSubtitle, { color: Colors.Error }]}>5 pending alerts</Text>
                    </View>
                    <Ionicons name="alert-circle-outline" size={20} color={Colors.Error} />
                </TouchableOpacity>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.recentActivityTitle}>Recent Activity</Text>
                    <View style={styles.activityList}>
                        <View style={styles.activityItem}>
                            <Text style={styles.activityText}>Assigned VZ-2024-0015 to John Smith</Text>
                            <Text style={styles.activityTime}>2 min ago</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.activityItem}>
                            <Text style={styles.activityText}>Updated vitals for Sarah Williams</Text>
                            <Text style={styles.activityTime}>15 min ago</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.activityItem}>
                            <Text style={styles.activityText}>Created patient record for Emma Davis</Text>
                            <Text style={styles.activityTime}>1 hour ago</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NurseDashboard

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: Spacing.md,
        gap: Spacing.sm,
        paddingBottom: Spacing.xl,
    },

    /* ─── Section wrapper ─── */
    section: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    sectionLabel: {
        ...Typography.SectionTitle,
        color: Colors.TextPrimary,
        marginBottom: Spacing.md,
    },

    /* ─── Quick Actions ─── */
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.sm,
    },
    quickActionBtn: {
        flex: 1,
        alignItems: 'center',
        gap: Spacing.xs,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        borderWidth: 1.5,
        borderColor: Colors.Border,
        borderStyle: 'dashed',
        backgroundColor: Colors.Surface,
    },
    quickActionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickActionText: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
    },

    /* ─── Stats Grid ─── */
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    statCard: {
        flex: 1,
        minWidth: '47%',
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: 2,
    },
    statCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    statCardLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        fontFamily: 'Inter_600SemiBold'
    },
    statCardValue: {
        fontSize: 28,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        lineHeight: 34,
    },
    statCardSubtext: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },

    /* ─── Nav Cards ─── */
    navCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navCardTitle: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
    },
    navCardSubtitle: {
        ...Typography.BodySmall,
        color: Colors.Primary,
        marginTop: 2,
        fontFamily: 'Inter_600SemiBold'
    },

    /* ─── Recent Activity ─── */
    recentActivityTitle: {
        ...Typography.SectionTitle,
        color: Colors.TextPrimary,
        marginBottom: Spacing.sm,
        fontSize: 16
    },
    activityList: {
        gap: 0,
    },
    activityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        gap: Spacing.sm,
    },
    activityText: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        flex: 1,
        flexWrap: 'wrap',
    },
    activityTime: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        flexWrap: 'nowrap',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
    },

    dashboardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        padding: Spacing.md
    },
    dashboardTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    profileBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.Border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Surface,
    },
    profileIcon: { fontSize: 18 },
})