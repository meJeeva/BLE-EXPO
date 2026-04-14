import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { LineChart } from 'react-native-gifted-charts'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 4

type PatientStatus = 'Active' | 'Inactive' | 'Discharged'
const STATUS_OPTIONS: PatientStatus[] = ['Active', 'Inactive', 'Discharged']

const PATIENT = {
    name: 'John Smith',
    mrn: 'MRN-12345',
    doctor: 'Dr. Johnson',
    ward: '3A',
    bed: '12',
    status: 'Active' as PatientStatus,
    connectedDevice: 'VZ-2024-0001',
    connectedHub: 'HUB-2024-0001',
}

const VITALS = [
    { label: 'HR', value: '72', unit: 'bpm', sub: 'Heart Rate' },
    { label: 'SpO₂', value: '98', unit: '%', sub: 'Oxygen Sat.' },
    { label: 'RR', value: '16', unit: 'br/min', sub: 'Resp. Rate' },
    { label: 'HRV', value: '45', unit: 'ms', sub: 'HRV' },
    { label: 'TEMP', value: '37.1', unit: '°C', sub: 'Temperature' },
]

// gifted-charts expects { value: number, label?: string }
const TREND_DATA = {
    HR: [
        { value: 78, label: '0:00' },
        { value: 74, label: '4:00' },
        { value: 72, label: '8:00' },
        { value: 75, label: '12:00' },
        { value: 71, label: '16:00' },
        { value: 73, label: '20:00' },
        { value: 72, label: '24:00' },
    ],
    SpO2: [
        { value: 97, label: '0:00' },
        { value: 98, label: '4:00' },
        { value: 98, label: '8:00' },
        { value: 97, label: '12:00' },
        { value: 99, label: '16:00' },
        { value: 98, label: '20:00' },
        { value: 98, label: '24:00' },
    ],
    RR: [
        { value: 17, label: '0:00' },
        { value: 16, label: '4:00' },
        { value: 15, label: '8:00' },
        { value: 16, label: '12:00' },
        { value: 17, label: '16:00' },
        { value: 16, label: '20:00' },
        { value: 16, label: '24:00' },
    ],
    HRV: [
        { value: 42, label: '0:00' },
        { value: 45, label: '4:00' },
        { value: 44, label: '8:00' },
        { value: 47, label: '12:00' },
        { value: 43, label: '16:00' },
        { value: 46, label: '20:00' },
        { value: 45, label: '24:00' },
    ],
    TEMP: [
        { value: 370, label: '0:00' },
        { value: 371, label: '4:00' },
        { value: 372, label: '8:00' },
        { value: 371, label: '12:00' },
        { value: 370, label: '16:00' },
        { value: 371, label: '20:00' },
        { value: 371, label: '24:00' },
    ],
}

// Display label for TEMP (stored *10 to avoid float issues)
const TREND_Y_LABEL: Record<string, (v: number) => string> = {
    TEMP: (v) => (v / 10).toFixed(1),
}

type TrendKey = keyof typeof TREND_DATA

const ALERTS = [
    { id: '1', message: 'Battery low (15%)', time: '1 hour ago', type: 'warning' },
    { id: '2', message: 'SpO₂ dropped below 95%', time: '3 hours ago', type: 'error' },
]

const PatientDetail = () => {
    const router = useRouter()
    const [selectedStatus, setSelectedStatus] = useState<PatientStatus>(PATIENT.status)
    const [activeTrend, setActiveTrend] = useState<TrendKey>('HR')

    const trendData = TREND_DATA[activeTrend]
    const yLabel = TREND_Y_LABEL[activeTrend]

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />
            <AppBar />

            {/* Page Header */}
            <View style={styles.pageHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{PATIENT.name}</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Patient Information ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Patient Information</Text>
                    <View style={styles.divider} />
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>MRN</Text>
                            <Text style={styles.infoValue}>{PATIENT.mrn}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Doctor</Text>
                            <Text style={styles.infoValue}>{PATIENT.doctor}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Ward</Text>
                            <Text style={styles.infoValue}>{PATIENT.ward}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Bed</Text>
                            <Text style={styles.infoValue}>{PATIENT.bed}</Text>
                        </View>
                    </View>
                </View>

                {/* ── Change Status ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Change Status</Text>
                    <View style={styles.statusToggleRow}>
                        {STATUS_OPTIONS.map((s) => (
                            <TouchableOpacity
                                key={s}
                                style={[styles.statusBtn, selectedStatus === s && styles.statusBtnActive]}
                                onPress={() => setSelectedStatus(s)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.statusBtnText, selectedStatus === s && styles.statusBtnTextActive]}>
                                    {s}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ── Current Vitals ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Current Vitals</Text>
                    <View style={styles.vitalsGrid}>
                        {VITALS.map((v) => (
                            <View key={v.label} style={styles.vitalBox}>
                                <Text style={styles.vitalLabel}>{v.label}</Text>
                                <Text style={styles.vitalValue}>
                                    {v.value}
                                    <Text style={styles.vitalUnit}> {v.unit}</Text>
                                </Text>
                                <Text style={styles.vitalSub}>{v.sub}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ── Vitals Trend ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Vitals Trend</Text>

                    {/* Trend Selector Tabs */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.trendTabsContent}
                    >
                        {(Object.keys(TREND_DATA) as TrendKey[]).map((key) => (
                            <TouchableOpacity
                                key={key}
                                style={[styles.trendTab, activeTrend === key && styles.trendTabActive]}
                                onPress={() => setActiveTrend(key)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.trendTabText, activeTrend === key && styles.trendTabTextActive]}>
                                    {key}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Line Chart */}
                    <View style={styles.chartWrapper}>
                        <LineChart
                            data={trendData}
                            width={CHART_WIDTH}
                            height={160}
                            color={Colors.Primary}
                            thickness={2}
                            curved
                            hideDataPoints={false}
                            dataPointsColor={Colors.Primary}
                            dataPointsRadius={3}
                            startFillColor={Colors.PrimaryLight}
                            endFillColor={Colors.Surface}
                            areaChart
                            startOpacity={0.3}
                            endOpacity={0.0}
                            xAxisColor={Colors.Border}
                            yAxisColor={Colors.Border}
                            yAxisTextStyle={styles.axisText}
                            xAxisLabelTextStyle={styles.axisText}
                            rulesColor={Colors.Border}
                            rulesType="solid"
                            yAxisLabelPrefix=""
                            formatYLabel={yLabel ?? ((v) => v)}
                            noOfSections={4}
                            spacing={(CHART_WIDTH - 40) / (trendData.length - 1)}
                            initialSpacing={10}
                            endSpacing={10}
                        />
                    </View>
                </View>

                {/* ── Connected Hardware ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Connected Hardware</Text>
                    <View style={styles.divider} />
                    <View style={styles.hardwareRow}>
                        <View style={styles.hardwareItem}>
                            <View style={styles.hardwareIconBox}>
                                <MaterialCommunityIcons name="watch-variant" size={20} color={Colors.Primary} />
                            </View>
                            <View>
                                <Text style={styles.hardwareLabel}>Device</Text>
                                <Text style={styles.hardwareValue}>{PATIENT.connectedDevice}</Text>
                            </View>
                        </View>
                        <View style={styles.hardwareDividerV} />
                        <View style={styles.hardwareItem}>
                            <View style={[styles.hardwareIconBox, { borderColor: Colors.Secondary }]}>
                                <MaterialCommunityIcons name="router-wireless" size={20} color={Colors.Secondary} />
                            </View>
                            <View>
                                <Text style={styles.hardwareLabel}>HUB</Text>
                                <Text style={styles.hardwareValue}>{PATIENT.connectedHub}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ── Recent Alerts ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Recent Alerts</Text>
                    <View style={styles.alertList}>
                        {ALERTS.map((alert) => (
                            <View
                                key={alert.id}
                                style={[
                                    styles.alertItem,
                                    alert.type === 'error' ? styles.alertItemError : styles.alertItemWarning,
                                ]}
                            >
                                <Ionicons
                                    name={alert.type === 'error' ? 'alert-circle-outline' : 'warning-outline'}
                                    size={16}
                                    color={alert.type === 'error' ? Colors.Error : Colors.Warning}
                                    style={{ marginTop: 1 }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.alertMessage}>{alert.message}</Text>
                                    <Text style={styles.alertTime}>{alert.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.viewAllAlertsBtn}
                        onPress={() => router.push('/nurse/alerts')}
                    >
                        <Text style={styles.viewAllAlertsText}>View All Alerts</Text>
                        <Ionicons name="arrow-forward" size={14} color={Colors.Primary} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PatientDetail

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
    backBtn: { padding: Spacing.xs },
    pageTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    container: { flex: 1 },
    contentContainer: {
        padding: Spacing.md,
        gap: Spacing.md,
        paddingBottom: Spacing.xl,
    },

    /* ─── Card ─── */
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.md,
    },
    cardTitle: {
        ...Typography.Body,
        color: Colors.TextPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginHorizontal: -Spacing.md,
    },

    /* ─── Info Grid ─── */
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: Spacing.md,
    },
    infoItem: {
        width: '50%',
        gap: 3,
    },
    infoLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    infoValue: {
        ...Typography.BodySmall,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    /* ─── Status Toggle ─── */
    statusToggleRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    statusBtn: {
        flex: 1,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        alignItems: 'center',
        backgroundColor: Colors.Surface,
    },
    statusBtnActive: {
        backgroundColor: Colors.Primary,
        borderColor: Colors.Primary,
    },
    statusBtnText: {
        ...Typography.BodySmall,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextSecondary,
    },
    statusBtnTextActive: {
        color: Colors.TextWhite,
    },

    /* ─── Vitals Grid ─── */
    vitalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    vitalBox: {
        width: '47%',
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.md,
        padding: Spacing.sm,
        gap: 2,
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    vitalLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        fontFamily: 'Inter_600SemiBold',
    },
    vitalValue: {
        fontSize: 22,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    vitalUnit: {
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
    },
    vitalSub: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },

    /* ─── Trend Tabs ─── */
    trendTabsContent: {
        gap: Spacing.xs,
        paddingBottom: Spacing.xs,
    },
    trendTab: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.Border,
        backgroundColor: Colors.Surface,
    },
    trendTabActive: {
        backgroundColor: Colors.Primary,
        borderColor: Colors.Primary,
    },
    trendTabText: {
        ...Typography.Caption,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextSecondary,
    },
    trendTabTextActive: {
        color: Colors.TextWhite,
    },
    chartWrapper: {
        marginLeft: -Spacing.xs,
        overflow: 'hidden',
    },
    axisText: {
        fontSize: 10,
        color: Colors.TextSecondary,
        fontFamily: 'Inter_400Regular',
    },

    /* ─── Connected Hardware ─── */
    hardwareRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    hardwareItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    hardwareIconBox: {
        width: 28,
        height: 28,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.Background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    hardwareDividerV: {
        width: 1,
        height: 40,
        backgroundColor: Colors.Border,
    },
    hardwareLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    hardwareValue: {
        ...Typography.Caption,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
    },

    /* ─── Alerts ─── */
    alertList: {
        gap: Spacing.sm,
    },
    alertItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.sm,
        borderRadius: BorderRadius.md,
        padding: Spacing.sm,
    },
    alertItemWarning: {
        backgroundColor: Colors.WarningStatus,
    },
    alertItemError: {
        backgroundColor: Colors.BadgeBg,
    },
    alertMessage: {
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },
    alertTime: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },
    viewAllAlertsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        paddingVertical: Spacing.sm,
        marginTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.Border,
    },
    viewAllAlertsText: {
        ...Typography.BodySmall,
        color: Colors.Primary,
        fontWeight: '600',
    },
})