import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// ─── Types ────────────────────────────────────────────────────────────────────
type BadgeType = 'alert' | 'new' | null;

interface Patient {
    id: string;
    name: string;
    age: number;
    lastSession: string;
    badge: BadgeType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PATIENTS: Patient[] = [
    { id: '1', name: 'John Smith', age: 45, lastSession: '2 hours ago', badge: null },
    { id: '2', name: 'Sarah Williams', age: 62, lastSession: '1 day ago', badge: 'alert' },
    { id: '3', name: 'Michael Brown', age: 38, lastSession: '3 days ago', badge: null },
    { id: '4', name: 'Emily Davis', age: 55, lastSession: 'Never', badge: 'new' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Circular user avatar with blue tint */
const Avatar = () => (
    <View style={styles.avatarWrapper}>
        {/* Head */}
        <View style={styles.avatarHead} />
        {/* Shoulders */}
        <View style={styles.avatarShoulder} />
    </View>
);

/** Alert / New badge pill */
const Badge = ({ type }: { type: BadgeType }) => {
    if (!type) return null;
    const isAlert = type === 'alert';
    return (
        <View style={[styles.badge, isAlert ? styles.badgeAlert : styles.badgeNew]}>
            <Text style={[styles.badgeText, isAlert ? styles.badgeTextAlert : styles.badgeTextNew]}>
                {isAlert ? 'Alert' : 'New'}
            </Text>
        </View>
    );
};

/** Single patient row card */
const PatientCard = ({ patient, onPress }: { patient: Patient, onPress: () => void }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={onPress}>
        <Avatar />
        <View style={styles.cardBody}>
            <View style={styles.cardTitleRow}>
                <Text style={styles.cardName}>{patient.name}</Text>
                <Badge type={patient.badge} />
            </View>
            <Text style={styles.cardAge}>{patient.age} years old</Text>
            <View style={styles.cardSessionRow}>
                {/* Clock icon (simple circle + hands) */}
                <ClockIcon />
                <Text style={styles.cardSession}>Last session: {patient.lastSession}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

/** Minimal SVG-style clock drawn with Views */
const ClockIcon = () => (
    <View style={styles.clockCircle}>
        <View style={styles.clockHourHand} />
        <View style={styles.clockMinuteHand} />
    </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function PatientsScreen() {
    const [query, setQuery] = useState('');

    const router = useRouter();

    const filtered = PATIENTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Background} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Search */}
                <View style={styles.searchWrapper}>
                    <Ionicons name='search' size={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search patients..."
                        placeholderTextColor={Colors.InputIcon}
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                    />
                </View>

                {/* Add New Patient */}
                <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={() => router.navigate('/home-mode/patient/add-patient')}>
                    <Text style={styles.addButtonText}>＋  Add New Patient</Text>
                </TouchableOpacity>

                {/* Patient list */}
                {filtered.map(patient => (
                    <PatientCard key={patient.id} patient={patient} onPress={() => {
                        router.navigate('/home-mode/patient/patientsVitals')
                    }} />
                ))}
            </ScrollView>
        </View>
    );
}

/** Search magnifier icon */

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    // ── Header ──
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 4,
        backgroundColor: Colors.Background,
    },
    backBtn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowLeft: {
        width: 10,
        height: 10,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.TextPrimary,
        transform: [{ rotate: '45deg' }],
        marginLeft: 4,
    },
    headerTitle: {
        ...Typography.H1,
        color: Colors.TextPrimary,
        letterSpacing: 0.2,
    },

    // ── Scroll ──
    scrollContent: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xl,
        gap: Spacing.sm + 4,
    },

    // ── Search ──
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.InputBorder,
        paddingHorizontal: Spacing.md,
        height: 44,
        marginTop: Spacing.md + 5,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.TextPrimary,
        marginLeft: Spacing.sm,
        paddingVertical: 0,
    },

    // Search icon
    searchIconWrapper: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchCircle: {
        width: 11,
        height: 11,
        borderRadius: 6,
        borderWidth: 1.8,
        borderColor: Colors.InputIcon,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    searchHandle: {
        width: 5,
        height: 1.8,
        backgroundColor: Colors.InputIcon,
        position: 'absolute',
        bottom: 1,
        right: 0,
        transform: [{ rotate: '45deg' }],
    },

    // ── Add Button ──
    addButton: {
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.sm + 6,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.Primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    addButtonText: {
        color: Colors.TextWhite,
        ...Typography.Body,
        letterSpacing: 0.3,
    },

    // ── Patient Card ──
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.Border,
    },
    cardBody: {
        flex: 1,
        marginLeft: Spacing.sm + 4,
        gap: 2,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    cardName: {
        color: Colors.TextPrimary,
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold'
    },
    cardAge: {
        fontSize: 13,
        color: Colors.TextSecondary,
        marginTop: 1,
    },
    cardSessionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    cardSession: {
        fontSize: 12,
        color: Colors.TextSecondary,
    },

    // ── Avatar ──
    avatarWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.PrimaryLight,
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    avatarHead: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: Colors.Primary,
        position: 'absolute',
        top: 8,
    },
    avatarShoulder: {
        width: 34,
        height: 18,
        borderRadius: 17,
        backgroundColor: Colors.Primary,
        marginBottom: -4,
    },

    // ── Badge ──
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm + 2,
    },
    badgeAlert: {
        backgroundColor: Colors.BadgeBg,
    },
    badgeNew: {
        backgroundColor: Colors.SuccessBg,
    },
    badgeText: {
        fontSize: 11,
        fontFamily: 'Inter_600SemiBold',
    },
    badgeTextAlert: {
        color: Colors.Error,
    },
    badgeTextNew: {
        color: Colors.Secondary,
    },

    // ── Clock Icon ──
    clockCircle: {
        width: 11,
        height: 11,
        borderRadius: 6,
        borderWidth: 1.3,
        borderColor: Colors.TextSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    clockHourHand: {
        position: 'absolute',
        width: 1.2,
        height: 3.5,
        backgroundColor: Colors.TextSecondary,
        bottom: '50%',
        left: '50%',
        marginLeft: -0.6,
        borderRadius: 1,
        transformOrigin: 'bottom',
    },
    clockMinuteHand: {
        position: 'absolute',
        width: 3,
        height: 1.2,
        backgroundColor: Colors.TextSecondary,
        left: '50%',
        top: '50%',
        marginTop: -0.6,
        borderRadius: 1,
    },
});