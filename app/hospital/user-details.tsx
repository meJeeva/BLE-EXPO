import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius } from './../../src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '@/components/AppBar';

const USER = {
    name: 'Dr. Sarah Johnson',
    age: '42 years',
    gender: 'Female',
    department: 'Cardiologist',
    designation: 'Doctor',
    email: 'sarah.j@hospital.com',
    contact: '+1-234-567-8901',
    address: '123 Medical St',
};

const ASSIGNED_PATIENTS = [
    {
        id: '1',
        name: 'John Smith',
        mrn: 'MRN-12345',
        status: 'Active',
        device: 'VZ-2024-0001',
        hr: '72 bpm',
        spo2: '98%',
    },
    {
        id: '2',
        name: 'Mary Johnson',
        mrn: 'MRN-12346',
        status: 'Active',
        device: 'VZ-2024-0002',
        hr: '68 bpm',
        spo2: '96%',
    },
];


const InfoRow = ({
    items,
}: {
    items: { label: string; value: string }[];
}) => (
    <View style={styles.infoRow}>
        {items.map((item) => (
            <View key={item.label} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
            </View>
        ))}
    </View>
);


const PatientCard = ({ patient }: { patient: typeof ASSIGNED_PATIENTS[0] }) => (
    <View style={styles.patientCard}>
        <View style={styles.patientHeader}>
            <View>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientMrn}>{patient.mrn}</Text>
            </View>
            <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{patient.status}</Text>
            </View>
        </View>

        <View style={styles.patientDivider} />

        <View style={styles.patientStats}>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>Device</Text>
                <Text style={styles.statValue}>{patient.device}</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>HR</Text>
                <Text style={styles.statValue}>{patient.hr}</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>SpO₂</Text>
                <Text style={styles.statValue}>{patient.spo2}</Text>
            </View>
        </View>
    </View>
);


const UserDetailScreen: React.FC = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            {/* ── Page Header ── */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{USER.name}</Text>
            </View>


            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── User Information Card ── */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>User Information</Text>
                    <View style={styles.divider} />

                    <InfoRow
                        items={[
                            { label: 'Age', value: USER.age },
                            { label: 'Gender', value: USER.gender },
                        ]}
                    />

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Department</Text>
                        <Text style={styles.infoValue}>{USER.department}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Designation</Text>
                        <Text style={styles.infoValue}>{USER.designation}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{USER.email}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Contact</Text>
                        <Text style={styles.infoValue}>{USER.contact}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>Address</Text>
                        <Text style={styles.infoValue}>{USER.address}</Text>
                    </View>
                </View>

                {/* ── Assigned Patients Card ── */}
                <View style={[styles.card, { marginBottom: Spacing.xl }]}>
                    <Text style={styles.sectionTitle}>Assigned Patients</Text>
                    <View style={styles.divider} />

                    {ASSIGNED_PATIENTS.map((patient, index) => (
                        <View key={patient.id}>
                            <PatientCard patient={patient} />
                            {index < ASSIGNED_PATIENTS.length - 1 && (
                                <View style={styles.patientSeparator} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    /* App Bar */
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
        fontSize: 13,
        fontFamily: 'Inter_700Bold',
    },
    appBarTitle: {
        ...Typography.HeaderTitle,
        color: Colors.TextPrimary,
    },
    appBarSubtitle: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    appBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.Border,
        alignItems: 'center',
        justifyContent: 'center',
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
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.md,
    },

    /* Page Header */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
        padding: Spacing.md,
    },
    backBtn: { paddingRight: Spacing.sm },
    backArrow: { fontSize: 20, color: Colors.TextPrimary },
    pageTitle: { ...Typography.H2, color: Colors.TextPrimary },

    /* Scroll */
    scroll: { flex: 1 },
    scrollContent: { padding: Spacing.md, gap: Spacing.md },

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
    sectionTitle: {
        ...Typography.H2,
        color: Colors.TextPrimary,
        marginBottom: Spacing.sm,
    },

    /* Info fields */
    infoRow: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    infoItem: {
        flex: 1,
    },
    infoBlock: {
        marginBottom: Spacing.md,
    },
    infoLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    infoValue: {
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },

    /* Patient card */
    patientCard: {
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
    },
    patientHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    patientName: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
    },
    patientMrn: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },
    activeBadge: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.md,
        paddingVertical: 3,
    },
    activeBadgeText: {
        ...Typography.Caption,
        color: Colors.TextWhite,
        fontFamily: 'Inter_600SemiBold',
    },
    patientDivider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.sm,
    },
    patientStats: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    statValue: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },
    patientSeparator: {
        height: Spacing.sm,
    },
});

export default UserDetailScreen;