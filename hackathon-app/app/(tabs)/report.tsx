import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import { reportApi } from '../../constants/Api';
import { ActivityIndicator } from 'react-native';

export default function ReportScreen() {
    const router = useRouter();
    const [issueType, setIssueType] = useState('Electricity');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const issueTypes = ['Electricity', 'Water', 'Security', 'Infrastructure', 'Emergency'];

    const handleSubmit = async () => {
        if (!location || !description) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await reportApi.create({
                issueType,
                location,
                description,
                userId: 'user_123' // In real app, get from auth context
            });

            Alert.alert('Success', 'Your report has been submitted to the campus authorities.', [
                {
                    text: 'OK', onPress: () => {
                        setLocation('');
                        setDescription('');
                        router.replace('/(tabs)');
                    }
                }
            ]);
        } catch (error: any) {
            Alert.alert('Error', 'Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Ionicons name="arrow-back" size={24} color={Theme.colors.text} />
                        <Text style={styles.backText}>Back to Home</Text>
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.title}>Report Issue</Text>
                        <Text style={styles.subtitle}>Our team will respond to your complaint as soon as possible.</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Issue Type</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeContainer}>
                            {issueTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[styles.typeBtn, issueType === type && styles.typeBtnActive]}
                                    onPress={() => setIssueType(type)}
                                >
                                    <Text style={[styles.typeBtnText, issueType === type && styles.typeBtnTextActive]}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Location</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="location-outline" size={20} color={Theme.colors.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Block B, Room 204"
                                    value={location}
                                    onChangeText={setLocation}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe the issue in detail..."
                                multiline
                                numberOfLines={4}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={['#EF4444', '#B91C1C']}
                                style={styles.gradientBtn}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text style={styles.submitBtnText}>Submit Report</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        padding: Theme.spacing.lg,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.lg,
        paddingVertical: Theme.spacing.xs,
    },
    backText: {
        ...Theme.typography.bodySmall,
        color: Theme.colors.text,
        fontWeight: '600',
        marginLeft: Theme.spacing.sm,
    },
    header: {
        marginBottom: Theme.spacing.xl,
    },
    title: {
        ...Theme.typography.h1,
    },
    subtitle: {
        ...Theme.typography.bodySmall,
        marginTop: Theme.spacing.xs,
    },
    form: {
        backgroundColor: Theme.colors.surface,
        padding: Theme.spacing.lg,
        borderRadius: Theme.radius.lg,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            },
        }),
    },
    label: {
        ...Theme.typography.label,
        marginBottom: Theme.spacing.sm,
    },
    typeContainer: {
        marginBottom: Theme.spacing.lg,
    },
    typeBtn: {
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        backgroundColor: Theme.colors.background,
        borderRadius: Theme.radius.full,
        marginRight: Theme.spacing.sm,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    typeBtnActive: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    typeBtnText: {
        color: Theme.colors.textSecondary,
        fontWeight: '600',
    },
    typeBtnTextActive: {
        color: '#FFF',
    },
    inputGroup: {
        marginBottom: Theme.spacing.lg,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.background,
        borderRadius: Theme.radius.md,
        paddingHorizontal: Theme.spacing.md,
    },
    inputIcon: {
        marginRight: Theme.spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: Theme.spacing.md,
        fontSize: 16,
        color: Theme.colors.text,
    },
    textArea: {
        height: 120,
        backgroundColor: Theme.colors.background,
        borderRadius: Theme.radius.md,
        padding: Theme.spacing.md,
        textAlignVertical: 'top',
    },
    submitBtn: {
        height: 56,
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
        marginTop: Theme.spacing.md,
    },
    gradientBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnText: {
        ...Theme.typography.button,
    }
});
