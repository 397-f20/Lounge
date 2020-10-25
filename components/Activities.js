import { Text, View, StyleSheet, SafeAreaView, Linking, Platform, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase';
import React, { useEffect, useState } from 'react';

const Activities = ({numUsers, auth, teamInfo, teamId}) => {
  const [myGameVote, setMyGameVote] = useState("");
  const [votedGames, setVotedGames] = useState([]);
  
  const numUsersStr = (numUsers) => {
    if (numUsers <= 4) {
      return "2-4"
    }
    if ((numUsers > 4) && (numUsers < 8)) {
      return "5-7"
    }
    else{
      return "8+"
    }   
  }

  const voteGame = (gameName) => {
    var voteGameRef = firebase.database().ref('teams' + teamId + '/members/' + auth.uid);
    voteGameRef.update({ voteGame: gameName });
    setMyGameVote(gameName);
  }

const removeVoteGame = (gameName) => {
  var voteGameRef = firebase.database().ref('teams' + teamId + '/members/' + auth.uid);
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
        setGames(games)
      }
    }
    gamesRef.on('value', handleData, error => alert(error));
    return () => { gamesRef.off('value', handleData); };
  }, []);

  const countGameVotes = (GameName) => {
    if (teamInfo){
      var arr = teamInfo.filter(user => user.voteGame == GameName)
      return (arr.length)
    }
    else
      return 0
  }

  return ( 
     <View>
      {games.map(game => (
      <View key={game.name} style={styles.list}>
          <Text style={[styles.listHeader, styles.center]}>{game.name}{} </Text>
          <Text style={[styles.listHeader, styles.center]}>{countGameVotes(game.name)}{} </Text>
          {!!!myGameVote &&
          <TouchableOpacity style={[styles.button, styles.center]} onPress={() => voteGame(game.name)}>
              <Text style={[styles.buttonText, styles.center]}>Vote for this game</Text>
          </TouchableOpacity>}
          {!!myGameVote && (myGameVote==game.name) &&
          <TouchableOpacity style={[styles.button, styles.center]} onPress={() => removeVoteGame(game.name)}>
              <Text style={[styles.buttonText, styles.center]}>Remove vote for this game</Text>
          </TouchableOpacity>}
      </View>
      ))}</View> 
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

export default Activities;