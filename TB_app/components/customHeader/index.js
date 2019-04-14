import React from 'react';
import { StyleSheet, Text, View, Image, Icon} from 'react-native';

/*
CUSTOM HEADER: ----------------------------------------------------------
The header that's displayed at almost al screens.
Contains title, back/logo button and "open drawer" button.
PROPERTIES:
- navigation
- title
- icon
*/

export default class CustomHeader extends React.Component {
  render() {
    //If header is on front page (show logo instead of back button)
    if (this.props.icon != null){
      return (
        <View style={styles.body} >
          <Icon style={styles.icon} name={this.props.icon} />
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
          <Icon style={styles.icon} name="md-menu" />
        </View>
      );
    } else {
      return (
        <View style={styles.body} >
          <Image source={ require('../../assets/images/logo.png') } style={styles.logo}/>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
          <Icon style={styles.icon} name="md-menu"/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 24,
    backgroundColor: '#F9A423',
    alignSelf: "stretch",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  icon: {
    padding: 13,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 30,
    width: 60,
  },
  logo: {
    resizeMode: 'contain',
    margin: 13,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 30,
  }
});
