import React, { useState } from 'react';
import { TouchableOpacity, TextInput, ImageBackground, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Constants from "expo-constants";

const NameForm = ({ setUser }) => {
    const [nameField, setNameField] = useState('');
    const newUser = (newname) => {
        const u = {
            name: newname
        }
        setUser(u);
    }

    return (
        <View style={[styles.center]}>
            <Text style={[styles.header, styles.center]}>Welcome to Lounge!</Text>
            <Text style={[styles.text, styles.center]}> What's your name? </Text>
            <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={nameField} placeholder="eg. John Doe" onChangeText={text => setNameField(text)} />
            <View style={[styles.container, styles.center]}>
                <TouchableOpacity style={[styles.button, styles.center]} onPress={() => newUser(nameField)}>
                    <Text style={[styles.buttonText, styles.center]}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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

export default NameForm;


