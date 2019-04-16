import React from 'react';
import { Text } from 'react-native';

//import Color from '../../constants/Colors'
/*
TEXTTYPES COMPONENT: --------------------------------------------------------
All different types of text. Font sized, various formatting etc.
PROPERTIES:
- children: Text to be displayed.
*/
export class H1 extends React.Component {
  render() {
    return (
      <Text style={{fontSize: 30}}>
        {this.props.children}
      </Text>
    );
  }
}

export class H2 extends React.Component {
  render() {
    return (
      <Text style={{fontSize: 24}}>
        {this.props.children}
      </Text>
    );
  }
}

export class H3 extends React.Component {
  render() {
    return (
      <Text style={{fontSize: 18}}>
        {this.props.children}
      </Text>
    );
  }
}
