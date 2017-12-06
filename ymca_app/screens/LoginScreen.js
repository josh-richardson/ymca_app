import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles';
import { FullWidthButton } from '../components';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

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
      email: "WalterSmith@mail.com",
      password: "WalterPass",
      message: "",
    };
  }

  loginButtonPressed() {
    this.setState({message: "Logging in..."})

    fetch('http://ymca.pw/api/users/authenticate/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.token) {
        this.setState({
          hasLoggedIn: true,
          message: "Successfully logged in!",
          token: responseJson.token,
        });

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Main',
              params: {token: this.state.token}
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);

        // const { navigate } = this.props.navigation;
        // navigate('Main', {token: this.state.token})
      } else {
        this.setState({
          message: "Wrong username or password.",
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
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
