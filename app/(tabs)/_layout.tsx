import { Tabs } from 'expo-router';
import { Book, Home, BookOpen, User } from 'lucide-react-native';
import { View, StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Nunito-Regular': Nunito_400Regular,
    'Nunito-Medium': Nunito_500Medium,
    'Nunito-Bold': Nunito_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#D9242B', // German flag red
        tabBarInactiveTintColor: '#333333',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={[styles.tabBarLabel, { color }]}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color, size }) => (
            <Book color={color} size={size} strokeWidth={2} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={[styles.tabBarLabel, { color }]}>
              Learn
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="verbs"
        options={{
          title: 'Verb Conjugation',
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} strokeWidth={2} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={[styles.tabBarLabel, { color }]}>
              Verbs
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={[styles.tabBarLabel, { color }]}>
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E5E5',
  },
  tabBarLabel: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    marginTop: 2,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#333333',
  },
});