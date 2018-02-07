import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Picker, Alert } from 'react-native'
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { currentDate, currentDatePlus } from '../utils'
import { Divider, FullWidthButton } from '../components'

import { store, Requests } from '../model'

export default class ScheduleAppointmentScreen extends React.Component {
  static navigationOptions = {
    title: 'Schedule New Appointment',
  };

  constructor(props) {
    super(props)

    this.state = {
      datetime: new Date(),
      mentees: store.getState().mentees,
      selectedMentee: store.getState().mentees[0]._id
    }

    // TODO: Fix this when implementing update meeting
    // if(props.navigation.state.params.hasOwnProperty("meeting")) {
    //   this.state.date = props.navigation.state.params.meeting.date
    //   this.state.time = props.navigation.state.params.meeting.time
    //   this.state.selectedMentee = `${props.navigation.state.params.meeting.firstName} ${props.navigation.state.params.meeting.secondName}`
    // }
  }

  componentDidMount() {

  }

  scheduleAppointment() {
    Alert.alert("Scheduling appointment...")

    console.log(this.state.selectedMentee)

    // TODO: Implement place form
    Requests.addMeeting(store.getState().mentorInfo.jwt, this.state.selectedMentee, "Some place", Date.parse(this.state.datetime), Date.parse(this.state.datetime)+30000)

    this.props.navigation.goBack()
  }

  render() {
    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
        <DatePicker
          style={{width: '85%', marginTop: 30}}
          date={this.state.datetime}
          mode="datetime"
          placeholder="Select Appointment Date"
          format="DD MMM YYYY hh:mm"
          minDate={new Date()}
          maxDate={currentDatePlus(90)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(datetime) => {this.setState({datetime: datetime})}}
        />

        <Text style={{width: '85%', marginTop: 30, fontWeight: 'bold', textAlign:'center', fontSize:16}}>Select Mentee</Text>
        <Divider />

        <Picker
          style={{width:'85%', height:100}}
          selectedValue={this.state.selectedMentee}
          onValueChange={(value, index) => this.setState({selectedMentee: value})}>
        {
          this.state.mentees.map(mentee =>
            <Picker.Item key={mentee._id} label={`${mentee.firstName} ${mentee.secondName}`} value={mentee._id}/>
          )
        }
        </Picker>

        <FullWidthButton
          onPress={() => {this.scheduleAppointment()}}
          style={{marginTop: 120}}
          backgroundColor='#0075ff'
          title="Confirm Appointment"
        />

      </View>
    )
  }



  styles = StyleSheet.create({

  });
}
