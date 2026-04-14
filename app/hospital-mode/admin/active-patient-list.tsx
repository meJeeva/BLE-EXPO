import { BorderRadius, Colors, Spacing } from '@/src/constants/theme';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AppBar from '@/components/AppBar';

type FilterTab = 'All' | 'Active' | 'Discharged';
type PatientStatus = 'Active' | 'Discharged';

interface Patient {
    id: string;
    name: string;
    mrn: string;
    ward: string;
    bed: string;
    device: string;
    status: PatientStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PATIENTS: Patient[] = [
    {
        id: '1',
        name: 'John Smith',
        mrn: 'MRN-12345',
        ward: '3A',
        bed: '12',
        device: 'VZ-2024-0001',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Mary Johnson',
        mrn: 'MRN-12346',
        ward: '3A',
        bed: '15',
        device: 'VZ-2024-0002',
        status: 'Active',
    },
    {
        id: '3',
        name: 'Robert Brown',
        mrn: 'MRN-12347',
        ward: '3B',
        bed: '-',
        device: '-',
        status: 'Discharged',
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: PatientStatus }) => {
    const isActive = status === 'Active';
    return (
        <View
            style={[
                styles.badge,
                isActive ? styles.badgeActive : styles.badgeDischarged,
            ]}
        >
            <Text
                style={[
                    styles.badgeText,
                    isActive ? styles.badgeTextActive : styles.badgeTextDischarged,
                ]}
            >
                {status}
            </Text>
        </View>
    );
};

const PatientCard = ({ patient, onPress }: { patient: Patient; onPress?: () => void }) => {
    const router = useRouter();

    const handleCardPress = () => {
        if (onPress) {
            onPress();
        } else {
            router.push('/doctor/patient-details');
        }
    };

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={handleCardPress}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.patientName}>{patient.name}</Text>
                    <Text style={styles.mrnText}>{patient.mrn}</Text>
                </View>
                <StatusBadge status={patient.status} />
            </View>

            <View style={styles.cardDetails}>
                <View style={styles.detailColumn}>
                    <Text style={styles.detailLabel}>Ward</Text>
                    <Text style={styles.detailValue}>{patient.ward}</Text>
                </View>
                <View style={styles.detailColumn}>
                    <Text style={styles.detailLabel}>Bed</Text>
                    <Text style={styles.detailValue}>{patient.bed}</Text>
                </View>
                <View style={styles.detailColumn}>
                    <Text style={styles.detailLabel}>Device</Text>
                    <Text style={styles.detailValue}>{patient.device}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default function PatientsScreen() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

    const handleBack = () => {
        router.back();
    };

    const filteredPatients = PATIENTS.filter((p) => {
        if (activeFilter === 'All') return true;
        return p.status === activeFilter;
    });

    const tabs: FilterTab[] = ['All', 'Active', 'Discharged'];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

            <AppBar />

            <View style={styles.divider} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.pageHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Patients</Text>
                </View>

                <View style={{
                    padding: Spacing.md,
                }}>
                    <View style={styles.tabRow}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, activeFilter === tab && styles.tabActive]}
                                onPress={() => setActiveFilter(tab)}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeFilter === tab && styles.tabTextActive,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ── Patient Cards ── */}
                    {filteredPatients.map((patient) => (
                        <PatientCard
                            key={patient.id}
                            patient={patient}
                            onPress={() => router.push(`/doctor/patient-details?id=${patient.id}`)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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
        fontFamily: 'Inter_600SemiBold',
    },
    appBarTitle: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
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
        fontFamily: 'Inter_600SemiBold',
    },

    divider: {
        height: 1,
        backgroundColor: Colors.Border,
    },

    // Page Body
    container: {
        flex: 1,
    },
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
    },
    backButton: {
        padding: Spacing.xs,
    },
    backArrow: {
        fontSize: 20,
        color: Colors.TextPrimary,
    },
    pageTitle: {
        fontSize: 22,
        fontFamily:'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    // Filter Tabs
    tabRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        gap: Spacing.xs,
    },
    tab: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.xl,
    },
    tabActive: {
        backgroundColor: Colors.Primary,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextSecondary,
    },
    tabTextActive: {
        color: Colors.TextWhite,
        fontFamily: 'Inter_600SemiBold',
    },

    // Patient Card
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.sm + 4,
        // Shadow – iOS
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        // Shadow – Android
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    patientName: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        lineHeight: 22,
    },
    mrnText: {
        fontSize: 13,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    // Status Badge
    badge: {
        paddingHorizontal: Spacing.sm + 2,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.xl,
    },
    badgeActive: {
        backgroundColor: Colors.Primary,
    },
    badgeDischarged: {
        backgroundColor: Colors.Border,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
    },
    badgeTextActive: {
        color: Colors.TextWhite,
    },
    badgeTextDischarged: {
        color: Colors.TextSecondary,
    },

    // Card Detail Row
    cardDetails: {
        flexDirection: 'row',
        gap: Spacing.xl,
    },
    detailColumn: {
        gap: 2,
    },
    detailLabel: {
        fontSize: 12,
        color: Colors.TextSecondary,
        lineHeight: 16,
    },
    detailValue: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
        lineHeight: 20,
    },
});