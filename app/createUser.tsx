import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/src/constants/theme';

export default function CreateUser() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isFormValid = () => {
        return (
            form.name.trim() !== '' &&
            form.email.trim() !== '' &&
            form.password.trim() !== '' &&
            form.confirmPassword.trim() !== '' &&
            form.password === form.confirmPassword &&
            form.password.length >= 4
        );
    };

    const onHandleCreateAccount = () => {
        router.navigate('/onboarding/device-onboarding')
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.content}>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.logoRow}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.logoText}>VitalZ</Text>
                    </View>

                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        Sign up to get started with VitalZ
                    </Text>
                    <View style={styles.form}>

                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="John Smith"
                                style={styles.input}
                                value={form.name}
                                onChangeText={(text) =>
                                    setForm({ ...form, name: text })
                                }
                            />
                        </View>

                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="your@email.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                                value={form.email}
                                onChangeText={(text) =>
                                    setForm({ ...form, email: text })
                                }
                            />
                        </View>

                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="Minimum 4 characters"
                                secureTextEntry={!showPassword}
                                style={styles.input}
                                value={form.password}
                                onChangeText={(text) =>
                                    setForm({ ...form, password: text })
                                }
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={18}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
                            <TextInput
                                placeholder="Re-enter password"
                                secureTextEntry={!showConfirmPassword}
                                style={styles.input}
                                value={form.confirmPassword}
                                onChangeText={(text) =>
                                    setForm({ ...form, confirmPassword: text })
                                }
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                    size={18}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button,
                            // !isFormValid() && styles.buttonDisabled
                        ]}
                        // disabled={!isFormValid()}
                        onPress={onHandleCreateAccount}
                    >
                        <Text style={[styles.buttonText, !isFormValid() && styles.buttonTextDisabled]}>
                            Create Account
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.terms}>
                        By signing up, you agree to our{' '}
                        <Text style={styles.link}>Terms & Privacy Policy</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },

    keyboardView: {
        flex: 1,
    },

    content: {
        padding: 20,
    },

    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 8,
    },

    logoText: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.Primary,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.TextPrimary,
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
    },

    form: {
        marginTop: 10,
    },

    label: {
        fontSize: 13,
        color: Colors.TextPrimary,
        marginBottom: 6,
        fontWeight: '500'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 16,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
    },

    eyeIcon: {
        padding: 8,
        marginLeft: 10,
    },

    footer: {
        padding: 20,
    },

    button: {
        backgroundColor: Colors.Primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonDisabled: {
        backgroundColor: Colors.primaryBackground,
    },

    buttonText: {
        color: Colors.TextWhite,
        fontWeight: '600',
        fontSize: 15,
    },

    buttonTextDisabled: {
        color: Colors.TextWhite,
    },

    terms: {
        fontSize: 12,
        textAlign: 'center',
        color: Colors.TextSecondary,
    },

    link: {
        color: Colors.Primary,
        fontWeight: '600',
    },
    logo: {
        width: 70,
        height: 70,
    },
});