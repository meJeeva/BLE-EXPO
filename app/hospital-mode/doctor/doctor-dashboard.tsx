import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const DOCTOR = {
    name: 'Dr. Sarah Johnson',
    assignedPatients: 24,
    criticalCount: 3,
    activeAlerts: 7,
};

const CRITICAL_PATIENTS = [
    {
        id: '1',
        name: 'John Smith',
        mrn: 'MRN-12345',
        alert: 'High Heart Rate (145 bpm)',
        time: '5 min ago',
    },
    {
        id: '2',
        name: 'Sarah Williams',
        mrn: 'MRN-12346',
        alert: 'Low SpO₂ (88%)',
        time: '12 min ago',
    },
];


const CriticalPatientCard = ({ patient }: { patient: typeof CRITICAL_PATIENTS[0] }) => (
    <View style={styles.criticalCard}>
        <View style={styles.criticalCardHeader}>
            <View>
                <Text style={styles.criticalPatientName}>{patient.name}</Text>
                <Text style={styles.criticalPatientMrn}>{patient.mrn}</Text>
            </View>
            <View style={styles.criticalBadge}>
                <Ionicons name="warning" size={10} color={Colors.TextWhite} />
                <Text style={styles.criticalBadgeText}>CRITICAL</Text>
            </View>
        </View>
        <Text style={styles.criticalAlert}>{patient.alert}</Text>
        <Text style={styles.criticalTime}>{patient.time}</Text>
    </View>
);


const QuickActionRow = ({
    icon,
    title,
    subtitle,
    onPress,
}: {
    icon: string;
    title: string;
    subtitle: string;
    onPress?: () => void;
}) => (
    <TouchableOpacity style={styles.quickActionRow} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.quickActionIconBox}>
            {icon === 'pulse' ? (
                <Ionicons name="pulse" size={20} color={Colors.Primary} />
            ) : icon === 'info' ? (
                <Ionicons name="information-circle" size={20} color={Colors.Secondary} />
            ) : (
                <Text style={styles.quickActionIcon}>{icon}</Text>
            )}
        </View>
        <View style={styles.quickActionText}>
            <Text style={styles.quickActionTitle}>{title}</Text>
            <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.quickActionArrow}>→</Text>
    </TouchableOpacity>
);


const DoctorDashboard = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.dashboardHeader}>
                    <Text style={styles.dashboardTitle}>Doctor Dashboard</Text>
                    <TouchableOpacity style={styles.profileBtn} onPress={() => {
                        router.navigate('/hospital-mode/doctor/doctor-profile')
                    }}>
                        <Ionicons name="person" size={16} color={Colors.Primary} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    paddingBottom: Spacing.xxl,
                    padding: Spacing.md,
                    gap: Spacing.md,
                    paddingTop: 0
                }}>

                    <View style={styles.welcomeBanner}>
                        <Text style={styles.welcomeSmall}>Welcome back,</Text>
                        <Text style={styles.welcomeName}>{DOCTOR.name}</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statCardHeader}>
                                <Text style={styles.statCardLabel}>Assigned Patients</Text>
                                <Ionicons name="pulse" size={16} color={Colors.Primary} />
                            </View>
                            <Text style={styles.statCardValue}>{DOCTOR.assignedPatients}</Text>
                            <Text style={styles.statCardSub}>{DOCTOR.criticalCount} critical</Text>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statCardHeader}>
                                <Text style={styles.statCardLabel}>Active Alerts</Text>
                                <Text style={styles.statCardIcon}>ⓘ</Text>
                            </View>
                            <Text style={styles.statCardValue}>{DOCTOR.activeAlerts}</Text>
                            <Text style={styles.statCardSub}>Requires attention</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionLabel}>Quick Actions</Text>
                    <View style={styles.card}>
                        <QuickActionRow
                            icon="pulse"
                            title="My Patients"
                            subtitle={`${DOCTOR.assignedPatients} active patients`}
                            onPress={() => {
                                router.navigate('/hospital-mode/doctor/patient-list')
                            }}
                        />
                        <View style={styles.actionDivider} />
                        <QuickActionRow
                            icon="info"
                            title="Active Alerts"
                            subtitle={`${DOCTOR.activeAlerts} pending alerts`}
                            onPress={() => { }}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Critical Patients</Text>
                        <View style={styles.cardDivider} />
                        {CRITICAL_PATIENTS.map((patient, index) => (
                            <View key={patient.id}>
                                <CriticalPatientCard patient={patient} />
                                {index < CRITICAL_PATIENTS.length - 1 && (
                                    <View style={{ height: Spacing.sm }} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DoctorDashboard;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: { flex: 1 },
    contentContainer: {
        gap: Spacing.md,
    },

    /* Dashboard Header */
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

    /* Welcome Banner */
    welcomeBanner: {
        backgroundColor: Colors.PrimaryLight,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
    },
    welcomeSmall: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    welcomeName: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    /* Stats */
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    statCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    statCardLabel: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        flex: 1,
        marginRight: Spacing.xs,
    },
    statCardIcon: {
        fontSize: 16,
        color: Colors.Primary,
    },
    statCardValue: {
        fontSize: 28,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        marginBottom: 2,
    },
    statCardSub: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
    },

    /* Section Label */
    sectionLabel: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
    },

    /* Card */
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
    cardTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        marginBottom: Spacing.sm,
    },
    cardDivider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.md,
    },

    /* Quick Actions */
    quickActionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    quickActionIconBox: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.PrimaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    quickActionIcon: {
        fontSize: 18,
        color: Colors.Primary,
    },
    quickActionText: { flex: 1 },
    quickActionTitle: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
    },
    quickActionSubtitle: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginTop: 1,
    },
    quickActionArrow: {
        fontSize: 18,
        color: Colors.TextSecondary,
    },
    actionDivider: {
        height: 1,
        backgroundColor: Colors.Border,
    },

    /* Critical Patient Card */
    criticalCard: {
        backgroundColor: '#FFF5F5',
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: '#FECACA',
        padding: Spacing.md,
    },
    criticalCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.xs,
    },
    criticalPatientName: {
        fontSize: 15,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    criticalPatientMrn: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginTop: 2,
    },
    criticalBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Error,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
    },
    criticalBadgeIcon: { fontSize: 10 },
    criticalBadgeText: {
        fontSize: 11,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextWhite,
        letterSpacing: 0.5,
    },
    criticalAlert: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextPrimary,
        marginTop: Spacing.xs,
    },
    criticalTime: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginTop: 2,
    },
});