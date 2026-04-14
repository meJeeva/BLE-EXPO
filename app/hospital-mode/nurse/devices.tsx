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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

type DeviceType = 'HUB' | 'VitalZ'

interface Device {
    id: string
    type: DeviceType
    status: 'Active' | 'Inactive' | 'Offline'
    location?: string
    capacity?: string
    patient?: string
    battery?: string
}

const DEVICES: Device[] = [
    {
        id: 'HUB-2024-0001',
        type: 'HUB',
        status: 'Active',
        location: 'Floor 3, Ward A',
        capacity: '7/10',
    },
    {
        id: 'VZ-2024-0001',
        type: 'VitalZ',
        status: 'Active',
        patient: 'John Smith',
        battery: '85%',
    },
]

const StatusBadge = ({ status }: { status: Device['status'] }) => {
    const badgeStyle =
        status === 'Active'
            ? styles.badgeActive
            : status === 'Offline'
                ? styles.badgeOffline
                : styles.badgeInactive

    const textStyle =
        status === 'Active'
            ? styles.badgeActiveText
            : status === 'Offline'
                ? styles.badgeOfflineText
                : styles.badgeInactiveText

    return (
        <View style={[styles.badge, badgeStyle]}>
            <Text style={[styles.badgeText, textStyle]}>{status}</Text>
        </View>
    )
}

const DeviceCard = ({ device, router }: { device: Device, router: any }) => (
    <TouchableOpacity style={styles.deviceCard} activeOpacity={0.75} onPress={() => {
        router.navigate('/hospital-mode/nurse/device-details')
    }}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
            <View>
                <Text style={styles.deviceId}>{device.id}</Text>
                <Text style={styles.deviceType}>{device.type}</Text>
            </View>
            <StatusBadge status={device.status} />
        </View>

        {/* Card Meta */}
        <View style={styles.cardMeta}>
            {device.location !== undefined && (
                <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Location</Text>
                    <Text style={styles.metaValue}>{device.location}</Text>
                </View>
            )}
            {device.capacity !== undefined && (
                <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Capacity</Text>
                    <Text style={[styles.metaValue, styles.metaValueBlue]}>{device.capacity}</Text>
                </View>
            )}
            {device.patient !== undefined && (
                <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Patient</Text>
                    <Text style={styles.metaValue}>{device.patient}</Text>
                </View>
            )}
            {device.battery !== undefined && (
                <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Battery</Text>
                    <Text style={styles.metaValue}>{device.battery}</Text>
                </View>
            )}
        </View>
    </TouchableOpacity>
)

const Devices = () => {
    const router = useRouter()

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            <View style={styles.pageHeader}>
                <View style={styles.pageHeaderLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Devices</Text>
                </View>

                <TouchableOpacity style={styles.scanBtn} activeOpacity={0.85} onPress={() => {
                    router.navigate('/hospital-mode/nurse/scan-ble-devices')
                }}>
                    <MaterialCommunityIcons name="bluetooth" size={16} color={Colors.TextWhite} />
                    <Text style={styles.scanBtnText}>Scan</Text>
                </TouchableOpacity>
            </View>


            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Page Header */}

                {/* Device List */}
                <View style={styles.deviceList}>
                    {DEVICES.map((device) => (
                        <DeviceCard key={device.id} device={device} router={router} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Devices

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
        gap: Spacing.md,
        paddingBottom: Spacing.xl,
    },

    /* ─── Page Header ─── */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        padding: Spacing.md
    },
    pageHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    backBtn: {
        padding: Spacing.xs,
    },
    pageTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    scanBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.Warning,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.xl,
    },
    scanBtnText: {
        ...Typography.SectionTitle,
        color: Colors.TextWhite,
    },

    /* ─── Device List ─── */
    deviceList: {
        gap: Spacing.sm,
    },

    /* ─── Device Card ─── */
    deviceCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    deviceId: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_700Bold',
    },
    deviceType: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    /* ─── Badge ─── */
    badge: {
        paddingHorizontal: Spacing.sm + 2,
        paddingVertical: 3,
        borderRadius: BorderRadius.xl,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
    },
    badgeActive: {
        backgroundColor: Colors.Primary,
    },
    badgeActiveText: {
        color: Colors.TextWhite,
    },
    badgeOffline: {
        backgroundColor: Colors.BadgeBg,
    },
    badgeOfflineText: {
        color: Colors.Error,
    },
    badgeInactive: {
        backgroundColor: Colors.Border,
    },
    badgeInactiveText: {
        color: Colors.TextSecondary,
    },

    /* ─── Card Meta ─── */
    cardMeta: {
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
    metaValueBlue: {
        color: Colors.Primary,
        fontFamily: 'Inter_600SemiBold',
    },
})