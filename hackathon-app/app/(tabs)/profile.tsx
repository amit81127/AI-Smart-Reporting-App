import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/(auth)/login');
    };

    const user = {
        name: 'Amit Kumar',
        email: 'amit@gmail.com',
        role: 'Student',
        id: 'CS2023045',
        reportsSubmitted: 3
    };

    const menuItems = [
        { label: 'Edit Profile', icon: 'create-outline', color: '#3B82F6' },
        { label: 'My Reports', icon: 'document-text-outline', color: '#F59E0B' },
        { label: 'Settings', icon: 'settings-outline', color: '#6B7280' },
        { label: 'Help & Support', icon: 'help-circle-outline', color: '#10B981' },
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
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={['#0062FF', '#00D1FF']}
                            style={styles.avatarGradient}
                        >
                            <Text style={styles.avatarText}>AK</Text>
                        </LinearGradient>
                        <TouchableOpacity style={styles.cameraIcon}>
                            <Ionicons name="camera" size={18} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userRole}>{user.role} | ID: {user.id}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>{user.reportsSubmitted}</Text>
                        <Text style={styles.statLabel}>Reports</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>Active</Text>
                        <Text style={styles.statLabel}>Status</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statVal}>4.8</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                                <Ionicons name={item.icon as any} size={22} color={item.color} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={18} color={Theme.colors.border} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color={Theme.colors.danger} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.0.0 (Expo Prototype)</Text>
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
    profileHeader: {
        alignItems: 'center',
        marginBottom: Theme.spacing.xl,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: Theme.spacing.md,
        position: 'relative',
        ...Platform.select({
            ios: {
                shadowColor: Theme.colors.primary,
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: `0px 4px 10px rgba(0, 98, 255, 0.3)`,
            },
        }),
    },
    avatarGradient: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFF',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Theme.colors.primary,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    userName: {
        ...Theme.typography.h2,
    },
    userRole: {
        ...Theme.typography.bodySmall,
        fontWeight: '600',
        marginTop: 2,
    },
    userEmail: {
        ...Theme.typography.bodySmall,
        color: Theme.colors.textSecondary,
        marginTop: 2,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.surface,
        padding: Theme.spacing.lg,
        borderRadius: Theme.radius.lg,
        marginBottom: Theme.spacing.xl,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 2,
            },
            web: {
                boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
            },
        }),
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statVal: {
        ...Theme.typography.h3,
        color: Theme.colors.primary,
    },
    statLabel: {
        ...Theme.typography.bodySmall,
        fontSize: 12,
    },
    statDivider: {
        width: 1,
        backgroundColor: Theme.colors.border,
    },
    menuContainer: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.radius.lg,
        padding: Theme.spacing.md,
        marginBottom: Theme.spacing.xl,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 2,
            },
            web: {
                boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
            },
        }),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: `${Theme.colors.border}50`,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Theme.spacing.md,
    },
    menuLabel: {
        flex: 1,
        ...Theme.typography.label,
        fontSize: 16,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.radius.md,
        borderWidth: 1,
        borderColor: Theme.colors.danger,
        marginBottom: Theme.spacing.lg,
    },
    logoutText: {
        marginLeft: Theme.spacing.sm,
        color: Theme.colors.danger,
        fontWeight: '700',
        fontSize: 16,
    },
    versionText: {
        textAlign: 'center',
        ...Theme.typography.bodySmall,
        color: Theme.colors.textSecondary,
        marginBottom: Theme.spacing.xl,
    }
});
