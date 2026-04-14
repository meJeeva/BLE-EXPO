import {
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
import { Ionicons } from '@expo/vector-icons'

type DeviceStatus = 'Active' | 'Inactive' | 'Maintenance'

interface DeviceDetail {
    id: string
    type: string
    status: DeviceStatus
    location: string
}

const DEVICE: DeviceDetail = {
    id: 'HUB-2024-0001',
    type: 'HUB',
    status: 'Active',
    location: 'Floor 3, Ward A',
}

const STATUS_OPTIONS: DeviceStatus[] = ['Active', 'Inactive', 'Maintenance']

const DeviceInformation = () => {
    const router = useRouter()
    const [selectedStatus, setSelectedStatus] = useState<DeviceStatus>(DEVICE.status)

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            {/* Page Header */}
            <View style={styles.pageHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{DEVICE.id}</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Device Information Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Information</Text>
                    <View style={styles.divider} />

                    <View style={styles.infoGrid}>
                        {/* Type */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Type</Text>
                            <Text style={styles.infoValue}>{DEVICE.type}</Text>
                        </View>

                        {/* Current Status */}
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Current Status</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusBadgeText}>{selectedStatus}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.infoItemFull}>
                        <Text style={styles.infoLabel}>Location</Text>
                        <Text style={styles.infoValue}>{DEVICE.location}</Text>
                    </View>
                </View>

                {/* Change Device Status Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Change Device Status</Text>

                    <View style={styles.statusToggleRow}>
                        {STATUS_OPTIONS.map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    styles.statusToggleBtn,
                                    selectedStatus === status && styles.statusToggleBtnActive,
                                ]}
                                onPress={() => setSelectedStatus(status)}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.statusToggleText,
                                        selectedStatus === status && styles.statusToggleTextActive,
                                    ]}
                                >
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DeviceInformation

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
        ...Typography.H2,
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
        gap: Spacing.xl,
        alignItems: 'center',
    },
    infoItem: {
        gap: 4,
        width: '48%',
    },
    infoItemFull: {
        gap: 4,
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

    /* ─── Status Badge ─── */
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.Primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
        borderRadius: BorderRadius.xl,
    },
    statusBadgeText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },

    /* ─── Status Toggle ─── */
    statusToggleRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    statusToggleBtn: {
        flex: 1,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Surface,
    },
    statusToggleBtnActive: {
        backgroundColor: Colors.Primary,
        borderColor: Colors.Primary,
    },
    statusToggleText: {
        ...Typography.BodySmall,
        color: Colors.TextSecondary,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13
    },
    statusToggleTextActive: {
        color: Colors.TextWhite,
    },
})