import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Platform} from 'react-native';
import CustomHeader from '../components/customHeader';
import {Bold, Italic, H1, H2, H3} from '../components/textTypes';
import Color from '../constants/Colors'
import firebase from 'firebase';

/*
VASKELISTER COMPONENT: ----------------------------------------------------------
Shows the washing lists for the next month. Room numbers + date for each row.
PROPERTIES:
- navigation
*/

export default class WashingListsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      washingLists: [],
      isLoading: true,
      roomNum: null,
    }
  }
  static navigationOptions = {
    header: null,
    drawerLabel: 'Vaskelister',
    drawerIcon: (
      <Image source={ require('../assets/images/vaskelister.png') } style={{width: 24, height: 24}}/>
    ),
  };

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


    async componentDidMount(){
      let responseJson = [];
      let filtered = [];
      let d = new Date();
      let query = firebase.database().ref("washingLists").orderByKey();
      let value = await query.once("value");
      value.forEach(function(childSnapshot) {
        let key = childSnapshot.key;
        // childData will be the actual contents of the child
        let childData = childSnapshot.val();
        responseJson.push(childData);
      });
      filtered = responseJson.filter(wash => (parseInt(wash.date.slice(0,2)) >= d.getDate()));
      this.setState({
        ...this.state,
        isLoading: false,
        washingLists: filtered,
      });
    };

    componentWillMount(){
      this.retrieveData();
    }

    checkRoomDate(){
      for(let i = 0; i<this.state.washingLists.length; i++){
        //TODO: Bytt ut 604 med brukers nummer fra props/localstorage
        if(this.state.washingLists[i].room == this.state.roomNum){
          return (<Text>Du har vaskedag <Bold>{this.state.washingLists[i].date}</Bold></Text>)
        }
      }
      return (<Text>Du har <Bold>ikke</Bold> vaskedag</Text>)
    };

    shortListWarning(){
      if(this.state.washingLists.length < 5){
        return (
          <View style={{alignItems: 'center', padding: 5, backgroundColor: Color.offWhite}}>
            <Text>Nye lister kommer snart</Text>
          </View>
        )
      }else{
        return;
      }
    }

  render(){
    //Render loading screen
    if(this.state.isLoading){
      return(
        <View style={{flex: 1}}>
          <CustomHeader title={"Vaskelister"} icon={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}/>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }
    //Render content when loading is done
    else{
      let washDate = this.checkRoomDate();
      return(
        <View style={{flex: 1}}>
          <CustomHeader title={"Vaskelister"} icon={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'} />

          <View style={styles.content}>
            <View style={{paddingVertical: 5, alignItems: 'center', backgroundColor: Color.offWhite}}>
              {washDate}
            </View>
          <FlatList
          data={this.state.washingLists}
          renderItem={({item}) =>
          <View style={styles.listRow}>
            <Text style={styles.rom}>{item.room}</Text>
            <Text>{item.date}</Text>
          </View>
          }
          //Only works for immutable lists?
          keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.shortListWarning()}
      </View>
    );
    }
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listRow: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  rom: {
    fontSize: 19,
  },
});
