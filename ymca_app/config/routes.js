import React from 'react';
import { StackNavigator } from 'react-navigation';

import { LoginScreen, OptionsScreen, MeetingsScreen, MeetingDetailsScreen, ScheduleAppointmentScreen, EmergencyAlertSentScreen, MentorFeedbackScreen, MenteeFeedbackScreen } from '../screens/';

const MainStackNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Options: { screen: OptionsScreen },
  Meetings: { screen: MeetingsScreen },
  MeetingDetails: { screen: MeetingDetailsScreen },
  ScheduleAppointment: { screen: ScheduleAppointmentScreen },
  MentorFeedback: { screen: MentorFeedbackScreen },
  MenteeFeedback: { screen: MenteeFeedbackScreen }
})

export default Root = StackNavigator({
  Stack: { screen: MainStackNavigator },

  EmergencyAlertSent: { screen: EmergencyAlertSentScreen }
}, {
  mode: 'modal',
  headerMode: 'none',
})
