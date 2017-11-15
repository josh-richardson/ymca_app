import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import { BaseStyles } from '../../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'

export default class ScheduleAppointmentScreen extends React.Component {
  static navigationOptions = {
    title: 'Upcoming Meetings',
  };

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      token: props.navigation.state.params.token
    }
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/14xtdv')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        meetings: responseJson.meetings,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  showMeetingDetails(meeting) {
    const { navigate } = this.props.navigation;

    navigate('MeetingDetails', {meeting, token: this.state.token})
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
    if(this.state.isLoading) {
      return(
        <View style={[BaseStyles.container, BaseStyles.centerChildren]}>
          <Text style={{marginLeft:'15%', marginRight:'15%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>Loading meetings data...</Text>
        </View>
      )
    }

    return(
      <View>
        <List>
          <FlatList
            data={this.state.meetings}
            renderItem={({item}) => this.renderItem(item)}
          />
        </List>
      </View>
    )
  }
}
