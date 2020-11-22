import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";



const CreateTeam = ({ user, auth, setRoute }) => {
    const [teamName, setTeamName] = useState("")


const defaultGames = {
    "Guess Heights" : {
      "description" : "Guess everyone’s height, one person at a time. One point goes to whoever is closest and whoever gets the most points wins.",
      "name" : "Guess Heights",
      "numPlayers" : "8+"
    },
    "King's Cup" : {
      "description" : "Every player draws cards and the group plays a game based on which card the player drew. Whoever loses or messes up a minigame must drink.",
      "name" : "King's Cup",
      "numPlayers" : "5-7"
    },
    "Most likely to" : {
      "description" : "Pose different \"most likely to\" scenarios — for example, \"most likely to go skydiving\" or \"most likely to go on a blind date arranged by their mom\" — and decide who would be most likely to do that thing. Whoever is chosen gets to choose the next question!",
      "name" : "Most likely to",
      "numPlayers" : "8+"
    },
    "Pictionary" : {
      "description" : "Open up a book (or use a word generator) and draw the first noun you see - make sure to show your masterpiece on camera. If anyone guesses what you’re drawing in less than a minute you get a point.",
      "name" : "Pictionary",
      "numPlayers" : "2-4"
    },
    "Scavenger hunt" : {
      "description" : "One person picks a short list of random things and everyone else tries to find each item (one at a time) before coming back to ask what the next item on the list is. Whoever gets to the end of the list first wins!   Optional: Split into 2-3 teams and give each team the whole list of items at the start.",
      "name" : "Scavenger hunt",
      "numPlayers" : "5-7"
    },
    "Two truths and a lie" : {
      "description" : "Each person tells two truths and a lie about themselves. Everyone else tries to guess which is the lie. How well do you know your fellow Loungers?",
      "name" : "Two truths and a lie",
      "numPlayers" : "2-4"
    },
    "Would you rather?" : {
      "description" : "Make each other make tough decisions! Everyone, including the person who asks, has to answer. For example: Would you rather lie in a pit of snakes or eat ten spiders? Enjoy!",
      "name" : "Would you rather?",
      "numPlayers" : "5-7"
    }
}


    function addTeam(teamID) {
        const userUpdate = {
            firstName: user.firstName,
            lastName: user.lastName,
            voteToClose: false,
            admin: true
        }
        var updates = {};
        updates['/teams/' + teamID + '/members/' + auth.uid] = userUpdate;
        updates['/teams/' + teamID + '/name/'] = teamName;
        updates['/users/' + auth.uid + '/teams/' + teamID] = teamName;
        updates['/games/' + teamID] = defaultGames;
        
        return firebase.database().ref().update(updates)
            .then(() => setRoute("Teams"))
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
                <Text style={[styles.header, styles.center]}> 🌱 Create a Team </Text>
                <Text style={[styles.text, styles.center]}> Team Name </Text>
                <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={teamName} onChangeText={text => setTeamName(text)} placeholder="eg. Third floor squad" />
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                    <Text style={[styles.text, styles.center]}>Create Team</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setRoute("Teams")}>
                    <Text style={[styles.text, styles.center]}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateTeam;