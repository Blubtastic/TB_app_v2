import React from 'react';
import {KeyboardAvoidingView, AsyncStorage, Platform, StatusBar, StyleSheet, Text, View, TextInput} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import {YellowBox} from 'react-native';
import { H1, H2, H3, Italic } from './components/textTypes/index.js';
import DefaultButton from './components/defaultButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomNum: null,
      hasRoomNum: false,
    }
    YellowBox.ignoreWarnings(['Setting a timer']);
  }
  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
      var config = {
      apiKey: "AIzaSyDu4T-qbGWPR0umdpfrY9jbBu5udHcQxj8",
      authDomain: "tb-app-5bb84.firebaseapp.com",
      databaseURL: "https://tb-app-5bb84.firebaseio.com",
      projectId: "tb-app-5bb84",
      storageBucket: "tb-app-5bb84.appspot.com",
      messagingSenderId: "1039894800413"
    };
    firebase.initializeApp(config);
    this.retrieveData(); //get data from localstorage and update state which then generates list.
  }

  //Store data in localstorage
  // saveRoomNum(title, data){
  //   tempCardGames = this.state.cardGames;
  //   let inList = false;
  //   for (i = 0; i < tempCardGames.length; i++) {
  //     if (title == tempCardGames[i].title){
  //       tempCardGames[i] = {title: title, data: data};
  //       inList = true;
  //     }
  //   }
  //   if (!inList) { //Append if not overwrite
  //     tempCardGames.unshift({title: title, data: data});
  //   }
  //   this.setState({ cardGames: tempCardGames  }, () =>  this.storeData());
  //   console.log(this.state.cardGames);
  // }
  storeData = async () => {
    if(this.state.roomNum != null){
      this.setState({hasRoomNum: true});
    }
    let data = JSON.stringify(this.state.roomNum);
    try {
      await AsyncStorage.setItem("roomNum", data);
    }
    catch (error) {
      console.log("error saving data. Error: " + error);
    }
  }
  //Get from localstorage
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem("roomNum");
      if(value !== null) {
        //We have data!
        retrievedRoomNum = JSON.parse(value);
        console.log("value retrieved from localstorage: " + retrievedRoomNum);
        this.setState({roomNum: retrievedRoomNum});
      }else{
        console.log("Data was retrieved but empty");
      }
    }
    catch (error) {
      console.log("Error retrieving data. Error: " + error);
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      if(this.state.hasRoomNum == false){
        return (
          <KeyboardAvoidingView style={styles.roomNumScreen} behavior="padding" enabled>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <H2>Skriv inn romnummeret ditt</H2>
            <View style={styles.inputArea}>
              <TextInput
                style={styles.inputStyle}
                autoFocus={true}
                placeholder="Romnummer"
                ref={input => { this.textInput = input }}
                blurOnSubmit={true}
                keyboardType={'numeric'}
                onChangeText={ (text) => this.setState({ roomNum: text }) }
                onSubmitEditing={() => {
                  this.storeData();
                  this.textInput.clear();
                }}
              />
              <DefaultButton title={"Legg til"} action={() => this.storeData()} />
            </View>
            <Italic>Romnummeret lagres kun på telefonen og er kun for brukervennlighet</Italic>
          </KeyboardAvoidingView>
        );
      }else{
        return (
          <React.Fragment>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </React.Fragment>
        );
      }
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputStyle: {
    paddingHorizontal: 10,
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: '#eee',
  },
  roomNumScreen: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  inputArea: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    alignItems: 'stretch',
  },
});
