import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import MeetingsScreen from '../screens/MeetingsScreen';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';

export const Stack = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Meetings: {
    screen: MeetingsScreen
  },
  MeetingDetails: {
    screen: MeetingDetailsScreen
  }
});
