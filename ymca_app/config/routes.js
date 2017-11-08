import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';

export const Stack = StackNavigator({
  Login: {
    screen: LoginScreen
  }
});
