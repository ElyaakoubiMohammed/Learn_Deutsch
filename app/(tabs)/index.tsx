import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Trophy, Sparkles, Star } from 'lucide-react-native';

export default function HomeScreen() {
  const [dailyStreak, setDailyStreak] = useState(7);
  const [progress, setProgress] = useState(68);
  const [currentLevel, setCurrentLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A2');
  const [animations] = useState({
    welcome: new Animated.Value(0),
    stats: new Animated.Value(0),
    dailyExercise: new Animated.Value(0),
  });

  useFocusEffect(
    useCallback(() => {
      // Animation sequence when screen comes into focus
      Animated.stagger(150, [
        Animated.spring(animations.welcome, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(animations.stats, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(animations.dailyExercise, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        // Reset animations when screen loses focus
        Object.values(animations).forEach(anim => anim.setValue(0));
      };
    }, [])
  );

  const getLevelColor = (level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2') => {
    const colors: Record<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2', string> = {
      'A1': '#4CAF50', // Green
      'A2': '#8BC34A', // Light Green
      'B1': '#FFD600', // Yellow
      'B2': '#FFC107', // Amber
      'C1': '#FF9800', // Orange
      'C2': '#F44336', // Red
    };
    return colors[level] || '#4CAF50';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.View
        style={[
          styles.welcomeContainer,
          {
            opacity: animations.welcome,
            transform: [{
              translateY: animations.welcome.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }]
          }
        ]}
      >
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeTitle}>Hallo!</Text>
          <Text style={styles.welcomeSubtitle}>Ready to continue your German journey?</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={[styles.levelText, { color: getLevelColor(currentLevel) }]}>
            {currentLevel}
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.statsContainer,
          {
            opacity: animations.stats,
            transform: [{
              translateY: animations.stats.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }]
          }
        ]}
      >
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Trophy color="#FFD700" size={24} />
          </View>
          <Text style={styles.statValue}>{dailyStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Sparkles color="#3B82F6" size={24} />
          </View>
          <Text style={styles.statValue}>{progress}%</Text>
          <Text style={styles.statLabel}>Level Progress</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Star color="#D9242B" size={24} />
          </View>
          <Text style={styles.statValue}>825</Text>
          <Text style={styles.statLabel}>XP Points</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.dailyExerciseContainer,
          {
            opacity: animations.dailyExercise,
            transform: [{
              translateY: animations.dailyExercise.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Daily Exercise</Text>
        <TouchableOpacity style={styles.dailyExerciseCard}>
          <View style={styles.dailyExerciseContent}>
            <View>
              <Text style={styles.exerciseTitle}>Regular Verbs Practice</Text>
              <Text style={styles.exerciseDescription}>
                Practice conjugating regular verbs in the present tense
              </Text>
            </View>
            <View style={styles.exerciseProgress}>
              <Text style={styles.exerciseProgressText}>5 mins</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.recommendedContainer}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <View style={styles.recommendedList}>
          <TouchableOpacity style={styles.recommendedCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg' }}
              style={styles.recommendedImage}
            />
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedTitle}>Modal Verbs</Text>
              <Text style={styles.recommendedDescription}>Learn how to use modal verbs in German</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recommendedCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg' }}
              style={styles.recommendedImage}
            />
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedTitle}>Food Vocabulary</Text>
              <Text style={styles.recommendedDescription}>Learn essential food vocabulary</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 16,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: '#333333',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#666666',
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#EEEEEE',
  },
  levelText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#333333',
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 12,
  },
  dailyExerciseContainer: {
    marginBottom: 24,
  },
  dailyExerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  dailyExerciseContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
    maxWidth: '80%',
  },
  exerciseProgress: {
    backgroundColor: '#E9F5FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  exerciseProgressText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  recommendedContainer: {
    marginBottom: 24,
  },
  recommendedList: {
    gap: 12,
  },
  recommendedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 12,
  },
  recommendedImage: {
    width: '100%',
    height: 120,
  },
  recommendedContent: {
    padding: 16,
  },
  recommendedTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  recommendedDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
  },
});