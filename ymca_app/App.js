/**
 * @module App
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import Root from './config/routes';

/**
 * @class App
 * @extends React.Component
 *
 * The root App component.
 */
export default class App extends React.Component {
  render() {
    return (
      <Root />
    );
  }
}
