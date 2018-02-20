import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton } from '../components'
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
      meetingHasStarted: meeting.hasOwnProperty("actualStartTime"),
      meetingHasEnded: meeting.hasOwnProperty("actualEndTime"),
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.screenDidFocus())
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  screenDidFocus() {
    this.setState({meeting: Accessors.getAppointment(this.state.meeting._id)})
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
    Alert.alert("Extending meeting...")
  }
  endMeeting() {
    Requests.endMeeting(store.getState().mentorInfo.jwt, this.state.meeting._id).then(response => {
      if(response.success) {
        let newAppointment = {...response.result, mentee: response.result.mentee}
        store.dispatch(updateAppointment(this.state.meeting._id, newAppointment))

        this.setState({meetingHasEnded: true})

        this.screenDidFocus()

        this.props.navigation.navigate('MentorFeedback', {meeting: this.state.meeting})
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

  emergency() {
    const {navigate} = this.props.navigation;

    navigate('EmergencyAlertSent')
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
          onPress={() => {this.endMeeting()}}
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

  renderMeetingNotStarted() {
    return (
      <View>
        <FullWidthButton
          onPress={() => {this.startMeeting()}}
          style={{marginTop: '7%'}}
          backgroundColor='#0075ff'
          title="Start Meeting"
          iconName='alarm-check'
        />
        <FullWidthButton
          onPress={() => {this.changeMeeting()}}
          style={{marginTop: '2%'}}
          backgroundColor='#0075ff'
          title="Change Meeting"
          iconName='calendar-clock'
        />
        <FullWidthButton
          onPress={() => {this.cancelMeeting()}}
          style={{marginTop: '2%'}}
          backgroundColor='#ff0f00'
          title="Cancel Meeting"
          iconName='close-box-outline'
        />
      </View>
    )
  }

  render() {
    const appointment = this.state.meeting

    const mentee = Accessors.getMentee(appointment.mentee)
    const initials = `${mentee.firstName.charAt(0)}${mentee.secondName.charAt(0)}`

    return(
      <View style={BaseStyles.container}>
		<ScrollView>
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

        <View style={[BaseStyles.centerChildrenHorizontally, BaseStyles.alignChildrenBottom, { marginBottom: 10 }]}>

          {
            this.state.meetingHasEnded ? (<Text style={{marginTop: '3%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>{"Meeting is over!"}</Text>) : (this.state.meetingHasStarted ?
              this.renderMeetingStarted() : this.renderMeetingNotStarted())

          }
        </View>
		</ScrollView>
      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
