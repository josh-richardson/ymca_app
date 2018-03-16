/**
 * @module components/ToggleButton
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ToggleButton extends React.Component {

  /** Called when the button is pressed and calls the `onPress` function passed as a prop. */
  pressed() {
    if(this.props.onPress) this.props.onPress()
  }

  /** Renders the component. */
  render() {
    return(
    <TouchableOpacity
      onPress={() => this.pressed()}
      style={this.props.style}
    >
      <View style={{
        height: this.props.size || 45,
        width: this.props.size || 45,
        backgroundColor: this.props.toggled ? 'grey' : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: (this.props.size || 45)/2,
        borderColor: 'black',
        borderWidth: 1
      }}>
        {this.props.view}
      </View>
    </TouchableOpacity>
  )}
}
