import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { Colors, Spacing, BorderRadius } from '@/src/constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'



const HubDeviceDetail = () => {
    const router = useRouter();

    const HUB_DEVICE = {
        deviceId: 'HUB-2024-0001',
        type: 'HUB',
        status: 'Connected',
        warrantyValidUntil: '2025-12-31',
        location: 'Floor 3, Ward A',
        capacity: '7/10',
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            <View style={styles.pageHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.pageTitle}>{HUB_DEVICE.deviceId}</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Device Information</Text>
                    <View style={styles.cardDivider} />

                    <View style={styles.row}>
                        <View style={styles.rowCell}>
                            <Text style={styles.fieldLabel}>Type</Text>
                            <Text style={styles.fieldValue}>{HUB_DEVICE.type}</Text>
                        </View>
                        <View style={styles.rowCell}>
                            <Text style={styles.fieldLabel}>Status</Text>
                            <View style={styles.connectedBadge}>
                                <Text style={styles.connectedBadgeIcon}>◉ </Text>
                                <Text style={styles.connectedBadgeText}>Connected</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.fieldBlock}>
                        <Text style={styles.fieldLabel}>Warranty Valid Until</Text>
                        <Text style={styles.fieldValue}>{HUB_DEVICE.warrantyValidUntil}</Text>
                    </View>

                    <View style={styles.fieldBlock}>
                        <Text style={styles.fieldLabel}>Location</Text>
                        <Text style={styles.fieldValue}>{HUB_DEVICE.location}</Text>
                    </View>

                    <View style={[styles.fieldBlock, { marginBottom: 0 }]}>
                        <Text style={styles.fieldLabel}>Capacity</Text>
                        <Text style={[styles.fieldValue, styles.capacityValue]}>{HUB_DEVICE.capacity}</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HubDeviceDetail;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

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
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    container: { flex: 1 },
    contentContainer: {
        padding: Spacing.md,
        gap: Spacing.md,
        paddingBottom: Spacing.xxl,
    },

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

    row: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    rowCell: { flex: 1 },

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
    capacityValue: { color: Colors.Primary },

    connectedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#15803D',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    connectedBadgeIcon: {
        fontSize: 9,
        color: Colors.TextWhite,
        marginRight: 2,
    },
    connectedBadgeText: {
        fontSize: 13,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },
});