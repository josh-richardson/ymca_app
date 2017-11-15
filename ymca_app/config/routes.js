import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import MeetingsScreen from '../screens/MeetingsScreen';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';
import EmergencyAlertSentScreen from '../screens/EmergencyAlertSentScreen';
import MainScreen from '../screens/MainScreen';
import ScheduleAppointmentScreen from '../screens/ScheduleAppointmentScreen';

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
