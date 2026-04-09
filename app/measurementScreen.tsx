import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';


const vitals = [
    {
        id: '1',
        title: 'Heart Rate',
        value: '72',
        unit: 'bpm',
        color: '#E53935',
        icon: 'heart',
    },
    {
        id: '2',
        title: 'Heart Rate Variability (HRV)',
        value: '55',
        unit: 'ms',
        color: '#7C4DFF',
        icon: 'heart',
    },
    {
        id: '3',
        title: 'Respiratory Rate',
        value: '18',
        unit: 'breaths/min',
        color: '#2563EB',
        icon: 'waveform',
    },
    {
        id: '4',
        title: 'Blood Oxygen (SpO₂)',
        value: '98',
        unit: '%',
        color: '#27AE60',
        icon: 'water',
    },
    {
        id: '5',
        title: 'Temperature',
        value: '36.8',
        unit: '°C',
        color: '#F59E0B',
        icon: 'thermometer',
    },
];

const VitalCard = ({ item }: any) => {
    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>

                <View style={styles.valueRow}>
                    <Text style={[styles.value, { color: item.color }]}>
                        {item.value}
                    </Text>
                    <Text style={styles.unit}> {item.unit}</Text>
                </View>

                <Text style={styles.status}>→ Normal</Text>
            </View>

            <View style={styles.iconWrapper}>
                {item.icon === 'heart' && (
                    <Ionicons name="heart" size={20} color={Colors.Error} />
                )}
                {item.icon === 'water' && (
                    <Ionicons name="water" size={20} color={Colors.Info} />
                )}
                {item.icon === 'thermometer' && (
                    <MaterialCommunityIcons
                        name="thermometer"
                        size={20}
                        color={Colors.Warning}
                    />
                )}
                {item.icon === 'waveform' && (
                    <Ionicons name="pulse" size={20} color={Colors.Info} />
                )}
            </View>
        </View>
    );
};

export default function MeasurementScreen() {
    const [viewMode, setViewMode] = React.useState<'cards' | 'chart'>('cards');
    const [tempUnit, setTempUnit] = React.useState<'C' | 'F'>('C');

    return (
        <View style={styles.container}>
            <View style={{
                padding: 16,
                backgroundColor: Colors.Surface,
            }}>
                <View style={styles.header}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatar}>
                            <Ionicons name="person-outline" size={18} color={Colors.Info} />
                        </View>

                        <View>
                            <Text style={styles.name}>John Smith</Text>
                            <Text style={styles.device}>VTZ-1254-2025</Text>
                        </View>
                    </View>

                    <View style={styles.battery}>
                        <Ionicons name='battery-full' size={18} color={Colors.Secondary} />
                        <Text style={styles.batteryText}>85%</Text>
                    </View>
                </View>

                <View style={styles.statusRow}>
                    <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>Live</Text>
                    </View>

                    <View style={styles.tempToggle}>
                        <TouchableOpacity
                            style={tempUnit === 'C' ? styles.toggleActive : styles.toggleInactive}
                            onPress={() => setTempUnit('C')}
                        >
                            <Text style={tempUnit === 'C' ? styles.toggleActiveText : styles.toggleInactiveText}>°C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tempUnit === 'F' ? styles.toggleActive : styles.toggleInactive}
                            onPress={() => setTempUnit('F')}
                        >
                            <Text style={tempUnit === 'F' ? styles.toggleActiveText : styles.toggleInactiveText}>°F</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.toggle}>
                        <TouchableOpacity
                            style={viewMode === 'cards' ? styles.toggleActive : styles.toggleInactive}
                            onPress={() => setViewMode('cards')}
                        >
                            <Text style={viewMode === 'cards' ? styles.toggleActiveText : styles.toggleInactiveText}>Cards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={viewMode === 'chart' ? styles.toggleActive : styles.toggleInactive}
                            onPress={() => setViewMode('chart')}
                        >
                            <Ionicons
                                name="bar-chart"
                                size={16}
                                color={viewMode === 'chart' ? Colors.Primary : Colors.TextSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FlatList
                data={vitals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <VitalCard item={item} />}
                contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>End Session</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E8F1FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    name: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.TextPrimary,
    },

    device: {
        fontSize: 12,
        color: Colors.TextSecondary,
    },

    battery: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    batteryIcon: {
        width: 18,
        height: 10,
        borderWidth: 1,
        borderColor: Colors.Secondary,
        borderRadius: 2,
    },

    batteryText: {
        fontSize: 12,
        color: Colors.TextSecondary,
    },

    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        marginBottom: 1
    },

    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9F7EF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.Secondary,
        marginRight: 6,
    },

    liveText: {
        fontSize: 12,
        color: Colors.Secondary,
        fontWeight: '500',
    },

    toggle: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        padding: 4,
    },

    toggleActive: {
        backgroundColor: Colors.Surface,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 12,
        color: Colors.Primary,
        fontWeight: '600',
    },

    toggleInactive: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 12,
        color: Colors.TextSecondary,
    },

    toggleActiveText: {
        fontSize: 12,
        color: Colors.Primary,
        fontWeight: '600',
    },

    toggleInactiveText: {
        fontSize: 12,
        color: Colors.TextSecondary,
        fontWeight: '600',
    },

    tempToggle: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        padding: 4,
    },

    card: {
        backgroundColor: Colors.Surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',

        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },

    cardTitle: {
        fontSize: 13,
        color: Colors.TextSecondary,
        marginBottom: 6,
        fontWeight: '600'
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    value: {
        fontSize: 24,
        fontWeight: '700',
    },

    unit: {
        fontSize: 13,
        color: Colors.TextSecondary,
        marginBottom: 2,
        fontWeight: '500'
    },

    status: {
        fontSize: 12,
        color: Colors.TextSecondary,
        marginTop: 6,
        fontWeight: '500'
    },

    iconWrapper: {
        justifyContent: 'flex-start',
    },

    button: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: '#FF2D2D',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});