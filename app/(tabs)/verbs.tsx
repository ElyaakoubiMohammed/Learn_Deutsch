import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated
} from 'react-native';
import { Search, X, ChevronDown, Volume2 } from 'lucide-react-native';
import { verbsData } from '@/data/verbsData';

type Verb = {
  infinitive: string;
  translation: string;
  example?: string;
  exampleTranslation?: string;
  notes?: string;
  conjugations: {
    [tense: string]: {
      [pronoun: string]: string;
    };
  };
};

export default function VerbsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [selectedTense, setSelectedTense] = useState('Präsens');
  const [searchResults, setSearchResults] = useState<Verb[]>([]);
  const [showTenseDropdown, setShowTenseDropdown] = useState(false);

  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);

  const tenses = [
    'Präsens',
    'Präteritum',
    'Perfekt',
    'Plusquamperfekt',
    'Futur I',
    'Futur II'
  ];

  useEffect(() => {
    // Set a default verb when the component mounts
    if (verbsData.length > 0 && !selectedVerb) {
      setSelectedVerb(verbsData[0]);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredVerbs = verbsData.filter(verb =>
        verb.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verb.translation.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredVerbs);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    Animated.timing(dropdownAnimation, {
      toValue: showTenseDropdown ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [showTenseDropdown]);

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240], // Maximum height of the dropdown
  });

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const handleVerbSelect = (verb: Verb) => {
    setSelectedVerb(verb);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleTenseSelect = (tense: string) => {
    setSelectedTense(tense);
    setShowTenseDropdown(false);
  };

  const renderConjugationTable = () => {
    if (!selectedVerb) return null;

    const conjugationData = selectedVerb.conjugations[selectedTense];

    return (
      <View style={styles.conjugationTableContainer}>
        {Object.entries(conjugationData).map(([pronoun, form], index) => (
          <View
            key={pronoun}
            style={[
              styles.conjugationRow,
              index % 2 === 0 ? styles.evenRow : styles.oddRow
            ]}
          >
            <Text style={styles.pronoun}>{pronoun}</Text>
            <Text style={styles.verbForm}>{form}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderVerbItem = ({ item }: { item: Verb }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleVerbSelect(item)}
    >
      <Text style={styles.verbInfinitive}>{item.infinitive}</Text>
      <Text style={styles.verbTranslation}>{item.translation}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#888888" size={20} style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for a verb..."
            placeholderTextColor="#888888"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <X color="#888888" size={16} />
            </TouchableOpacity>
          )}
        </View>

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={renderVerbItem}
            keyExtractor={(item) => item.infinitive}
            style={styles.searchResultsList}
          />
        )}
      </View>

      {selectedVerb && (
        <ScrollView style={styles.verbDetailsContainer}>
          <View style={styles.verbHeader}>
            <View style={styles.verbTitleContainer}>
              <Text style={styles.verbTitle}>{selectedVerb.infinitive}</Text>
              <TouchableOpacity style={styles.pronounceButton}>
                <Volume2 color="#D9242B" size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.verbTranslationLarge}>{selectedVerb.translation}</Text>
            {selectedVerb.example && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleLabel}>Example:</Text>
                <Text style={styles.exampleText}>{selectedVerb.example}</Text>
                <Text style={styles.exampleTranslation}>{selectedVerb.exampleTranslation}</Text>
              </View>
            )}
          </View>

          <View style={styles.tenseSelector}>
            <TouchableOpacity
              style={styles.tenseSelectorButton}
              onPress={() => setShowTenseDropdown(!showTenseDropdown)}
            >
              <Text style={styles.tenseSelectorButtonText}>{selectedTense}</Text>
              <ChevronDown color="#333333" size={20} />
            </TouchableOpacity>

            <Animated.View style={[styles.tenseDropdown, { height: dropdownHeight }]}>
              {tenses.map((tense) => (
                <TouchableOpacity
                  key={tense}
                  style={[
                    styles.tenseOption,
                    selectedTense === tense && styles.selectedTenseOption
                  ]}
                  onPress={() => handleTenseSelect(tense)}
                >
                  <Text
                    style={[
                      styles.tenseOptionText,
                      selectedTense === tense && styles.selectedTenseOptionText
                    ]}
                  >
                    {tense}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>

          {renderConjugationTable()}

          {selectedVerb.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesTitle}>Notes:</Text>
              <Text style={styles.notesText}>{selectedVerb.notes}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
    padding: 4,
  },
  searchResultsList: {
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  verbInfinitive: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333333',
  },
  verbTranslation: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
  },
  verbDetailsContainer: {
    flex: 1,
    padding: 16,
  },
  verbHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  verbTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  verbTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: '#333333',
  },
  pronounceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verbTranslationLarge: {
    fontFamily: 'Nunito-Medium',
    fontSize: 18,
    color: '#666666',
    marginBottom: 12,
  },
  exampleContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  exampleLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  exampleText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  tenseSelector: {
    position: 'relative',
    zIndex: 5,
    marginBottom: 16,
  },
  tenseSelectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  tenseSelectorButtonText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: '#333333',
  },
  tenseDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    overflow: 'hidden',
    zIndex: 10,
  },
  tenseOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedTenseOption: {
    backgroundColor: '#F0F9FF',
  },
  tenseOptionText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#333333',
  },
  selectedTenseOptionText: {
    fontFamily: 'Nunito-Bold',
    color: '#3B82F6',
  },
  conjugationTableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  conjugationRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  evenRow: {
    backgroundColor: '#F8F9FA',
  },
  oddRow: {
    backgroundColor: '#FFFFFF',
  },
  pronoun: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: '#666666',
    width: 90,
  },
  verbForm: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333333',
  },
  notesContainer: {
    backgroundColor: '#FFFDE7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  notesTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  notesText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});