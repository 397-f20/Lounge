import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';


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
            </View>
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
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
});

export default CreateTeam;