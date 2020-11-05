import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, ImageBackground, Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { firebase } from "../firebase";
import LogoutButton from './LogoutButton';
import styles from "../assets/Styles";

const Teams = ({ auth, teamId, setTeamId, setRoute }) => {
    const [teams, setTeams] = useState([]);
    const db = firebase.database().ref('users/' + auth.uid + "/teams");

    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                const json = snap.val();
                var teams = Object.entries(json);
                setTeams(teams);
            }
        }
        db.on('value', handleData, error => alert(error));
        return () => { db.off('value', handleData); };
    }, []);

    return (
        <View style={[styles.container,styles.center]}>
            <Text style={[styles.header, styles.center]}>🥰 Your Teams </Text>
            <ScrollView style={[styles.teams]}>
            {teams.map(team => (
                        <TouchableOpacity style={[styles.button, styles.center]} key={team[0]} onPress={() => setTeamId(team[0])}>
                            <Text style={[styles.text, styles.center]}> {team[1]} </Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
            <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setRoute("joinTeam")}>
                <Text style={[styles.text, styles.center]}> 🤝🏿 Join a Team </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setRoute("createTeam")}>
                    <Text style={[styles.text, styles.center]}> 🌱 Create Team </Text>
                </TouchableOpacity>
            <LogoutButton teamId={teamId} setTeamId={setTeamId}  auth={auth} />
        </View>
        
    );
};



export default Teams;


