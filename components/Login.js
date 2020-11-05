import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ImageBackground, TextInput, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { firebase } from '../firebase';
import styles from "../assets/Styles";


const LoginForm = () => {
    const [loginType, setLoginType] = useState('');
    const [emailField, setEmailField] = useState('');
    const [firstNameField, setFirstNameField] = useState('');
    const [lastNameField, setLastNameField] = useState('');
    const [passField, setPassField] = useState('');
    const [confirmPassField, setConfirmPassField] = useState('');
    const [signInError, setSignInError] = useState('');

    async function handleOnSubmit() {
        loginType == 'Login' ?
            firebase.auth().signInWithEmailAndPassword(emailField, passField).catch(function (error) {
                setSignInError(error.message);
            })
            : passField == confirmPassField ?
                firebase.auth().createUserWithEmailAndPassword(emailField, passField)
                    .then(user => registerNewUser(user)).catch(function (error) {
                        setSignInError(error.message);
                    }) :
                alert("Confirm Password not valid")
    }

    const registerNewUser = (user) => {
        var user = firebase.auth().currentUser;
        var userRef = firebase.database().ref('/users/' + user.uid);
        userRef.update({
            firstName: firstNameField,
            lastName: lastNameField,
            email: emailField,
        });
    }

    return (
        <View style={[styles.background, styles.container]}>
            {loginType == 'Login' &&
                <View style={[styles.background, styles.container]}>
                    <Text style={[styles.header]}>Log in</Text>
                    <Text style={[styles.text]}> Username </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={emailField} placeholder="eg. john@email.com" onChangeText={text => setEmailField(text)} />
                    <Text style={[styles.text]}> Password </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={passField} onChangeText={text => setPassField(text)} secureTextEntry />
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                        <Text style={[styles.text, styles.center]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setLoginType("")}>
                        <Text style={[styles.text, styles.center]}> Back</Text>
                    </TouchableOpacity>
                </View>
            }
            {loginType == 'SignUp' &&
                <View>
                    <Text style={[styles.header]}>Sign up</Text>
                    <Text style={[styles.text, styles.center]}> Email </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={emailField} placeholder="eg. john@email.com" onChangeText={text => setEmailField(text)} />
                    <Text style={[styles.text, styles.center]}> First Name </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={firstNameField} placeholder="eg. John" onChangeText={text => setFirstNameField(text)} />
                    <Text style={[styles.text, styles.center]}> Last Name </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={lastNameField} placeholder="eg. Doe" onChangeText={text => setLastNameField(text)} />
                    <Text style={[styles.text, styles.center]}> Password </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={passField} onChangeText={text => setPassField(text)} secureTextEntry />
                    <Text style={[styles.text, styles.center]}> Confirm Password </Text>
                    <TextInput autoFocus maxLength={40} style={[styles.textInput, styles.center]} value={confirmPassField} onChangeText={text => setConfirmPassField(text)} secureTextEntry />
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => handleOnSubmit()}>
                        <Text style={[styles.text, styles.center]}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[ styles.button, styles.center]} onPress={() => setLoginType("")}>
                        <Text style={[styles.text, styles.center]}> Back </Text>
                    </TouchableOpacity>
                </View>
            }
            {loginType == '' &&
                <View style={styles.buttonLayout}>
                    <Text style={[styles.header, styles.center]}>👋 Squad up, fam!</Text>
                    <Text style={[styles.paragraph]}>Get the gang online spontaneously - no need to schedule calls anymore. <br /> <br /> We'll even help you choose games to play with your squad!</Text>
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setLoginType('Login')}>
                        <Text style={[styles.text, styles.center]}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.center]} onPress={() => setLoginType('SignUp')}>
                        <Text style={[styles.text, styles.center]}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}


export default LoginForm;