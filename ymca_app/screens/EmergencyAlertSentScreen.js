import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles';
import { FullWidthButton } from '../components';
import PropTypes from 'prop-types';

export default class EmergencyAlertSentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.navigation.state.params.token
    }
  }

  static navigationOptions = {

  };

  componentDidMount() {
    return fetch('http://ymca.pw/api/methods/emergency', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth: this.state.token
      })
    })
    .then((response) => {
      console.log("EMERGENCY API RESPONSE: " + JSON.stringify(response));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  backButtonPressed() {
    const { goBack } = this.props.navigation;

    goBack()
  }

  render() {
    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildren, {backgroundColor:'red'}]}>

        <Text style={{marginLeft:'15%', marginRight:'15%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>
          Messages have been sent to your manager, help is on its way. In an emergency, dial 999.
        </Text>

        <FullWidthButton
          onPress={() => {this.backButtonPressed()}}
          style={{marginTop: '7%'}}
          backgroundColor='#0075ff'
          title="Back"
        />

      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
