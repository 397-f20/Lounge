import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const LogoutButton = ({ teamId, setTeamId, auth, setRoute}) => {
    const teamUserRef = firebase.database().ref('/teams/' + teamId + "/members/" + auth.uid);
    const logOut = () => {
        const offlineStatus = {
            status: "offline",
            voteToClose: "false"
        };
        setTeamId("");
        setRoute("Login");
        teamUserRef.update(offlineStatus).then(() => firebase.auth().signOut());
    }

    return (
        <TouchableOpacity style={[styles.button, styles.center]} onPress={() => logOut()}>
            <Text style={[styles.text, styles.center]}> ✌️ Logout</Text>
        </TouchableOpacity>
    )
}


export default LogoutButton;