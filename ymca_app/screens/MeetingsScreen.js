import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, ScrollView } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { formatDate } from '../utils'
import { ListSectionHeader } from '../components'
import { store, Accessors } from '../model'

export default class MeetingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Upcoming Meetings',
    refresh: () => navigation.state.params.currentScreen.refresh(),
  })

  constructor(props) {
    super(props)

    this.state = {
      meetings: store.getState().appointments
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => this.screenDidFocus())
  }

  componentWillUnmount() {
    this.focusListener.remove()
  }

  screenDidFocus() {
    this.setState({meetings: Accessors.refreshAppointments()})
  }

  showMeetingDetails(meetingID) {
    this.props.navigation.navigate('MeetingDetails', {meetingID})
  }

  renderItem(appointment) {

    const mentee = Accessors.getMentee(appointment.mentee)
    const initials = `${mentee.firstName.charAt(0)}${mentee.secondName.charAt(0)}`

    return (
      <ListItem
        button
        title={`${mentee.firstName} ${mentee.secondName}`}
        subtitle={formatDate(new Date(appointment.startTime))}
        rightTitle={appointment.meetingAddress}
        key={appointment._id}
        avatar={<Avatar
                title={initials}
                rounded
              />}
        onPress={() => {this.showMeetingDetails(appointment._id)}}
      />
    )
  }

  render() {
    return(
      <ScrollView>
        <ListSectionHeader text={"Upcoming Appointments"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.meetings.filter(appointment => !appointment.isPast && !appointment.isInProgress && appointment.needsFeedback).map(appointment => this.renderItem(appointment))
          }
        </List>

        <ListSectionHeader text={"In Progress"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.meetings.filter(appointment => appointment.isInProgress && appointment.needsFeedback).map(appointment => this.renderItem(appointment))
          }
        </List>

        <ListSectionHeader text={"Needs Feedback"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.meetings.filter(appointment => appointment.isPast && appointment.needsFeedback).map(appointment => this.renderItem(appointment))
          }
        </List>

        <ListSectionHeader text={"Past Appointments"} />
        <List containerStyle={this.styles.section}>
          {
            this.state.meetings.filter(appointment => appointment.isPast && !appointment.needsFeedback).map(appointment => this.renderItem(appointment))
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
