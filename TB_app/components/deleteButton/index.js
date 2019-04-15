import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
      <Button style={styles.closeBtn} onPress={this.props.action} title="" >
        <Ionicons style={{fontSize: 50, color: '#111'}}  name="close" />
      </Button>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  closeBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation:0,
    justifyContent: 'center',
  },
});
