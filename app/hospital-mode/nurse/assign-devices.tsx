import {
    FlatList,
    Modal,
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

/* ── Mock Data ── */
const DEVICES = [
    { id: 'd1', name: 'VZ-2024-0020', type: 'VitalZ', status: 'Active' },
    { id: 'd2', name: 'VZ-2024-0021', type: 'VitalZ', status: 'Active' },
    { id: 'd3', name: 'VZ-2024-0022', type: 'VitalZ', status: 'Inactive' },
    { id: 'd4', name: 'VZ-2024-0023', type: 'VitalZ', status: 'Active' },
]

const PATIENTS = [
    { id: 'p1', name: 'John Smith', mrn: 'MRN-12345', ward: '3A', bed: '12' },
    { id: 'p2', name: 'Mary Johnson', mrn: 'MRN-12346', ward: '3A', bed: '15' },
    { id: 'p3', name: 'Michael Brown', mrn: 'MRN-12347', ward: '3B', bed: '08' },
    { id: 'p4', name: 'Emma Davis', mrn: 'MRN-12348', ward: '2C', bed: '04' },
]

const HUBS = [
    { id: 'h1', name: 'HUB-2024-0001', location: 'Floor 3, Ward A', capacity: '7/10' },
    { id: 'h2', name: 'HUB-2024-0002', location: 'Floor 3, Ward B', capacity: '5/10' },
    { id: 'h3', name: 'HUB-2024-0010', location: 'Floor 2, Ward C', capacity: '3/10' },
]

type ModalType = 'device' | 'patient' | 'hub' | null

const AssignDevice = () => {
    const router = useRouter()

    const [selectedDevice, setSelectedDevice] = useState<typeof DEVICES[0] | null>(null)
    const [selectedPatient, setSelectedPatient] = useState<typeof PATIENTS[0] | null>(null)
    const [selectedHub, setSelectedHub] = useState<typeof HUBS[0] | null>(null)
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [assigned, setAssigned] = useState(false)

    const allSelected = selectedDevice && selectedPatient && selectedHub

    const handleAssign = () => {
        if (!allSelected) return
        setAssigned(true)
        setTimeout(() => {
            setAssigned(false)
            setSelectedDevice(null)
            setSelectedPatient(null)
            setSelectedHub(null)
        }, 2000)
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
                <Text style={styles.pageTitle}>Assign Device</Text>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Step 1 – Device */}
                <TouchableOpacity
                    style={[styles.stepCard, selectedDevice && styles.stepCardSelected]}
                    onPress={() => setActiveModal('device')}
                    activeOpacity={0.75}
                >
                    <Text style={styles.stepLabel}>Step 1: Select Device</Text>
                    {selectedDevice ? (
                        <View style={styles.selectedRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.selectedTitle}>{selectedDevice.name}</Text>
                                <Text style={styles.selectedSub}>{selectedDevice.type} · {selectedDevice.status}</Text>
                            </View>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.Primary} />
                        </View>
                    ) : (
                        <Text style={styles.stepPlaceholder}>Tap to select device</Text>
                    )}
                </TouchableOpacity>

                {/* Step 2 – Patient */}
                <TouchableOpacity
                    style={[styles.stepCard, selectedPatient && styles.stepCardSelected]}
                    onPress={() => setActiveModal('patient')}
                    activeOpacity={0.75}
                >
                    <Text style={styles.stepLabel}>Step 2: Select Patient</Text>
                    {selectedPatient ? (
                        <View style={styles.selectedRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.selectedTitle}>{selectedPatient.name}</Text>
                                <Text style={styles.selectedSub}>{selectedPatient.mrn} · Ward {selectedPatient.ward}, Bed {selectedPatient.bed}</Text>
                            </View>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.Primary} />
                        </View>
                    ) : (
                        <Text style={styles.stepPlaceholder}>Tap to select patient</Text>
                    )}
                </TouchableOpacity>

                {/* Step 3 – HUB */}
                <TouchableOpacity
                    style={[styles.stepCard, selectedHub && styles.stepCardSelected]}
                    onPress={() => setActiveModal('hub')}
                    activeOpacity={0.75}
                >
                    <Text style={styles.stepLabel}>Step 3: Select HUB</Text>
                    {selectedHub ? (
                        <View style={styles.selectedRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.selectedTitle}>{selectedHub.name}</Text>
                                <Text style={styles.selectedSub}>{selectedHub.location} · {selectedHub.capacity}</Text>
                            </View>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.Primary} />
                        </View>
                    ) : (
                        <Text style={styles.stepPlaceholder}>Tap to select HUB</Text>
                    )}
                </TouchableOpacity>

                {/* Assign Button */}
                {allSelected && (
                    <TouchableOpacity
                        style={[styles.assignBtn, assigned && styles.assignBtnDone]}
                        onPress={handleAssign}
                        activeOpacity={0.85}
                    >
                        {assigned ? (
                            <View style={styles.assignBtnInner}>
                                <Ionicons name="checkmark-circle" size={18} color={Colors.TextWhite} />
                                <Text style={styles.assignBtnText}>Assigned!</Text>
                            </View>
                        ) : (
                            <Text style={styles.assignBtnText}>Assign Device</Text>
                        )}
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* ── Device Modal ── */}
            <SelectionModal
                visible={activeModal === 'device'}
                title="Select Device"
                onClose={() => setActiveModal(null)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.modalItem, selectedDevice?.id === item.id && styles.modalItemSelected]}
                        onPress={() => { setSelectedDevice(item); setActiveModal(null) }}
                        activeOpacity={0.75}
                    >
                        <View style={styles.modalItemIconBox}>
                            <MaterialCommunityIcons name="watch-variant" size={18} color={Colors.Primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalItemTitle}>{item.name}</Text>
                            <Text style={styles.modalItemSub}>{item.type} · {item.status}</Text>
                        </View>
                        {selectedDevice?.id === item.id && (
                            <Ionicons name="checkmark-circle" size={18} color={Colors.Primary} />
                        )}
                    </TouchableOpacity>
                )}
                data={DEVICES}
            />

            {/* ── Patient Modal ── */}
            <SelectionModal
                visible={activeModal === 'patient'}
                title="Select Patient"
                onClose={() => setActiveModal(null)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.modalItem, selectedPatient?.id === item.id && styles.modalItemSelected]}
                        onPress={() => { setSelectedPatient(item); setActiveModal(null) }}
                        activeOpacity={0.75}
                    >
                        <View style={styles.modalItemIconBox}>
                            <Ionicons name="person-outline" size={18} color={Colors.Primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalItemTitle}>{item.name}</Text>
                            <Text style={styles.modalItemSub}>{item.mrn} · Ward {item.ward}, Bed {item.bed}</Text>
                        </View>
                        {selectedPatient?.id === item.id && (
                            <Ionicons name="checkmark-circle" size={18} color={Colors.Primary} />
                        )}
                    </TouchableOpacity>
                )}
                data={PATIENTS}
            />

            {/* ── HUB Modal ── */}
            <SelectionModal
                visible={activeModal === 'hub'}
                title="Select HUB"
                onClose={() => setActiveModal(null)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.modalItem, selectedHub?.id === item.id && styles.modalItemSelected]}
                        onPress={() => { setSelectedHub(item); setActiveModal(null) }}
                        activeOpacity={0.75}
                    >
                        <View style={styles.modalItemIconBox}>
                            <MaterialCommunityIcons name="router-wireless" size={18} color={Colors.Secondary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalItemTitle}>{item.name}</Text>
                            <Text style={styles.modalItemSub}>{item.location} · {item.capacity}</Text>
                        </View>
                        {selectedHub?.id === item.id && (
                            <Ionicons name="checkmark-circle" size={18} color={Colors.Primary} />
                        )}
                    </TouchableOpacity>
                )}
                data={HUBS}
            />
        </SafeAreaView>
    )
}

/* ── Reusable Selection Modal ── */
const SelectionModal = ({
    visible,
    title,
    onClose,
    data,
    renderItem,
}: {
    visible: boolean
    title: string
    onClose: () => void
    data: any[]
    renderItem: ({ item }: { item: any }) => React.ReactElement
}) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose} />
        <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                    <Ionicons name="close" size={22} color={Colors.TextSecondary} />
                </TouchableOpacity>
            </View>
            <View style={styles.modalDivider} />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.modalList}
                ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
                renderItem={renderItem}
            />
        </View>
    </Modal>
)

export default AssignDevice

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
    backBtn: { padding: Spacing.xs },
    pageTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    container: { flex: 1 },
    contentContainer: {
        padding: Spacing.md,
        gap: Spacing.sm,
        paddingBottom: Spacing.xl,
    },

    /* ─── Step Cards ─── */
    stepCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.xs,
    },
    stepCardSelected: {
        borderColor: Colors.Primary,
        borderWidth: 1.5,
    },
    stepLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        fontFamily: 'Inter_600SemiBold',
    },
    stepPlaceholder: {
        ...Typography.CardTitle,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    selectedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    selectedTitle: {
        ...Typography.CardTitle,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    selectedSub: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },

    /* ─── Assign Button ─── */
    assignBtn: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.sm,
    },
    assignBtnDone: {
        backgroundColor: Colors.Secondary,
    },
    assignBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    assignBtnText: {
        ...Typography.ButtonText,
        color: Colors.TextWhite,
    },

    /* ─── Modal ─── */
    modalOverlay: {
        flex: 1,
        backgroundColor: Colors.Overlay,
    },
    modalSheet: {
        backgroundColor: Colors.Surface,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        paddingBottom: Spacing.xl,
        maxHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    modalTitle: {
        ...Typography.H2,
        color: Colors.TextPrimary,
    },
    modalCloseBtn: {
        padding: Spacing.xs,
    },
    modalDivider: {
        height: 1,
        backgroundColor: Colors.Border,
    },
    modalList: {
        padding: Spacing.md,
    },
    modalSeparator: {
        height: 1,
        backgroundColor: Colors.Border,
        marginVertical: Spacing.xs,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.xs,
    },
    modalItemSelected: {
        backgroundColor: Colors.PrimaryLight,
    },
    modalItemIconBox: {
        width: 36,
        height: 36,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.Background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    modalItemTitle: {
        ...Typography.BodySmall,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
    },
    modalItemSub: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },
})