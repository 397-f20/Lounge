import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase';
import onlineStatus from './util/onlineStatus';
import Lobby from './components/Lobby';
import NameForm from './components/NameForm';

export default function App() {
  const [user, setUser] = useState(false);
  
  
  // useEffect(() => {
  //   if (user)
  //    onlineStatus(user);
  // }, []);

  return (
    <View style={styles.container}>
      {user ?
        <Lobby user={user}/>
        :
        <NameForm setUser={setUser}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    psoition: "relative",
    margin: "0 auto",
    maxWidth: 1200,
    alignItems: "center",
  },
});
