import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, ScrollView, Button } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { formatDate } from '../utils'
import { ListSectionHeader } from '../components'
import { Appointment, Mentee } from '../model'

export default class MeetingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Your Meetings',
    headerRight: <Button style={{marginRight:10}} title="Schedule New" onPress={() => navigation.state.params.currentScreen.scheduleAppointmentPressed()} />,
    headerLeft: <Button style={{marginLeft:10}} title="Options" onPress={() => navigation.state.params.currentScreen.optionsPressed()} />
  })

  constructor(props) {
    super(props)

    this.state = {
      upcomingMeetings: Appointment.upcomingAppointments,
      inProgressMeetings: Appointment.inProgressAppointments,
      needsFeedbackMeetings: Appointment.needsFeedbackAppointments,
      pastMeetings: Appointment.pastAppointments
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      currentScreen: this,
    })
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.screenDidFocus())
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  screenDidFocus() {
    this.setState({
      upcomingMeetings: Appointment.upcomingAppointments,
      inProgressMeetings: Appointment.inProgressAppointments,
      needsFeedbackMeetings: Appointment.needsFeedbackAppointments,
      pastMeetings: Appointment.pastAppointments
    })
  }

  scheduleAppointmentPressed() {
    this.props.navigation.navigate("ScheduleAppointment", {})
  }

  optionsPressed() {
    this.props.navigation.navigate("Options")
  }

  showMeetingDetails(meetingID) {
    this.props.navigation.navigate('MeetingDetails', {meetingID})
  }

  renderItem(appointment) {

    const mentee = appointment.mentee

    return (
      <ListItem
        button
        title={mentee.name}
        subtitle={formatDate(new Date(appointment.startTime))}
        rightTitle={appointment.meetingAddress}
        key={appointment.id}
        avatar={<Avatar
                title={mentee.initials}
                rounded
              />}
        onPress={() => {this.showMeetingDetails(appointment.id)}}
      />
    )
  }

  render() {
    return(
      <ScrollView>
        <ListSectionHeader text={"Upcoming Appointments"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.upcomingMeetings.map(appointment => this.renderItem(appointment))
          }
        </List>

        <ListSectionHeader text={"In Progress"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.inProgressMeetings.map(appointment => this.renderItem(appointment))
          }
        </List>

        <ListSectionHeader text={"Needs Feedback"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.needsFeedbackMeetings.map(appointment => this.renderItem(appointment))
          }
        </List>

        <ListSectionHeader text={"Past Appointments"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.pastMeetings.map(appointment => this.renderItem(appointment))
          }
        </List>
      </ScrollView>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    section: {
      marginTop: 0
    }
  });
}
