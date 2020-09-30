import React, { useEffect, useState } from 'react';
import { ImageBackground, Button, TextInput, Text, View, StyleSheet, SafeAreaView, SectionList } from 'react-native';
import { firebase } from '../firebase';
import Constants from "expo-constants";

const image = { uri: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_1460,h_822/at%2Fart%2Fdesign%2Fzoom-backgrounds%2FAT-zoom-background-stayhome" };

const Lobby = ({user, setUser, uid, setUid}) => {
    const [lobby, setLobby] = useState(null);
    const db = firebase.database().ref('lobby');
    const [myVote, setMyVote] = useState(false);
    const [joinLobby, setJoinLobby] = useState(false);
    const [lobbyClosed, setLobbyClosed] = useState(false);

    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                const json = snap.val()
                const lobby = Object.values(json)
                setLobby(lobby)
                setLobbyClosed(isLobbyClosed(lobby))
                
            }
        }
        db.on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
    }, []);

    const voteToClose = () => {
        var voteRef = firebase.database().ref('/lobby/' + uid);
        voteRef.update({voteToClose:"true"});
    }

    const addToLobby = () => {
        if(!uid) {
            const newUser = {
                name: user.name,
                voteToClose: "false"
            };
            var key = db.push(newUser).getKey();
            setUid(key);
            setJoinLobby(true);
        }
    }

    const isLobbyClosed = (lobby) => {
        if (lobby) {
            console.log(lobby);
            var arr = lobby.filter(user => user.voteToClose == "false")
            
            return (arr.length == 0)
        }
        return false
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

                {lobby ? (
                    <View>
                    {lobby.map(user => (
                        <View key={user.name}>
                            <Text style={styles.list}>{user.name}</Text>  
                            <Text style={styles.list}>Vote to Close: {user.voteToClose}</Text>
                        </View>  
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
        margin: 20,
        height: 10,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
  });

export default Lobby;

