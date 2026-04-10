import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme';

const vitals = [
    {
        id: '1',
        title: 'Heart Rate',
        unit: 'bpm',
        color: Colors.Error,
        icon: 'heart',
        data: [70, 72, 75, 73, 72, 71, 74, 73, 72, 71],
    },
    {
        id: '2',
        title: 'HRV',
        unit: 'ms',
        color: '#7C4DFF',
        icon: 'chart',
        data: [40, 45, 50, 48, 46, 45],
    },
    {
        id: '3',
        title: 'SpO2',
        unit: '%',
        color: Colors.Secondary,
        icon: 'water',
        data: [97, 98, 99, 98, 97, 98],
    },
    {
        id: '4',
        title: 'Respiratory Rate',
        unit: 'br/min',
        color: Colors.Info,
        icon: 'waveform',
        data: [14, 15, 16, 17, 16, 16],
    },
    {
        id: '5',
        title: 'Temperature',
        unit: '°C',
        color: Colors.Warning,
        icon: 'thermometer',
        data: [36.5, 36.7, 36.8, 36.9, 36.8, 36.8],
    },
];

export default function PatientsVitals() {
    const [selected, setSelected] = useState(vitals[0]);
    const [range, setRange] = useState('24h');
    const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

    const convertTemp = (celsius: number, unit: 'C' | 'F') => {
        if (unit === 'F') {
            return ((celsius * 9 / 5) + 32).toFixed(1);
        }
        return celsius.toFixed(1);
    };

    const getTempUnit = (unit: 'C' | 'F') => {
        return unit === 'F' ? '°F' : '°C';
    };

    const getChartData = (vital: typeof vitals[0]) => {
        return vital.data.map((value: number, index: number) => ({
            value:
                vital.title === 'Temperature'
                    ? tempUnit === 'F'
                        ? (value * 9 / 5) + 32
                        : value
                    : value,
            label: index === 0 ? '0s' : index === vital.data.length - 1 ? '5s' : `${index}s`,
        }));
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER CARD */}
                <View style={styles.headerCard}>
                    <View>
                        <Text style={styles.name}>Sarah Mitchell</Text>
                        <Text style={styles.device}>Device: VZ-2847</Text>
                    </View>

                    <View style={styles.badge}>
                        <View style={styles.dot} />
                        <Text style={styles.badgeText}>Stable</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Key Vitals</Text>

                <View>
                    <FlatList
                        data={vitals}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => (
                            <VitalCard
                                item={item}
                                onPress={() => setSelected(item)}
                                isLast={index === vitals.length - 1}
                            />
                        )}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />

                </View>

                <View>
                    <View style={[styles.filter, {}]}>
                        {['24h', '7 days'].map((r) => (
                            <TouchableOpacity
                                key={r}
                                onPress={() => setRange(r)}
                                style={[styles.filterBtn, range === r && styles.filterActive]}
                            >
                                <Text style={range === r ? styles.filterTextActive : styles.filterText}>
                                    {r}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Heart Rate Chart */}
                    <View style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Text style={styles.chartTitle}>Heart Rate (bpm)</Text>
                        </View>
                        <LineChart
                            data={getChartData(vitals[0])}
                            height={140}
                            width={225}
                            spacing={30}
                            thickness={2}
                            color={vitals[0].color}
                            hideDataPoints
                            isAnimated
                            curved
                            yAxisTextStyle={{ ...Typography.Caption, color: Colors.TextSecondary }}
                            xAxisLabelTextStyle={{ ...Typography.Caption, color: Colors.TextSecondary }}
                            xAxisColor={Colors.TextSecondary}
                            yAxisColor={Colors.TextSecondary}
                            rulesColor={Colors.TextSecondary}
                            rulesType="solid"
                            noOfSections={4}
                            initialSpacing={10}
                            endSpacing={10}
                        />
                    </View>

                    {/* SpO2 Chart */}
                    <View style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Text style={styles.chartTitle}>SpO2 (%)</Text>
                        </View>
                        <LineChart
                            data={getChartData(vitals[2])}
                            height={140}
                            width={225}
                            spacing={30}
                            thickness={2}
                            color={vitals[2].color}
                            hideDataPoints
                            isAnimated
                            curved
                            yAxisTextStyle={{ ...Typography.Caption, color: Colors.TextSecondary }}
                            xAxisLabelTextStyle={{ ...Typography.Caption, color: Colors.TextSecondary }}
                            xAxisColor={Colors.TextSecondary}
                            yAxisColor={Colors.TextSecondary}
                            rulesColor={Colors.TextSecondary}
                            rulesType="solid"
                            noOfSections={4}
                            initialSpacing={10}
                            endSpacing={10}
                        />
                    </View>

                    {/* Temperature Chart */}
                    <View style={styles.chartCard}>
                        <View style={styles.chartHeader}>
                            <Text style={styles.chartTitle}>Temperature ({getTempUnit(tempUnit)})</Text>
                            <View style={styles.tempUnitToggle}>
                                <TouchableOpacity
                                    style={tempUnit === 'C' ? styles.tempUnitActive : styles.tempUnitInactive}
                                    onPress={() => setTempUnit('C')}
                                >
                                    <Text style={tempUnit === 'C' ? styles.tempUnitActiveText : styles.tempUnitInactiveText}>°C</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={tempUnit === 'F' ? styles.tempUnitActive : styles.tempUnitInactive}
                                    onPress={() => setTempUnit('F')}
                                >
                                    <Text style={tempUnit === 'F' ? styles.tempUnitActiveText : styles.tempUnitInactiveText}>°F</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <LineChart
                            data={getChartData(vitals[4])}
                            height={140}
                            width={225}
                            spacing={30}
                            thickness={2}
                            color={vitals[4].color}
                            hideDataPoints
                            isAnimated
                            curved
                            yAxisTextStyle={{ ...Typography.Caption, color: Colors.TextSecondary }}
                            xAxisLabelTextStyle={{ ...Typography.Caption, color: Colors.TextSecondary }}
                            xAxisColor={Colors.TextSecondary}
                            yAxisColor={Colors.TextSecondary}
                            rulesColor={Colors.TextSecondary}
                            rulesType="solid"
                            noOfSections={4}
                            initialSpacing={10}
                            endSpacing={10}
                        />
                    </View>
                </View>
                {/* RECENT ALERTS */}
                <Text style={styles.sectionTitle}>Recent Alerts</Text>

                <View style={styles.alertCard}>
                    <View style={styles.alertRow}>
                        <Ionicons name="warning-outline" size={16} color={Colors.Warning} />
                        <Text style={[styles.alertText, { color: Colors.Warning }]}>
                            SpO2 dropped below 94%
                        </Text>
                    </View>
                    <Text style={styles.alertTime}>2 hours ago</Text>
                </View>

                <View style={styles.alertCardBlue}>
                    <View style={styles.alertRow}>
                        <Ionicons name="alert-circle-outline" size={16} color={Colors.Info} />
                        <Text style={[styles.alertText, { color: Colors.Info }]}>
                            Heart rate elevated for 10 minutes
                        </Text>
                    </View>
                    <Text style={styles.alertTime}>5 hours ago</Text>
                </View>

                {/* DEVICE STATUS */}
                <Text style={styles.sectionTitle}>Device Status</Text>

                <View style={styles.deviceCard}>
                    <View style={styles.deviceRow}>
                        <View style={styles.deviceItem}>
                            <Ionicons name="battery-full" size={18} color={Colors.TextSecondary} />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.deviceLabel}>Battery</Text>
                                <Text style={styles.deviceValue}>87%</Text>
                            </View>
                        </View>

                        <View style={styles.deviceItem}>
                            <Ionicons name="wifi-outline" size={18} color={Colors.Secondary} />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.deviceLabel}>Connection</Text>
                                <Text style={[styles.deviceValue, { color: Colors.Secondary }]}>
                                    Connected
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const VitalCard = ({ item, onPress, isLast }: any) => {
    const latest = item.data[item.data.length - 1];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.card,
                isLast && { width: '100%' },
            ]}
        >
            <View style={styles.cardTop}>
                <View style={styles.iconBox}>
                    {item.icon === 'heart' && <Ionicons name="heart" size={14} color={Colors.Error} />}
                    {item.icon === 'water' && <Ionicons name="water" size={14} color={Colors.Info} />}
                    {item.icon === 'thermometer' && (
                        <MaterialCommunityIcons name="thermometer" size={14} color={Colors.Warning} />
                    )}
                    {item.icon === 'waveform' && <Ionicons name="pulse" size={14} color={Colors.Info} />}
                    {item.icon === 'chart' && <Ionicons name="bar-chart" size={14} color={Colors.Info} />}
                </View>

                <Ionicons name="remove" size={16} color={Colors.Border} />
            </View>

            <Text style={styles.label}>{item.title}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={styles.value}>{latest}</Text>
                <Text style={styles.unit}> {item.unit}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    headerCard: {
        backgroundColor: Colors.Surface,
        margin: 16,
        padding: 16,
        borderRadius: BorderRadius.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },

    name: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
    },

    device: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9F7EF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    dot: {
        width: 6,
        height: 6,
        backgroundColor: Colors.Secondary,
        borderRadius: 3,
        marginRight: 6,
    },

    badgeText: {
        ...Typography.Caption,
        color: Colors.Secondary,
    },

    sectionTitle: {
        marginHorizontal: 16,
        marginBottom: 8,
        ...Typography.Caption,
        fontWeight: '600',
        color: Colors.TextPrimary,
        marginVertical: 8,
        marginTop: 12
    },

    card: {
        backgroundColor: Colors.Surface,
        borderRadius: 12,
        padding: 12,
        width: '48%',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },

    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    iconBox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 4,
    },

    value: {
        ...Typography.H1,
        color: Colors.TextPrimary,
    },

    unit: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },

    filter: {
        flexDirection: 'row',
        marginLeft: 16,
        marginTop: 4,
        marginBottom: 8,
    },

    filterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: Colors.Surface,
        marginRight: 8,
        borderWidth: 1,
        borderColor: Colors.Border,
    },

    filterActive: {
        backgroundColor: Colors.Primary,
    },

    filterText: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        fontWeight: '500'
    },

    filterTextActive: {
        ...Typography.Caption,
        color: Colors.TextWhite,
        fontWeight: '600',
    },

    chartCard: {
        backgroundColor: Colors.Surface,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
        marginVertical: 10
    },

    chartTitle: {
        ...Typography.Caption,
        fontWeight: '600',
        marginBottom: 10,
        color: Colors.TextPrimary,
    },

    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    tempUnitToggle: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        padding: 2,
    },

    tempUnitActive: {
        backgroundColor: Colors.Surface,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },

    tempUnitInactive: {
        paddingHorizontal: 8,
        paddingVertical: 2,
    },

    tempUnitActiveText: {
        ...Typography.Caption,
        color: Colors.Primary,
        fontWeight: '600',
    },

    tempUnitInactiveText: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        fontWeight: '600',
    },
    alertCard: {
        backgroundColor: '#F5EDE3',
        marginHorizontal: 16,
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },

    alertCardBlue: {
        backgroundColor: '#EAF2FF',
        marginHorizontal: 16,
        padding: 14,
        borderRadius: 12,
        marginBottom: 16,

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },

    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },

    alertText: {
        ...Typography.Caption,
        fontWeight: '600',
    },

    alertTime: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        marginLeft: 22,
    },

    deviceCard: {
        backgroundColor: Colors.Surface,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 30,
    },

    deviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    deviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    deviceLabel: {
        ...Typography.Caption,
        color: Colors.TextPrimary,
        fontWeight: '600',
    },

    deviceValue: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
});