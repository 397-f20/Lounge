import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Linking, Platform } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const Game = ({ jitsiLink, gameName }) => {
  const [gameInfo, setGameInfo] = useState({});
  var getGameRef = firebase.database().ref('games/' + gameName + "/");

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        const json = snap.val()
        setGameInfo(json)
        // console.log(gameInfo.name)
        // console.log(gameInfo.description)
      }
    }
    getGameRef.on('value', handleData, error => alert(error));
    return () => { getGameRef.off('value', handleData); };
  }, [gameName]);

  return (
    <View style={[styles.header, styles.container]}> 
        <View styles={styles.center}>
          <Text style={[styles.header, styles.center]} >We are playing:{"\n"}   {gameInfo.name}  👀 </Text>
          <Text style={[styles.list, styles.text, styles.center]} >  {gameInfo.description}  🤣 </Text>
        </View>
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

export default Game;