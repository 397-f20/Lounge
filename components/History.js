import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const History = ({teamId, setRoute, setIsPlaying }) => {
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


    return (
        <View>
            <Text> History Here </Text>
            {teamHistory.map(game => (
                <View>
                    <Text>{game[1].gameName}</Text>
                    <Text>{game[1].link}</Text>
                    <Text>Join</Text>
                </View>
            ))}
        </View>
    )
} 

export default History;