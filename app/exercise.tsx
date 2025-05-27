import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { exerciseData } from '../data/exerciseData'

export default function ExerciseScreen() {
    const { exerciseId } = useLocalSearchParams()
    const id = Number(exerciseId)
    const exercise = exerciseData.find((e) => e.id === id)

    if (!exercise) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Übung nicht gefunden 😢</Text>
            </View>
        )
    }

    const renderContent = () => {
        switch (exercise.type) {
            case 'Vocabulary':
                return (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Vokabeln lernen 📚</Text>
                        <Text style={styles.text}>Hier sind {exercise.questionCount} wichtige Wörter zum Thema: <Text style={styles.bold}>{exercise.title}</Text>.</Text>
                        {[...Array(exercise.questionCount).keys()].map((i) => (
                            <Text key={i} style={styles.bullet}>• Wort {i + 1} - [DE] — [EN]</Text>
                        ))}
                    </View>
                )
            case 'Grammar':
                return (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Grammatik üben ✍️</Text>
                        <Text style={styles.text}>Übungsthema: <Text style={styles.bold}>{exercise.title}</Text></Text>
                        {[...Array(exercise.questionCount).keys()].map((i) => (
                            <Text key={i} style={styles.bullet}>• Satz {i + 1}: __________ (konjugieren / umformen)</Text>
                        ))}
                    </View>
                )
            case 'Reading':
                return (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Leseverständnis 📖</Text>
                        <Text style={styles.text}>Lies den folgenden Abschnitt über <Text style={styles.bold}>{exercise.title}</Text> und beantworte die Fragen:</Text>
                        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit... (real content here)</Text>
                        {[...Array(exercise.questionCount).keys()].map((i) => (
                            <Text key={i} style={styles.bullet}>• Frage {i + 1}: ___________?</Text>
                        ))}
                    </View>
                )
            case 'Listening':
                return (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Hörverstehen 🎧</Text>
                        <Text style={styles.text}>Höre dir das Audio zu <Text style={styles.bold}>{exercise.title}</Text> an und beantworte folgende Fragen:</Text>
                        {[...Array(exercise.questionCount).keys()].map((i) => (
                            <Text key={i} style={styles.bullet}>• Frage {i + 1}: ___________?</Text>
                        ))}
                    </View>
                )
            case 'Writing':
                return (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Schreiben 📝</Text>
                        <Text style={styles.text}>Schreibe zu diesem Thema: <Text style={styles.bold}>{exercise.title}</Text></Text>
                        {[...Array(exercise.questionCount).keys()].map((i) => (
                            <Text key={i} style={styles.bullet}>• Aufgabe {i + 1}: _______________</Text>
                        ))}
                    </View>
                )
            case 'Speaking':
                return (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Sprechen 🗣️</Text>
                        <Text style={styles.text}>Bereite dich auf das Sprechen zum Thema <Text style={styles.bold}>{exercise.title}</Text> vor:</Text>
                        {[...Array(exercise.questionCount).keys()].map((i) => (
                            <Text key={i} style={styles.bullet}>• Punkt {i + 1}: ___________</Text>
                        ))}
                    </View>
                )
            default:
                return (
                    <View style={styles.section}>
                        <Text style={styles.text}>Keine spezifische Übungsart verfügbar</Text>
                    </View>
                )
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{exercise.title}</Text>
            <Text style={styles.description}>{exercise.description}</Text>
            <Text style={styles.meta}>Niveau: {exercise.level} | Typ: {exercise.type} | Zeit: {exercise.estimatedTime} Min</Text>
            {renderContent()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5fa',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 4,
        color: '#1a1a1a'
    },
    description: {
        fontSize: 16,
        marginBottom: 6,
        color: '#444'
    },
    meta: {
        fontSize: 14,
        color: '#777',
        marginBottom: 16
    },
    section: {
        marginBottom: 24
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#222'
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333'
    },
    bullet: {
        fontSize: 15,
        marginBottom: 6,
        color: '#444'
    },
    bold: {
        fontWeight: '600'
    },
    paragraph: {
        fontSize: 14,
        marginBottom: 12,
        color: '#555'
    },
    errorText: {
        fontSize: 18,
        color: '#c00'
    }
})
