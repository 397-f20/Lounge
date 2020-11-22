import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Clipboard, ScrollView } from 'react-native';
import onlineStatus from '../util/onlineStatus';
import notify from '../util/notify';
import LogoutButton from './LogoutButton';
import { firebase } from '../firebase';
import styles from "../assets/Styles";

const Lobby = ({ auth, teamInfo, teamId, setTeamId, teamName, myVote, setMyVote, setRoute, }) => {
    const teamUserRef = firebase.database().ref('/teams/' + teamId + "/members/" + auth.uid);
    const [joinLobby, setJoinLobby] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log(teamInfo);
    // const admin = teamInfo.filter()

    useEffect(() => {
        updateOnlineUsers(teamInfo);
    }, [teamInfo]);


    const admin = (teamInfo) => {
        if (teamInfo){
            var ret = false;
            teamUserRef.once("value", function (snapshot) {
                snapshot.val() ?
                    ret = snapshot.val().admin:
                    ret =  false;
            });
            return ret;
        }
        else return false;
    }
    
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
        alert("Team ID copied to clipboard. Send it to friends so they can join your squad!");
    }

    const updateOnlineUsers = (teamInfo) => {
        if (teamInfo) {
            var arr = teamInfo.filter(user => user.status == "online")
            console.log(onlineUsers)
            // This has an issue: it notifies you if you are the one who joined when others have already joined.
            if (onlineUsers && arr.length > 1 && onlineUsers.length < arr.length)
                notify(
                    "Someone came online in " + teamName,
                    "Close the lobby to start the chillsesh",
                    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/waving-hand-sign_1f44b.png",
                    () => {if (Platform.OS == 'web') window.focus() } )
            // console.log("online");
            // console.log(arr);
            setOnlineUsers(arr);
        }
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

    const leave = () => {
        var updates = {};
        updates['/teams/' + teamId + '/members/' + auth.uid] = null;
        updates['/users/' + auth.uid + '/teams/' + teamId] = null;
        setTeamId("");
        return firebase.database().ref().update(updates)
            .then(() => setRoute("Teams"))
            .catch((error) => alert(error));

    };

    return ( //Clipboard.setString('hello world');
        <View style={styles.container}>
            <Text style={[styles.header, styles.center]}>{teamName}</Text>
            {admin(teamInfo) && 
            <View>
            <TouchableOpacity style={[styles.button, styles.center]} title={"Copy Team ID"} onPress={() => copyTeamID(teamId)} >
                <Text style={[styles.text, styles.center]} >📋 Copy team ID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.center]} title={"Copy Team ID"} onPress={() => setRoute('manageGames')} >
                <Text style={[styles.text, styles.center]} >🔧 Manage Games</Text>
            </TouchableOpacity>
            </View>
            }
            <TouchableOpacity style={[styles.button, styles.center]} title={"History"} onPress={() => setRoute('history')}>
                <Text style={[styles.text, styles.center]}> 🦕 Game History </Text>
            </TouchableOpacity>
            {(!joinLobby) &&
                <TouchableOpacity style={[styles.button, styles.center]} title={"Join Lounge"} onPress={goOnlineInTeam} >
                    <Text style={styles.text}> 😄 Go Online </Text>
                </TouchableOpacity>
            }
            {teamInfo ? (
                <View style={[styles.container, styles.center]}>
                    {!myVote && joinLobby &&
                        <TouchableOpacity style={[styles.button, styles.center]} title={"Vote to Close"} onPress={voteToClose}>
                            <Text style={[styles.text, styles.center]}> ✅ Mark Ready </Text>
                        </TouchableOpacity>}
                    {myVote && joinLobby &&
                        <TouchableOpacity style={[styles.button, styles.center]} title={"Cancel vote"} onPress={removeVote}>
                            <Text style={[styles.text, styles.center]}> 🚫 Mark Not Ready </Text>
                        </TouchableOpacity>}
                    <Text style={styles.header}> Online </Text>
                    { onlineUsers.length == 0 &&
                        <Text style={styles.text}> No one's online at the moment </Text>}
                    {onlineUsers.map(user => (
                        <View key={user.firstName} style={styles.list}>
                            <Text style={[styles.listText, styles.center]}>{user.firstName}{user.voteToClose == "true" && " ✅"} </Text>
                        </View>
                    ))}
                    <Text style={styles.header}> Offline </Text>
                    {offlineUsers(teamInfo).map(user => (
                        <View key={user.firstName + user.lastName + user.last_changed} style={styles.list}>
                            <Text style={[styles.listText, styles.center]}>{user.firstName}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.button, styles.center]} title={"Back button"} onPress={back}>
                        <Text style={[styles.text, styles.center]}> Back </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.center, styles.danger]} title={"Leave Team Button"} onPress={leave}>
                        <Text style={[styles.text, styles.center]}> Abandon Team </Text>
                    </TouchableOpacity>
                </View>)
                :
                <Text style={styles.text}>No one is in the Lounge. Be the first to join!</Text>}
        </View>
    )
}

export default Lobby;
