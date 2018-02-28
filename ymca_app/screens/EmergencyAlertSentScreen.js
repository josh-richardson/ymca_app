import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles';
import { FullWidthButton } from '../components';
import PropTypes from 'prop-types';

import { Mentor, Requests } from '../model'

export default class EmergencyAlertSentScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {

  };

  componentDidMount() {
    return Requests.sendEmergency(Mentor.jwt)
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
		  iconName='arrow-left-bold-box-outline'
        />

      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
