import { BorderRadius, Colors, Spacing, Typography } from '@/src/constants/theme';
import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AppBar from '@/components/AppBar';



const vitalsTrendData = [
    { value: 78 },
    { value: 82 },
    { value: 79 },
    { value: 75 },
    { value: 76 },
    { value: 74 },
    { value: 77 },
    { value: 80 },
    { value: 83 },
    { value: 85 },
    { value: 82 },
    { value: 79 },
    { value: 76 },
    { value: 74 },
    { value: 72 },
    { value: 70 },
    { value: 73 },
    { value: 75 },
    { value: 74 },
    { value: 72 },
    { value: 71 },
    { value: 70 },
];

const xLabels = ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];


const CardWrapper: React.FC<{ children: React.ReactNode; style?: object }> = ({ children, style }) => (
    <View style={[styles.card, style]}>{children}</View>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
);

const VitalBox: React.FC<{ label: string; value: string; sub?: string }> = ({ label, value, sub }) => (
    <View style={styles.vitalBox}>
        <Text style={styles.vitalLabel}>{label}</Text>
        <Text style={styles.vitalValue}>
            {value}
            {sub ? <Text style={styles.vitalSub}>{sub}</Text> : null}
        </Text>
    </View>
);


const PatientDetailScreen: React.FC = () => {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.Surface} />

            <AppBar />


            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{ opacity: fadeAnim }}>

                    <View style={styles.pageHeader}>
                        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.patientName}>John Smith</Text>
                    </View>
                    <View style={{
                        padding: Spacing.md,
                    }}>
                        <CardWrapper>
                            <SectionTitle title="Patient Information" />
                            <View style={styles.divider} />

                            <View style={styles.infoGrid}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>MRN</Text>
                                    <Text style={styles.infoValue}>MRN-12345</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Status</Text>
                                    <View style={styles.activeBadge}>
                                        <Text style={styles.activeBadgeText}>Active</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.infoGrid}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Ward</Text>
                                    <Text style={styles.infoValue}>3A</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Bed</Text>
                                    <Text style={styles.infoValue}>12</Text>
                                </View>
                            </View>

                            <View style={styles.infoItemFull}>
                                <Text style={styles.infoLabel}>Connected Device</Text>
                                <Text style={styles.infoValue}>VZ-2024-0001</Text>
                            </View>
                        </CardWrapper>

                        {/* ── Current Vitals ── */}
                        <CardWrapper>
                            <SectionTitle title="Current Vitals" />
                            <View style={styles.divider} />

                            <View style={styles.vitalsGrid}>
                                <VitalBox label="Heart Rate" value="72 bpm" />
                                <VitalBox label="SpO₂" value="98%" />
                            </View>
                            <View style={styles.vitalsGrid}>
                                <VitalBox label="Temperature" value="98.6°F" />
                                <VitalBox label="RR" value="16 bpm" />
                            </View>
                        </CardWrapper>

                        <CardWrapper>
                            <SectionTitle title="Vitals Trend" />
                            <View style={styles.divider} />

                            <View style={styles.chartContainer}>
                                <LineChart
                                    data={vitalsTrendData}
                                    width={290}
                                    height={140}
                                    color={Colors.Primary}
                                    thickness={2}
                                    dataPointsColor="transparent"
                                    hideDataPoints
                                    curved
                                    areaChart
                                    startFillColor={Colors.PrimaryLight}
                                    endFillColor="transparent"
                                    startOpacity={0.4}
                                    endOpacity={0.05}
                                    noOfSections={4}
                                    maxValue={180}
                                    yAxisTextStyle={styles.chartAxisText}
                                    xAxisLabelTexts={xLabels}
                                    xAxisLabelTextStyle={styles.chartAxisText}
                                    xAxisThickness={1}
                                    xAxisColor={Colors.Border}
                                    yAxisThickness={0}
                                    rulesColor={Colors.Border}
                                    rulesType="solid"
                                    spacing={18}
                                    initialSpacing={2}
                                    endSpacing={2}
                                    hideYAxisText={false}
                                    yAxisLabelWidth={32}
                                    showXAxisIndices={false}
                                />
                            </View>
                        </CardWrapper>

                        {/* ── Recent Alerts ── */}
                        <CardWrapper style={{ marginBottom: Spacing.xl }}>
                            <SectionTitle title="Recent Alerts" />
                            <View style={styles.divider} />

                            <View style={styles.alertRow}>
                                <View style={styles.alertIconWrapper}>
                                    <Text style={styles.alertIcon}>⚠</Text>
                                </View>
                                <View style={styles.alertContent}>
                                    <Text style={styles.alertTitle}>High Heart Rate (145 bpm)</Text>
                                    <Text style={styles.alertTime}>5 min ago</Text>
                                </View>
                            </View>
                        </CardWrapper>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.Surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Border,
    },
    navLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    brandName: {
        ...Typography.HeaderTitle,
        color: Colors.TextPrimary,
    },
    adminMode: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
    },
    navRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.Border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoutBtn: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.md,
        borderWidth: 1.5,
        borderColor: Colors.Primary,
    },
    scroll: { flex: 1 },
    scrollContent: {
        gap: Spacing.md,
    },

    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.Surface,
        padding: Spacing.md,
        marginBottom: Spacing.xs,
    },
    backBtn: {
        padding: Spacing.xs,
        marginRight: Spacing.sm,
    },
    backArrow: {
        fontSize: 20,
        color: Colors.TextPrimary,
    },
    patientName: {
        ...Typography.H2,
        color: Colors.TextPrimary,
    },

    card: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        ...Typography.H2,
        color: Colors.TextPrimary,
        marginBottom: Spacing.sm,
    },
    infoGrid: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
    },
    infoItem: {
        flex: 1,
    },
    infoItemFull: {
        marginBottom: Spacing.xs,
    },
    infoLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: 2,
    },
    infoValue: {
        ...Typography.Body,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },
    activeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.md,
        paddingVertical: 3,
    },
    activeBadgeText: {
        ...Typography.Caption,
        color: Colors.TextWhite,
        fontFamily: 'Inter_600SemiBold',
    },

    vitalsGrid: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    vitalBox: {
        flex: 1,
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
    },
    vitalLabel: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginBottom: Spacing.xs,
    },
    vitalValue: {
        ...Typography.H2,
        color: Colors.TextPrimary,
    },
    vitalSub: {
        ...Typography.BodySmall,
        color: Colors.TextSecondary,
    },

    chartContainer: {
        marginTop: Spacing.xs,
        overflow: 'hidden',
    },
    chartAxisText: {
        fontSize: 10,
        color: Colors.TextSecondary,
    },

    alertRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F5',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    alertIconWrapper: {
        marginRight: Spacing.sm,
    },
    alertIcon: {
        fontSize: 18,
        color: Colors.Error,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        ...Typography.BodySmall,
        color: Colors.TextPrimary,
        fontFamily: 'Inter_600SemiBold',
    },
    alertTime: {
        ...Typography.Caption,
        color: Colors.TextSecondary,
        marginTop: 2,
    },
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
});

export default PatientDetailScreen;