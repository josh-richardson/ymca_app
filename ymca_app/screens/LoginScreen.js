/**
 * @module screens/LoginScreen
 */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles';
import { FullWidthButton } from '../components';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { Requests, StoreHydrator, Notifications } from '../model'

/**
 * @class LoginScreen
 * @extends React.Component
 *
 * React component for the login screen. Gets displayed initially when the app launches.
 */
export default class LoginScreen extends React.Component {

  /**
   * Sets appropriate state for the screen.
   * @param {object} props - Props passed to the screen.
   */
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
    };

    /** UNCOMMENT THIS FOR QUICK LOGIN **/
    this.state = {
      email: "bernardo_armstrong@gmail.com",
      password: "bernardo_armstrong@gmail.com",
      message: "",
    };
  }

  /** Called when the component gets mounted. */
  componentDidMount() {
    Notifications.initialise()
  }

  /** Initiates login process. */
  loginButtonPressed() {
    this.setState({message: "Logging in..."})

    Requests.login(this.state.email, this.state.password).then(jwt => {
      this.setState({message: "Successfully logged in. Retrieving information..."})

      StoreHydrator.retrieveAndStoreMentorData(jwt).then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Meetings',
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      })

    }).catch(error => {
      console.log(`Couldn't log in: ${error}`)

      this.setState({
        message: "An error occured. Your username or password might be incorrect. Try again.",
      })
    })
  }

  /**
   * Sets the email address in the screen state.
   * @param {string} email - The email typed in.
   */
  setEmailAddress(email) {
    this.setState({email: email})
  }
  /**
   * Sets the password in the screen state.
   * @param {string} password - The password typed in.
   */
  setPassword(password) {
    this.setState({password: password})
  }

  /** Specifies navigation options for the current screen. */
  static navigationOptions = {
    title: 'YMCA Mentor Login',
  };

  /** Renders the component. */
  render() {
    const styles = this.styles

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
          <Image
            source={require('../images/ymca_logo.png')}
            style={styles.logo}
          />

          <Text>{this.state.message}</Text>

          <TextInput style={styles.loginField} placeholder="  Email" keyboardType='email-address' onChangeText={(text) => this.setEmailAddress(text)} />
          <TextInput style={styles.loginField} placeholder="  Password" secureTextEntry={true} onChangeText={(text) => this.setPassword(text)} />

          <FullWidthButton
            onPress={() => {this.loginButtonPressed()}}
            style={{marginTop: '7%'}}
            backgroundColor='#0075ff'
            title="Sign In"
			iconName='login'
          />

        </View>
      </TouchableWithoutFeedback>
    )
  }

  /** Specifies styles used in the current component. */
  styles = StyleSheet.create({
    loginField: {
      width: '60%',
      height: 50,
      borderBottomWidth: 2,
      borderBottomColor: 'gray',
      marginTop: '2.5%',
      marginBottom: '2.5%',
    },

    logo: {
      transform: [{scale: 0.6}],
      marginTop: '10%'
    },
  });

}
