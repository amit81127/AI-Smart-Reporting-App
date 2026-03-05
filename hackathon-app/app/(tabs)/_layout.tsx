import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constants/DesignSystem';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarLabelStyle: {
          ...styles.tabBarLabel,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={focused ? 28 : 24} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={focused ? 28 : 24} name={focused ? "warning" : "warning-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={focused ? 28 : 24} name={focused ? "chatbubbles" : "chatbubbles-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={focused ? 28 : 24} name={focused ? "person" : "person-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'Team',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={focused ? 28 : 24} name={focused ? "people" : "people-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide explore if it still exists
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabBarLabel: {
    ...Theme.typography.bodySmall,
    fontSize: 10,
    fontWeight: '700',
    marginTop: -5,
  }
});
