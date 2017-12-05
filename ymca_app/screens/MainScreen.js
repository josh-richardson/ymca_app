import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert, Linking } from 'react-native'
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { FullWidthButton, Divider } from '../components'
import { NavigationActions } from 'react-navigation'

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'YMCA Mentors',
    headerLeft: null,
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
    Linking.openURL("https://ymca.pw/reset_password")
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

        <Divider style={{marginTop: 20}} />
        <FullWidthButton
          onPress={() => {this.signOut()}}
          style={{marginTop: '0%'}}
          backgroundColor='#ff0000'
          title="Sign Out"
        />

        <FullWidthButton
          onPress={() => {this.resetPassword()}}
          style={{marginTop: '2%'}}
          backgroundColor='#ff0000'
          title="Reset Password"
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
