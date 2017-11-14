import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import { BaseStyles } from '../../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'

export default class MeetingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Upcoming Meetings',
  };

  constructor(props) {
    super(props)

    this.state = {
      mentees: [
        {key: 0, firstName: "John", secondName: "Smith", date: "22/11/2017", time:"13:00", place: "32 Fictituous Road", duration: "1 hour"},
        {key: 1, firstName: "David", secondName: "Walker", date: "22/12/2017", time:"13:00", place: "64 Meeting Ave", duration: "2 hours"},
        {key: 2, firstName: "Ellen", secondName: "Potter", date: "24/11/2017", time:"13:00", place: "128 Collision Place", duration: "3 hours"},
        {key: 3, firstName: "Harry", secondName: "Weasley", date: "27/11/2017", time:"13:00", place: "256 Powers of Two", duration: "4 hours"},
        {key: 4, firstName: "Dobbie", secondName: "HouseElfKin", date: "30/11/2017", time:"13:00", place: "512 Fun Town", duration: "543 hours"}]
    }
  }

  showMeetingDetails(meeting) {
    const { navigate } = this.props.navigation;

    navigate('MeetingDetails', {meeting})
  }

  renderItem(item) {
    return (
      <ListItem
        button
        title={`${item.firstName} ${item.secondName}`}
        subtitle={item.date}
        avatar={<Avatar
                rounded
                source={require('../../images/defaultAvatar.png')}
              />}
        onPress={() => {this.showMeetingDetails(item)}}
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation;

    return(
      <View>
        <List>
          <FlatList
            data={this.state.mentees}
            renderItem={({item}) => this.renderItem(item)}
          />
        </List>
      </View>
    )
  }
}
