import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton } from '../components'

export default class MeetingDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: `Meeting with ${navigation.state.params.meeting.firstName}`
  });

  constructor(props) {
    super(props)

    this.state = {
      meeting: props.navigation.state.params.meeting,
      token: props.navigation.state.params.token
    }
  }

  componentDidMount() {

  }

  changeMeeting() {
    this.props.navigation.navigate("ScheduleAppointment", {token: this.state.token, meeting: this.state.meeting})
  }
  extendMeeting() {
    Alert.alert("Extending meeting...")
  }
  endMeeting() {
    this.props.navigation.navigate('MentorFeedback', {token: this.state.token, meeting: this.state.meeting})
  }
  cancelMeeting() {
    Alert.alert("Canceling meeting...")
  }
  emergency() {
    const {navigate} = this.props.navigation;

    navigate('EmergencyAlertSent', {token: this.state.token})
  }

  render() {
    const initials = `${this.state.meeting.firstName.charAt(0)}${this.state.meeting.secondName.charAt(0)}`

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
          <ListItem title="Name" rightTitle={`${this.state.meeting.firstName} ${this.state.meeting.secondName}`} hideChevron/>
          <ListItem title="Date and Time" rightTitle={`${this.state.meeting.date} ${this.state.meeting.time}`} hideChevron/>
          <ListItem title="Place" rightTitle={this.state.meeting.place} hideChevron/>
          <ListItem title="Duration" rightTitle={this.state.meeting.duration} hideChevron/>
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
