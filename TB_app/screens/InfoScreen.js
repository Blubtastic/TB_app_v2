import React from 'react';
import {Image, View, Text} from "react-native";

//InfoScreen component:
//Shows general infrmation for new and current residents


export default class InfoScreen extends React.Component{
    constructor(props){
        super();

    }





    static navigationOptions = {
        header: null,
        drawerLabel: 'Vaskelister',
        drawerIcon: (
            <Image source={ require('../assets/images/vaskelister.png') } style={{width: 24, height: 24}}/>
        ),
    };

    render(){
        return(
            <View>
                <Text>
                    Infoscreen
                </Text>
            </View>
        )
    }

}