import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import Color from '../../constants/Colors'

/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Delete button. Stylable button (color & width)
PROPERTIES:
- buttonStyle: style for the view enclosing the button
To get wide button, pass "alignSelf: 'stretch', flexGrow: 1" in style.
- title: button title
- action: function for onPress()
- color: If you don't want the default color, pass a hex code here.
*/
export default class DefaultButton extends React.Component {
  //If color, else default. Anything else?
  render() {
    if(this.props.color == null){
      return (
        <View style={styles.buttonContainer}>
          <View style={ [this.props.buttonStyle, styles.button] }>
            <Button style={styles.button} color={Color.tintColor} title={this.props.title} onPress={this.props.action} />
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.buttonContainer}>
          <View style={ [this.props.buttonStyle, styles.button] }>
            <Button color={this.props.color} title={this.props.title} onPress={this.props.action} />
          </View>
        </View>
      );
    }
  }
}

//STYLES
const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  button: {
    width: 200,
    margin: 20,
  },
});
