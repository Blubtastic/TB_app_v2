import React from 'react';
import { StyleSheet, View, Button, Text} from 'react-native';

/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Close button that executes the function that is passed as props.
More graphical details than the deletebutton.

PROPERTIES:
- action: is executed when button is clicked.
- Title: text displayed on button
*/
export default class WideButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button full style={styles.button} onPress={this.props.action} title={this.props.title} />
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: '#F9A423',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    justifyContent: 'center'
  },
});
