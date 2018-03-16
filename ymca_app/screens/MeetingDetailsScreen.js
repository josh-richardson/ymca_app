/**
 * @module screens/MeetingDetailsScreen
 */

import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton, Divider } from '../components'
import { formatDate } from '../utils'
import { Requests, Appointment, Mentee, Mentor, Notifications } from '../model'

/**
 * @class MeetingDetailsScreen
 * @extends React.Component
 *
 * React component for the meeting details screen. Gets displayed when a meeting is selected from the meetings screen.
 */
export default class MeetingDetailsScreen extends React.Component {

  /** Specifies navigation options for the current screen. */
  static navigationOptions = ({navigation}) => {
    const meeting = Appointment.getAppointmentByID(navigation.state.params.meetingID)
    const mentee = meeting.mentee

    return {
      title: `Meeting with ${mentee.firstName}`,
    }
  }

  /**
   * Sets appropriate state for the screen.
   * @param {object} props - Props passed to the screen.
   */
  constructor(props) {
    super(props)

    this.state = {
      meeting: Appointment.getAppointmentByID(props.navigation.state.params.meetingID),
    }
  }

  /** Called when the component gets mounted. */
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.screenDidFocus())
  }

  /** Called before the component gets unmounted. */
  componentWillUnmount() {
    this.focusListener.remove()
  }

  /** Called whenever the screen is displayed or returned to. */
  screenDidFocus() {
    this.setState({ meeting: Appointment.getAppointmentByID(this.state.meeting.id) })
  }

  /** Sends a start meeting request for the current meeting. */
  startMeeting() {
    Requests.startMeeting(Mentor.jwt, this.state.meeting.id).then(response => {
      if(response.success) {
        this.state.meeting.update(response.result)

        this.screenDidFocus()

        Notifications.meetingStarted(this.state.meeting)

        Alert.alert("Meeting started successfully!")
      }
    })
  }
  /** Navigates to the schedule appointment screen passing the current meeting so it can be updated. */
  changeMeeting() {
    this.props.navigation.navigate("ScheduleAppointment", {meeting: this.state.meeting})
  }
  /** Sends an extend meeting request for the current meeting. */
  extendMeeting() {
    Requests.extendMeeting(Mentor.jwt, this.state.meeting.id).then(response => {
      if(response.success) {
        this.state.meeting.update(response.result)

        this.screenDidFocus()

        Notifications.meetingExtended(this.state.meeting)

        Alert.alert("Success!", `Your meeting is now scheduled to end at ${formatDate(new Date(response.result.endTime))}.`)
      } else {
        Alert.alert("Error!", "You can't extend this further! Please end the meeting at the ending time.")
      }
    })
  }

  /** Prompts the mentor to confirm ending of this meeting. */
  askToEndMeeting() {
    let mentee = this.state.meeting.mentee

    Alert.alert(
      "Confirm ending meeting",
      `Is the meeting with ${mentee.firstName} ending now?`,
      [
        {text: "Yes", onPress: () => this.endMeeting()},
        {text: "No", style: "cancel"}
      ]
    )
  }

  /** Sends the request for ending the current meeting. */
  endMeeting() {
    Requests.endMeeting(Mentor.jwt, this.state.meeting.id).then(response => {
      if(response.success) {
        this.state.meeting.update(response.result)

        this.screenDidFocus()

        Notifications.meetingEnded(this.state.meeting)

        this.props.navigation.navigate('MenteeFeedback', {meeting: this.state.meeting})
      }
    })
  }
  /** Prompts the mentor to confirm canceling the meeting. */
  cancelMeeting() {
    // show alert
    Alert.alert(
      "Confirmation",
      "Are you sure you wish to cancel this meeting?",
      [
        {text: "Yes", onPress: () => this.sendDeleteRequest()},
        {text: "No", style: "cancel"}
      ]
    )
  }
  /** Sends a delete meeting request for the current meeting. */
  sendDeleteRequest() {
    Requests.deleteMeeting(Mentor.jwt, this.state.meeting.id).then(response => {
      if(response.success) {
        Notifications.meetingDeleted(this.state.meeting)

        this.state.meeting.deleteSelf()

        this.props.navigation.goBack()
      }
    })
  }

  /** Navigates to the mentor feedback screen and passes the current meeting. */
  giveMentorFeedback() {
    this.props.navigation.navigate('MentorFeedback', {meeting: this.state.meeting})
  }

  /** Navigates to the emergency screen which sends an emergency request to the server. */
  emergency() {
    this.props.navigation.navigate('EmergencyAlertSent')
  }

  /**
   * Gets called in case the current meeting is in progress and returns the appropriate UI.
   *
   * @return {View} A view that represents the state of the screen in case the meeting is in progress.
   */
  renderMeetingStarted() {
    return (
      <View>
        <Text style={{marginTop: '3%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>{"Meeting in Progress"}</Text>

        <FullWidthButton
          onPress={() => {this.extendMeeting()}}
          style={{marginTop: '2%'}}
          backgroundColor='#0075ff'
          title="Extend Meeting"
          iconName='plus-box-outline'
        />
        <FullWidthButton
          onPress={() => {this.askToEndMeeting()}}
          style={{marginTop: '2%'}}
          backgroundColor='#0075ff'
          title="End Meeting"
          iconName='checkbox-marked-outline'
        />
        <FullWidthButton
          onPress={() => {this.emergency()}}
          style={{marginTop: '2%'}}
          backgroundColor='#ff0f00'
          title="Emergency"
          iconName='alert-box'
        />
      </View>
    )
  }

  /**
   * Gets called in case the meeting cannot be started yet and returns the appropriate UI.
   *
   * @return {View} A view that represents the state of the screen in case the meeting cannot be started.
   */
  renderCantStartMeetingMessage() {
    return (
      <Text style={{textAlign:'center', fontSize:16, marginTop:'5%'}} numberOfLines={4} multiline={true}>You will be able to start the meeting up to half an hour before the scheduled time.</Text>
    )
  }

  /**
   * Gets called in case the current meeting is not started and returns the appropriate UI.
   *
   * @return {View} A view that represents the state of the screen in case the meeting is not started.
   */
  renderMeetingNotStarted() {
    return (
      <View style={{marginTop: this.state.meeting.canStart ? '7%' : '2%'}}>
        { this.state.meeting.canStart && <FullWidthButton
          onPress={() => {this.startMeeting()}}
          style={{marginBottom: '2%'}}
          backgroundColor='#0075ff'
          title="Start Meeting"
          iconName='alarm-check'
        /> }
        <FullWidthButton
          onPress={() => {this.changeMeeting()}}
          style={{marginBottom: '2%'}}
          backgroundColor='#0075ff'
          title="Change Meeting"
          iconName='calendar-clock'
        />
        <FullWidthButton
          onPress={() => {this.cancelMeeting()}}
          backgroundColor='#ff0f00'
          title="Cancel Meeting"
          iconName='close-box-outline'
        />
      </View>
    )
  }

  /**
   * Gets called in case the meeting has ended and returns the appropriate UI.
   *
   * @return {View} A view that represents the state of the screen in case the meeting has ended.
   */
  renderMeetingEnded() {
    return (
      <View style={{marginTop: '5%'}}>
        {this.state.meeting.needsFeedback && <FullWidthButton
          onPress={() => {this.giveMentorFeedback()}}
          backgroundColor='#0075ff'
          title="Give Feedback"
          iconName='message-text'
        />}
        <Text style={{marginTop: '3%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>{!this.state.meeting.needsFeedback ? "Meeting is over! Thanks for giving feedback." : "Meeting is over! Please give feedback."}</Text>
      </View>
    )
  }

  /** Renders the component. */
  render() {
    const appointment = this.state.meeting
    const mentee = appointment.mentee

    return(
      <View style={BaseStyles.container}>
        <View style={[BaseStyles.centerChildren, { marginTop: 10 }]}>
          <Avatar
            title={mentee.initials}
            large
            rounded
          />
        </View>

        <List>
          <ListItem title="Name" rightTitle={mentee.name} hideChevron/>
          <ListItem title="Place" rightTitle={appointment.meetingAddress} hideChevron/>
          <ListItem title="Date and Time" rightTitle={formatDate(new Date(appointment.startTime))} hideChevron/>
          <ListItem title="End date and time" rightTitle={formatDate(new Date(appointment.endTime))} hideChevron/>
        </List>

        {!this.state.meeting.canStart && this.renderCantStartMeetingMessage()}

        <View style={[BaseStyles.centerChildrenHorizontally, BaseStyles.alignChildrenBottom, { marginBottom: 10 }]}>

          {
            this.state.meeting.isPast ? (this.renderMeetingEnded()) : (this.state.meeting.isInProgress ?
              this.renderMeetingStarted() : this.renderMeetingNotStarted())

          }
        </View>
      </View>
    )
  }
}
