import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { authApi } from '../../constants/Api';
import { Alert, ActivityIndicator } from 'react-native';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await authApi.register({ name, email, password });
            Alert.alert('Success', 'Account created successfully! Please login.', [
                { text: 'OK', onPress: () => router.push('/(auth)/login') }
            ]);
        } catch (error: any) {
            Alert.alert('Registration Failed', error.response?.data?.error || 'Could not connect to server');
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
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Ionicons name="arrow-back" size={24} color={Theme.colors.text} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join our smart campus community today.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor={Theme.colors.textSecondary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

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
                            placeholder="Create a password"
                            placeholderTextColor={Theme.colors.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={handleRegister}
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
                                <Text style={styles.registerBtnText}>Sign Up</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.alreadyHaveText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={styles.loginText}>Login</Text>
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.lg,
        marginTop: Platform.OS === 'ios' ? 0 : 20,
    },
    backText: {
        ...Theme.typography.bodySmall,
        color: Theme.colors.text,
        fontWeight: '600',
        marginLeft: Theme.spacing.sm,
    },
    header: {
        marginBottom: Theme.spacing.xxl,
    },
    title: {
        ...Theme.typography.h1,
        color: Theme.colors.primary,
    },
    subtitle: {
        ...Theme.typography.bodySmall,
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
    registerBtn: {
        height: 56,
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
        marginTop: Theme.spacing.lg,
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
    registerBtnText: {
        ...Theme.typography.button,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Theme.spacing.md,
    },
    alreadyHaveText: {
        ...Theme.typography.bodySmall,
    },
    loginText: {
        color: Theme.colors.primary,
        fontWeight: '700',
        fontSize: 14,
    },
});
