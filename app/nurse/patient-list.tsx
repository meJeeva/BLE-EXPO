import {
    FlatList,
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
import { Ionicons } from '@expo/vector-icons'

type PatientStatus = 'Active' | 'Inactive' | 'Discharged'

interface Patient {
    id: string
    name: string
    mrn: string
    status: PatientStatus
    ward: string
    bed: string
    device: string
}

const PATIENTS: Patient[] = [
    {
        id: '1',
        name: 'John Smith',
        mrn: 'MRN-12345',
        status: 'Active',
        ward: '3A',
        bed: '12',
        device: 'VZ-2024-0001',
    },
    {
        id: '2',
        name: 'Mary Johnson',
        mrn: 'MRN-12346',
        status: 'Active',
        ward: '3A',
        bed: '15',
        device: 'VZ-2024-0002',
    },
]

const StatusBadge = ({ status }: { status: PatientStatus }) => {
    const bgColor =
        status === 'Active'
            ? Colors.Primary
            : status === 'Discharged'
                ? Colors.Secondary
                : Colors.Disabled

    return (
        <View style={[styles.badge, { backgroundColor: bgColor }]}>
            <Text style={styles.badgeText}>{status}</Text>
        </View>
    )
}

const PatientCard = ({ patient, onPress }: { patient: Patient; onPress: () => void }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
            <View>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientMrn}>{patient.mrn}</Text>
            </View>
            <StatusBadge status={patient.status} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Meta Row */}
        <View style={styles.metaRow}>
            <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Ward</Text>
                <Text style={styles.metaValue}>{patient.ward}</Text>
            </View>
            <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Bed</Text>
                <Text style={styles.metaValue}>{patient.bed}</Text>
            </View>
            <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Device</Text>
                <Text style={styles.metaValue}>{patient.device}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const Patients = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            {/* Page Header */}
            <View style={styles.pageHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Patients</Text>
            </View>

            <FlatList
                data={PATIENTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <PatientCard
                        patient={item}
                        onPress={() => { router.navigate('/nurse/patient-details') }}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Patients

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    /* ─── Page Header ─── */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.Surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
    },
    backBtn: {
        padding: Spacing.xs,
    },
    pageTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    /* ─── List ─── */
    listContent: {
        padding: Spacing.md,
        gap: Spacing.sm,
        paddingBottom: Spacing.xl,
    },

    /* ─── Patient Card ─── */
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    patientName: {
        ...Typography.CardTitle,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    patientMrn: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    /* ─── Badge ─── */
    badge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.xl,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },

    /* ─── Divider ─── */
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginHorizontal: -Spacing.md,
    },

    /* ─── Meta Row ─── */
    metaRow: {
        flexDirection: 'row',
        gap: Spacing.xl,
    },
    metaItem: {
        gap: 2,
    },
    metaLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    metaValue: {
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_400Regular',
    },
})