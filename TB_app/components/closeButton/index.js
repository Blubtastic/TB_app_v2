import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/Colors'

/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Close button that executes the function that is passed as props.

PROPERTIES:
- action: is executed when button is clicked.
*/
export default class CloseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight style={styles.closeBtn} onPress={this.props.action} title="">
        <Ionicons style={{fontSize: 60, color: Color.lightBlack}}  name="ios-close" />
      </TouchableHighlight>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  closeBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: Color.tintColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
