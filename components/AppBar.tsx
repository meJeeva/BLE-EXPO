import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/src/constants/theme';
import { useRouter } from 'expo-router';

interface AppBarProps {
    onLogout?: () => void;
    onThemeToggle?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({
    onLogout,
    onThemeToggle,
}) => {

    const router = useRouter();

    return (
        <>
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
                    <TouchableOpacity style={styles.iconButton} onPress={onThemeToggle}>
                        <Ionicons name="moon-outline" size={18} color={Colors.TextSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {
                        router.navigate('/mode-selection')
                    }}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.divider, {
                marginBottom: 0
            }]} />
        </>
    );
};

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
        fontSize: 13,
        fontFamily: 'Inter_700Bold',
    },
    appBarTitle: {
        ...Typography.HeaderTitle,
        color: Colors.TextPrimary,
    },
    appBarSubtitle: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    appBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.Border,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: Spacing.md,
    },
});

export default AppBar;
