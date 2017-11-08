import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'YMCA',
  };
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}><Text>Welcome to YMCA Login!</Text></View>
    )
  }
}
