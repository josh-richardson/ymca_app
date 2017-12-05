import React from 'react';
import { StackNavigator } from 'react-navigation';

import { LoginScreen, MainScreen, MeetingsScreen, MeetingDetailsScreen, ScheduleAppointmentScreen, EmergencyAlertSentScreen } from '../screens/';

const MainStackNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Meetings: { screen: MeetingsScreen },
  MeetingDetails: { screen: MeetingDetailsScreen },
  ScheduleAppointment: { screen: ScheduleAppointmentScreen },
})

export default Root = StackNavigator({
  Stack: { screen: MainStackNavigator },

  EmergencyAlertSent: { screen: EmergencyAlertSentScreen }
}, {
  mode: 'modal',
  headerMode: 'none',
})
