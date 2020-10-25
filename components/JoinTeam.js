import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ImageBackground, TextInput, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { firebase } from '../firebase';


const LoginForm = () => {
    const [teamIDField, setTeamIDField] = useState("")

    async function handleOnSubmit() {
        const teamRef = firebase.database().ref('/teams/' + teamIDField);
        teamRef.on("value", function(snapshot) {
            if(snapshot.val()) {
                //do something
            }
            console.log(snapshot.val());
            snapshot.forEach(function(data) {
                console.log(data.key);
            });
        });
    }

    return (
        <View>
            <View>
                <Text style={[styles.text, styles.center]}> Team ID </Text>
                <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={teamIDField} onChangeText={text => setTeamIDField(text)} />
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                    <Text style={[styles.buttonText, styles.center]}>Login</Text>
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

export default LoginForm;