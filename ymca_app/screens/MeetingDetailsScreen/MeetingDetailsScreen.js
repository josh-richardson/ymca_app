import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import { BaseStyles } from '../../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import FullWidthButton from '../../components/FullWidthButton'

export default class MeetingDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: `Meeting with ${navigation.state.params.meeting.firstName}`
  });

  constructor(props) {
    super(props)

    this.state = {
      meeting: props.navigation.state.params.meeting,
      token: props.navigation.state.params.token
    }
  }

  componentDidMount() {

  }

  extendMeeting() {
    Alert.alert("Extending meeting...")
  }
  endMeeting() {
    Alert.alert("Ending meeting...")
  }
  emergency() {
    const {navigate} = this.props.navigation;

    navigate('EmergencyAlertSent', {token: this.state.token})
  }

  render() {
    return(
      <View style={BaseStyles.container}>
        <View style={BaseStyles.centerChildren}>
          <Image
            source={require('../../images/defaultAvatar.png')}
            style={{
              marginTop: 10,
              width: 100,
              height: 100,
            }}
          />
        </View>

        <List>
          <ListItem title="Name" rightTitle={`${this.state.meeting.firstName} ${this.state.meeting.secondName}`} hideChevron/>
          <ListItem title="Date and Time" rightTitle={`${this.state.meeting.date} ${this.state.meeting.time}`} hideChevron/>
          <ListItem title="Place" rightTitle={this.state.meeting.place} hideChevron/>
          <ListItem title="Duration" rightTitle={this.state.meeting.duration} hideChevron/>
        </List>

        <View style={[BaseStyles.centerChildrenHorizontally, BaseStyles.alignChildrenBottom]}>

          <FullWidthButton
            onPress={() => {this.extendMeeting()}}
            style={{marginTop: '7%'}}
            backgroundColor='#0075ff'
            title="Extend Meeting"
          />
          <FullWidthButton
            onPress={() => {this.endMeeting()}}
            style={{marginTop: '2%'}}
            backgroundColor='#0075ff'
            title="End Meeting"
          />
          <FullWidthButton
            onPress={() => {this.emergency()}}
            style={{marginTop: '2%'}}
            backgroundColor='#ff0f00'
            title="Emergency"
          />
        </View>

      </View>
    )
  }
}
