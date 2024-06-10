import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface QuestionCardProps {
    question: string;
    answers: string[];
    row: number;
    correctAnswer: string;
    onSelectAnswer: (answer: string, correctAnswer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, row, correctAnswer, onSelectAnswer }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.question}>{row + '. ' + question}</Text>
            {answers.map((answer, index) => (
                <Button key={index} title={answer} onPress={() => onSelectAnswer(answer, correctAnswer)} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    question: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default QuestionCard;