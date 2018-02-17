import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        backgroundColor:this.props.backgroundColor,
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
      }}>
	    <Icon
		  name={this.props.iconName}
		  size={35}
		  color='white'
		  style={{height:35,width:50}}/>
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
