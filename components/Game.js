import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ImageBackground, Text, View, StyleSheet, SafeAreaView, Linking, Platform } from 'react-native';
import { firebase } from '../firebase';

const Game = ( {numUsers, generateLink} ) => {
  return (
    <View>
      { numUsers >= 10 && 
      <View>
        <Text style={styles.header}> Guess Height </Text>
        <Text> Guess everyone’s height, one person at a time. One point goes to whoever is closest and whoever gets the most right wins. </Text> 
      </View>}

      { numUsers < 10 && numUsers >= 5 && 
        <Text> Two Truths and a Lie </Text> }

      { numUsers < 5 && 
        <View>
        <Text style={styles.header}>Let's Play GeoGuessr </Text>
        <Text style={styles.text}> GeoGuessr </Text> 
      </View>}

      <Text style={{color: 'blue'}} 
            onPress={() => 
          {
            if(Platform.OS == 'web'){
              window.open('https://meet.jit.si/' + {generateLink}, '_blank');
           } else {
            Linking.openURL('https://meet.jit.si/' + {generateLink})
           }
          }
        }>
        meet.jit.si/{generateLink}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#8FBC8F',
      //width: 400,
      //height: 400,
      width: '100%',
      height: '100%',
  },
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
});

export default Game;