import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Linking, Platform } from 'react-native';

const Game = ({ numUsers, jitsiLink }) => {
  return (
    <View style={[styles.header, styles.container]}> 
      { numUsers >= 10 &&
        <View styles={styles.center}>
          <Text style={[styles.header, styles.center]} >📐 We're playing "Guess Heights" </Text>
          <Text style={[styles.list, styles.text, styles.center]} > style={styles.text} Guess everyone’s height, one person at a time. One point goes to whoever is closest and whoever gets the most points wins. </Text>
        </View>}

      { numUsers < 10 && numUsers >= 5 &&
        <View styles={styles.center}>
          <Text style={[styles.header, styles.center]} >🔎 We're playing "Two Truths and a Lie" </Text>
          <Text style={[styles.list, styles.text, styles.center]} > Each person tells two truths and a lie about themselves. Everyone else tries to guess which is the lie. How well do you know your fellow Loungers? </Text>
        </View>}

      { numUsers < 5 &&
        <View>
          <Text style={[styles.header, styles.center]}>🤣 We're playing "Would you rather? </Text>
          <Text style={[styles.list, styles.text, styles.center]}> Make each other make tough decisions! Everyone, including the person who asks, has to answer. For example: Would you rather lie in a pit of snakes or eat ten spiders? Enjoy! </Text>
        </View>}

      <Text style={[styles.center, { color: '#3b45b5', fontWeight: "bold" }]}
        onPress={() => {
          if (Platform.OS == 'web') {
            window.open('https://meet.jit.si/' + JSON.stringify(jitsiLink).slice(1, -1), '_blank');
          } else {
            Linking.openURL('https://meet.jit.si/' + JSON.stringify(jitsiLink).slice(1, -1))
          }
        }
        }>
        Join: https://meet.jit.si/{jitsiLink}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 32,
    marginVertical: 60,
    color: '#F5F5DC',
  },
  text: {
    fontSize: 24,
    color: '#F5F5DC',
  },
  list: {
    fontSize: 15,
    color: '#F5F5DC',
    borderRadius: 15,
    margin: 20,
  },
  listHeader: {
    fontSize: 24,
    color: '#F5F5DC',
    textAlign: 'center'
  },
  listText: {
    fontSize: 18,
    color: '#F5F5DC',
    textAlign: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Game;