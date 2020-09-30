import React, { useEffect, useState } from 'react';
import { ImageBackground, Button, TextInput, Text, View, StyleSheet, SafeAreaView, SectionList } from 'react-native';
import { firebase } from '../firebase';
import Constants from "expo-constants";

const image = { uri: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_1460,h_822/at%2Fart%2Fdesign%2Fzoom-backgrounds%2FAT-zoom-background-stayhome" };

const Lobby = ({user, setUser, uid, setUid}) => {
    const [lobbyNames, setLobbyNames] = useState(null);
    const db = firebase.database().ref('lobby');
    const [myVote, setMyVote] = useState(false);
    const [joinLobby, setJoinLobby] = useState(false);

    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                const json = snap.val()
                const lobby = Object.values(json)
                setLobbyNames(lobby)
                console.log(lobby);
            }
        }
        db.on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
    }, []);

    const voteToClose = () => {
        var voteRef = firebase.database().ref('/lobby/' + uid);
        voteRef.update({voteToClose:true});
    }

    const addToLobby = () => {
        if(!uid) {
            const newUser = {
                name: user.name,
                voteToClose: false
            };
            var key = db.push(newUser).getKey();
            setUid(key);
            setJoinLobby(true);
        }
    }

  
    return (
        <View style={styles.container}>
            {/* </View><ImageBackground source={image} style={styles.image}> */}
            <View>
                <Text style={styles.header}>Hello {user.name}</Text>
                {(!joinLobby) &&
                    <Button style={styles.button} title={"Join Lobby"} onPress={addToLobby} >
                        <Text>Join Lounge</Text>
                    </Button>
                }

                {lobbyNames ? (
                    <View>
                    {lobbyNames.map(user => (
                        <Text style={styles.list} key={user.name}>{user.name}</Text>    
                    ))} 
                    {!myVote && joinLobby &&
                        <Button title={"Vote to Close"} onPress={voteToClose}>
                            <Text>Vote to Close</Text>
                        </Button>}
                    </View>
                )
                :
                <Text>loading</Text>} 

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16
    },
    header: {
      fontSize: 32,
      //backgroundColor: "#fff",
      margin: 50
    },
    list: {
        //backgroundColor: "#f9c2ff",
        margin: 50,
        height: 30,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
  });

export default Lobby;

