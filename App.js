import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { firebase } from './firebase';
import onlineStatus from './util/onlineStatus';
import Lobby from './components/Lobby';
import NameForm from './components/NameForm';
import Game from './components/Game';
import Activities from './components/Activities';

export default function App() {
  const db = firebase.database().ref('lobby/users/');
  const [user, setUser] = useState(false);
  const [uid, setUid] = useState(false);
  const [uids, setUids] = useState([]);


  // lobby
  const [lobby, setLobby] = useState(null);
  useEffect(() => {

    const handleData = snap => {
      if (snap.val()) {
        const json = snap.val()
        setUids(Object.keys(json))
        const lobby = Object.values(json)
        setLobby(lobby)
      }
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  // lobby closed
  const isLobbyClosed = (lobby) => {
    if (lobby) {
      var arr = lobby.filter(user => user.voteToClose == "false")
      return (arr.length == 0 && lobby.length > 1)
    }
    return false
  }

  const isGameChosen = (lobby) => {
    console.log(lobby)
    if (lobby) {
      var arr = lobby.filter(user => user.voteGame != null)
      console.log(lobby)
      console.log(arr.length)
      console.log(arr)
      if (arr.length == lobby.length){
        return true
      }
      else
        return false
    }
  }

  const theGameChosen = (lobby) => {
    var arr = lobby.filter(user => user.voteGame != null)
    var map = {};
    var mostFrequentElement = arr[0].voteGame;
    for(var i = 0; i<arr.length; i++){
      if(!map[arr[i].voteGame]){
          map[arr[i].voteGame]=1;
      }else{
          ++map[arr[i].voteGame];
          if(map[arr[i].voteGame]>map[mostFrequentElement]){
              mostFrequentElement = arr[i].voteGame;
          }
      }
    }
    return mostFrequentElement
  }

  useEffect(() => {
    if (uid)
      onlineStatus(uid);
  }, [uid]);

  const generateLink = (uids) => {
    return uids[0]
    //return uids.join('');
  }

  return (
    <SafeAreaView style={[styles.background, styles.center]}>
      <View style={[styles.container, styles.center]}>
        {!isLobbyClosed(lobby) ?
          <View style={styles.container}>
            {user ?
              <Lobby user={user}
                uid={uid}
                setUid={setUid}
                lobby={lobby} />
              :
              <NameForm setUser={setUser} />
            }
          </View>
          :
          !isGameChosen(lobby) ?
            <View style={[styles.container, styles.center]}>
              <Activities numUsers={lobby.length} uid={uid} lobby={lobby}/>
            </View> 
            :
            <View style={[styles.container, styles.center]}>
              <Game jitsiLink={generateLink(uids)} gameName={theGameChosen(lobby)} />
            </View>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '100%',
    maxWidth: 600,
    minWidth: 200,
  },
  background: {
    backgroundColor: '#8FBC8F',
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
