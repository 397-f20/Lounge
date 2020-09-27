import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, List, ListItem } from "native-base";
import { firebase } from './firebase';

const Lobby = () => {
  const [lobbyNames, setLobbyNames] = useState(null);
  useEffect(() => {
    const db = firebase.database().ref('Lobby');
    const handleData = snap => {
      if (snap.val())  {
        const json = snap.val()
        const lobby = Object.values(json)
        console.log('lobby names are: ')
        console.log(lobby)
        setLobbyNames(lobby)
      }
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);
  
  const dbNames = ['Grady', 'Drew', 'Joyce']
  return (
    <Content>
      <List>
        {lobbyNames ? lobbyNames.map(user => (
        <ListItem key={user.Name}>
          <Text>{user.Name}</Text>
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
