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
import History from './components/History';
import ManageGames from './components/ManageGames';
import AddGame from './components/AddGame';


export default function App() {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState(false);
  const [uids, setUids] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [teamInfo, setTeamInfo] = useState(null);
  const [route, setRoute] = useState("Login")
  const [teamName, setTeamName] = useState("")
  const [lobbyClosed, setLobbyClosed] = useState(false);
  const [myVote, setMyVote] = useState(false);
  const [isPlaying, setIsPlaying] = useState("");
  const [reset, setReset] = useState(false)


  useEffect(() => {
    if(reset == true){
      setIsPlaying("");
      setMyVote(false);
      setLobbyClosed(false);
      setReset(false);
    }
  }, [reset]);


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
    if (myVote && teamInfo) {
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
          setRoute("GameVoting");
      }
      if (closed) {
        const db = firebase.database().ref('/teams/' + teamId + '/history');
        
      }
      return closed;
    }
    return false;
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

  useEffect(() => {
    if (!auth){
      setRoute("Login")
    }
    else if (teamId == ""){
      setRoute("Teams")
    }
    else if (isPlaying != ""){
      setRoute("Game")
    }
    else if (teamId != "" && !isLobbyClosed(teamInfo)){
      setRoute("Lobby")
    }
    else if (isLobbyClosed(teamInfo) && isPlaying == ""){
      setRoute("Activities")
    }
    
  }, [auth,teamId, teamInfo, isPlaying]);

  const renderSwitch = (route) => {
    switch(route) {
      case 'Login': return <LoginForm />;
      case 'Teams': return <Teams auth={auth} teamId={teamId} setTeamId={setTeamId} setRoute={setRoute} />;
      case "Lobby": return <Lobby auth={auth} teamId={teamId} teamInfo={teamInfo} setTeamId={setTeamId} teamName={teamName} myVote={myVote} setMyVote={setMyVote} setRoute={setRoute} />;
      case "Activities" : return <View style={[styles.container, styles.center]}>
      <Activities numUsers={teamInfo.length} auth={auth} teamInfo={teamInfo} teamId={teamId} isPlaying={isPlaying} setIsPlaying={setIsPlaying} jitsiLink={generateLink(uids)} />
    </View>;
      case "Game": return <View style={[styles.container, styles.center]}>
      <Game isPlaying={isPlaying} teamId={teamId} setReset={setReset}/>
    </View>;
    case "joinTeam": return <JoinTeam auth={auth} user={user} setRoute={setRoute}></JoinTeam>;
    case "createTeam": return <CreateTeam auth={auth} user={user} setRoute={setRoute}></CreateTeam>;
    case "history": return <History teamId={teamId} setRoute={setRoute} setIsPlaying={setIsPlaying}></History>;
    case "manageGames": return <ManageGames teamId={teamId} setRoute={setRoute}></ManageGames>;
    case "addGame": return <AddGame teamId={teamId} setRoute={setRoute}></AddGame>;
  }};

  return (
    <ScrollView style={[styles.background]} >
      <SafeAreaView style={[styles.center]}>
        <View style={[styles.contentContainer, styles.center]}>
         {renderSwitch(route)}
          {/* {!isLobbyClosed(teamInfo) ?
            <View style={styles.container}>
              {!auth ?
                <LoginForm /> :
                teamId != "" ?
                  <Lobby auth={auth} teamId={teamId} teamInfo={teamInfo} setTeamId={setTeamId} teamName={teamName} myVote={myVote} setMyVote={setMyVote} />
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
          } */}
        </View>
      </SafeAreaView>
    </ScrollView>

  );
}

