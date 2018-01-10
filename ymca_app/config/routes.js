import React from 'react';
import { StackNavigator } from 'react-navigation';

import { LoginScreen, MainScreen, MeetingsScreen, MeetingDetailsScreen, ScheduleAppointmentScreen, EmergencyAlertSentScreen, MentorFeedbackScreen } from '../screens/';

const MainStackNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Meetings: { screen: MeetingsScreen },
  MeetingDetails: { screen: MeetingDetailsScreen },
  ScheduleAppointment: { screen: ScheduleAppointmentScreen },
  MentorFeedback: { screen: MentorFeedbackScreen }
})

export default Root = StackNavigator({
  Stack: { screen: MainStackNavigator },

  EmergencyAlertSent: { screen: EmergencyAlertSentScreen }
}, {
  mode: 'modal',
  headerMode: 'none',
})
