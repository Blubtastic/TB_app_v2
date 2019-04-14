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
    drawerLabel: 'Vaskelister',
    drawerIcon: (
      <Image source={ require('../assets/images/vaskelister.png') } style={{width: 24, height: 24}}/>
    ),
  };

  //Get the washing lists from the server.

    async componentDidMount(){
    //Server link
    let responseJson = [];

    var query = firebase.database().ref("washingLists").orderByKey();
    var value = await query.once("value");
      value.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        responseJson.push(childData);
        console.log("DATA COMES HERE:")
        console.log(responseJson);
      });
    this.setState({
      ...this.state,
      isLoading: false,
      dataSource: responseJson,
    });
  }

  render(){
    //Render loading screen
    if(this.state.isLoading){
      return(
        <View style={{flex: 1}}>
          {/*<CustomHeader title={"Vaskelister"} icon={"ios-arrow-back"}/>*/}
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }
    //Render content when loading is done
    else{
      return(
        <View style={{flex: 1}}>
          {/*<CustomHeader title={"Vaskelister"} icon={"ios-arrow-back"} />*/}

          <View style={styles.content}>
          <FlatList
          data={this.state.dataSource}
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
