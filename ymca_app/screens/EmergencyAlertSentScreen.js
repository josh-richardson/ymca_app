/**
 * @module screens/EmergencyAlertSentScreen
 */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles';
import { FullWidthButton } from '../components';
import PropTypes from 'prop-types';

import { Mentor, Requests } from '../model'

/**
 * @class EmergencyAlertSentScreen
 * @extends React.Component
 *
 * React component for the emergency alert sent screen. Gets displayed then sends the emergency signal.
 */
export default class EmergencyAlertSentScreen extends React.Component {

  /** Called when the component gets mounted. */
  componentDidMount() {
    return Requests.sendEmergency(Mentor.jwt)
  }

  /** Goes back to the previous screen. */
  backButtonPressed() {
    this.props.navigation.goBack()
  }

  /** Renders the component. */
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
}
