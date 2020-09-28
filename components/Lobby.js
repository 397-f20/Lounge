import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { firebase } from '../firebase';

const Lobby = ({user}) => {
    const [lobbyNames, setLobbyNames] = useState(null);
    const db = firebase.database().ref('Lobby');
    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
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

    const addToLobby = () => {
        const newUser = {
            name: user,
            voteToClose: false
        };
        db.push(newUser);
    }

  


    return (
        <View>
            <Text>{user}</Text>
            <Button title={"Join Lobby"} onPress={addToLobby} >
                <Text>Join Lounge</Text>
            </Button>
            {lobbyNames ? lobbyNames.map(user => (
            <Text key={user.name}>{user.name}</Text>))
            :
            <Text>loading</Text>}
        </View>
    )
}

export default Lobby;

