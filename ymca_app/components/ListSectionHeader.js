/**
 * @module components/ListSectionHeader
 */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Alert } from 'react-native';

export default class ListSectionHeader extends React.Component {

  /** Renders the component. */
  render() {
    return (
      <Text style={[this.styles.sectionHeader, this.props.textStyle]}>{this.props.text}</Text>
    )
  }

  styles = {
    sectionHeader: {
      backgroundColor: '#dbdbdb',
      fontSize: 14,
      paddingLeft: 10,
      paddingTop: 4,
      paddingBottom: 4,
      fontWeight: 'bold'
    },
  }
}
