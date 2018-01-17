import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ToggleButton extends React.Component {
  constructor() {
    super()

    this.state = {
      toggled: false
    }
  }

  pressed() {
    if(!this.props.hasOwnProperty("toggled")) { this.setState({ toggled: !this.state.toggled }) }

    if(this.props.onPress) this.props.onPress()
  }

  componentWillReceiveProps() {
    console.log(this.props.toggled)

    if(this.props.hasOwnProperty("toggled")) {
      this.setState({ toggled: this.props.toggled })
    }
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
        backgroundColor:this.state.toggled ? 'grey' : 'white',
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
