import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, } from 'react-native';
import QuestionCard from './components/QuestionCard';
import { questions } from './questions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Leaderboard from './components/Leaderboard';

const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const resetScore = async () => {
    console.log("resetScore")
    await AsyncStorage.setItem('scores', JSON.stringify([]));
}

const App = () => {
    const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
    const [scoresBoard, setScoresBoard] = useState<{ name: string, score: number }[]>([]);

    let row = 0
    useEffect(() => {
        const shuffled = shuffleArray([...questions]).slice(0, 20).map(q => ({
            ...q,
            answers: shuffleArray([...q.answers])
        }));
        setShuffledQuestions(shuffled);
        resetScore();
        row = 0
        console.log("useEffect => loadScores");
        loadScores();
    }, []);

    const loadScores = async () => {
        const scoresJson = await AsyncStorage.getItem('scores');
        if (scoresJson) {
            setScoresBoard(JSON.parse(scoresJson));
        }
    };

    const handleAnswerSelect = async (selectedAnswer: string, correctAnswer: string) => {
        const currentScore = correctAnswer == selectedAnswer ? 1 : 0
        console.log("currentScore", currentScore)
        const scoresJson = await AsyncStorage.getItem('scores');
        const scores = scoresJson ? JSON.parse(scoresJson) : [];
        scores.push({ name: 'Player 1', score: currentScore });
        console.log("scores", scores)
        await AsyncStorage.setItem('scores', JSON.stringify(scores));
        console.log("loadScores");
        loadScores();
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={shuffledQuestions}
                keyExtractor={(item) => item.question}
                renderItem={({ item }) => (
                    <QuestionCard
                        question={item.question}
                        answers={item.answers}
                        row={++row}
                        correctAnswer={item.correctAnswer}
                        onSelectAnswer={handleAnswerSelect}
                    />
                )}
            />
            {/* <Leaderboard /> */}
            <View style={stylesBoard.container}>
                <Text style={stylesBoard.header}>Leaderboard</Text>
                <FlatList
                    data={scoresBoard}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={stylesBoard.scoreItem}>
                            <Text>{item.name}: {item.score}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

const stylesBoard = StyleSheet.create({
    container: {
        margin: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scoreItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default App;