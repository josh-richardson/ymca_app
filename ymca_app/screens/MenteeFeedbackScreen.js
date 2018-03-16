/**
 * @module screens/MenteeFeedbackScreen
 */

import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton, FormQuestion, ToggleButton } from '../components'
import { NavigationActions } from 'react-navigation'
import { Requests, Mentee, Appointment, Mentor } from '../model'

/**
 * @class MenteeFeedbackScreen
 * @extends React.Component
 *
 * React component for the mentee feedback screen. Gets displayed when an appointment is concluded.
 */
export default class MenteeFeedbackScreen extends React.Component {

  /** Specifies navigation options for the current screen. */
  static navigationOptions = ({navigation}) => ({
      title: `Mentee Feedback`
  });

  /**
   * Sets appropriate state for the screen.
   * @param {object} props - Props passed to the screen.
   */
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

  /** Sets the screen state to reflect the happy toggle being selected. */
  happyPressed() {
    this.setState({happyToggled: true, impartialToggled: false, sadToggled: false})
  }
  /** Sets the screen state to reflect the impartial toggle being selected. */
  impartialPressed() {
    this.setState({impartialToggled: true, happyToggled: false, sadToggled: false})
  }
  /** Sets the screen state to reflect the sad toggle being selected. */
  sadPressed() {
    this.setState({sadToggled: true, happyToggled: false, impartialToggled: false})
  }

  /** Sends the mentee's feedback to the server and prompts the mentor to schedule the next meeting. */
  doneButtonPressed() {
    let menteeFeedback = JSON.stringify({response: this.state.response})
    let menteeRating = this.sadToggled ? 1 : (this.impartialToggled ? 2 : (this.happyToggled ? 3 : 0))

    Requests.sendMenteeFeedback(Mentor.jwt, this.state.meeting.id, menteeFeedback, menteeRating).then(response => {
      this.state.meeting.update(response.result)

      this.promptScheduleNextMeeting()
    })
  }

  /** Asks the mentor if they would like to schedule the next meeting and acts accordingly. */
  promptScheduleNextMeeting() {
    let mentee = this.state.meeting.mentee

    Alert.alert(
      "Done!",
      `Meeting finished. Please hand the phone back to the mentor.\nWould you like to schedule another appointment now with ${mentee.firstName}?`,
      [
        {text: "Yes", onPress: () => this.scheduleNextMeeting()},
        {text: "No", style: "cancel", onPress: () => this.props.navigation.goBack()}
      ]
    )
  }

  /** Resets the navigation stack such that the mentor is at the schedule meeting screen. */
  scheduleNextMeeting() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Meetings',
        }),
        NavigationActions.navigate({
          routeName: 'ScheduleAppointment',
          params: {menteeID: this.state.meeting.menteeID, place: this.state.meeting.meetingAddress}
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  /** Renders the component. */
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
}
