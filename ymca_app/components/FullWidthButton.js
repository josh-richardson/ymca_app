import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class FullWidthButton extends React.Component {
  render() {
    return(
    <TouchableOpacity
      onPress={this.props.onPress}
      style={this.props.style}
    >
      <View style={{
        height: 45,
        width: 350,
        backgroundColor:this.props.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}>
        <Text style={{
          color:'white',
          fontSize: 20,
        }}>
          {this.props.title}
        </Text>
      </View>
    </TouchableOpacity>
  )}
}
