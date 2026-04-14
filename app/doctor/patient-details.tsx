import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Line, Text as SvgText, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import AppBar from '@/components/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '@/src/constants/theme';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const Colors = {
    Primary: '#0E5CAD',
    PrimaryDark: '#0A4A8A',
    PrimaryLight: '#E8F1FF',
    Secondary: '#27AE60',
    Background: '#F7F9FC',
    Surface: '#FFFFFF',
    TextPrimary: '#111827',
    TextSecondary: '#6B7280',
    Border: '#E5E7EB',
    Disabled: '#9CA3AF',
    Error: '#E53935',
    Warning: '#F59E0B',
    Info: '#2563EB',
    shadowColor: '#000',
    TextWhite: '#ffffff',
    IconBlack: '#000000',
    lightGrey: '#A0AEC0',
};

const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
const BorderRadius = { sm: 4, md: 8, lg: 12, xl: 16 };

// ─── Mock Data ────────────────────────────────────────────────────────────────
const HEART_RATE_24H = [
    75, 78, 72, 70, 68, 71, 74, 80, 82, 79, 76, 73,
    77, 80, 83, 79, 75, 72, 74, 76, 78, 75, 73, 71,
];
const SPO2_24H = [
    98, 97, 98, 99, 98, 97, 96, 98, 99, 98, 97, 96,
    97, 98, 99, 98, 97, 95, 96, 97, 98, 99, 98, 97,
];
const HEART_RATE_7D = [74, 76, 71, 78, 80, 75, 72];
const SPO2_7D = [97, 98, 96, 98, 99, 97, 98];

const HOURS_24 = ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
const DAYS_7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Trend Chart Component ─────────────────────────────────────────────────
interface TrendChartProps {
    data: number[];
    labels: string[];
    minVal: number;
    maxVal: number;
    criticalLine?: number;
    warningLine?: number;
    criticalLineTop?: number; // for SpO2 where lines are near top
    warningLineTop?: number;
    color?: string;
    gradientId: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 2 - Spacing.md * 2 - 2; // card padding + section padding
const CHART_HEIGHT = 140;
const LABEL_LEFT = 30;
const LABEL_BOTTOM = 24;
const PLOT_WIDTH = CHART_WIDTH - LABEL_LEFT;
const PLOT_HEIGHT = CHART_HEIGHT - LABEL_BOTTOM;

function valueToY(val: number, min: number, max: number) {
    return PLOT_HEIGHT - ((val - min) / (max - min)) * PLOT_HEIGHT;
}

const TrendChart: React.FC<TrendChartProps> = ({
    data,
    labels,
    minVal,
    maxVal,
    criticalLine,
    warningLine,
    color = Colors.Primary,
    gradientId,
}) => {
    const n = data.length;
    const stepX = PLOT_WIDTH / (n - 1);

    const points = data.map((v, i) => ({
        x: LABEL_LEFT + i * stepX,
        y: valueToY(v, minVal, maxVal),
    }));

    // Build smooth path using cubic bezier
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const cp1x = points[i - 1].x + stepX / 3;
        const cp1y = points[i - 1].y;
        const cp2x = points[i].x - stepX / 3;
        const cp2y = points[i].y;
        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
    }

    // Area fill path
    const areaD =
        pathD +
        ` L ${points[n - 1].x} ${PLOT_HEIGHT} L ${LABEL_LEFT} ${PLOT_HEIGHT} Z`;

    const labelStep = Math.floor(n / (labels.length - 1));

    return (
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            <Defs>
                <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor={color} stopOpacity="0.15" />
                    <Stop offset="100%" stopColor={color} stopOpacity="0" />
                </LinearGradient>
            </Defs>

            {/* Y-axis grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
                const y = f * PLOT_HEIGHT;
                const val = Math.round(maxVal - f * (maxVal - minVal));
                return (
                    <React.Fragment key={i}>
                        <Line
                            x1={LABEL_LEFT}
                            y1={y}
                            x2={CHART_WIDTH}
                            y2={y}
                            stroke={Colors.Border}
                            strokeWidth="0.8"
                            strokeDasharray="3,3"
                        />
                        <SvgText
                            x={LABEL_LEFT - 4}
                            y={y + 4}
                            fontSize="9"
                            fill={Colors.TextSecondary}
                            textAnchor="end"
                        >
                            {val}
                        </SvgText>
                    </React.Fragment>
                );
            })}

            {/* Critical threshold line */}
            {criticalLine !== undefined && (
                <>
                    <Line
                        x1={LABEL_LEFT}
                        y1={valueToY(criticalLine, minVal, maxVal)}
                        x2={CHART_WIDTH}
                        y2={valueToY(criticalLine, minVal, maxVal)}
                        stroke={Colors.Error}
                        strokeWidth="1"
                        strokeDasharray="4,3"
                    />
                    <SvgText
                        x={CHART_WIDTH - 4}
                        y={valueToY(criticalLine, minVal, maxVal) - 3}
                        fontSize="8"
                        fill={Colors.Error}
                        textAnchor="end"
                    >
                        Critical
                    </SvgText>
                </>
            )}

            {/* Warning threshold line */}
            {warningLine !== undefined && (
                <>
                    <Line
                        x1={LABEL_LEFT}
                        y1={valueToY(warningLine, minVal, maxVal)}
                        x2={CHART_WIDTH}
                        y2={valueToY(warningLine, minVal, maxVal)}
                        stroke={Colors.Warning}
                        strokeWidth="1"
                        strokeDasharray="4,3"
                    />
                    <SvgText
                        x={CHART_WIDTH - 4}
                        y={valueToY(warningLine, minVal, maxVal) - 3}
                        fontSize="8"
                        fill={Colors.Warning}
                        textAnchor="end"
                    >
                        Warning
                    </SvgText>
                </>
            )}

            {/* Area fill */}
            <Path d={areaD} fill={`url(#${gradientId})`} />

            {/* Line */}
            <Path
                d={pathD}
                stroke={color}
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* X-axis labels */}
            {labels.map((label, i) => {
                const x = LABEL_LEFT + (i / (labels.length - 1)) * PLOT_WIDTH;
                return (
                    <SvgText
                        key={i}
                        x={x}
                        y={CHART_HEIGHT - 4}
                        fontSize="8"
                        fill={Colors.TextSecondary}
                        textAnchor="middle"
                    >
                        {label}
                    </SvgText>
                );
            })}
        </Svg>
    );
};

// ─── Vital Card ────────────────────────────────────────────────────────────────
interface VitalCardProps {
    label: string;
    value: string | number;
    unit: string;
}
const VitalCard: React.FC<VitalCardProps> = ({ label, value, unit }) => (
    <View style={styles.vitalCard}>
        <Text style={styles.vitalLabel}>{label}</Text>
        <Text style={styles.vitalValue}>{value}</Text>
        <Text style={styles.vitalUnit}>{unit}</Text>
    </View>
);

// ─── AppBar ────────────────────────────────────────────────────────────────────
interface AppBarProps {
    onLogout?: () => void;
    onThemeToggle?: () => void;
    mode?: string;
}

// ─── Section Card ──────────────────────────────────────────────────────────────
const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionDivider} />
        {children}
    </View>
);

// ─── Main Screen ───────────────────────────────────────────────────────────────

const PatientDetailScreen: React.FC = () => {
    const router = useRouter();
    const [timeRange, setTimeRange] = useState<'24h' | '7d'>('24h');

    const hrData = timeRange === '24h' ? HEART_RATE_24H : HEART_RATE_7D;
    const spo2Data = timeRange === '24h' ? SPO2_24H : SPO2_7D;
    const labels = timeRange === '24h' ? HOURS_24 : DAYS_7;

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppBar />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Back + Patient Name */}
                <View style={styles.pageHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={20} color={Colors.TextPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.patientName}>John Smith</Text>
                </View>

                <View style={{
                    padding: Spacing.md,
                    gap: Spacing.md,
                    paddingTop: 0
                }}>

                    {/* Patient Information */}
                    <SectionCard title="Patient Information">
                        <View style={styles.infoGrid}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>MRN</Text>
                                <Text style={styles.infoValue}>MRN-12345</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Age</Text>
                                <Text style={styles.infoValue}>65 years</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Date Joined</Text>
                                <Text style={styles.infoValue}>2026-01-01</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>Status</Text>
                                <View style={styles.activeBadge}>
                                    <Text style={styles.activeBadgeText}>Active</Text>
                                </View>
                            </View>
                        </View>
                    </SectionCard>

                    {/* Current Vitals */}
                    <SectionCard title="Current Vitals">
                        <View style={styles.vitalsGrid}>
                            <VitalCard label="HR" value="72" unit="bpm" />
                            <VitalCard label="SpO₂" value="98" unit="%" />
                            <VitalCard label="BR" value="16" unit="bpm" />
                            <VitalCard label="HRV" value="45" unit="ms" />
                        </View>
                        <View style={styles.tempCard}>
                            <Text style={styles.vitalLabel}>Temperature</Text>
                            <Text style={styles.vitalValue}>98.6</Text>
                            <Text style={styles.vitalUnit}>°F</Text>
                        </View>
                    </SectionCard>

                    {/* Time Range Toggle */}
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[styles.toggleBtn, timeRange === '24h' && styles.toggleBtnActive]}
                            onPress={() => setTimeRange('24h')}
                        >
                            <Text style={[styles.toggleText, timeRange === '24h' && styles.toggleTextActive]}>
                                24 Hours
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleBtn, timeRange === '7d' && styles.toggleBtnActive]}
                            onPress={() => setTimeRange('7d')}
                        >
                            <Text style={[styles.toggleText, timeRange === '7d' && styles.toggleTextActive]}>
                                7 Days
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Heart Rate Trend */}
                    <SectionCard title="Heart Rate Trend">
                        <TrendChart
                            data={hrData}
                            labels={labels}
                            minVal={40}
                            maxVal={180}
                            criticalLine={150}
                            warningLine={130}
                            color={Colors.Primary}
                            gradientId="hrGradient"
                        />
                    </SectionCard>

                    {/* SpO2 Trend */}
                    <SectionCard title="SpO₂ Trend">
                        <TrendChart
                            data={spo2Data}
                            labels={labels}
                            minVal={80}
                            maxVal={100}
                            criticalLine={88}
                            warningLine={92}
                            color={Colors.Primary}
                            gradientId="spo2Gradient"
                        />
                    </SectionCard>

                    <View style={{ height: Spacing.xl }} />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.Background,
    },

    // AppBar
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
        fontWeight: '700',
    },
    appBarTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.TextPrimary,
    },
    appBarSubtitle: {
        fontSize: 12,
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
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.Border,
    },

    // Scroll
    scrollView: { flex: 1 },
    scrollContent: {

        gap: Spacing.md,
    },

    // Page Header
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.Surface,
        padding: Spacing.md,
    },
    backButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    patientName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.TextPrimary,
    },

    // Section Card
    sectionCard: {
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
        gap: Spacing.md,
    },
    sectionTitle: {
        ...Typography.HeaderTitle,
        color: Colors.TextPrimary,
    },
    sectionDivider: {
        height: 1,
        backgroundColor: Colors.Border,
        marginBottom: Spacing.xs,
    },

    // Patient Info Grid
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    infoItem: {
        width: '45%',
        gap: Spacing.xs,
    },
    infoLabel: {
        fontSize: 11,
        color: Colors.TextSecondary,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.TextPrimary,
    },
    activeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.Primary,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.sm + 2,
        paddingVertical: 3,
    },
    activeBadgeText: {
        color: Colors.TextWhite,
        fontSize: 12,
        fontWeight: '600',
    },

    // Vitals Grid
    vitalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    vitalCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: 2,
    },
    tempCard: {
        backgroundColor: Colors.Background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.Border,
        gap: 2,
    },
    vitalLabel: {
        fontSize: 11,
        color: Colors.TextSecondary,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    vitalValue: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.TextPrimary,
        lineHeight: 34,
    },
    vitalUnit: {
        fontSize: 12,
        color: Colors.TextSecondary,
        fontWeight: '400',
    },

    // Toggle
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.Surface,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.Border,
        overflow: 'hidden',
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: Spacing.sm + 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleBtnActive: {
        backgroundColor: Colors.Primary,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.TextSecondary,
    },
    toggleTextActive: {
        color: Colors.TextWhite,
    },
});

export default PatientDetailScreen;