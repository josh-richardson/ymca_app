import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton } from '../components'
import { formatDate } from '../utils'

import { Accessors, Requests, removeAppointment, store } from '../model'

export default class MeetingDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const mentee = Accessors.getMentee(navigation.state.params.meeting.mentee)

    return {
      title: `Meeting with ${mentee.firstName}`,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      meeting: props.navigation.state.params.meeting,
    }
  }

  changeMeeting() {
    this.props.navigation.navigate("ScheduleAppointment", {meeting: this.state.meeting})
  }
  extendMeeting() {
    Alert.alert("Extending meeting...")
  }
  endMeeting() {
    this.props.navigation.navigate('MentorFeedback', {meeting: this.state.meeting})
  }
  cancelMeeting() {
    Requests.deleteMeeting(store.getState().mentorInfo.jwt, this.state.meeting._id).then(response => {
      if(response.success) {
        Alert.alert("Appointment cancelled!")

        store.dispatch(removeAppointment(this.state.meeting._id))

        this.props.navigation.state.params.onGoBack()
        this.props.navigation.goBack()
      }
    })
  }
  emergency() {
    const {navigate} = this.props.navigation;

    navigate('EmergencyAlertSent')
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

        <View style={[BaseStyles.centerChildrenHorizontally, BaseStyles.alignChildrenBottom]}>

          <FullWidthButton
            onPress={() => {this.changeMeeting()}}
            style={{marginTop: '7%'}}
            backgroundColor='#0075ff'
            title="Change Meeting"
          />
          <FullWidthButton
            onPress={() => {this.extendMeeting()}}
            style={{marginTop: '2%'}}
            backgroundColor='#0075ff'
            title="Extend Meeting"
          />
          <FullWidthButton
            onPress={() => {this.endMeeting()}}
            style={{marginTop: '2%'}}
            backgroundColor='#0075ff'
            title="End Meeting"
          />
          <FullWidthButton
            onPress={() => {this.cancelMeeting()}}
            style={{marginTop: '2%'}}
            backgroundColor='#ff0f00'
            title="Cancel Meeting"
          />
          <FullWidthButton
            onPress={() => {this.emergency()}}
            style={{marginTop: '2%'}}
            backgroundColor='#ff0f00'
            title="Emergency"
          />
        </View>

      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
