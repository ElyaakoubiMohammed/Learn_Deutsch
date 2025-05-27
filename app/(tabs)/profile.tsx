import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Settings, Bell, Moon, Clock, Share2, HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const [dailyReminders, setDailyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [germanAudioOnly, setGermanAudioOnly] = useState(false);
  
  // Mock user data
  const userData = {
    name: 'Max Mustermann',
    email: 'max@example.com',
    level: 'A2',
    joined: 'March 2023',
    streak: 7,
    totalXP: 825,
    completedLessons: 32,
    achievements: [
      { id: 1, name: 'First Steps', description: 'Complete your first lesson', unlocked: true },
      { id: 2, name: '7-Day Streak', description: 'Learn for 7 days in a row', unlocked: true },
      { id: 3, name: 'Vocabulary Master', description: 'Learn 100 words', unlocked: false },
      { id: 4, name: 'Grammar Guru', description: 'Complete all grammar lessons in A1', unlocked: false },
    ]
  };

  const renderSettingItem = (icon, title, description, control) => (
    <View style={styles.settingItem}>
      <View style={styles.settingItemIcon}>{icon}</View>
      <View style={styles.settingItemContent}>
        <Text style={styles.settingItemTitle}>{title}</Text>
        <Text style={styles.settingItemDescription}>{description}</Text>
      </View>
      {control}
    </View>
  );
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{userData.level}</Text>
          </View>
        </View>
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileEmail}>{userData.email}</Text>
        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{userData.streak}</Text>
            <Text style={styles.profileStatLabel}>Day Streak</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{userData.totalXP}</Text>
            <Text style={styles.profileStatLabel}>Total XP</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatValue}>{userData.completedLessons}</Text>
            <Text style={styles.profileStatLabel}>Lessons</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Settings color="#333333" size={18} />
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>
        <View style={styles.sectionContent}>
          {renderSettingItem(
            <Bell color="#D9242B" size={22} />,
            'Daily Reminders',
            'Receive notifications to practice',
            <Switch
              value={dailyReminders}
              onValueChange={setDailyReminders}
              trackColor={{ false: '#DDDDDD', true: '#D9242B33' }}
              thumbColor={dailyReminders ? '#D9242B' : '#FFFFFF'}
            />
          )}
          {renderSettingItem(
            <Moon color="#333333" size={22} />,
            'Dark Mode',
            'Switch to dark theme',
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#DDDDDD', true: '#33333333' }}
              thumbColor={darkMode ? '#333333' : '#FFFFFF'}
            />
          )}
          {renderSettingItem(
            <Clock color="#3B82F6" size={22} />,
            'Study Goal',
            '15 minutes per day',
            <Text style={styles.settingAction}>Change</Text>
          )}
          {renderSettingItem(
            <Volume2 color="#4CAF50" size={22} />,
            'German Audio Only',
            'Hide translations in audio exercises',
            <Switch
              value={germanAudioOnly}
              onValueChange={setGermanAudioOnly}
              trackColor={{ false: '#DDDDDD', true: '#4CAF5033' }}
              thumbColor={germanAudioOnly ? '#4CAF50' : '#FFFFFF'}
            />
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Trophy color="#FFD700" size={18} />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>
        <View style={styles.achievementsContainer}>
          {userData.achievements.map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementItem,
                !achievement.unlocked && styles.achievementItemLocked
              ]}
            >
              <View style={[
                styles.achievementIcon,
                !achievement.unlocked && styles.achievementIconLocked
              ]}>
                {achievement.unlocked ? (
                  <Trophy color="#FFD700" size={24} />
                ) : (
                  <Lock color="#888888" size={24} />
                )}
              </View>
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.achievementTitleLocked
                ]}>
                  {achievement.name}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.supportLinks}>
        <TouchableOpacity style={styles.supportLink}>
          <HelpCircle color="#666666" size={18} />
          <Text style={styles.supportLinkText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportLink}>
          <Share2 color="#666666" size={18} />
          <Text style={styles.supportLinkText}>Share with Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.supportLink, styles.logoutLink]}>
          <LogOut color="#D9242B" size={18} />
          <Text style={[styles.supportLinkText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Function components for the icons not provided by lucide-react-native
function Trophy({ color, size }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color + '22', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, backgroundColor: color }}></View>
      </View>
    </View>
  );
}

function Volume2({ color, size }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color + '22', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, backgroundColor: color }}></View>
      </View>
    </View>
  );
}

function Lock({ color, size }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4, backgroundColor: color + '22', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, backgroundColor: color }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#8BC34A',
  },
  profileName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#333333',
  },
  profileStatLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#666666',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#333333',
    marginLeft: 8,
  },
  sectionContent: {
    
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemTitle: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: '#333333',
  },
  settingItemDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
  },
  settingAction: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#3B82F6',
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  achievementItemLocked: {
    opacity: 0.7,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF9C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIconLocked: {
    backgroundColor: '#F5F5F5',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#888888',
  },
  achievementDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
  },
  supportLinks: {
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  supportLinkText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  logoutLink: {
    marginTop: 8,
  },
  logoutText: {
    color: '#D9242B',
  },
});