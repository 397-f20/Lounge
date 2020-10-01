import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ImageBackground, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { firebase } from '../firebase';

const image = { uri: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_1460,h_822/at%2Fart%2Fdesign%2Fzoom-backgrounds%2FAT-zoom-background-stayhome" };

const Lobby = ({ user, uid, setUid, lobby }) => {
    const db = firebase.database().ref('lobby');
    const [myVote, setMyVote] = useState(false);
    const [joinLobby, setJoinLobby] = useState(false);


    const voteToClose = () => {
        var voteRef = firebase.database().ref('/lobby/' + uid);
        voteRef.update({ voteToClose: "true" });
    }

    const addToLobby = () => {
        if (!uid) {
            const newUser = {
                name: user.name,
                voteToClose: "false"
            };
            var key = db.push(newUser).getKey();
            setUid(key);
            setJoinLobby(true);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.header, styles.center]}>Hello {user.name}!</Text>
            {(!joinLobby) &&
                <TouchableOpacity style={[styles.button, styles.center]} title={"Join Lobby"} onPress={addToLobby} >
                    <Text style={styles.buttonText}>Join Lounge</Text>
                </TouchableOpacity>
            }
            {lobby ? (
                <View style={[styles.container, styles.center]}>
                    {lobby.map(user => (
                        <View key={user.name} style={styles.list}>
                            <Text style={[styles.listHeader, styles.center]}>{user.name}{user.voteToClose == "true" && " ✅"} </Text>
                        </View>
                    ))}
                    {!myVote && joinLobby &&
                        <TouchableOpacity style={[styles.button, styles.center]} title={"Vote to Close"} onPress={voteToClose}>
                            <Text style={[styles.buttonText, styles.center]}>Vote to Close</Text>
                        </TouchableOpacity>}
                </View>)
                :
                <Text style={styles.text}>Lobby is empty now!</Text>}
        </View>
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
    textInput: {
        height: 50,
        backgroundColor: '#F5F5DC',
        color: '#000000',
        marginVertical: 30,
        fontSize: 20,
        borderRadius: 5,
        width: '100%',
    },
    button: {
        backgroundColor: '#556B2F',
        borderRadius: 5,
        width: '100%',
        height: 40,
        maxWidth: 300,
    },
    buttonText: {
        fontSize: 20,
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
    }
});

export default Lobby;

