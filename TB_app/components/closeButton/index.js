import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
      <Button style={styles.closeBtn} onPress={this.props.action} title="">
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
    backgroundColor: '#F9A423',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
