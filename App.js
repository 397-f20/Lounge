import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { firebase } from './firebase';
import onlineStatus from './util/onlineStatus';
import Lobby from './components/Lobby';
import NameForm from './components/NameForm';
import Game from './components/Game';

export default function App() {
  const db = firebase.database().ref('lobby');
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
        return (arr.length == 0)
    }
    return false
  }

  useEffect(() => {
    if (uid)
      onlineStatus(uid);
  }, [uid]);

  const generateLink = (uids) => {
    return uids.join('');
  }

  return (
    <SafeAreaView style={[styles.backaground, styles.center]}>
      <View style={[styles.container, styles.center]}>
        {!isLobbyClosed(lobby) ?
          <View style={styles.container}>
            {user ?
              <Lobby user={user}
                    uid={uid} setUid={setUid} 
                    lobby={lobby}/>
              :
              <NameForm setUser={setUser} />
            }
          </View>
          :
          <Game numUsers={lobby.length} generateLink={generateLink(uids)}/>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    height: '100%',
    maxWidth: 600,
  },
  backaground: {
    backgroundColor: '#8FBC8F',
    width: '100%',
    height: '100%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
