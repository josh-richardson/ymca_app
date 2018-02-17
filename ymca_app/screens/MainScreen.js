import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert, Linking } from 'react-native'
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { FullWidthButton, Divider } from '../components'
import { NavigationActions } from 'react-navigation'

import { store } from '../model'

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'YMCA Mentors',
    headerLeft: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {

  }

  scheduleAppointment() {
    this.props.navigation.navigate("ScheduleAppointment", {})
  }

  signOut() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  resetPassword() {
    Linking.openURL("http://ymca.pw/reset_password")
  }

  showUpcomingAppointments() {
    this.props.navigation.navigate('Meetings')
  }

  render() {
    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
        <FullWidthButton
          onPress={() => {this.scheduleAppointment()}}
          style={{marginTop: '7%'}}
          backgroundColor='#0075ff'
          title="Schedule Appointment"
		  iconName='calendar-plus'
        />
        <FullWidthButton
          onPress={() => {this.showUpcomingAppointments()}}
          style={{marginTop: '2%'}}
          backgroundColor='#0075ff'
          title="Upcoming Appointments"
		  iconName='calendar-range'
        />

        <Divider style={{marginTop: 20}} />
        <FullWidthButton
          onPress={() => {this.signOut()}}
          style={{marginTop: '0%'}}
          backgroundColor='#ff0000'
          title="Sign Out"
		  iconName='logout'
        />

        <FullWidthButton
          onPress={() => {this.resetPassword()}}
          style={{marginTop: '2%'}}
          backgroundColor='#ff0000'
          title="Reset Password"
		  iconName='refresh'
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
