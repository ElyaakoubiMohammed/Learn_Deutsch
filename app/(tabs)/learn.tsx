import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { exerciseData } from '@/data/exerciseData';

export default function LearnScreen() {
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState('A1');

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const getLevelColor = (level) => {
    const colors = {
      'A1': '#4CAF50', // Green
      'A2': '#8BC34A', // Light Green
      'B1': '#FFD600', // Yellow
      'B2': '#FFC107', // Amber
      'C1': '#FF9800', // Orange
      'C2': '#F44336', // Red
    };
    return colors[level] || '#4CAF50';
  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => navigation.navigate('exercise', { exerciseId: item.id })}
    >
      <View style={styles.exerciseHeader}>
        <View 
          style={[
            styles.exerciseTypeTag, 
            { backgroundColor: getExerciseTypeColor(item.type) }
          ]}
        >
          <Text style={styles.exerciseTypeText}>{item.type}</Text>
        </View>
        {item.completed && (
          <CheckCircle2 color="#4CAF50" size={20} />
        )}
      </View>
      <Text style={styles.exerciseTitle}>{item.title}</Text>
      <Text style={styles.exerciseDescription}>{item.description}</Text>
      <View style={styles.exerciseFooter}>
        <Text style={styles.exerciseStats}>{item.questionCount} questions • {item.estimatedTime} min</Text>
        <ChevronRight color="#666666" size={16} />
      </View>
    </TouchableOpacity>
  );

  const getExerciseTypeColor = (type) => {
    const colors = {
      'Grammar': '#E3F2FD',
      'Vocabulary': '#FFF3E0',
      'Reading': '#E8F5E9',
      'Listening': '#F3E5F5',
      'Writing': '#FFEBEE',
      'Speaking': '#E0F7FA',
    };
    return colors[type] || '#E3F2FD';
  };

  const getExercisesByLevel = (level) => {
    return exerciseData.filter(exercise => exercise.level === level);
  };

  return (
    <View style={styles.container}>
      <View style={styles.levelSelector}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.levelSelectorContent}
        >
          {levels.map((level) => (
            <TouchableOpacity 
              key={level}
              style={[
                styles.levelButton,
                selectedLevel === level && { 
                  backgroundColor: getLevelColor(level) + '22', // Add transparency
                  borderColor: getLevelColor(level),
                }
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text 
                style={[
                  styles.levelButtonText,
                  selectedLevel === level && {
                    color: getLevelColor(level),
                    fontFamily: 'Nunito-Bold',
                  }
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.levelDescriptionContainer}>
        <Text style={styles.levelTitle}>{getLevelDescription(selectedLevel).title}</Text>
        <Text style={styles.levelDescription}>{getLevelDescription(selectedLevel).description}</Text>
      </View>

      <FlatList
        data={getExercisesByLevel(selectedLevel)}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.exerciseList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function getLevelDescription(level) {
  const descriptions = {
    'A1': {
      title: 'Beginner',
      description: 'Basic phrases and expressions. Introduction to simple grammar and vocabulary for everyday situations.'
    },
    'A2': {
      title: 'Elementary',
      description: 'Simple sentences and common expressions. Ability to communicate in simple and routine tasks.'
    },
    'B1': {
      title: 'Intermediate',
      description: 'Main points of clear standard input on familiar matters. Can deal with most situations while traveling.'
    },
    'B2': {
      title: 'Upper Intermediate',
      description: 'Complex texts and technical discussions. Can interact with fluency and spontaneity with native speakers.'
    },
    'C1': {
      title: 'Advanced',
      description: 'Understanding a wide range of demanding texts. Can use language flexibly and effectively for social, academic and professional purposes.'
    },
    'C2': {
      title: 'Proficiency',
      description: 'Understanding with ease virtually everything heard or read. Can express with precision, differentiating finer shades of meaning.'
    },
  };
  return descriptions[level] || descriptions['A1'];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  levelSelector: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  levelSelectorContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  levelButtonText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#666666',
  },
  levelDescriptionContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  levelTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  levelDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  exerciseList: {
    padding: 16,
    paddingBottom: 32,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseTypeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  exerciseTypeText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#333333',
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
    marginBottom: 12,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseStats: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: '#888888',
  },
});