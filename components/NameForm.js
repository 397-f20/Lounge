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
        <View>
            {/*<ImageBackground source={require('../bg.jpg')} style={styles.image}>*/}
                <Text style={styles.header}>Wellcome to Lunge!</Text>
                <Text style={styles.text}> Enter your name here </Text>
                <TextInput autoFocus style={styles.textInput} value={nameField} placeholder="eg. John Doe" onChangeText={text => setNameField(text)} />
                <TouchableOpacity style={styles.button} onPress={() => newUser(nameField)}>
                    <Text style={styles.buttonText}>Submit Name</Text>
                </TouchableOpacity>
            {/* </ImageBackground> */}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        marginVertical: 60,
        color: '#F5F5DC',
        justifyContent: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 24,
        color: '#F5F5DC',
    },
    textInput: {
        margin: 10,
        height: 40,
        borderColor: '#F5F5DC',
        color: '#F5F5DC',
        borderWidth: 4,
        marginVertical: 30,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#556B2F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15, 
        //width: 200,
        height: 50,
    },
    buttonText: {
        fontSize: 18,
        color: '#F5F5DC',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});

export default NameForm;


