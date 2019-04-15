import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image} from 'react-native';
import CustomHeader from '../components/customHeader';
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
    }
  }
  static navigationOptions = {
    header: null,
    drawerLabel: 'Vaskelister',
    drawerIcon: (
      <Image source={ require('../assets/images/vaskelister.png') } style={{width: 24, height: 24}}/>
    ),
  };


    async componentDidMount(){
    let responseJson = [];
    let query = firebase.database().ref("washingLists").orderByKey();
    let value = await query.once("value");
    value.forEach(function(childSnapshot) {
      let key = childSnapshot.key;
      // childData will be the actual contents of the child
      let childData = childSnapshot.val();
      responseJson.push(childData);
    });
    this.setState({
      ...this.state,
      isLoading: false,
      washingLists: responseJson,
    });
  };

    checkRoomDate(){
      console.log(this.state.washingLists);
      for(let i = 0; i<this.state.washingLists.length; i++){
        console.log(this.state.washingLists[i].room);
        //TODO: Bytt ut 604 med brukers nummer fra props/localstorage
        if(this.state.washingLists[i].room == 604){
          return (<Text>Din vaskedag er {this.state.washingLists[i].date}!</Text>)
        }
      }
      return (<Text>Du har ikke vaskedag denne måneden!</Text>)
    };

  render(){
    //Render loading screen
    if(this.state.isLoading){
      return(
        <View style={{flex: 1}}>
          <CustomHeader title={"Vaskelister"} icon={"ios-arrow-back"}/>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }
    //Render content when loading is done
    else{
      let washDate = this.checkRoomDate();
      return(
        <View style={{flex: 1}}>
          <CustomHeader title={"Vaskelister"} icon={"ios-arrow-back"} />

          <View style={styles.content}>
            <View>
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
          keyExtractor={({_id}, index) => _id}
          />
        </View>
      </View>
    );
    }
  }
}
/*
  getWashingLists() {
    get("localhost:8000/tb_app", function (response) {
      let washingLists = response;
      this.setState(({washingLists: this.state.washingLists}));
    });
  }
}
*/
//STYLES
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listRow: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  rom: {
    fontSize: 19,
  },
});
