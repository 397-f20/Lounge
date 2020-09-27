import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, List, ListItem } from "native-base";
import { firebase } from './firebase';

const Lobby = () => {
  const [lobbyNames, setLobbyNames] = useState({});
  useEffect(() => {
    const db = firebase.database().ref('Lobby');
    const handleData = snap => {
      if (snap.val())  {
        setLobbyNames(snap.val());
        console.log(snap.val())
        console.log('lobby names are: ')
        console.log(lobbyNames)
      }
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);
  
  const dbNames = ['Grady', 'Drew', 'Joyce']
  return (
    <Content>
      <List>
        {lobbyNames ? dbNames.map(user => (
        <ListItem key={user}>
          <Text>{user}</Text>
        </ListItem>)) : <Text>loading</Text>}
      </List>
    </Content>
  )
}

export default function App() {
  return (
    <Container>
        <Header transparent>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Lounge</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Text>Cancel</Text> */}
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Button>
            <Text style={styles.container}>Join Lounge</Text>
          </Button>
          <Lobby></Lobby>
        </Content>
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // margin: "0 auto",
  },
});
