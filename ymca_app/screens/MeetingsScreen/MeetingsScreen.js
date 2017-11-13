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
        {key: 0, name: "John Smith", date: "22/11/2017"},
        {key: 1, name: "David Walker", date: "22/12/2017"},
        {key: 2, name: "Ellen Potter", date: "24/11/2017"},
        {key: 3, name: "Harry Weasley", date: "27/11/2017"},
        {key: 4, name: "Dobbie HouseElfKin", date: "30/11/2017"}]
    }
  }

  renderItem(item) {
    return (
      <ListItem
        title={item.name}
        subtitle={item.date}
        avatar={<Avatar
                rounded
                source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfMb8IBiVhQSGC23VXd9CQThN3VsJaA3oepjWh84Yx0ywBWDl"}}
              />}
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
