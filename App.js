import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase';
import onlineStatus from './util/onlineStatus';
import Lobby from './components/Lobby';
import NameForm from './components/NameForm';

export default function App() {
  const [user, setUser] = useState(false);
  const [uid, setUid] = useState(false);
  
  
  useEffect(() => {
    if (uid)
     onlineStatus(uid);
  }, [uid]);

  return (
    <View style={styles.container}>
      {user ?
        <Lobby user={user} setUser={setUser} uid={uid} setUid={setUid}/>
        :
        <NameForm setUser={setUser}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    maxWidth: 1200,
    alignItems: "center",
    justifyContent: 'center',
  },
});
