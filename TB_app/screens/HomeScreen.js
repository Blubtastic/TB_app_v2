import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View, ImageBackground} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import CustomHeader from "../components/customHeader";

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image1: require('../assets/images/calendar.jpg')
    };
  }
  
  static navigationOptions = {
    header: null,
    title: null
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <React.Fragment>
        <CustomHeader title={"Hjem"} />
        <ScrollView style={{ flex: 1 }}>
    
          <View style={styles.content}>
      
            {/* Shortcut to the most important component */}
            <ImageBackground style={styles.largeImg} source={require('../assets/images/kortspill.jpg')}>
              <TouchableHighlight style={styles.largeLink} onPress={() => navigate('CardGamesStack')}>
                <View style={styles.textBar}>
                  <Text style={{ color: '#fff' }}>Kortspill</Text>
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
    padding: 4,
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
