import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Clipboard, ScrollView } from 'react-native';
import onlineStatus from '../util/onlineStatus';
import LogoutButton from './LogoutButton';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const Lobby = ({ auth, teamInfo, teamId, setTeamId, teamName }) => {
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
        if (teamId != "")
            onlineStatus(auth.uid, teamId);
        setJoinLobby(true);
    }

    const copyTeamID = (teamId) => {
        Clipboard.setString(teamId);
        alert("Team ID copied to clipboard");
    }

    const onlineUsers = (teamInfo) => {
        var arr = teamInfo.filter(user => user.status == "online")
        // console.log("online");
        // console.log(arr);
        return arr;
    }

    const offlineUsers = (teamInfo) => {
        var arr = teamInfo.filter(user => user.status == "offline")
        //console.log("offline");
        // console.log(arr);
        return arr;
    }

    const back = () => {
        const teamUserRef = firebase.database().ref('/teams/' + teamId + "/members/" + auth.uid);

        const offlineStatus = {
            status: "offline",
            voteToClose: "false"
        };
        setTeamId("");
        teamUserRef.update(offlineStatus);
    };

    return ( //Clipboard.setString('hello world');
        <View style={styles.container}>
            <Text style={[styles.header, styles.center]}>{teamName}</Text>
            <TouchableOpacity style={[styles.button, styles.center]} title={"Join Lounge"} onPress={() => copyTeamID(teamId)} >
                <Text style={[styles.buttonText, styles.center]} >Team ID: {teamId}</Text>
            </TouchableOpacity>
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
                    
                        <Text style={styles.header}>Online Users</Text>
                        {onlineUsers(teamInfo).map(user => (
                            <View key={user.firstName} style={styles.list}>
                                <Text style={[styles.listText, styles.center]}>{user.firstName}{user.voteToClose == "true" && " ✅"} </Text>
                            </View>
                        ))}
                        <Text style={styles.header}>Offline Users</Text>
                        {offlineUsers(teamInfo).map(user => (
                            <View key={user.firstName} style={styles.list}>
                                <Text style={[styles.listText, styles.center]}>{user.firstName}</Text>
                            </View>
                        ))}
                    <TouchableOpacity style={[styles.button, styles.center]} title={"Cancel vote"} onPress={back}>
                        <Text style={[styles.buttonText, styles.center]}>Back</Text>
                    </TouchableOpacity>
                </View>)
                :
                <Text style={styles.text}>No one is in the Lounge. Be the first to join!</Text>}
        </View>
    )
}

export default Lobby;
