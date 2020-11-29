import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Platform, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const History = ({ teamId, setRoute, setIsPlaying }) => {
    const [teamHistory, setTeamHistory] = useState([]);
    var getHistoryRef = firebase.database().ref('teams/' + teamId + '/history');


    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                const json = snap.val();
                var history = Object.entries(json);
                history = history.sort(function(a, b) {
                    return b[1].created - a[1].created;
                });
                setTeamHistory(history);
                // console.log(history)
            }
        }
        getHistoryRef.orderByChild('created').limitToLast(10).on('value', handleData, error => alert(error));
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
            finalString = nameArray[0] + ", " + nameArray[1] + ", and " + (nameArray.length - 2) + " others joined";
        return finalString
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // const formatDate = (date) => {
    //     var currentDate = new Date().getDate();
    //     let minutesString = "";
    //     const val = date.getMinutes();
    //     if(val < 10) minutesString = "0" + val;
    //     else minutesString = val.toString();

    //     return (
    //         date.getDate() + " " +
    //         monthNames[date.getMonth()] + ", " +
    //         date.getHours() + ":" +
    //         minutesString
    //     );
    // }

    function formatDate(timeStamp) {
        var now = new Date(),
          secondsPast = (now.getTime() - timeStamp) / 1000;
        if (secondsPast < 60) {
          return parseInt(secondsPast) + 's ago';
        }
        if (secondsPast < 3600) {
          return parseInt(secondsPast / 60) + 'm ago';
        }
        if (secondsPast <= 86400) {
          return parseInt(secondsPast / 3600) + 'h ago';
        }
        if (secondsPast > 86400) {
          day = timeStamp.getDate();
          month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
          year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
          return day + " " + month + year + " ago";
        }
      }

    return (
        <View>
            <Text style={[styles.header, styles.center]}> History 🦕 </Text>
            {teamHistory.map(game => (
                <View style={[styles.paragraph]}>
                    <Text style={styles.text}>{game[1].gameName}</Text>
                    <Text style={[styles.text, styles.list]}>{formatDate(new Date(game[1].created))}</Text>
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