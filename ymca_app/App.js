import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import Root from './config/routes';

export default class App extends React.Component {
  render() {
    return (
      <Root />
    );
  }
}
