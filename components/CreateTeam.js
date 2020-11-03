import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";



const CreateTeam = ({user, auth, setRoute}) => {
    const [teamName, setTeamName] = useState("")


    function addTeam(teamID) {
        const userUpdate = {
            firstName: user.firstName, 
            lastName: user.lastName, 
            voteToClose: false }
        var updates = {};
        updates['/teams/' + teamID + '/members/' + auth.uid] = userUpdate;
        updates['/teams/' + teamID + '/name/'] = teamName;
        updates['/users/' + auth.uid + '/teams/' + teamID] = teamName;
        return firebase.database().ref().update(updates)
            .then( () => setRoute("someRoute"))
            .catch((error) => alert(error));
    }

    function handleOnSubmit() {
        const teamRef = firebase.database().ref('/teams/');
        var teamID = teamRef.push().getKey();
        addTeam(teamID);
        // updates['/teams/' + teamIDField + '/members/' + auth.uid] = userUpdate;
        // updates['/users/' + auth.uid + '/teams/' + teamIDField] = true;
        // firebase.database().ref().update(updates)
        // teamRef.once("value", function(snapshot) {
        //     snapshot.val() ? 
                
        //         :
        //         alert("Fail to create");
        // });
    }

    return (
        <View>
            <View>
                <Text style={[styles.text, styles.center]}> Team Name </Text>
                <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={teamName} onChangeText={text => setTeamName(text)} placeholder="-My first team"/>
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                    <Text style={[styles.buttonText, styles.center]}>Create Team</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setRoute("")}>
                    <Text style={[styles.buttonText, styles.center]}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateTeam;