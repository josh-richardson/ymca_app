import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Meetings Screen',
  };
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}><Text>Meetings will appear here! BE PATIENT PLEASE!</Text></View>
    )
  }
}
