import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import CloseButton from '../closeButton'

/*
CUSTOMMODAL COMPONENT: --------------------------------------------------------
Displays a smaller screen on top of the current screen (a modal). Can be used for a variety of purposes.
Simply put the content between the opening and closing tag to render it inside the modal.

PROPERTIES:
- title: modal title
- modalVisible: toggle modal
- toggleModal: function for setting the state of modalVisible in parent.

- children: component to be rendered inside the modal. Put this content between the brackets.
*/
export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ alignSelf: 'stretch', alignItems: 'center', maxHeight: '80%' }}>
        <Modal
          animationType="fade"
          hardwareAccelerated={true}
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            this.props.toggleModal(false);
          }}>
          <TouchableHighlight style={styles.modalBackground} onPress={() => this.props.toggleModal(false) }>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <Text style={styles.title}>
                    {this.props.title}
                  </Text>
                  <View style={{ position: 'absolute', top: -10, right: -10 }}>
                    <CloseButton action={ () => this.props.toggleModal(false) } />
                  </View>
                </View>
                {this.props.children}

              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 1,
    paddingVertical: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '100%',
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 5,
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: 18,
    paddingVertical: 12,
  }
});
