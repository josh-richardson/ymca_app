/**
 * @module config/routes
 */

import React from 'react';
import { StackNavigator } from 'react-navigation';

import { LoginScreen, OptionsScreen, MeetingsScreen, MeetingDetailsScreen, ScheduleAppointmentScreen, EmergencyAlertSentScreen, MentorFeedbackScreen, MenteeFeedbackScreen } from '../screens/';

/** Defines the main stack navigator that gets displayed throught the root navigator. */
const MainStackNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Options: { screen: OptionsScreen },
  Meetings: { screen: MeetingsScreen },
  MeetingDetails: { screen: MeetingDetailsScreen },
  ScheduleAppointment: { screen: ScheduleAppointmentScreen },
  MentorFeedback: { screen: MentorFeedbackScreen },
  MenteeFeedback: { screen: MenteeFeedbackScreen }
})

/** Defines the root stack navigator that is responsible for displaying other stack navigators as well as allows for modal screens to be displayed. */
export default Root = StackNavigator({
  Stack: { screen: MainStackNavigator },

  EmergencyAlertSent: { screen: EmergencyAlertSentScreen }
}, {
  mode: 'modal',
  headerMode: 'none',
})
