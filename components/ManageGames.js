import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TextInput, Platform, Text, View, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const ManageGames = ({ teamId, setRoute, setGame }) => {
    const [games, setGames] = useState([]);
    var gamesRef = firebase.database().ref('games/' + teamId).orderByChild('numPlayers')

    useEffect(() => {
        const handleData = snap => {
            if (snap.val()) {
                const json = snap.val()
                const games = Object.values(json)
                console.log(games);
                setGames(games)
            }
        }
        gamesRef.on('value', handleData, error => alert(error));
        return () => { gamesRef.off('value', handleData); };
    }, []);


    return (
        <View style={styles.container}>
            <Text style={[styles.header, styles.center]}>🔧 Manage Games</Text>
            <View style={[styles.list]}>
                {games.map(game => (
                    <TouchableOpacity style={[styles.button, styles.center]} 
                        onPress={() => {
                            setRoute('editGame')
                            setGame(game)
                            }}>
                        <Text style={[styles.listHeader, styles.center]}>{game.name}</Text>
                        </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setRoute('addGame')}>
                <Text style={[styles.text, styles.center]}> Create Game </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.center]} title={"Back button"} onPress={() => setRoute('Lobby')}>
                <Text style={[styles.text, styles.center]}> Back </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ManageGames;