import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton, FormQuestion, ToggleButton } from '../components'

export default class MenteeFeedbackScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: `Mentee Feedback`
  });

  constructor(props) {
    super(props)

    this.state = {
      meeting: props.navigation.state.params.meeting,
      token: props.navigation.state.params.token,

      response: "",

      happyToggled: false,
      impartialToggled: false,
      sadToggled: false
    }
  }

  componentDidMount() {

  }

  happyPressed() {
    this.setState({happyToggled: true, impartialToggled: false, sadToggled: false})
  }
  impartialPressed() {
    this.setState({impartialToggled: true, happyToggled: false, sadToggled: false})
  }
  sadPressed() {
    this.setState({sadToggled: true, happyToggled: false, impartialToggled: false})
  }


  doneButtonPressed() {
    // TODO: Send response to server
    // Possibly validate that all questions are answered

  }

  render() {
    return(
      <View style={BaseStyles.container}>
        <ScrollView>
          <FormQuestion
            question={"How was your meeting?"}
            placeholder={"Meeting Feedback"}
            onChangeText={(text) => {this.setState({response: text})}}
          />

          <View style={[BaseStyles.centerChildrenHorizontally, {marginTop: 10}]}>
            <View style={[BaseStyles.centerChildren, {flexDirection: 'row', width: '75%'}]}>

              <View style={[BaseStyles.centerChildrenHorizontally, {flex:0.333}]}><ToggleButton onPress={() => this.happyPressed()} toggled={this.state.happyToggled} view={<Text style={{fontSize: 45}}>😀</Text>} size={75} /></View>

              <View style={[BaseStyles.centerChildrenHorizontally, {flex:0.333}]}><ToggleButton onPress={() => this.impartialPressed()} toggled={this.state.impartialToggled} view={<Text style={{fontSize: 45}}>😐</Text>} size={75} /></View>

              <View style={[BaseStyles.centerChildrenHorizontally, {flex:0.333}]}><ToggleButton onPress={() => this.sadPressed()} toggled={this.state.sadToggled} view={<Text style={{fontSize: 45}}>☹️</Text>} size={75} /></View>

            </View>
          </View>


          <View style={BaseStyles.centerChildren}>
            <FullWidthButton
              onPress={() => this.doneButtonPressed()}
              style={{marginTop: '2%', marginBottom: '2%'}}
              backgroundColor='#0075ff'
              title="Done"
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
