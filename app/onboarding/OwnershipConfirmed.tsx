import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/src/constants/theme';
import { Button } from '@/src/components/Button';
import { useRouter } from 'expo-router';


export default function OwnershipConfirmedScreen() {

    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconWrapper}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="checkmark" size={28} color="#16A34A" />
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>Ownership Confirmed!</Text>
                <Text style={styles.subtitle}>
                    You are now the owner of this device
                </Text>

                {/* Warranty Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardIcon}>
                            <Ionicons name="shield-outline" size={20} color="#2563EB" />
                        </View>

                        <View>
                            <Text style={styles.cardTitle}>Warranty Activated</Text>
                            <Text style={styles.cardSubtitle}>
                                2-year comprehensive coverage
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.validRow}>
                        <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.validLabel}>Valid Until</Text>
                            <Text style={styles.validDate}>January 10, 2028</Text>
                        </View>
                    </View>
                </View>

                {/* Benefits List */}
                <View style={styles.list}>
                    {[
                        'Free repairs and replacements',
                        'Lifetime firmware updates',
                        '24/7 priority customer support',
                    ].map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <View style={styles.checkIcon}>
                                <Ionicons name="checkmark" size={14} color="#16A34A" />
                            </View>
                            <Text style={styles.listText}>{item}</Text>
                        </View>
                    ))}
                </View>


            </View>
            <Button
                title="Continue Setup"
                // onPress={handleSubmit}
                onPress={() => {
                    router.navigate('/onboarding/household')
                }}
                // loading={loading}
                // disabled={loading || !formData.purchaseDate}
                style={styles.button}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },

    iconWrapper: {
        marginBottom: 16,
    },

    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 24,
    },

    /* ✅ Card */
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 24,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    cardSubtitle: {
        fontSize: 12,
        color: '#6B7280',
    },

    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },

    validRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    validLabel: {
        fontSize: 11,
        color: '#6B7280',
    },

    validDate: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },

    /* ✅ List */
    list: {
        width: '100%',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    checkIcon: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    listText: {
        fontSize: 13,
        color: '#374151',
    },
    button: {
        marginVertical: Spacing.md,
    },
});