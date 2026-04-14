import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = 'All' | 'Active' | 'Discharged';
type PatientStatus = 'Active' | 'Discharged';

interface Patient {
    id: string;
    name: string;
    mrn: string;
    age: number;
    admittedDate: string;
    status: PatientStatus;
    vitals?: {
        hr: string;
        spo2: string;
        rr: string;
        hrv: string;
        temp: string;
    };
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PATIENTS: Patient[] = [
    {
        id: '1',
        name: 'John Smith',
        mrn: 'MRN-12345',
        age: 65,
        admittedDate: '2026-01-01',
        status: 'Active',
        vitals: { hr: '72', spo2: '98%', rr: '16', hrv: '45', temp: '98.6' },
    },
    {
        id: '2',
        name: 'Mary Johnson',
        mrn: 'MRN-12346',
        age: 58,
        admittedDate: '2026-01-03',
        status: 'Active',
        vitals: { hr: '68', spo2: '96%', rr: '14', hrv: '52', temp: '98.4' },
    },
    {
        id: '3',
        name: 'Robert Brown',
        mrn: 'MRN-12347',
        age: 72,
        admittedDate: '2025-12-28',
        status: 'Discharged',
    },
];

const FILTER_TABS: FilterTab[] = ['All', 'Active', 'Discharged'];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: PatientStatus }) => {
    const isActive = status === 'Active';
    return (
        <View style={[styles.statusBadge, isActive ? styles.activeBadge : styles.dischargedBadge]}>
            <Text style={[styles.statusBadgeText, isActive ? styles.activeBadgeText : styles.dischargedBadgeText]}>
                {status}
            </Text>
        </View>
    );
};

// ─── Vital Stat ───────────────────────────────────────────────────────────────

const VitalStat = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.vitalStat}>
        <Text style={styles.vitalLabel}>{label}</Text>
        <Text style={styles.vitalValue}>{value}</Text>
    </View>
);

// ─── Patient Card ─────────────────────────────────────────────────────────────

const PatientCard = ({ patient, onPress }: { patient: Patient; onPress: () => void }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
        {/* Header */}
        <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientMeta}>
                    {patient.mrn} • Age {patient.age}
                </Text>
                <Text style={styles.admittedDate}>Admitted: {patient.admittedDate}</Text>
            </View>
            <StatusBadge status={patient.status} />
        </View>

        {/* Vitals row — only for active patients */}
        {patient.vitals && (
            <>
                <View style={styles.vitalsDivider} />
                <View style={styles.vitalsRow}>
                    <VitalStat label="HR" value={patient.vitals.hr} />
                    <VitalStat label="SpO₂" value={patient.vitals.spo2} />
                    <VitalStat label="RR" value={patient.vitals.rr} />
                    <VitalStat label="HRV" value={patient.vitals.hrv} />
                    <VitalStat label="Temp" value={patient.vitals.temp} />
                </View>
            </>
        )}
    </TouchableOpacity>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const DoctorPatientList = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<FilterTab>('All');

    const filteredPatients = PATIENTS.filter((p) =>
        activeTab === 'All' ? true : p.status === activeTab
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            {/* ── Page Header ── */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>My Patients</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* ── Filter Tabs ── */}
                <View style={styles.tabRow}>
                    {FILTER_TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                                onPress={() => setActiveTab(tab)}
                                activeOpacity={0.75}
                            >
                                <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ── Patient List ── */}
                <View style={styles.listContainer}>
                    {filteredPatients.map((patient) => (
                        <PatientCard
                            key={patient.id}
                            patient={patient}
                            onPress={() => router.push(`/doctor/patient-details`)}
                        />
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default DoctorPatientList;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    /* Page Header */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 4,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
    },
    backButton: { paddingRight: Spacing.sm },
    backArrow: { fontSize: 20, color: Colors.TextPrimary },
    pageTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    /* Scroll */
    container: { flex: 1 },
    contentContainer: {
        padding: Spacing.md,
        paddingBottom: Spacing.xxl,
        gap: Spacing.md,
    },

    /* Filter Tabs */
    tabRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    tabBtn: {
        paddingHorizontal: Spacing.md + 4,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.xl,
        backgroundColor: Colors.Surface,
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    tabBtnActive: {
        backgroundColor: Colors.Primary,
        borderColor: Colors.Primary,
    },
    tabBtnText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextSecondary,
    },
    tabBtnTextActive: {
        color: Colors.TextWhite,
    },

    /* Patient List */
    listContainer: {
        gap: Spacing.md,
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardHeaderLeft: { flex: 1, marginRight: Spacing.sm },
    patientName: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        marginBottom: 2,
    },
    patientMeta: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    admittedDate: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
    },

    /* Status Badge */
    statusBadge: {
        borderRadius: BorderRadius.xl,
        paddingHorizontal: 14,
        paddingVertical: 5,
        alignSelf: 'flex-start',
    },
    activeBadge: {
        backgroundColor: Colors.Primary,
    },
    dischargedBadge: {
        backgroundColor: Colors.Border,
    },
    statusBadgeText: {
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
    },
    activeBadgeText: {
        color: Colors.TextWhite,
    },
    dischargedBadgeText: {
        color: Colors.TextSecondary,
    },

    /* Vitals */
    vitalsDivider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginVertical: Spacing.sm,
    },
    vitalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    vitalStat: {
        alignItems: 'flex-start',
    },
    vitalLabel: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    vitalValue: {
        fontSize: 15,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
});