import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DEVICES = [
    {
        id: '1',
        deviceId: 'HUB-2024-0001',
        type: 'HUB',
        status: 'Connected',
        location: 'Floor 3, Ward A',
        capacity: '7/10',
    },
    {
        id: '2',
        deviceId: 'VZ-2024-0001',
        type: 'VitalZ',
        status: 'Active',
        patient: 'John Smith',
        battery: '85%',
    },
    {
        id: '3',
        deviceId: 'VZ-2024-0002',
        type: 'VitalZ',
        status: 'Active',
        patient: 'Mary Johnson',
        battery: '62%',
    },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
    const isConnected = status === 'Connected';
    return (
        <View style={[styles.badge, isConnected ? styles.badgeConnected : styles.badgeActive]}>
            {isConnected && <Ionicons name="wifi" size={10} color={Colors.TextWhite} />}
            <Text style={[styles.badgeText, isConnected ? styles.badgeTextConnected : styles.badgeTextActive]}>
                {status}
            </Text>
        </View>
    );
};

// ─── Device Card ──────────────────────────────────────────────────────────────

const DeviceCard = ({ device, onPress }: { device: typeof DEVICES[0]; onPress?: () => void }) => {
    const isHub = device.type === 'HUB';

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.deviceId}>{device.deviceId}</Text>
                    <Text style={styles.deviceType}>{device.type}</Text>
                </View>
                <StatusBadge status={device.status} />
            </View>

            <View style={styles.divider} />

            {/* Stats row */}
            <View style={styles.statsRow}>
                {isHub ? (
                    <>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Location</Text>
                            <Text style={styles.statValue}>{(device as any).location}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Capacity</Text>
                            <Text style={[styles.statValue, styles.capacityValue]}>{(device as any).capacity}</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Patient</Text>
                            <Text style={styles.statValue}>{(device as any).patient}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Battery</Text>
                            <Text style={styles.statValue}>{(device as any).battery}</Text>
                        </View>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const HospitalDevices = () => {
    const router = useRouter();

    const handleBack = () => router.back();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

            <AppBar />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Page Header */}
                <View style={styles.pageHeader}>
                    <View style={styles.pageHeaderLeft}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>Devices</Text>
                    </View>
                    <TouchableOpacity style={styles.registerBtn}>
                        <Text style={styles.registerBtnText}>Register</Text>
                    </TouchableOpacity>
                </View>

                {/* Device List */}
                <View style={styles.listContainer}>
                    {DEVICES.map((device) => (
                        <DeviceCard
                            key={device.id}
                            device={device}
                            onPress={
                                () => {
                                    if (device.status === 'Connected') {
                                        router.navigate('/hospital/device-details');
                                    } else {
                                        router.navigate('/hospital/active-device-details')
                                    }
                                }
                            }
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HospitalDevices;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: Spacing.xl,
    },

    /* Page Header */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 2,
        marginBottom: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
    },
    pageHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
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
        fontWeight: '700',
        color: Colors.TextPrimary,
    },
    registerBtn: {
        backgroundColor: '#F59E0B',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.md,
    },
    registerBtnText: {
        ...Typography.BodySmall,
        color: Colors.TextWhite,
        fontFamily: 'Inter_700Bold',
    },

    /* List */
    listContainer: {
        paddingHorizontal: Spacing.md,
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
        marginBottom: Spacing.sm,
    },
    deviceId: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
    },
    deviceType: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.sm,
    },

    /* Stats */
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.xl,
    },
    statItem: {},
    statLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    statValue: {
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },
    capacityValue: {
        color: Colors.Primary,
    },

    /* Badge */
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
    },
    badgeConnected: {
        backgroundColor: '#166534',
    },
    badgeActive: {
        backgroundColor: Colors.Primary,
    },
    badgeText: {
        ...Typography.Caption,
        fontFamily: 'Inter_600SemiBold',
    },
    badgeTextConnected: {
        color: Colors.TextWhite,
        marginStart: Spacing.xs,
    },
    badgeTextActive: {
        color: Colors.TextWhite,
    },
});