import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { styles } from './styles';
import { BaseStyles } from '../../BaseStyles';
import FullWidthButton from '../../components/FullWidthButton';
import PropTypes from 'prop-types';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  loginButtonPressed() {
    const { navigate } = this.props.navigation;

    navigate('Meetings')
  }

  setEmailAddress(email) {
    this.setState({email: email, password: this.state.password})
  }
  setPassword(password) {
    this.setState({email: this.state.email, password: password})
  }

  static navigationOptions = {
    title: 'YMCA Mentor Login',
  };

  render() {
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
          <Image
            source={require('../../images/ymca_logo.png')}
            style={styles.logo}
          />
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
}
