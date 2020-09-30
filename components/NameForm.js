import React, { useState } from 'react';
import { TouchableOpacity, TextInput, Button, Text, View, StyleSheet, SafeAreaView, SectionList } from 'react-native';
import Constants from "expo-constants";

const NameForm = ({setUser}) => {
    const [nameField, setNameField] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}> Enter your name </Text>
                <TextInput style={styles.textInput} value={nameField} placeholder="eg. John Doe" onChangeText={ text => setNameField(text) }/>
                <TouchableOpacity onPress={ () => setUser(nameField) }>
                    <View style = {{backgroundColor: 'red', alignItems: 'center', 
                        justifyContent: 'center', borderRadius: 15, width: 200}}>
                            <Text style = {{color: 'white'}}>Submit Name</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    },
    textInput: {
        margin: 10,
        height: 30,
        borderColor: '#7a42f4',
        borderWidth: 1,
    },
    button: {
        borderRadius: 15,
        padding: 20
    }
  });

export default  NameForm;


  