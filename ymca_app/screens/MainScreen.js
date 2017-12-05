import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { FullWidthButton } from '../components'

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'YMCA Mentors',
  };

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      token: props.navigation.state.params.token
    }
  }

  componentDidMount() {

  }

  scheduleAppointment() {

  }

  showUpcomingAppointments() {
    const { navigate } = this.props.navigation;

    navigate('Meetings', {token: this.state.token})
  }

  render() {
    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
        <FullWidthButton
          onPress={() => {this.scheduleAppointment()}}
          style={{marginTop: '7%'}}
          backgroundColor='#0075ff'
          title="Schedule Appointment"
        />
        <FullWidthButton
          onPress={() => {this.showUpcomingAppointments()}}
          style={{marginTop: '2%'}}
          backgroundColor='#0075ff'
          title="Upcoming Appointments"
        />
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
