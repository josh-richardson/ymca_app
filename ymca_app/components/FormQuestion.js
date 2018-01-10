import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default class FormQuestion extends React.Component {
  render() {
    const textBoxStyle = {
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%',
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
      height: 100,
      padding: 5
    }

    const questionStyle = {
      marginBottom: 10,
      marginTop: 10,
      marginLeft: '5%',
      fontSize: 20
    }

    const viewStyle = {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'black',
      marginTop: 10,
    }

    return(
      <View style={viewStyle}>
        <Text style={questionStyle}>{this.props.question}</Text>
        <TextInput
          style={textBoxStyle}
          placeholder={this.props.placeholder || ""}
          onChangeText={(text) => this.props.onChangeText(text)}
          multiline={true}
        />
      </View>
    )
  }
}
