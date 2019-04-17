import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, TextInput, TouchableHighlight, Button, FlatList, Platform} from 'react-native';

import CustomHeader from '../components/customHeader';
import CustomModal from '../components/customModal';
import DeleteButton from '../components/deleteButton';
import WideButton from '../components/wideButton';
import DefaultButton from '../components/defaultButton';
import { H1, H2, H3 } from '../components/textTypes/index.js'
import CardGame from './CardGame.js';

import Color from '../constants/Colors'


/*
KLESVASK COMPONENT: ----------------------------------------------------------
Menu page for the cardgame component. Create, delete and edit existing card games.
PROPERTIES:
- Navigation.
*/

export default class CardGamesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCardGame: false,
      gameTitle: '',
      cardGames: [], //List with all list of players. This is saved in localstorage.
      players: [], //The currently selected list of players.
      modalVisible: false,
      deleteModalVisible: false,
      deleteIndex: null,
      cardGameColors: ['#FFCB05', '#F5E51B', '#E87E04', '#F89406', '#FDE3A7'],
    }

    //Bind functions that will be passed to children without parameters.
    this.showCardGame = this.showCardGame.bind(this);
    this.saveGames = this.saveGames.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDeletemodal = this.toggleDeletemodal.bind(this);

  }
  static navigationOptions = {
    header: null,
    drawerLabel: 'Poengoversikt',
    drawerIcon: (
      <Image source={require('../assets/images/kortspill.png')} style={{ width: 24, height: 24 }} />
    ),
  };
  componentWillMount() {
    //Dummy content for testing
    this.retrieveData(); //get data from localstorage and update state which then generates list.
  }

  //Store data in localstorage
  saveGames(title, data){
    tempCardGames = this.state.cardGames;
    let inList = false;
    for (i = 0; i < tempCardGames.length; i++) {
      if (title == tempCardGames[i].title){
        tempCardGames[i] = {title: title, data: data};
        inList = true;
      }
    }
    if (!inList) { //Append if not overwrite
      tempCardGames.unshift({title: title, data: data});
    }
    this.setState({ cardGames: tempCardGames  }, () =>  this.storeData());
    console.log(this.state.cardGames);
  }
  storeData = async () => {
    let data = JSON.stringify(this.state.cardGames);
    try {
      await AsyncStorage.setItem("allGames", data);
    }
    catch (error) {
      console.log("error saving data. Error: " + error);
    }
  }
  //LocalStorage function for getting Cardgame-data
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem("allGames");
      if(value !== null) {
        //We have data!
        retrievedGames = JSON.parse(value);
        console.log("value retrieved from localstorage: " + retrievedGames);
        this.setState({cardGames: retrievedGames});
      }else{
        console.log("Data was retrieved but empty");
      }
    }
    catch (error) {
      console.log("Error retrieving data. Error: " + error);
    }
  }

  newGame(){
    if(this.state.gameTitle != '') {
      this.setState({players: []});
      this.saveGames(this.state.gameTitle, this.state.players);
      this.showCardGame(true);
    }
  }
  deleteGame(){
    let tempcardGames = this.state.cardGames;
    tempcardGames.splice(this.state.deleteIndex, 1);
    this.setState({ cardGames: tempcardGames }, () => this.storeData());
    this.toggleDeletemodal(false);
  }
  randomColor(){
    return this.state.cardGameColors[Math.floor(Math.random() * 5)];
  }

//State manipulation functions
  setPlayers(saveData){
    this.setState({ players: saveData.data, gameTitle: saveData.title }, () => this.showCardGame(true));
  }
  showCardGame(show){
    this.setState({ showCardGame: show, modalVisible: false })
  }
  toggleModal(show){
    this.setState({ modalVisible: show });
    if(show){
      this.setState({ gameTitle: '' });
    }
  }
  toggleDeletemodal(show){
    this.setState({ deleteModalVisible: show });
  }

  render() {
    if(!this.state.showCardGame){
      return (
        <View style={{flex: 1}}>
          <CustomHeader title={"Poengoversikt"} icon={Platform.OS === 'ios' ? 'logo-game-controller-a' : 'logo-game-controller-a'} navigation={this.props.navigation} />
          <View style={styles.content}>

          {/* Create new cardgame modal */}
            <CustomModal modalVisible={this.state.modalVisible} toggleModal={this.toggleModal} title={"Nytt spill"}>
              <TextInput
                style={{ height: 60, alignSelf: 'stretch',}}
                autoFocus={true}
                placeholder="Tittel"
                ref={input => { this.textInput = input }}
                blurOnSubmit={true}
                keyboardType={'default'}
                onChangeText={ (text) => this.setState({ gameTitle: text }) }
                onSubmitEditing={() => {
                  this.newGame();
                  this.toggleModal(false);
                  this.textInput.clear();
                }}
              />
              <DefaultButton buttonStyle={{alignSelf: 'stretch', flexGrow: 1}} title={"Lag poengliste"} action={() => this.newGame()} />

            </CustomModal>

            {/* Delete cardgame modal */}
            <CustomModal modalVisible={this.state.deleteModalVisible} toggleModal={this.toggleDeletemodal} title={"Slett '" + this.state.gameTitle + "' ?"}>
              <View style={{flexDirection: 'row'}}>
                <DefaultButton buttonStyle={{alignSelf: 'stretch', flexGrow: 1}} title={"Tilbake"} color={"#ccc"}  action={() => this.toggleDeletemodal(false)} />
                <DefaultButton buttonStyle={{alignSelf: 'stretch', flexGrow: 1}} title={"Slett"} action={() => this.deleteGame()} />
              </View>
            </CustomModal>

            {/* List of all card games */}
            <View style={{alignSelf: 'stretch', maxHeight: '90%', justifyContent: 'center'}}>
              <FlatList
                data={this.state.cardGames}
                extraData={this.state}
                keyExtractor={(_score, index) => `${this.state.cardGames.key}-score-${index}`}
                renderItem={({ item, index }) =>
                  <TouchableHighlight style={styles.largeLink} onPress={ () => this.setPlayers(item) }>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10}}>
                      <H2>{item.title}</H2>
                      <DeleteButton action={() => {this.toggleDeletemodal(true), this.setState({deleteIndex: index, gameTitle: this.state.cardGames[index].title }) } } />
                    </View>
                  </TouchableHighlight>
                }
              />
            </View>
            <DefaultButton buttonStyle={{width: 200, margin: 30}} title={"Ny poengliste"} action={() => this.toggleModal(true)} />

          </View>
        </View>
      );
    }else{
      //Render the seelected card game instead of the cardgame view.
      return (
        <CardGame playerdata={this.state.players} gameTitle={this.state.gameTitle} showCardGame={this.showCardGame} saveGames={this.saveGames} />
      );
    }
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'stretch',
  },
  largeLink: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  text: {
    fontSize: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    color: '#000',
  }
});
