import {
    ActivityIndicator,
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

interface BLEDevice {
    id: string
    name: string
    rssi: number
    connected: boolean
}

const MOCK_DEVICES: BLEDevice[] = [
    { id: '1', name: 'VZ-2024-0020', rssi: -45, connected: true },
    { id: '2', name: 'VZ-2024-0021', rssi: -52, connected: true },
    { id: '3', name: 'HUB-2024-0010', rssi: -38, connected: true },
]

const ScanBLEDevices = () => {
    const router = useRouter()
    const [isScanning, setIsScanning] = useState(false)
    const [devices, setDevices] = useState<BLEDevice[]>([]);



    const handleStartScan = () => {
        setIsScanning(true)
        setDevices([])
        // Replace with real BLE scan logic
        setTimeout(() => {
            setIsScanning(false)
            setDevices(MOCK_DEVICES)
        }, 2000)
    }

    const handleStopScan = () => {
        setIsScanning(false)
    }

    const handleSyncToPatient = (device: BLEDevice) => {
        console.log('Sync to patient:', device.name)
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
                <Text style={styles.pageTitle}>Scan BLE Devices</Text>
            </View>

            <View style={styles.container}>
                {devices.length === 0 ? (
                    /* ─── Empty / Idle / Scanning State ─── */
                    <View style={styles.emptyState}>
                        <View style={styles.bluetoothIconWrapper}>
                            {isScanning ? (
                                <ActivityIndicator size="large" color={Colors.Primary} />
                            ) : (
                                <MaterialCommunityIcons
                                    name="bluetooth"
                                    size={48}
                                    color={Colors.TextSecondary}
                                />
                            )}
                        </View>
                        <Text style={styles.emptyText}>
                            {isScanning ? 'Scanning for BLE devices...' : 'Scan for nearby BLE devices'}
                        </Text>
                        <TouchableOpacity
                            style={[styles.scanBtn, isScanning && styles.scanBtnStop]}
                            onPress={isScanning ? handleStopScan : handleStartScan}
                            activeOpacity={0.85}
                        >
                            <MaterialCommunityIcons name="bluetooth" size={16} color={Colors.TextWhite} />
                            <Text style={styles.scanBtnText}>
                                {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    /* ─── Found Devices State ─── */
                    <FlatList
                        data={devices}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <Text style={styles.sectionTitle}>
                                Available Devices ({devices.length})
                            </Text>
                        }
                        renderItem={({ item }) => (
                            <View style={styles.deviceCard}>
                                {/* Card Header Row */}
                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.deviceName}>{item.name}</Text>
                                        <Text style={styles.deviceSignal}>Signal: {item.rssi} dBm</Text>
                                    </View>
                                    {item.connected && (
                                        <View style={styles.connectedBadge}>
                                            <MaterialCommunityIcons
                                                name="wifi"
                                                size={12}
                                                color={Colors.TextWhite}
                                            />
                                            <Text style={styles.connectedText}>Connected</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Sync Button */}
                                <TouchableOpacity
                                    style={styles.syncBtn}
                                    onPress={() => handleSyncToPatient(item)}
                                    activeOpacity={0.85}
                                >
                                    <Text style={styles.syncBtnText}>Sync to Patient</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default ScanBLEDevices

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

    container: {
        flex: 1,
    },

    /* ─── Empty / Idle State ─── */
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.md,
        paddingHorizontal: Spacing.xl,
    },
    bluetoothIconWrapper: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        ...Typography.BodySmall,
        color: Colors.TextSecondary,
        textAlign: 'center',
    },

    /* ─── Scan / Stop Button ─── */
    scanBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.Primary,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm + 2,
        borderRadius: BorderRadius.xl,
    },
    scanBtnStop: {
        backgroundColor: Colors.Error,
    },
    scanBtnText: {
        ...Typography.SectionTitle,
        color: Colors.TextWhite,
    },

    /* ─── Device List ─── */
    listContent: {
        padding: Spacing.md,
        paddingBottom: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.H2,
        color: Colors.TextPrimary,
        marginBottom: Spacing.sm,
    },

    /* ─── Device Card ─── */
    deviceCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    deviceName: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_700Bold',
    },
    deviceSignal: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    /* ─── Connected Badge ─── */
    connectedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.Secondary,
        paddingHorizontal: Spacing.sm + 2,
        paddingVertical: 4,
        borderRadius: BorderRadius.xl,
    },
    connectedText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },

    /* ─── Sync Button ─── */
    syncBtn: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.sm + 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    syncBtnText: {
        ...Typography.SectionTitle,
        color: Colors.TextWhite,
    },
})