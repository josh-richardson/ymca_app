import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
		paddingLeft: 20,
		paddingRight: 20,
        backgroundColor:this.props.backgroundColor,
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
      }}>
        <Text style={{
          color:'white',
          fontSize: 20,
        }}>
          {this.props.title}
        </Text>
		<Icon
		  iconRight
		  name='facebook'
		  size={25}
		  color='#3b5998'
		  style={{height:25,width:25}}/>
      </View>
    </TouchableOpacity>
  )}
}
