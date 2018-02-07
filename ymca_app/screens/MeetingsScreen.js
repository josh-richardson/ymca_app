import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'

import { store, Accessors } from '../model'

export default class MeetingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Upcoming Meetings',
  };

  constructor(props) {
    super(props)

    this.state = {
      meetings: store.getState().appointments
    }
  }

  componentDidMount() {

  }

  showMeetingDetails(meeting) {
    const { navigate } = this.props.navigation;

    navigate('MeetingDetails', {meeting})
  }

  renderItem(appointment) {

    const mentee = Accessors.getMentee(appointment.mentee)
    const initials = `${mentee.firstName.charAt(0)}${mentee.secondName.charAt(0)}`

    return (
      <ListItem
        button
        title={`${mentee.firstName} ${mentee.secondName}`}
        subtitle={appointment.date}
        key={appointment._id}
        avatar={<Avatar
                title={initials}
                rounded
              />}
        onPress={() => {this.showMeetingDetails(appointment)}}
      />
    )
  }

  render() {
    return(
      <View>
        <List>
          {
            this.state.meetings.map(appointment => this.renderItem(appointment))
          }
        </List>
      </View>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
