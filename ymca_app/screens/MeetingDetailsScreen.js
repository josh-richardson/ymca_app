import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton, Divider } from '../components'
import { formatDate } from '../utils'

import { Accessors, Requests, removeAppointment, store, updateAppointment } from '../model'

export default class MeetingDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const meeting = Accessors.getAppointment(navigation.state.params.meetingID)
    const mentee = Accessors.getMentee(meeting.mentee)

    return {
      title: `Meeting with ${mentee.firstName}`,
    }
  }

  constructor(props) {
    super(props)

    let meeting = Accessors.getAppointment(props.navigation.state.params.meetingID)

    this.state = {
      meeting: Accessors.getAppointment(props.navigation.state.params.meetingID),
      canStartMeeting: meetingAllowedToStart(meeting.startTime),
      meetingHasStarted: meeting.hasOwnProperty("actualStartTime"),
      meetingHasEnded: meeting.hasOwnProperty("actualEndTime"),
      mentorHasProvidedFeedback: meeting.hasOwnProperty("mentor_notes"),
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.screenDidFocus())
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  screenDidFocus() {
    let meeting = Accessors.getAppointment(this.state.meeting._id)
    console.log("MEETING")
    console.log(meeting)

    this.setState({
      meeting: meeting,
      canStartMeeting: meetingAllowedToStart(meeting.startTime),
      meetingHasStarted: meeting.hasOwnProperty("actualStartTime"),
      meetingHasEnded: meeting.hasOwnProperty("actualEndTime"),
      mentorHasProvidedFeedback: meeting.hasOwnProperty("mentor_notes")
    })
  }

  startMeeting() {
    Requests.startMeeting(store.getState().mentorInfo.jwt, this.state.meeting._id).then(response => {
      if(response.success) {
        Alert.alert("Meeting started successfully!")

        let newAppointment = {...response.result, mentee: response.result.mentee}
        store.dispatch(updateAppointment(this.state.meeting._id, newAppointment))

        this.setState({meetingHasStarted: true})

        this.screenDidFocus()
      }
    })
  }
  changeMeeting() {
    this.props.navigation.navigate("ScheduleAppointment", {meeting: this.state.meeting})
  }
  extendMeeting() {
    Requests.extendMeeting(store.getState().mentorInfo.jwt, this.state.meeting._id).then(response => {
      if(response.success) {
        let newAppointment = {...response.result, mentee: response.result.mentee}
        store.dispatch(updateAppointment(this.state.meeting._id, newAppointment))

        this.screenDidFocus()

        Alert.alert("Success!", `Your meeting is now scheduled to end at ${formatDate(new Date(newAppointment.endTime))}.`)
      } else {
        Alert.alert("Error!", "You can't extend this further! Please end the meeting at the ending time.")
      }
    })
  }

  askToEndMeeting() {
    let mentee = Accessors.getMentee(this.state.meeting.mentee)

    Alert.alert(
      "Confirm ending meeting",
      `Is the meeting with ${mentee.firstName} ending now?`,
      [
        {text: "Yes", onPress: () => this.endMeeting()},
        {text: "No", style: "cancel"}
      ]
    )
  }

  endMeeting() {
    Requests.endMeeting(store.getState().mentorInfo.jwt, this.state.meeting._id).then(response => {
      if(response.success) {
        let newAppointment = {...response.result, mentee: response.result.mentee}
        store.dispatch(updateAppointment(this.state.meeting._id, newAppointment))

        this.setState({meetingHasEnded: true})

        this.screenDidFocus()

        this.props.navigation.navigate('MenteeFeedback', {meeting: this.state.meeting})
      }
    })
  }
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
  sendDeleteRequest() {
    Requests.deleteMeeting(store.getState().mentorInfo.jwt, this.state.meeting._id).then(response => {
      if(response.success) {
        store.dispatch(removeAppointment(this.state.meeting._id))

        this.props.navigation.goBack()
      }
    })
  }

  giveMentorFeedback() {
    this.props.navigation.navigate('MentorFeedback', {meeting: this.state.meeting})
  }

  emergency() {
    this.props.navigation.navigate('EmergencyAlertSent')
  }

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

  renderCantStartMeetingMessage() {
    return (
      <Text style={{textAlign:'center', fontSize:16, marginTop:'5%'}} numberOfLines={4} multiline={true}>You will be able to start the meeting up to half an hour before the scheduled time.</Text>
    )
  }

  renderMeetingNotStarted() {
    return (
      <View style={{marginTop: this.state.canStartMeeting ? '7%' : '2%'}}>
        { this.state.canStartMeeting && <FullWidthButton
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

  renderMeetingEnded() {
    return (
      <View style={{marginTop: '5%'}}>
        {!this.state.mentorHasProvidedFeedback && <FullWidthButton
          onPress={() => {this.giveMentorFeedback()}}
          backgroundColor='#0075ff'
          title="Give Feedback"
          iconName='close-box-outline' // TODO: Change this
        />}
        <Text style={{marginTop: '3%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>{this.state.mentorHasProvidedFeedback ? "Meeting is over! Thanks for giving feedback." : "Meeting is over! Please give feedback."}</Text>
      </View>
    )
  }

  render() {
    const appointment = this.state.meeting

    const mentee = Accessors.getMentee(appointment.mentee)
    const initials = `${mentee.firstName.charAt(0)}${mentee.secondName.charAt(0)}`

    return(
      <View style={BaseStyles.container}>
        <View style={[BaseStyles.centerChildren, { marginTop: 10 }]}>
          <Avatar
            title={initials}
            large
            rounded
          />
        </View>

        <List>
          <ListItem title="Name" rightTitle={`${mentee.firstName} ${mentee.secondName}`} hideChevron/>
          <ListItem title="Place" rightTitle={appointment.meetingAddress} hideChevron/>
          <ListItem title="Date and Time" rightTitle={formatDate(new Date(appointment.startTime))} hideChevron/>
          <ListItem title="End date and time" rightTitle={formatDate(new Date(appointment.endTime))} hideChevron/>
        </List>

        {!this.state.canStartMeeting && this.renderCantStartMeetingMessage()}

        <View style={[BaseStyles.centerChildrenHorizontally, BaseStyles.alignChildrenBottom, { marginBottom: 10 }]}>

          {
            this.state.meetingHasEnded ? (this.renderMeetingEnded()) : (this.state.meetingHasStarted ?
              this.renderMeetingStarted() : this.renderMeetingNotStarted())

          }
        </View>
      </View>
    )
  }

  styles = StyleSheet.create({

  });
}

function meetingAllowedToStart(startTime) {
  let meetingDate = Date.parse(startTime)
  let difference = meetingDate - Date.parse(new Date())
  let diffInMinutes = difference/(1000*60)

  return diffInMinutes <= 30
}
