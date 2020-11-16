import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const Game = ({ isPlaying, teamId, setReset}) => {
  const [gameInfo, setGameInfo] = useState({});
  const [gameName, setGameName] = useState("");
  const [link, setLink] = useState("");
  
  var getHistoryRef = firebase.database().ref('teams/' + teamId + '/history/' + isPlaying);
  var getGameRef = firebase.database().ref('games/' + gameName + "/");

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setLink(snap.val().link);
        setGameName(snap.val().gameName);
      }
    }
    getHistoryRef.once('value', handleData, error => alert(error));
    return () => { getHistoryRef.off('value', handleData); };
  }, []);

  useEffect(() => {
    const handleData = snap => {
      console.log(snap);
      if (snap.val()) {
        const json = snap.val()
        setGameInfo(json)
      }
    }
    getGameRef.on('value', handleData, error => alert(error));
    return () => { getGameRef.off('value', handleData); };
  }, [gameName]);

  return (
    <View style={[styles.header, styles.container]}>
      <View styles={styles.center}>
        <Text style={[styles.header, styles.center]} >We're playing {gameInfo.name}  👀 </Text>
        <Text style={[styles.list, styles.text, styles.center]} >  {gameInfo.description}  🤣 </Text>
      </View>
      <TouchableOpacity style={[styles.button, styles.center]} onPress={() => voteGame(game.name)}>
        <Text style={[styles.text, styles.center, {fontWeight:"bold"}]}
          onPress={() => {
            if (Platform.OS == 'web') {
              window.open('https://meet.jit.si/' + JSON.stringify(link).slice(1, -1), '_blank');
            } else {
              Linking.openURL('https://meet.jit.si/' + JSON.stringify(link).slice(1, -1))
            }
          }
          }>
          💖 Join Call!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setReset(true)}>
          <Text style={[styles.text, styles.center]}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Game;