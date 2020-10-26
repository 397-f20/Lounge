import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';


const JoinTeam = ({user, auth, setRoute}) => {
    const [teamIDField, setTeamIDField] = useState("")


    function addUserToTeam() {
        const userUpdate = {
            firstName: user.firstName, 
            lastName: user.lastName, 
            voteToClose: false }
        const teamUpdate = {[teamIDField]: true}
        var updates = {};
        updates['/teams/' + teamIDField + '/members/' + auth.uid] = userUpdate;
        updates['/users/' + auth.uid + '/teams/'] = teamUpdate;
        return firebase.database().ref().update(updates)
            .then( () => setRoute("someRoute"))
            .catch((error) => alert(error));
    }

    function handleOnSubmit() {
        const teamRef = firebase.database().ref('/teams/' + teamIDField);
        teamRef.once("value", function(snapshot) {
            snapshot.val() ? 
                addUserToTeam()
                :
                alert("Team Does Not Exist");
        });
    }

    return (
        <View>
            <View>
                <Text style={[styles.text, styles.center]}> Team ID </Text>
                <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={teamIDField} onChangeText={text => setTeamIDField(text)} />
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                    <Text style={[styles.buttonText, styles.center]}>Join Team</Text>
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

export default JoinTeam;