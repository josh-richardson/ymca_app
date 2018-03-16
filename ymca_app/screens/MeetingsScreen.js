/**
 * @module screens/MeetingsScreen
 */

import React from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList, Alert, ScrollView, Button } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { formatDate } from '../utils'
import { ListSectionHeader } from '../components'
import { Appointment, Mentee } from '../model'

/**
 * @class MeetingsScreen
 * @extends React.Component
 *
 * React component for the meetings screen. Acts as the main screen after login and displays appointments relevant to the mentor.
 */
export default class MeetingsScreen extends React.Component {

  /** Specifies navigation options for the current screen. */
  static navigationOptions = ({navigation}) => ({
    title: Platform.OS === 'android' ? '  Your Meetings' : 'Your Meetings',
    headerRight: <Button style={{marginRight:10}} title="Schedule New" onPress={() => navigation.state.params.currentScreen.scheduleAppointmentPressed()} />,
    headerLeft: <Button style={{marginLeft:10}} title="Options" onPress={() => navigation.state.params.currentScreen.optionsPressed()} />
  })

  /**
   * Sets appropriate state for the screen.
   * @param {object} props - Props passed to the screen.
   */
  constructor(props) {
    super(props)

    this.state = {
      upcomingMeetings: Appointment.upcomingAppointments,
      inProgressMeetings: Appointment.inProgressAppointments,
      needsFeedbackMeetings: Appointment.needsFeedbackAppointments,
      pastMeetings: Appointment.pastAppointments
    }
  }

  /** Called before the component gets mounted. */
  componentWillMount() {
    this.props.navigation.setParams({
      currentScreen: this,
    })
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
    this.setState({
      upcomingMeetings: Appointment.upcomingAppointments,
      inProgressMeetings: Appointment.inProgressAppointments,
      needsFeedbackMeetings: Appointment.needsFeedbackAppointments,
      pastMeetings: Appointment.pastAppointments
    })
  }

  /** Navigates to the schedule appointment screen. */
  scheduleAppointmentPressed() {
    this.props.navigation.navigate("ScheduleAppointment", {})
  }

  /** Navigates to the options screen. */
  optionsPressed() {
    this.props.navigation.navigate("Options")
  }

  /**
   * Displays the meeting details screen for the meeting with the given ID.
   * @param {string} meetingID - The ID of the meeting the details of which are to be displayed.
   */
  showMeetingDetails(meetingID) {
    this.props.navigation.navigate('MeetingDetails', {meetingID})
  }

  /**
   * Renders an appointment item appropriately such that it foes in the list.
   * @param {Appointment} appointment - The appointment to render.
   * @return {ListItem} A ListItem component with the appropriate details about the appointment.
   */
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

  /** Renders the component. */
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

  /** Specifies styles used in the current component. */
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
