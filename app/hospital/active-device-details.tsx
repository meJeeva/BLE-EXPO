import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { LineChart } from 'react-native-gifted-charts'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const VITALZ_DEVICE = {
    deviceId: 'VZ-2024-0001',
    type: 'VitalZ',
    status: 'Active', // 'Active' | 'Inactive'
    warrantyValidUntil: '2025-12-31',
    connectedPatient: {
        name: 'John Smith',
        mrn: 'MRN-12345',
    },
    vitals: {
        heartRate: '72 bpm',
        spo2: '98%',
    },
};

const VITALS_TREND_DATA = [
    { value: 78 }, { value: 82 }, { value: 79 }, { value: 75 },
    { value: 76 }, { value: 74 }, { value: 77 }, { value: 80 },
    { value: 83 }, { value: 85 }, { value: 82 }, { value: 79 },
    { value: 76 }, { value: 74 }, { value: 72 }, { value: 70 },
    { value: 73 }, { value: 75 }, { value: 74 }, { value: 72 },
    { value: 71 }, { value: 70 },
];

const X_LABELS = ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

// ─── Main Screen ──────────────────────────────────────────────────────────────

const VitalZDeviceDetail = () => {
    const router = useRouter();
    const device = VITALZ_DEVICE;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            {/* ── Page Header ── */}
            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{device.deviceId}</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* ── Device Information ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Information</Text>
                    <View style={styles.cardDivider} />

                    {/* Type + Status row */}
                    <View style={styles.row}>
                        <View style={styles.rowCell}>
                            <Text style={styles.fieldLabel}>Type</Text>
                            <Text style={styles.fieldValue}>{device.type}</Text>
                        </View>
                        <View style={styles.rowCell}>
                            <Text style={styles.fieldLabel}>Status</Text>
                            <View style={styles.activeBadge}>
                                <Text style={styles.activeBadgeText}>{device.status}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Warranty */}
                    <View style={[styles.fieldBlock, { marginBottom: 0 }]}>
                        <Text style={styles.fieldLabel}>Warranty Valid Until</Text>
                        <Text style={styles.fieldValue}>{device.warrantyValidUntil}</Text>
                    </View>
                </View>

                {/* ── Connected Patient ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Connected Patient</Text>
                    <View style={styles.cardDivider} />

                    <Text style={styles.patientName}>{device.connectedPatient.name}</Text>
                    <Text style={styles.patientMrn}>{device.connectedPatient.mrn}</Text>
                </View>

                {/* ── Patient Vitals ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Patient Vitals</Text>
                    <View style={styles.cardDivider} />

                    {/* Vital boxes */}
                    <View style={styles.vitalsRow}>
                        <View style={styles.vitalBox}>
                            <Text style={styles.vitalLabel}>Heart Rate</Text>
                            <Text style={styles.vitalValue}>{device.vitals.heartRate}</Text>
                        </View>
                        <View style={styles.vitalBox}>
                            <Text style={styles.vitalLabel}>SpO₂</Text>
                            <Text style={styles.vitalValue}>{device.vitals.spo2}</Text>
                        </View>
                    </View>

                    {/* Trend chart */}
                    <View style={styles.chartWrapper}>
                        <LineChart
                            data={VITALS_TREND_DATA}
                            width={290}
                            height={140}
                            color={Colors.Primary}
                            thickness={2}
                            hideDataPoints
                            curved
                            areaChart
                            startFillColor={Colors.PrimaryLight}
                            endFillColor="transparent"
                            startOpacity={0.35}
                            endOpacity={0.02}
                            noOfSections={4}
                            maxValue={180}
                            minValue={40}
                            yAxisTextStyle={styles.chartAxisText}
                            xAxisLabelTexts={X_LABELS}
                            xAxisLabelTextStyle={styles.chartAxisText}
                            xAxisThickness={1}
                            xAxisColor={Colors.Border}
                            yAxisThickness={0}
                            rulesColor={Colors.Border}
                            rulesType="solid"
                            spacing={13}
                            initialSpacing={4}
                            endSpacing={4}
                            yAxisLabelWidth={32}
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default VitalZDeviceDetail;

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
        gap: Spacing.md,
        paddingBottom: Spacing.xxl,
    },

    /* Card */
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
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

    /* 2-col row */
    row: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    rowCell: { flex: 1 },

    /* Field */
    fieldBlock: { marginBottom: Spacing.md },
    fieldLabel: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginBottom: 3,
    },
    fieldValue: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
    },

    /* Active badge */
    activeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.Primary,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
    },
    activeBadgeText: {
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },

    /* Connected Patient */
    patientName: {
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
        marginBottom: 3,
    },
    patientMrn: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
    },

    /* Vitals */
    vitalsRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    vitalBox: {
        flex: 1,
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
    },
    vitalLabel: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginBottom: Spacing.xs,
    },
    vitalValue: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    /* Chart */
    chartWrapper: {
        overflow: 'hidden',
        marginTop: Spacing.xs,
    },
    chartAxisText: {
        fontSize: 10,
        color: Colors.TextSecondary,
    },
});