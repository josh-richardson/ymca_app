/**
 * @module components/Divider
 */

import React from 'react';
import { View } from 'react-native';

export default class Divider extends React.Component {

  /** Renders the component. */
  render() {
    const style = {
      backgroundColor: this.props.color || 'gray',
      height: this.props.height || 3,
      width: this.props.width || '85%',
      borderRadius: this.props.borderRadius || 15,
      marginTop: this.props.margin || 10,
      marginBottom: this.props.margin || 10
    }

    return(
      <View style={[style, this.props.style]}></View>
    )
  }
}
