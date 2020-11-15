import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Platform, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const History = ({ teamId, setRoute, setIsPlaying }) => {
    const [teamHistory, setTeamHistory] = useState([]);
    var getHistoryRef = firebase.database().ref('teams/' + teamId + '/history/');


    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                const json = snap.val();
                var history = Object.entries(json);
                setTeamHistory(history);
                console.log(history)
            }
        }
        getHistoryRef.on('value', handleData, error => alert(error));
        return () => { getHistoryRef.off('value', handleData); };
    }, []);

    const formatTeamMembers = (names) => {
        const nameArray = names.split(',')
        // "Grady, Han, and 2 others"
        let finalString = "";
        if (nameArray.length == 2)
            finalString = nameArray[0] + " and " + nameArray[1] + " joined";
        else if (nameArray.length == 3)
            finalString = nameArray[0] + ", " + nameArray[1] + ", and 1 other joined";
        else
            finalString = nameArray[0] + ", " + nameArray[1] + ", and " + (nameArray.length-2) + " others joined";
        return finalString
        }

    return (
        <View>
            <Text style={[styles.header, styles.center]}> History 🦕 </Text>
            {teamHistory.map(game => (
                <View style={[styles.paragraph]}>
                    <Text style={styles.text}>{game[1].gameName}</Text>
                    <Text style={styles.text}>{game[1].created}</Text>
                    <Text style={[styles.text, styles.list]}>{formatTeamMembers(game[0])}</Text>
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => {
                        if (Platform.OS == 'web') {
                            window.open('https://meet.jit.si/' + JSON.stringify(game[1].link).slice(1, -1), '_blank');
                        }
                        else {
                            Linking.openURL('https://meet.jit.si/' + JSON.stringify(game[1].link).slice(1, -1))
                        }
                    }}>
                        <Text style={[styles.text, styles.center, { fontWeight: "bold" }]}>
                            Join Call
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={[styles.button, styles.center]} title={"Back button"} onPress={() => setRoute('Lobby')}>
                <Text style={[styles.text, styles.center]}> Back </Text>
            </TouchableOpacity>
        </View>
    )
}

export default History;