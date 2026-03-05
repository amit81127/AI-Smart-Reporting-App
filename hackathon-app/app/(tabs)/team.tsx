import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

export default function TeamScreen() {
    const router = useRouter();
    const team = [
        { name: 'Amit Kumar', role: 'Frontend Developer', icon: 'logo-react', color: '#61DAFB' },
        { name: 'Rahul Sharma', role: 'Backend Developer', icon: 'logo-nodejs', color: '#339933' },
        { name: 'Priya Singh', role: 'Database Engineer', icon: 'server-outline', color: '#4479A1' },
        { name: 'Ananya Verma', role: 'AI Engineer / Gemini Expert', icon: 'sparkles-outline', color: '#8833FF' },
    ];

    const techStack = [
        { name: 'React Native', icon: 'logo-react', color: '#00D8FF' },
        { name: 'Node.js', icon: 'logo-nodejs', color: '#339933' },
        { name: 'MongoDB', icon: 'leaf-outline', color: '#47A248' },
        { name: 'Gemini AI', icon: 'sparkles-outline', color: '#2563EB' },
        { name: 'Expo Router', icon: 'navigate-outline', color: '#000000' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Ionicons name="arrow-back" size={24} color={Theme.colors.text} />
                    <Text style={styles.backText}>Back to Home</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title}>Our Team</Text>
                    <Text style={styles.subtitle}>Meet the visionaries behind Smart Campus.</Text>
                </View>

                <View style={styles.projectSection}>
                    <LinearGradient
                        colors={['#0062FF', '#00D1FF']}
                        style={styles.projectCard}
                    >
                        <Text style={styles.projectName}>Project: Smart Campus Assistance App</Text>
                        <Text style={styles.projectDesc}>
                            A complete solution to streamline campus issue reporting, emergency response, and AI-driven information guidance for students and management.
                        </Text>
                    </LinearGradient>
                </View>

                <Text style={styles.sectionTitle}>Core Members</Text>
                <View style={styles.teamGrid}>
                    {team.map((member, index) => (
                        <View key={index} style={styles.teamCard}>
                            <View style={[styles.memberAvatar, { backgroundColor: `${member.color}20` }]}>
                                <Ionicons name={member.icon as any} size={28} color={member.color} />
                            </View>
                            <Text style={styles.memberName}>{member.name}</Text>
                            <Text style={styles.memberRole}>{member.role}</Text>
                            <View style={styles.socialRow}>
                                <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-github" size={16} color={Theme.colors.textSecondary} /></TouchableOpacity>
                                <TouchableOpacity style={styles.socialBtn}><Ionicons name="logo-linkedin" size={16} color={Theme.colors.textSecondary} /></TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Tech Stack</Text>
                <View style={styles.techList}>
                    {techStack.map((tech, index) => (
                        <View key={index} style={styles.techItem}>
                            <Ionicons name={tech.icon as any} size={20} color={tech.color} />
                            <Text style={styles.techName}>{tech.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Crafted with ❤️ for Hackathon 2026</Text>
                </View>
            </ScrollView>
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
    projectSection: {
        marginBottom: Theme.spacing.xl,
    },
    projectCard: {
        padding: Theme.spacing.lg,
        borderRadius: Theme.radius.lg,
        ...Platform.select({
            ios: {
                shadowColor: '#0062FF',
                shadowOpacity: 0.4,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0px 4px 10px rgba(0, 98, 255, 0.4)',
            },
        }),
    },
    projectName: {
        ...Theme.typography.h3,
        color: '#FFF',
        fontSize: 18,
        marginBottom: Theme.spacing.sm,
    },
    projectDesc: {
        ...Theme.typography.bodySmall,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 20,
        fontSize: 13,
    },
    sectionTitle: {
        ...Theme.typography.h3,
        marginBottom: Theme.spacing.md,
    },
    teamGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing.lg,
    },
    teamCard: {
        width: '48%',
        backgroundColor: Theme.colors.surface,
        padding: Theme.spacing.md,
        borderRadius: Theme.radius.md,
        marginBottom: Theme.spacing.md,
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 2,
            },
            web: {
                boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            },
        }),
    },
    memberAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Theme.spacing.sm,
    },
    memberName: {
        ...Theme.typography.label,
        textAlign: 'center',
    },
    memberRole: {
        ...Theme.typography.bodySmall,
        fontSize: 12,
        textAlign: 'center',
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.sm,
    },
    socialRow: {
        flexDirection: 'row',
    },
    socialBtn: {
        padding: 6,
        backgroundColor: Theme.colors.background,
        borderRadius: 8,
        marginHorizontal: 4,
    },
    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: Theme.spacing.xl,
    },
    techItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.surface,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.radius.full,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    techName: {
        ...Theme.typography.bodySmall,
        marginLeft: 6,
        fontWeight: '600',
        color: Theme.colors.text,
    },
    footer: {
        alignItems: 'center',
        marginTop: Theme.spacing.md,
        marginBottom: Theme.spacing.xl,
    },
    footerText: {
        ...Theme.typography.bodySmall,
        color: Theme.colors.textSecondary,
        fontStyle: 'italic',
    }
});
