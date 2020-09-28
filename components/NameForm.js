import React, { useState } from 'react';
import { Button, TextInput, Text, View } from 'react-native';

export default function NameForm({setUser}) {
    const [nameField, setNameField] = useState('');
    return (
        <View>
            <Text> Enter your name </Text>
            <TextInput value={nameField} placeholder="eg. John Doe" onChangeText={ text => setNameField(text) }/>
            <Button title={"Submit name"}  onPress={ () => setUser(nameField) }/>
        </View>
    );
}