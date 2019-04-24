import React from 'react';
import { StyleSheet, View, Button} from 'react-native';
import Color from '../../constants/Colors'

/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Delete button. Stylable button (color & width)
PROPERTIES:
- title: button title
- action: function for onPress()
- color: If you don't want the default color, pass a hex code here.
*/
export default class FullWidthButton extends React.Component {
  //If color, else default. Anything else?
  render() {
    if(this.props.color == null){
      return (
        <View style={ styles.button }>
          <Button style={styles.button} color={Color.tintColor} title={this.props.title} onPress={this.props.action} />
        </View>
      );
    } else{
      return (
        <View style={ styles.button }>
          <Button color={this.props.color} title={this.props.title} onPress={this.props.action} />
        </View>
      );
    }
  }
}

//STYLES
const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
  },
});
