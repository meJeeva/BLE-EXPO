import { Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '@/components/AppBar'
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PROFILE = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.j@hospital.com',
    contact: '+1-234-567-8901',
    department: 'Cardiologist',
    specialization: 'Cardiology',
};

// ─── Info Block ───────────────────────────────────────────────────────────────

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

const MyProfileScreen = () => {
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const focus = (key: string) => () => setFocusedField(key);
    const blur = () => setFocusedField(null);

    const handleChangePassword = () => {
        // TODO: wire up to your API
        console.log('Change password');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />

            <View style={styles.pageHeader}>
                <View style={styles.pageHeaderLeft}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>My Profile</Text>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                    <Ionicons name="create" size={20} color={Colors.Primary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                {/* ── Personal Information Card ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Personal Information</Text>
                    <View style={styles.cardDivider} />

                    <InfoBlock label="Name" value={PROFILE.name} />
                    <InfoBlock label="Email" value={PROFILE.email} />
                    <InfoBlock label="Contact" value={PROFILE.contact} />
                    <InfoBlock label="Department" value={PROFILE.department} />
                    <View style={[styles.infoBlock, { marginBottom: 0 }]}>
                        <Text style={styles.infoLabel}>Specialization</Text>
                        <Text style={styles.infoValue}>{PROFILE.specialization}</Text>
                    </View>
                </View>

                {/* ── Change Password Card ── */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Change Password</Text>
                    <View style={styles.cardDivider} />

                    {/* Current Password */}
                    <Text style={styles.fieldLabel}>Current Password</Text>
                    <TextInput
                        style={[styles.input, focusedField === 'current' && styles.inputFocused]}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry
                        placeholder="••••••••"
                        placeholderTextColor={Colors.Disabled}
                        onFocus={focus('current')}
                        onBlur={blur}
                    />

                    {/* New Password */}
                    <Text style={styles.fieldLabel}>New Password</Text>
                    <TextInput
                        style={[styles.input, focusedField === 'new' && styles.inputFocused]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        placeholder="••••••••"
                        placeholderTextColor={Colors.Disabled}
                        onFocus={focus('new')}
                        onBlur={blur}
                    />

                    {/* Confirm New Password */}
                    <Text style={styles.fieldLabel}>Confirm New Password</Text>
                    <TextInput
                        style={[styles.input, focusedField === 'confirm' && styles.inputFocused]}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholder="••••••••"
                        placeholderTextColor={Colors.Disabled}
                        onFocus={focus('confirm')}
                        onBlur={blur}
                    />

                    {/* Submit */}
                    <TouchableOpacity style={styles.changePasswordBtn} onPress={handleChangePassword} activeOpacity={0.85}>
                        <Text style={styles.changePasswordBtnText}>Change Password</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default MyProfileScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    /* Page Header */
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 4,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
    },
    pageHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: { paddingRight: Spacing.sm },
    backArrow: { fontSize: 20, color: Colors.TextPrimary },
    pageTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: Colors.TextPrimary,
    },
    editBtn: {
        width: 34,
        height: 34,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIcon: {
        fontSize: 20,
        color: Colors.Primary,
    },

    /* Scroll */
    container: { flex: 1 },
    contentContainer: {
        padding: Spacing.md,
        gap: Spacing.md,
        paddingBottom: Spacing.xxl,
    },

    /* Card */
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

    /* Info Block */
    infoBlock: {
        marginBottom: Spacing.md,
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextSecondary,
        marginBottom: 3,
    },
    infoValue: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
    },

    /* Password fields */
    fieldLabel: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextPrimary,
        marginBottom: Spacing.xs,
        marginTop: Spacing.sm,
    },
    input: {
        backgroundColor: Colors.Background,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Platform.OS === 'ios' ? Spacing.sm + 2 : Spacing.sm,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: Colors.TextPrimary,
        marginBottom: Spacing.sm,
    },
    inputFocused: {
        borderColor: Colors.Primary,
        borderWidth: 1.5,
        backgroundColor: Colors.Surface,
    },

    /* Change Password Button */
    changePasswordBtn: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    changePasswordBtnText: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        color: Colors.TextWhite,
    },
});