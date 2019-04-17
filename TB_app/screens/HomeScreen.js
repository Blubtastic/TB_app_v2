import React from 'react';
import {AsyncStorage, Image, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View, ImageBackground} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import CustomHeader from "../components/customHeader";
import {H1, H2, H3} from '../components/textTypes/index.js';
import Color from '../constants/Colors';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image1: require('../assets/images/calendar.jpg'),
      roomNum: null,
    };
  }

  static navigationOptions = {
    header: null,
    title: null
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

  componentWillMount(){
    this.retrieveData();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <React.Fragment>
        <CustomHeader title={"Hjem"} />
        <ScrollView style={{ flex: 1 }}>

          <View style={styles.content}>
            <View style={{paddingVertical: 10, alignItems: 'center'}}>
              <H3 style={{alignitems: 'center'}}>Velkommen {this.state.roomNum}</H3>
            </View>

            {/* Shortcut to the most important component */}
            <ImageBackground style={styles.largeImg} source={require('../assets/images/kortspill.jpg')}>
              <TouchableHighlight style={styles.largeLink} onPress={() => navigate('CardGamesStack')}>
                <View style={styles.textBar}>
                  <Text style={{ color: '#fff' }}>Poengoversikt</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>

            <View style={styles.row}>
              {/* Shortcut to normal component */}
              <ImageBackground style={styles.img} source={require('../assets/images/vaskelister.jpg')}>
                <TouchableHighlight style={styles.link} onPress={() => navigate('WashingListsStack')}>
                  <View style={styles.textBar}>
                    <Text style={{ color: '#fff' }}>Vaskelister</Text>
                  </View>
                </TouchableHighlight>
              </ImageBackground>
              <ImageBackground style={styles.img} source={require('../assets/images/vaskemaskiner.jpg')}>
                <TouchableHighlight style={styles.link} onPress={() => navigate('')}>
                  <View style={styles.textBar}>
                    <Text style={{ color: '#fff' }}>Vaskemaskiner</Text>
                  </View>
                </TouchableHighlight>
              </ImageBackground>
            </View>

            <View style={styles.row}>
              <ImageBackground style={styles.img} source={require('../assets/images/vorskalender.png')}>
                <TouchableHighlight style={styles.link} onPress={() => navigate('')}>
                  <View style={styles.textBar}>
                    <Text style={{ color: '#fff' }}>Vorskalender</Text>
                  </View>
                </TouchableHighlight>
              </ImageBackground>
              <ImageBackground style={styles.img} source={require('../assets/images/turneringer.jpg')}>
                <TouchableHighlight style={styles.link} onPress={() => navigate('CardGamesStack')}>
                  <View style={styles.textBar}>
                    <Text style={{ color: '#fff' }}>Turneringer</Text>
                  </View>
                </TouchableHighlight>
              </ImageBackground>
            </View>

          </View>

        </ScrollView>
      </React.Fragment>
    );
  }

}

//STYLES
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  largeImg: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  link: {
    height: 125,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  largeLink: {
    height: 200,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
  }
});
