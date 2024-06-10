import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Leaderboard = () => {
  const [scores, setScores] = useState<{name: string, score: number}[]>([]);

  useEffect(() => {
    const loadScores = async () => {
      const scoresJson = await AsyncStorage.getItem('scores');
      if (scoresJson) {
        setScores(JSON.parse(scoresJson));
      }
    };
    console.log("loadScores");
    loadScores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <FlatList
        data={scores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text>{item.name}: {item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Leaderboard;