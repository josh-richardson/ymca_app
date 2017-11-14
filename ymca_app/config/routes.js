import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import MeetingsScreen from '../screens/MeetingsScreen';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';
import EmergencyAlertSentScreen from '../screens/EmergencyAlertSentScreen';

export const Stack = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Meetings: {
    screen: MeetingsScreen
  },
  MeetingDetails: {
    screen: MeetingDetailsScreen
  },
  EmergencyAlertSent: {
    screen: EmergencyAlertSentScreen
  }
}, {
  mode: 'card',
});
