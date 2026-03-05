import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';

import { authApi } from '../../constants/Api';
import { Alert, ActivityIndicator } from 'react-native';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await authApi.login({ email, password });
            console.log('Login success:', response.data);
            // Navigate to Home
            router.replace('/(tabs)');
        } catch (error: any) {
            console.error('Login error:', error.response?.data || error.message);
            Alert.alert('Login Failed', error.response?.data?.error || 'Could not connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <LinearGradient
                            colors={['#0062FF', '#00D1FF']}
                            style={styles.logoGradient}
                        >
                            <Text style={styles.logoText}>S</Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.title}>Smart Campus</Text>
                    <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor={Theme.colors.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={Theme.colors.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <LinearGradient
                            colors={['#0062FF', '#00D1FF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientBtn}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.loginBtnText}>Login</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>
                        <Text style={styles.noAccountText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text style={styles.registerText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Theme.spacing.xxl,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: Theme.radius.xl,
        overflow: 'hidden',
        marginBottom: Theme.spacing.md,
        ...Platform.select({
            ios: {
                shadowColor: '#0062FF',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
            web: {
                boxShadow: '0px 4px 10px rgba(0, 98, 255, 0.3)',
            },
        }),
    },
    logoGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: '800',
        color: '#FFF',
    },
    title: {
        ...Theme.typography.h1,
        textAlign: 'center',
    },
    subtitle: {
        ...Theme.typography.bodySmall,
        textAlign: 'center',
        marginTop: Theme.spacing.xs,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: Theme.spacing.md,
    },
    label: {
        ...Theme.typography.label,
        marginBottom: Theme.spacing.xs,
    },
    input: {
        backgroundColor: Theme.colors.surface,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        borderRadius: Theme.radius.md,
        padding: Theme.spacing.md,
        fontSize: 16,
        color: Theme.colors.text,
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: Theme.spacing.lg,
    },
    forgotText: {
        color: Theme.colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    loginBtn: {
        height: 56,
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
        marginBottom: Theme.spacing.lg,
        ...Platform.select({
            ios: {
                shadowColor: Theme.colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: `0px 4px 8px rgba(0, 98, 255, 0.3)`,
            },
        }),
    },
    gradientBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtnText: {
        ...Theme.typography.button,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Theme.spacing.md,
    },
    noAccountText: {
        ...Theme.typography.bodySmall,
    },
    registerText: {
        color: Theme.colors.primary,
        fontWeight: '700',
        fontSize: 14,
    },
});
