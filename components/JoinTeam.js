import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";



const JoinTeam = ({ user, auth, setRoute }) => {
    const [teamIDField, setTeamIDField] = useState("")


    function addUserToTeam(teamName) {
        const userUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            voteToClose: false
        }
        var updates = {};
        updates['/teams/' + teamIDField + '/members/' + auth.uid] = userUpdate;
        updates['/users/' + auth.uid + '/teams/' + teamIDField] = teamName;
        return firebase.database().ref().update(updates)
            .then(() => setRoute("Teams"))
            .catch((error) => alert(error));
    }

    function handleOnSubmit() {
        const teamRef = firebase.database().ref('/teams/' + teamIDField);
        teamRef.once("value", function (snapshot) {
            snapshot.val() ?
                addUserToTeam(snapshot.val().name)
                :
                alert("Oops! There's no team with ID '" + teamIDField + "'. Double check the Team ID your friend sent you.");
        });
    }

    return (
        <View>
            <View>
                <Text style={[styles.header, styles.center]}> 🤝🏿 Join a Team </Text>
                <Text style={[styles.text, styles.center]}> Team ID </Text>
                <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={teamIDField} onChangeText={text => setTeamIDField(text)} placeholder="-TeamID" />
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                    <Text style={[styles.text, styles.center]}>Join Team</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setRoute("Teams")}>
                    <Text style={[styles.text, styles.center]}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default JoinTeam;