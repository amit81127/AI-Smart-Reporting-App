import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  const router = useRouter();

  const features = [
    { title: 'Report Issue', icon: 'warning', color: '#EF4444', route: '/report' as any, description: 'Campus issues & emergencies' },
    { title: 'AI Chatbot', icon: 'chatbubbles', color: '#8B5CF6', route: '/chatbot' as any, description: 'Get instant campus help' },
    { title: 'Profile', icon: 'person', color: '#10B981', route: '/profile' as any, description: 'Your personal info' },
    { title: 'Team Info', icon: 'people', color: '#F59E0B', route: '/team' as any, description: 'Meet the developers' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.userName}>Amit Kumar</Text>
          </View>
          <TouchableOpacity style={styles.notiBtn}>
            <Ionicons name="notifications-outline" size={24} color={Theme.colors.text} />
            <View style={styles.notiBadge} />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#0062FF', '#00D1FF']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle}>Smart Campus Help</Text>
            <Text style={styles.heroSubtitle}>Report electricity, water or security issues instantly.</Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => router.push('/report' as any)}
            >
              <Text style={styles.heroBtnText}>Submit Report</Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="shield-checkmark" size={100} color="rgba(255,255,255,0.2)" style={styles.heroIcon} />
        </LinearGradient>

        <Text style={styles.sectionTitle}>Main Features</Text>
        <View style={styles.grid}>
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => router.push(item.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon as any} size={28} color={item.color} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Quick Status</Text>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>12</Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>2</Text>
              <Text style={styles.statLabel}>Alerts</Text>
            </View>
          </View>
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
    padding: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  welcomeText: {
    ...Theme.typography.bodySmall,
  },
  userName: {
    ...Theme.typography.h2,
  },
  notiBtn: {
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.md,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  notiBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.danger,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  heroCard: {
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#0062FF',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0px 4px 10px rgba(0, 98, 255, 0.4)',
      },
    }),
  },
  heroInfo: {
    flex: 1,
    zIndex: 1,
  },
  heroTitle: {
    ...Theme.typography.h2,
    color: '#FFF',
  },
  heroSubtitle: {
    ...Theme.typography.bodySmall,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  heroBtn: {
    backgroundColor: '#FFF',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.sm,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: Theme.colors.primary,
    fontWeight: '700',
  },
  heroIcon: {
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Theme.colors.surface,
    width: '48%',
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
      },
    }),
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
  },
  cardTitle: {
    ...Theme.typography.label,
    fontSize: 16,
  },
  cardDesc: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    marginTop: Theme.spacing.xs,
  },
  statsContainer: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    ...Theme.typography.h2,
    color: Theme.colors.primary,
  },
  statLabel: {
    ...Theme.typography.bodySmall,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.colors.border,
  }
});
