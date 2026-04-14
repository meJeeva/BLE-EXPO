import { Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme'
import { Picker } from '@react-native-picker/picker';


interface FormState {
    fullName: string;
    age: string;
    gender: string;
    contactNumber: string;
    address: string;
    department: string;
    designation: string;
    loginEmail: string;
    password: string;
}

// ─── Field Label ──────────────────────────────────────────────────────────────

const FieldLabel = ({ label }: { label: string }) => (
    <Text style={styles.label}>{label}</Text>
);

// ─── Text Field ───────────────────────────────────────────────────────────────

const InputField = ({
    value,
    onChangeText,
    placeholder = '',
    keyboardType = 'default',
    secureTextEntry = false,
    focused,
    onFocus,
    onBlur,
}: {
    value: string;
    onChangeText: (v: string) => void;
    placeholder?: string;
    keyboardType?: any;
    secureTextEntry?: boolean;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
}) => (
    <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.Disabled}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
    />
);

// ─── Dropdown Field ───────────────────────────────────────────────────────────
// Dropdown Field
const DropdownField = ({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) => (
    <View style={styles.pickerWrapper}>
        <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.picker}
            dropdownIconColor={Colors.TextSecondary}
        >
            {options.map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
            ))}
        </Picker>
    </View>
);


const HospitalCreateUser = () => {
    const router = useRouter();
    const [form, setForm] = useState<FormState>({
        fullName: '',
        age: '',
        gender: 'Male',
        contactNumber: '',
        address: '',
        department: 'Cardiologist',
        designation: 'Doctor',
        loginEmail: '',
        password: '',
    });

    // track which field is focused
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const set = (key: keyof FormState) => (val: string) =>
        setForm((prev) => ({ ...prev, [key]: val }));

    const focus = (key: string) => () => setFocusedField(key);
    const blur = () => setFocusedField(null);

    const handleCreate = () => {
        // TODO: wire up to your API
        console.log('Create user:', form);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

            <View style={styles.appBar}>
                <View style={styles.appBarLeft}>
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoText}>V</Text>
                    </View>
                    <View>
                        <Text style={styles.appBarTitle}>VitalZ</Text>
                        <Text style={styles.appBarSubtitle}>Admin Mode</Text>
                    </View>
                </View>

                <View style={styles.appBarRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.moonIcon}>🌙</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.divider, {
                marginBottom: 0
            }]} />

            <View style={styles.pageHeader}>
                <View style={styles.pageHeaderLeft}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Create User</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={[styles.contentContainer, { paddingBottom: 20 }]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >


                    <View style={styles.formCard}>

                        {/* Full Name */}
                        <FieldLabel label="Full Name" />
                        <InputField
                            value={form.fullName}
                            onChangeText={set('fullName')}
                            placeholder="Enter full name"
                            focused={focusedField === 'fullName'}
                            onFocus={focus('fullName')}
                            onBlur={blur}
                        />

                        {/* Age + Gender row */}
                        <View style={styles.row}>
                            <View style={styles.rowHalf}>
                                <FieldLabel label="Age" />
                                <View style={[
                                    styles.ageWrapper,
                                    focusedField === 'age' && styles.inputFocused,
                                ]}>
                                    <TextInput
                                        style={styles.ageInput}
                                        value={form.age}
                                        onChangeText={set('age')}
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor={Colors.Disabled}
                                        onFocus={focus('age')}
                                        onBlur={blur}
                                    />
                                    <View style={styles.ageStepper}>
                                        <TouchableOpacity
                                            style={styles.stepBtn}
                                            onPress={() =>
                                                set('age')(String(Math.min(120, (parseInt(form.age) || 0) + 1)))
                                            }
                                        >
                                            <Text style={styles.stepIcon}>▲</Text>
                                        </TouchableOpacity>
                                        <View style={styles.stepDivider} />
                                        <TouchableOpacity
                                            style={styles.stepBtn}
                                            onPress={() =>
                                                set('age')(String(Math.max(0, (parseInt(form.age) || 0) - 1)))
                                            }
                                        >
                                            <Text style={styles.stepIcon}>▼</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.rowHalf}>
                                <FieldLabel label="Gender" />
                                <DropdownField
                                    value={form.gender}
                                    onChange={set('gender')}
                                    options={['Male', 'Female', 'Other']}
                                />
                            </View>
                        </View>

                        {/* Contact Number */}
                        <FieldLabel label="Contact Number" />
                        <InputField
                            value={form.contactNumber}
                            onChangeText={set('contactNumber')}
                            placeholder="+91XXXXXXXXXX"
                            keyboardType="phone-pad"
                            focused={focusedField === 'contactNumber'}
                            onFocus={focus('contactNumber')}
                            onBlur={blur}
                        />

                        {/* Address */}
                        <FieldLabel label="Address" />
                        <TextInput
                            style={[
                                styles.input,
                                focusedField === 'address' && styles.inputFocused,
                            ]}
                            value={form.address}
                            onChangeText={set('address')}
                            placeholder="Enter address"
                            placeholderTextColor={Colors.Disabled}
                            onFocus={focus('address')}
                            onBlur={blur}
                            autoCapitalize="words"
                        />

                        {/* Department */}
                        <FieldLabel label="Department" />
                        <DropdownField
                            value={form.department}
                            onChange={set('department')}
                            options={['Cardiologist', 'Pediatric', 'NICU', 'Neurology', 'Orthopedics', 'General']}
                        />

                        {/* Designation */}
                        <FieldLabel label="Designation" />
                        <DropdownField
                            value={form.designation}
                            onChange={set('designation')}
                            options={['Doctor', 'Nurse', 'Specialist', 'Technician', 'Admin']}
                        />

                        {/* Login Email ID */}
                        <FieldLabel label="Login Email ID" />
                        <InputField
                            value={form.loginEmail}
                            onChangeText={set('loginEmail')}
                            placeholder="email@hospital.com"
                            keyboardType="email-address"
                            focused={focusedField === 'loginEmail'}
                            onFocus={focus('loginEmail')}
                            onBlur={blur}
                        />

                        {/* Password */}
                        <FieldLabel label="Password" />
                        <InputField
                            value={form.password}
                            onChangeText={set('password')}
                            placeholder="Enter password"
                            secureTextEntry
                            focused={focusedField === 'password'}
                            onFocus={focus('password')}
                            onBlur={blur}
                        />

                        {/* Submit */}
                        <TouchableOpacity style={styles.createBtn} onPress={handleCreate} activeOpacity={0.85}>
                            <Text style={styles.createBtnText}>Create User</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default HospitalCreateUser

const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 2,
    },
    appBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    logoCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        color: Colors.TextWhite,
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    appBarTitle: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
        lineHeight: 20,
    },
    appBarSubtitle: {
        fontSize: 12,
        color: Colors.TextSecondary,
        lineHeight: 16,
    },
    appBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconButton: {
        padding: Spacing.xs,
    },
    moonIcon: {
        fontSize: 18,
    },
    logoutButton: {
        backgroundColor: '#FFE8E8',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.md,
    },
    logoutText: {
        color: Colors.Error,
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.md
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.Background
    },
    contentContainer: {
        paddingHorizontal: Spacing.sm
    },

    // Page Header
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.Surface,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        justifyContent: 'space-between',
    },
    backArrow: {
        fontSize: 20,
        color: Colors.TextPrimary,
    },
    pageTitle: {
        ...Typography.H2,
        color: Colors.TextPrimary,
    },

    scroll: { flex: 1 },
    scrollContent: {
        padding: Spacing.md,
        gap: Spacing.md,
    },
    pageHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        paddingRight: Spacing.sm,
    },
    /* Form Card */
    formCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    /* Label */
    label: {
        ...Typography.SectionTitle,
        color: Colors.TextPrimary,
        marginBottom: Spacing.xs,
        marginTop: Spacing.md,
    },

    /* Input */
    input: {
        backgroundColor: Colors.Background,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Platform.OS === 'ios' ? Spacing.sm + 2 : Spacing.sm,
        height: 44,
        color: Colors.TextPrimary,
    },
    inputFocused: {
        borderColor: Colors.Primary,
        borderWidth: 1.5,
        backgroundColor: Colors.Surface,
    },

    /* Row (Age + Gender) */
    row: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    rowHalf: {
        flex: 1,
    },

    /* Age stepper */
    ageWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
    },
    ageInput: {
        flex: 1,
        paddingHorizontal: Spacing.md,
        paddingVertical: Platform.OS === 'ios' ? Spacing.sm + 2 : Spacing.sm,
        height: 44,
        ...Typography.Body,
        color: Colors.TextPrimary,
    },
    ageStepper: {
        borderLeftWidth: 1,
        borderLeftColor: Colors.Border,
        height: '100%',
        justifyContent: 'center',
        minHeight: 44,
    },
    stepBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.sm,
    },
    stepIcon: {
        fontSize: 8,
        color: Colors.TextSecondary,
    },
    stepDivider: {
        height: 1,
        backgroundColor: Colors.Border,
    },

    /* Picker / Dropdown */
    pickerWrapper: {
        backgroundColor: Colors.Background,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        justifyContent: 'center',
        height: 44,
    },
    picker: {
        color: Colors.TextPrimary,
        ...Typography.Body,
    },

    /* Create Button */
    createBtn: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.lg,
    },
    createBtnText: {
        ...Typography.ButtonText,
        color: Colors.TextWhite,
    },
})