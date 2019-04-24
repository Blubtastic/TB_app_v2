import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/Colors'


/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Delete button. Just like CloseButton, but with different style. (i know, it's dumb)
Less detailed than the closebutton
PROPERTIES:
- action: is executed when button is clicked.
*/
export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight style={styles.closeBtn} onPress={this.props.action} title="" >
        <Ionicons style={{fontSize: 30, color: Color.lightBlack}}  name="md-trash" />
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
    //backgroundColor: Color.tintColor,
    alignItems: 'center',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation:0,
    justifyContent: 'center',
  },
});
