import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles';
import { FullWidthButton } from '../components';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import { store, setMentees, setAppointments, setInfo, Requests, StoreHydrator } from '../model'

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: "",
    };

    /** UNCOMMENT THIS FOR QUICK LOGIN **/
    this.state = {
      email: "test@gmail.com",
      password: "password123",
      message: "",
    };
  }

  loginButtonPressed() {
    this.setState({message: "Logging in..."})

    Requests.login(this.state.email, this.state.password).then(jwt => {
      this.setState({message: "Successfully logged in. Retrieving information..."})

      StoreHydrator.retrieveAndStoreMentorData(jwt).then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Main',
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

  setEmailAddress(email) {
    this.setState({email: email})
  }
  setPassword(password) {
    this.setState({password: password})
  }

  static navigationOptions = {
    title: 'YMCA Mentor Login',
  };

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
