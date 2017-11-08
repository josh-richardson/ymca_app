import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  loginButtonPressed() {
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
    const { navigate } = this.props.navigation;
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require('../../images/ymca_logo.png')}
            style={styles.logo}
          />
          <TextInput style={styles.loginField} placeholder="  Email" keyboardType='email-address' onChangeText={(text) => this.setState()} />
          <TextInput style={styles.loginField} placeholder="  Password" secureTextEntry={true} />

          <TouchableOpacity
            onPress={() => {navigate("Meetings")}}
            style={{marginTop: '7%'}}
          >
            <View style={{
              flex: 0.25,
              width: 350,
              backgroundColor:'#0075ff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
              <Text style={{
              color:'white',
              fontSize: 20,
            }}>
                Sign In
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

LoginScreen.PropTypes = {
  email: PropTypes.string,
  password: PropTypes.string
}
