import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { firebase } from './firebase';
import Lobby from './components/Lobby';
import Teams from './components/Teams';
import Game from './components/Game';
import Activities from './components/Activities';
import LoginForm from './components/Login';
import JoinTeam from './components/JoinTeam';
import CreateTeam from './components/CreateTeam';
import styles from "./assets/Styles";
import notify from './util/notify';


export default function App() {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState(false);
  const [uids, setUids] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [teamInfo, setTeamInfo] = useState(null);
  const [route, setRoute] = useState("")
  const [teamName, setTeamName] = useState("")
  const [lobbyClosed, setLobbyClosed] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setAuth)
  }, []);

  useEffect(() => {
    if (auth) {
      const db = firebase.database().ref('/users/' + auth.uid)
      const handleData = snap => {
        if (snap.val()) {
          const json = snap.val()
          setUser(json);
        }
      }
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
    }
  }, [auth]);

  // watch data for users in team, etc
  useEffect(() => {
    if (teamId != "") {
      const db = firebase.database().ref('/teams/' + teamId);
      const handleData = snap => {
        if (snap.val()) {
          const json = snap.val()
          setUids(Object.keys(json.members))
          const updatedTeamInfo = Object.values(json.members)
          // Doesn't work right - notifies when just joining a team if previously joined team had fewer members
          // if (teamInfo && teamInfo.length > 0 && teamInfo.length < updatedTeamInfo.length)
          //   notify(
          //     "A new member joined " + teamInfo.name,
          //     "Get started playing a game",
          //     "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/waving-hand-sign_1f44b.png",
          //     window.focus() )
          setTeamName(json.name)
          setTeamInfo(updatedTeamInfo)
        }
      }
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
    }
  }, [teamId]);

  // teamInfo closed
  const isLobbyClosed = (teamInfo) => {
    // console.log("teamInfo");
    // console.log(teamInfo);
    if (teamInfo) {
      // check for both false literal and false as a string just to be safe
      var onlineUsers = teamInfo.filter(user => user.status == "online")
      var arr = teamInfo.filter(user => user.status == "online" && (user.voteToClose == "false" || !user.voteToClose))
      // console.log("arr");
      // console.log(arr);
      var closed = arr.length == 0 && onlineUsers.length > 1
      if (closed && !lobbyClosed) {
        notify(
          teamName + " lobby closed!",
          "Vote to help the squad choose a game",
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/waving-hand-sign_1f44b.png",
          () => {if (Platform.OS == 'web') window.focus() });
          setLobbyClosed(closed);
      }
      return closed;
    }
    return false;
  }

  const isGameChosen = (teamInfo) => {
    if (teamInfo) {
      var onlineUsers = teamInfo.filter(user => user.status == "online")
      var arr = teamInfo.filter(user => user.status == "online" && user.voteGame != null)
      // console.log(teamInfo)
      // console.log(arr.length)
      // console.log(arr)
      if (arr.length == onlineUsers.length) {
        return true
      }
      else
        return false
    }
  }

  const theGameChosen = (teamInfo) => {
    var arr = teamInfo.filter(user => user.status == "online" && user.voteGame != null)
    var map = {};
    var mostFrequentElement = arr[0].voteGame;
    for (var i = 0; i < arr.length; i++) {
      if (!map[arr[i].voteGame]) {
        map[arr[i].voteGame] = 1;
      } else {
        ++map[arr[i].voteGame];
        if (map[arr[i].voteGame] > map[mostFrequentElement]) {
          mostFrequentElement = arr[i].voteGame;
        }
      }
    }
    return mostFrequentElement
  }

  // useEffect(() => {
  //   console.log(auth)
  //   console.log(teamId)
  //   if (auth && teamId != "")
  //     onlineStatus(auth.uid, teamId);
  // }, [teamId]);

  const generateLink = (uids) => {
    return uids[0]
    //return uids.join('');
  }

  return (
    <ScrollView style={[styles.background]} >
      <SafeAreaView style={[styles.center]}>
        <View style={[styles.contentContainer, styles.center]}>
          {!isLobbyClosed(teamInfo) ?
            <View style={styles.container}>
              {!auth ?
                <LoginForm /> :
                teamId != "" ?
                  <Lobby auth={auth} teamId={teamId} teamInfo={teamInfo} setTeamId={setTeamId} teamName={teamName} />
                  :
                  route == "joinTeam" ?
                    <JoinTeam auth={auth} user={user} setRoute={setRoute}></JoinTeam>
                    :
                    route == "createTeam" ?
                      <CreateTeam auth={auth} user={user} setRoute={setRoute}></CreateTeam>
                      :
                      <Teams auth={auth} teamId={teamId} setTeamId={setTeamId} setRoute={setRoute} />
              }
            </View>
            :
            !isGameChosen(teamInfo) ?
              <View style={[styles.container, styles.center]}>
                <Activities numUsers={teamInfo.length} auth={auth} teamInfo={teamInfo} teamId={teamId} />
              </View>
              :
              <View style={[styles.container, styles.center]}>
                <Game jitsiLink={generateLink(uids)} gameName={theGameChosen(teamInfo)} />
              </View>
          }
        </View>
      </SafeAreaView>
    </ScrollView>

  );
}

