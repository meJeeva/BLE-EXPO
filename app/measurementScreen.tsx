import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';
import { Colors, Typography } from '@/src/constants/theme';


const vitals = [
    {
        id: '1',
        title: 'Heart Rate',
        value: '72',
        unit: 'bpm',
        color: '#E53935',
        icon: 'heart',
        data: [70, 72, 75, 73, 72, 71, 74, 73, 72, 71],
    },
    {
        id: '2',
        title: 'Heart Rate Variability (HRV)',
        value: '55',
        unit: 'ms',
        color: '#7C4DFF',
        icon: 'heart',
        data: [50, 55, 53, 58, 54, 55, 56, 54, 53, 55],
    },
    {
        id: '3',
        title: 'Respiratory Rate',
        value: '18',
        unit: 'breaths/min',
        color: '#2563EB',
        icon: 'waveform',
        data: [16, 17, 18, 19, 18, 18, 17, 19, 18, 18],
    },
    {
        id: '4',
        title: 'Blood Oxygen (SpO2)',
        value: '98',
        unit: '%',
        color: '#27AE60',
        icon: 'water',
        data: [97, 98, 99, 98, 97, 98, 99, 98, 97, 98],
    },
    {
        id: '5',
        title: 'Temperature',
        value: '36.8',
        unit: '°C',
        color: '#F59E0B',
        icon: 'thermometer',
        data: [36.5, 36.7, 36.8, 36.9, 36.8, 36.8, 36.7, 36.9, 36.8, 36.8],
    },
];


const VitalCard = ({ item, tempUnit, onTempUnitChange, viewMode }: any) => {
    const convertTemp = (celsius: string, unit: 'C' | 'F') => {
        const temp = parseFloat(celsius);
        if (unit === 'F') {
            return ((temp * 9/5) + 32).toFixed(1);
        }
        return celsius;
    };

    const getTempUnit = (unit: 'C' | 'F') => {
        return unit === 'F' ? '°F' : '°C';
    };

    const chartData = item.data.map((value: number, index: number) => ({
        value:
            item.title === 'Temperature'
                ? tempUnit === 'F'
                    ? (value * 9/5) + 32
                    : value
                : value,
        label: index === 0 ? '0s' : index === item.data.length - 1 ? '9s' : `${index}s`,
    }));

    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title} {viewMode === 'chart' ? `(${item.title === 'Temperature' ? getTempUnit(tempUnit) : item.unit})` : ''}</Text>

                {viewMode === 'cards' ? (
                    <View style={styles.valueRow}>
                        <Text style={[styles.value, { color: item.color }]}>
                            {item.title === 'Temperature' ? convertTemp(item.value, tempUnit) : item.data[item.data.length - 1]}
                        </Text>
                        <Text style={styles.unit}> 
                            {item.title === 'Temperature' ? getTempUnit(tempUnit) : item.unit}
                        </Text>
                    </View>
                ) : (
                    <LineChart
                        data={chartData}
                        height={100}
                        width={225}
                        color={item.color}
                        thickness={2}
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
                        spacing={30}
                    />
                )}

                <Text style={styles.status}>Normal</Text>
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

                {item.title === 'Temperature' && (
                    <View style={styles.tempUnitToggle}>
                        <TouchableOpacity
                            style={tempUnit === 'C' ? styles.tempUnitActive : styles.tempUnitInactive}
                            onPress={() => onTempUnitChange('C')}
                        >
                            <Text style={tempUnit === 'C' ? styles.tempUnitActiveText : styles.tempUnitInactiveText}>°C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tempUnit === 'F' ? styles.tempUnitActive : styles.tempUnitInactive}
                            onPress={() => onTempUnitChange('F')}
                        >
                            <Text style={tempUnit === 'F' ? styles.tempUnitActiveText : styles.tempUnitInactiveText}>°F</Text>
                        </TouchableOpacity>
                    </View>
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
                renderItem={({ item }) => <VitalCard item={item} tempUnit={tempUnit} onTempUnitChange={setTempUnit} viewMode={viewMode} />}
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
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
    },

    device: {
        ...Typography.Caption,
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
        ...Typography.Caption,
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
        ...Typography.Caption,
        color: Colors.Secondary,
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
        ...Typography.Caption,
        color: Colors.Primary,
    },

    toggleInactive: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },

    toggleActiveText: {
        ...Typography.Caption,
        color: Colors.Primary,
    },

    toggleInactiveText: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
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
        ...Typography.Caption,
        color: Colors.TextPrimary,
        marginBottom: 16,
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
    },

    value: {
        ...Typography.H1,
    },

    unit: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 2,
    },

    status: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 6,
    },

    iconWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
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
        ...Typography.ButtonText,
        color: Colors.TextWhite,
    },

    tempUnitToggle: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        padding: 2,
        marginTop: 8,
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
    },

    tempUnitInactiveText: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
});