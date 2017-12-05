import React from 'react';
import { StackNavigator } from 'react-navigation';

import { LoginScreen, MainScreen, MeetingsScreen, MeetingDetailsScreen, ScheduleAppointmentScreen, EmergencyAlertSentScreen } from '../screens/';

export const Stack = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: MainScreen
  },
  Meetings: {
    screen: MeetingsScreen
  },
  MeetingDetails: {
    screen: MeetingDetailsScreen
  },
  ScheduleAppointment: {
    screen: ScheduleAppointmentScreen
  },
  EmergencyAlertSent: {
    screen: EmergencyAlertSentScreen
  }
}, {
  mode: 'card',
});
