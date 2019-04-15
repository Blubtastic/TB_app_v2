import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

// import React from 'react';
// import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, ImageBackground } from 'react-native';
// import { Content } from 'native-base';
//
// import CustomHeader from '../SmallComponents/CustomHeader';
//
// /*
// HOME COMPONENT: ----------------------------------------------------------
// Homepage for the app. Links to all other parts of the app.
// PROPERTIES:
// */
//
// export default class Calendar extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       image1: require('../../images/calendar.jpg'),
//     };
//   }
//   static navigationOptions = {
//     drawerLabel: 'Home',
//     drawerIcon: (
//       <Image source={require('../../images/hjem.png')} style={{ width: 24, height: 24 }} />
//     ),
//   };
//
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <React.Fragment>
//         <CustomHeader title={"Hjem"} navigation={this.props.navigation} />
//         <ScrollView style={{ flex: 1 }}>
//
//           <View style={styles.content}>
//
//             {/* Shortcut to the most important component */}
//             <ImageBackground style={styles.largeImg} source={require('../../images/kortspill.jpg')}>
//               <TouchableHighlight style={styles.largeLink} onPress={() => navigate('Kortspill')}>
//                 <View style={styles.textBar}>
//                   <Text style={{ color: '#fff' }}>Kortspill</Text>
//                 </View>
//               </TouchableHighlight>
//             </ImageBackground>
//
//             <View style={styles.row}>
//               {/* Shortcut to normal component */}
//               <ImageBackground style={styles.img} source={require('../../images/vaskelister.jpg')}>
//                 <TouchableHighlight style={styles.link} onPress={() => navigate('Vaskelister')}>
//                   <View style={styles.textBar}>
//                     <Text style={{ color: '#fff' }}>Vaskelister</Text>
//                   </View>
//                 </TouchableHighlight>
//               </ImageBackground>
//               <ImageBackground style={styles.img} source={require('../../images/vaskemaskiner.jpg')}>
//                 <TouchableHighlight style={styles.link} onPress={() => navigate('Klesvask')}>
//                   <View style={styles.textBar}>
//                     <Text style={{ color: '#fff' }}>Vaskemaskiner</Text>
//                   </View>
//                 </TouchableHighlight>
//               </ImageBackground>
//             </View>
//
//             <View style={styles.row}>
//               <ImageBackground style={styles.img} source={require('../../images/vorskalender.png')}>
//                 <TouchableHighlight style={styles.link} onPress={() => navigate('Calendar')}>
//                   <View style={styles.textBar}>
//                     <Text style={{ color: '#fff' }}>Vorskalender</Text>
//                   </View>
//                 </TouchableHighlight>
//               </ImageBackground>
//               <ImageBackground style={styles.img} source={require('../../images/turneringer.jpg')}>
//                 <TouchableHighlight style={styles.link} onPress={() => navigate('Turneringer')}>
//                   <View style={styles.textBar}>
//                     <Text style={{ color: '#fff' }}>Turneringer</Text>
//                   </View>
//                 </TouchableHighlight>
//               </ImageBackground>
//             </View>
//
//             <View style={styles.row}>
//               <ImageBackground style={styles.img} source={require('../../images/døråpner.jpg')}>
//                 <TouchableHighlight style={styles.link} onPress={() => navigate('Døråpner')}>
//                   <View style={styles.textBar}>
//                     <Text style={{ color: '#fff' }}>Døråpner</Text>
//                   </View>
//                 </TouchableHighlight>
//               </ImageBackground>
//               <View style={styles.img} />
//             </View>
//
//           </View>
//
//         </ScrollView>
//       </React.Fragment>
//     );
//   }
// }
//
// //STYLES
// const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     padding: 4,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   logo: {
//     flex: 1,
//     resizeMode: 'contain',
//   },
//
//   img: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 4,
//   },
//   largeImg: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 4,
//   },
//   link: {
//     height: 125,
//     alignSelf: 'stretch',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   largeLink: {
//     height: 200,
//     alignSelf: 'stretch',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   textBar: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     alignSelf: 'stretch',
//     paddingLeft: 8,
//     paddingTop: 8,
//     paddingBottom: 8,
//   }
// });
