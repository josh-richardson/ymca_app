import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton, FormQuestion, ToggleButton } from '../components'
import { NavigationActions } from 'react-navigation'

import { Requests, store, updateAppointment } from '../model'

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
    let menteeFeedback = JSON.stringify({response: this.state.response})
    let menteeRating = this.sadToggled ? 1 : (this.impartialToggled ? 2 : (this.happyToggled ? 3 : 0))

    Requests.sendMenteeFeedback(store.getState().mentorInfo.jwt, this.state.meeting._id, menteeFeedback, menteeRating).then(response => {

      let newAppointment = {...response.result, mentee: response.result.mentee}
      store.dispatch(updateAppointment(this.state.id, newAppointment))

      this.resetNavStack()
    })
  }

  resetNavStack() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Meetings',
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
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
			  iconName='check'
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
