import {
    FlatList,
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
import { Ionicons } from '@expo/vector-icons'
import { toast } from '@/src/utils/toast'

interface Alert {
    id: string
    patientName: string
    mrn: string
    message: string
    time: string
    acknowledged: boolean
}

const ALERTS: Alert[] = [
    {
        id: '1',
        patientName: 'John Smith',
        mrn: 'MRN-12345',
        message: 'High Heart Rate (145 bpm)',
        time: '5 min ago',
        acknowledged: false,
    },
    {
        id: '2',
        patientName: 'Michael Brown',
        mrn: 'MRN-12347',
        message: 'Low battery (15%)',
        time: '1 hour ago',
        acknowledged: false,
    },
]

const AlertList = () => {
    const router = useRouter()
    const [alerts, setAlerts] = useState<Alert[]>(ALERTS)

    const handleAcknowledge = (id: string) => {
        setAlerts((prev) =>
            prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
        )
        toast.success('Alert acknowledged successfully')
    }

    const handleViewPatient = (alert: Alert) => {
        router.push(`/nurse/patient-details`)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            {/* Page Header */}
            <View style={styles.pageHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Alerts</Text>
            </View>

            <FlatList
                data={alerts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="checkmark-circle-outline" size={48} color={Colors.Secondary} />
                        <Text style={styles.emptyText}>No pending alerts</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={[styles.card, item.acknowledged && styles.cardAcknowledged]}>
                        {/* Card Header */}
                        <View style={styles.cardHeader}>
                            <Text style={styles.patientName}>{item.patientName}</Text>
                            {item.acknowledged && (
                                <View style={styles.ackBadge}>
                                    <Text style={styles.ackBadgeText}>Acknowledged</Text>
                                </View>
                            )}
                        </View>

                        <Text style={styles.mrn}>{item.mrn}</Text>
                        <Text style={styles.message}>{item.message}</Text>
                        <Text style={styles.time}>{item.time}</Text>

                        {/* Actions */}
                        <View style={styles.actionsRow}>
                            <TouchableOpacity
                                style={[
                                    styles.acknowledgeBtn,
                                    item.acknowledged && styles.acknowledgeBtnDone,
                                ]}
                                onPress={() => handleAcknowledge(item.id)}
                                activeOpacity={0.85}
                                disabled={item.acknowledged}
                            >
                                <Text style={styles.acknowledgeBtnText}>
                                    {item.acknowledged ? 'Acknowledged' : 'Acknowledge'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.viewPatientBtn}
                                onPress={() => handleViewPatient(item)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.viewPatientText}>View Patient</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default AlertList

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

    /* ─── List ─── */
    listContent: {
        padding: Spacing.md,
        gap: Spacing.sm,
        paddingBottom: Spacing.xl,
    },

    /* ─── Alert Card ─── */
    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.xs,
        marginBottom: Spacing.sm,
    },
    cardAcknowledged: {
        opacity: 0.7,
        borderColor: Colors.Border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    patientName: {
        ...Typography.CardTitle,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    mrn: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    message: {
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        marginTop: Spacing.xs,
    },
    time: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },

    /* ─── Acknowledged Badge ─── */
    ackBadge: {
        backgroundColor: Colors.SuccessBg,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 3,
        borderRadius: BorderRadius.xl,
    },
    ackBadgeText: {
        fontSize: 11,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.Secondary,
    },

    /* ─── Actions Row ─── */
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginTop: Spacing.xs,
        justifyContent: 'space-around'
    },
    acknowledgeBtn: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.xl,
    },
    acknowledgeBtnDone: {
        backgroundColor: Colors.Disabled,
    },
    acknowledgeBtnText: {
        ...Typography.BodySmall,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },
    viewPatientBtn: {
        paddingVertical: Spacing.sm,
    },
    viewPatientText: {
        ...Typography.BodySmall,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.Primary,
    },

    /* ─── Empty State ─── */
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        gap: Spacing.md,
    },
    emptyText: {
        ...Typography.Body,
        color: Colors.TextSecondary,
    },
})