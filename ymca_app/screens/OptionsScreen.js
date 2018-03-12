import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert, Linking } from 'react-native'
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import { FullWidthButton, Divider } from '../components'
import { NavigationActions } from 'react-navigation'

import { store } from '../model'

export default class OptionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Options',
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  goBack() {
    this.props.navigation.goBack()
  }

  signOut() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  resetPassword() {
    Linking.openURL("http://ymca.pw/reset_password")
  }

  render() {
    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>

        <FullWidthButton
          onPress={() => {this.signOut()}}
          style={{marginTop: '5%'}}
          backgroundColor='#ff0000'
          title="Sign Out"
		      iconName='logout'
        />

        <FullWidthButton
          onPress={() => {this.resetPassword()}}
          style={{marginTop: '2%'}}
          backgroundColor='#ff0000'
          title="Reset Password"
		      iconName='refresh'
        />
        <Divider style={{marginTop: '2%'}} />

        <FullWidthButton
          onPress={() => {this.goBack()}}
          style={{marginTop: '2%'}}
          backgroundColor='#0075ff'
          title="Go Back"
		      iconName='arrow-left-box' // TODO: change this
        />
      </View>
    )
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

}
