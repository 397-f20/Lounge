import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ImageBackground, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { firebase } from '../firebase';

const Lobby = ({ auth, teamInfo, teamId, setTeamId}) => {
    console.log(teamId);
    const teamUserRef = firebase.database().ref('/teams/' + teamId + "/members/" + auth.uid);
    const [myVote, setMyVote] = useState(false);
    const [joinLobby, setJoinLobby] = useState(false);

    const voteToClose = () => {
        teamUserRef.update({ voteToClose: "true" });
        setMyVote(true);
    }

    const removeVote = () => {
        teamUserRef.update({ voteToClose: "false" });
        setMyVote(false);
    }

    const goOnlineInTeam = () => {
        if (auth) {
            const onlineStatus = {
                status: "online",
                voteToClose: "false",
            };
            teamUserRef.update(onlineStatus);
            setJoinLobby(true);
        }
    }

    const logOut = () => {
        const offlineStatus = {
            status: "offline"
        };
        setTeamId("");
        teamUserRef.update(offlineStatus).then(() => firebase.auth().signOut());
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.header, styles.center]}>Hello {auth.email}!</Text>
            <Text style={[styles.center]}>Team ID: {teamId}</Text>
            {(!joinLobby) &&
                <TouchableOpacity style={[styles.button, styles.center]} title={"Join Lounge"} onPress={goOnlineInTeam} >
                    <Text style={styles.buttonText}>Join Lounge</Text>
                </TouchableOpacity>
            }
            {teamInfo ? (
                <View style={[styles.container, styles.center]}>
                    {!myVote && joinLobby &&
                        <TouchableOpacity style={[styles.button, styles.center]} title={"Vote to Close"} onPress={voteToClose}>
                            <Text style={[styles.buttonText, styles.center]}>Vote to Close Lobby</Text>
                        </TouchableOpacity>}
                    {myVote && joinLobby &&
                        <TouchableOpacity style={[styles.button, styles.center]} title={"Cancel vote"} onPress={removeVote}>
                            <Text style={[styles.buttonText, styles.center]}>Cancel vote</Text>
                        </TouchableOpacity>}
                    {teamInfo.map(user => (
                        <View key={user.firstName} style={styles.list}>
                            <Text style={[styles.listHeader, styles.center]}>{user.firstName}{user.voteToClose == "true" && " ✅"} </Text>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => logOut()}>
                        <Text style={[styles.buttonText, styles.center]}>Logout</Text>
                    </TouchableOpacity>
                </View>)
                :
                <Text style={styles.text}>No one is in the Lounge. Be the first to join!</Text>}
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
        marginBottom: 20,
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
