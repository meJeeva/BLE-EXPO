import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

const CreatePatient = () => {
    const router = useRouter()

    const [form, setForm] = useState({
        patientName: '',
        age: '',
        gender: '',
        mobileNumber: '',
        mrn: '',
        ward: '',
        bed: '',
        assignedDoctor: '',
    })

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        // handle create patient logic
        console.log('Create Patient:', form)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Page Header */}
                <View style={styles.pageHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Create Patient</Text>
                </View>

                {/* Form Card */}
                <View style={styles.formCard}>

                    {/* Patient Name */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Patient Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor={Colors.TextSecondary}
                            value={form.patientName}
                            onChangeText={(v) => handleChange('patientName', v)}
                        />
                    </View>

                    {/* Age + Gender Row */}
                    <View style={styles.row}>
                        <View style={[styles.fieldGroup, styles.rowItem]}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="65"
                                placeholderTextColor={Colors.TextSecondary}
                                keyboardType="numeric"
                                value={form.age}
                                onChangeText={(v) => handleChange('age', v)}
                            />
                        </View>

                        <View style={[styles.fieldGroup, styles.rowItem]}>
                            <Text style={styles.label}>Gender</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={form.gender}
                                    onValueChange={(v) => handleChange('gender', v)}
                                    style={styles.picker}
                                    dropdownIconColor={Colors.TextSecondary}
                                >
                                    <Picker.Item label="Select" value="" color={Colors.TextSecondary} />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Other" value="other" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* Mobile Number */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+1-234-567-8900"
                            placeholderTextColor={Colors.TextSecondary}
                            keyboardType="phone-pad"
                            value={form.mobileNumber}
                            onChangeText={(v) => handleChange('mobileNumber', v)}
                        />
                    </View>

                    {/* MRN */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>MRN</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MRN-XXXXX"
                            placeholderTextColor={Colors.TextSecondary}
                            value={form.mrn}
                            onChangeText={(v) => handleChange('mrn', v)}
                        />
                    </View>

                    {/* Ward + Bed Row */}
                    <View style={styles.row}>
                        <View style={[styles.fieldGroup, styles.rowItem]}>
                            <Text style={styles.label}>Ward</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="3A"
                                placeholderTextColor={Colors.TextSecondary}
                                value={form.ward}
                                onChangeText={(v) => handleChange('ward', v)}
                            />
                        </View>

                        <View style={[styles.fieldGroup, styles.rowItem]}>
                            <Text style={styles.label}>Bed</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="12"
                                placeholderTextColor={Colors.TextSecondary}
                                keyboardType="numeric"
                                value={form.bed}
                                onChangeText={(v) => handleChange('bed', v)}
                            />
                        </View>
                    </View>

                    {/* Assigned Doctor */}
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Assigned Doctor</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Dr. Johnson"
                            placeholderTextColor={Colors.TextSecondary}
                            value={form.assignedDoctor}
                            onChangeText={(v) => handleChange('assignedDoctor', v)}
                        />
                    </View>

                </View>

                {/* Create Button */}
                <TouchableOpacity style={styles.createBtn} onPress={handleSubmit} activeOpacity={0.85}>
                    <Text style={styles.createBtnText}>Create Patient</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default CreatePatient

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: Spacing.md,
        gap: Spacing.md,
        paddingBottom: Spacing.xl,
    },

    /* ─── Page Header ─── */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        paddingVertical: Spacing.xs,
    },
    backBtn: {
        padding: Spacing.xs,
    },
    pageTitle: {
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },

    /* ─── Form Card ─── */
    formCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: Spacing.md,
    },

    /* ─── Field ─── */
    fieldGroup: {
        gap: Spacing.xs,
    },
    label: {
        ...Typography.SectionTitle,
        color: Colors.TextPrimary,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        backgroundColor: Colors.Surface,
    },

    /* ─── Picker ─── */
    pickerWrapper: {
        height: 44,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: Colors.Surface,
    },
    picker: {
        color: Colors.TextPrimary,
        marginHorizontal: -4,
    },

    /* ─── Row layout ─── */
    row: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    rowItem: {
        flex: 1,
    },

    /* ─── Create Button ─── */
    createBtn: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createBtnText: {
        ...Typography.ButtonText,
        color: Colors.TextWhite,
    },
})