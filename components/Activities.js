import { Text, View, StyleSheet, SafeAreaView, Linking, Platform, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase';
import React, { useEffect, useState } from 'react';
import styles from "../assets/Styles";


const Activities = ({ numUsers, auth, teamInfo, teamId, setIsPlaying, jitsiLink}) => {
  const [myGameVote, setMyGameVote] = useState("");
  const [votedGames, setVotedGames] = useState([]);

  const numUsersStr = (numUsers) => {
    if (numUsers <= 4) {
      return "2-4"
    }
    if ((numUsers > 4) && (numUsers < 8)) {
      return "5-7"
    }
    else {
      return "8+"
    }
  }

  const voteGame = (gameName) => {
    var voteGameRef = firebase.database().ref('teams/' + teamId + '/members/' + auth.uid);
    voteGameRef.update({ voteGame: gameName });
    setMyGameVote(gameName);
  }

  const removeVoteGame = (gameName) => {
    var voteGameRef = firebase.database().ref('teams/' + teamId + '/members/' + auth.uid);
    voteGameRef.update({ voteGame: null });
    setMyGameVote("");
  }

  var gamesRef = firebase.database().ref('games').orderByChild('numPlayers').equalTo(numUsersStr(numUsers));
  const [games, setGames] = useState([]);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        const json = snap.val()
        const games = Object.values(json)
        console.log(games);
        setGames(games)
      }
    }
    gamesRef.on('value', handleData, error => alert(error));
    return () => { gamesRef.off('value', handleData); };
  }, []);

  const countGameVotes = (GameName) => {
    if (teamInfo) {
      var arr = teamInfo.filter(user => user.voteGame == GameName)
      return (arr.length)
    }
    else
      return 0
  }

  const generateHistoryId = (teamInfo) => {
    var onlineUsers = teamInfo.filter(user => user.status == "online");
    var arr = onlineUsers.map(obj => Object.values(obj)[0]);
    return arr.join();
  }

  useEffect(() =>{
    if (teamInfo) {
      var onlineUsers = teamInfo.filter(user => user.status == "online");
      var arr = teamInfo.filter(user => user.status == "online" && user.voteGame != null);

      if (arr.length == onlineUsers.length) {
        const updates = {
          gameName: theGameChosen(teamInfo),
          playUsers: onlineUsers,
          link: jitsiLink,
        };
        
        var historyId = generateHistoryId(teamInfo);
        var historyIdRef = firebase.database().ref('teams/' + teamId + '/history/' + historyId);
        historyIdRef.update(updates);
        setIsPlaying(historyId);
      }
    }
  },[teamInfo]);


  const theGameChosen = (teamInfo) => {
    var arr = teamInfo.filter(user => user.status == "online" && user.voteGame != null)
    var map = {};
    var mostFrequentElement = arr[0].voteGame;
    for (var i = 0; i < arr.length; i++) {
      if (!map[arr[i].voteGame]) {
        map[arr[i].voteGame] = 1;
      } else {
        ++map[arr[i].voteGame];
        if (map[arr[i].voteGame] > map[mostFrequentElement]) {
          mostFrequentElement = arr[i].voteGame;
        }
      }
    }
    return mostFrequentElement
  }

  return (
    <View>
      <Text style={[styles.header, styles.center]}> 😊 Which game should we play?</Text>
      {games.map(game => (
        <View key={game.name} style={styles.list}>
          <Text style={[styles.listHeader, styles.center]}>{game.name}{} </Text>
          <Text style={[styles.listHeader, styles.center]}>{countGameVotes(game.name)}{} </Text>
          {!!!myGameVote &&
            <TouchableOpacity style={[styles.button, styles.center]} onPress={() => voteGame(game.name)}>
              <Text style={[styles.text, styles.center]}>Vote for this game</Text>
            </TouchableOpacity>}
          {!!myGameVote && (myGameVote == game.name) &&
            <TouchableOpacity style={[styles.button, styles.center]} onPress={() => removeVoteGame(game.name)}>
              <Text style={[styles.text, styles.center]}>Remove vote for this game</Text>
            </TouchableOpacity>}
        </View>
      ))}</View>
  )
}


export default Activities;