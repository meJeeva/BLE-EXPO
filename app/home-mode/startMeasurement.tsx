import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BorderRadius, Colors, Typography, Spacing } from '@/src/constants/theme';


const patients = [
    { id: '1', name: 'John Smith', age: 45 },
    { id: '2', name: 'Sarah Smith', age: 42 },
    { id: '3', name: 'Emma Smith', age: 12 },
];

const devices = [
    { id: '1', name: 'Living Room Device', info: 'VTZ-001 • 85% battery' },
    { id: '2', name: 'Bedroom Device', info: 'VTZ-002 • 42% battery' },
];

const PatientItem = ({ item, isSelected, onSelect }: any) => (
    <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => onSelect(item)}
    >
        <View style={styles.left}>
            <View style={[styles.avatar, isSelected && styles.selectedAvatar]}>
                <Text style={[styles.avatarText, isSelected && styles.selectedAvatarText]}>{item.name[0]}</Text>
            </View>

            <View>
                <Text style={[styles.title, isSelected && styles.selectedTitle]}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.age} years</Text>
            </View>
        </View>

        {isSelected ? (
            <Ionicons name="checkmark-circle" size={20} color={Colors.Primary} />
        ) : (
            <Ionicons name="chevron-forward" size={18} color={Colors.Disabled} />
        )}
    </TouchableOpacity>
);

const DeviceItem = ({ item, isSelected, onSelect }: any) => (
    <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => onSelect(item)}
    >
        <View style={styles.left}>
            <View style={[styles.deviceIcon, isSelected && styles.selectedDeviceIcon]}>
                <Ionicons name="phone-portrait-outline" size={18} color={isSelected ? Colors.TextWhite : Colors.Info} />
            </View>

            <View>
                <Text style={[styles.title, isSelected && styles.selectedTitle]}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.info}</Text>
            </View>
        </View>

        {isSelected ? (
            <Ionicons name="checkmark-circle" size={20} color={Colors.Primary} />
        ) : (
            <Ionicons name="chevron-forward" size={18} color={Colors.Disabled} />
        )}
    </TouchableOpacity>
);

export default function StartMeasurement() {
    const router = useRouter();
    const [selectedPatient, setSelectedPatient] = React.useState<any>(null);
    const [selectedDevice, setSelectedDevice] = React.useState<any>(null);

    const handlePatientSelect = (patient: any) => {
        setSelectedPatient((prev: any) => prev?.id === patient.id ? null : patient);
    };

    const handleDeviceSelect = (device: any) => {
        setSelectedDevice((prev: any) => prev?.id === device.id ? null : device);
    };

    const handleStartMeasurement = () => {
        router.navigate('/home-mode/measurementScreen')
        if (selectedPatient && selectedDevice) {
            console.log('Starting measurement with:', { patient: selectedPatient, device: selectedDevice });
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="person-outline" size={16} color={Colors.Info} />
                                <Text style={styles.sectionTitle}>Select Patient</Text>
                            </View>

                            <FlatList
                                data={patients}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <PatientItem
                                        item={item}
                                        isSelected={selectedPatient?.id === item.id}
                                        onSelect={handlePatientSelect}
                                    />
                                )}
                                scrollEnabled={false}
                            />
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Ionicons name="phone-portrait-outline" size={16} color={Colors.Info} />
                                <Text style={styles.sectionTitle}>Select Device</Text>
                            </View>

                            <FlatList
                                data={devices}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <DeviceItem
                                        item={item}
                                        isSelected={selectedDevice?.id === item.id}
                                        onSelect={handleDeviceSelect}
                                    />
                                )}
                                scrollEnabled={false}
                            />
                        </View>
                    </>
                }
                data={[]}
                renderItem={null}
            />
            <TouchableOpacity
                style={[
                    styles.button,
                    // (!selectedPatient || !selectedDevice) && styles.disabledButton
                ]}
                onPress={handleStartMeasurement}
            // disabled={!selectedPatient || !selectedDevice}
            >
                <Text style={[
                    styles.buttonText,
                    // (!selectedPatient || !selectedDevice) && styles.disabledButtonText
                ]}>
                    Start Session
                </Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
        backgroundColor: Colors.Surface,
    },

    headerTitle: {
        ...Typography.HeaderTitle,
        color: Colors.TextPrimary,
    },

    section: {
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.lg,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 15
    },

    sectionTitle: {
        ...Typography.SectionTitle,
        color: Colors.TextPrimary,
    },

    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    title: {
        ...Typography.CardTitle,
        color: Colors.TextPrimary,
    },

    subtitle: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E8F1FF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        color: Colors.Info,
    },

    deviceIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#E8F1FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Colors.Primary,
        padding: 16,
        alignItems: 'center',
        borderRadius: BorderRadius.lg,
        margin: Spacing.md,
    },

    buttonText: {
        ...Typography.ButtonText,
        color: Colors.TextWhite,
    },

    selectedCard: {
        borderWidth: 2,
        borderColor: Colors.Primary,
        backgroundColor: '#F0F7FF',
    },

    selectedAvatar: {
        backgroundColor: Colors.Primary,
    },

    selectedAvatarText: {
        color: Colors.TextWhite,
    },

    selectedDeviceIcon: {
        backgroundColor: Colors.Primary,
    },

    selectedTitle: {
        color: Colors.Primary,
    },

    disabledButton: {
        backgroundColor: '#E5E7EB',
        opacity: 0.6,
    },

    disabledButtonText: {
        color: '#9CA3AF',
    },
});