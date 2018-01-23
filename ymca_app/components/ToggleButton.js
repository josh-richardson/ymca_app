import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ToggleButton extends React.Component {
  constructor() {
    super()
  }

  pressed() {
    if(this.props.onPress) this.props.onPress()
    else console.log("WARNING: onPress for ToggleButton is not set.")
  }

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
