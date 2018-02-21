import React from 'react'
import { StyleSheet, ScrollView, Text, View, Image, FlatList, Picker, Alert, TextInput, Slider } from 'react-native'
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { currentDate, currentDatePlus, formatDate } from '../utils'
import { Divider, FullWidthButton } from '../components'

import { store, Requests, addAppointment, updateAppointment } from '../model'

export default class ScheduleAppointmentScreen extends React.Component {
  static navigationOptions = {
    title: 'Schedule New Appointment',
  };

  constructor(props) {
    super(props)

    this.state = {
      datetime: new Date(),
      mentees: store.getState().mentees,
      selectedMentee: store.getState().mentees[0]._id,
      place: "",
      duration: 1.0, // Duration in hours
      isUpdatingAppointment: false
    }

    if(props.navigation.state.params.hasOwnProperty("menteeID")) {
      this.state.selectedMentee = props.navigation.state.params.menteeID
      this.state.place = props.navigation.state.params.place
    }

    if(props.navigation.state.params.hasOwnProperty("meeting")) {
      let meeting = props.navigation.state.params.meeting

      this.state.isUpdatingAppointment = true
      this.state.id = meeting._id
      this.state.datetime = new Date(meeting.startTime)
      this.state.place = meeting.meetingAddress
      this.state.selectedMentee = meeting.mentee
    }
  }

  componentDidMount() {

  }

  scheduleAppointment() {
    if(this.state.place == "") {
      Alert.alert("Meeting location", "Please specify a place to meet!")

      return;
    }

    // Parse start time
    let startTime = Date.parse(this.state.datetime)

    // Calculate end time from start time and duration
    let endTime = startTime + this.state.duration * 60 * 60 * 1000

    if(this.state.isUpdatingAppointment) {
      Requests.updateMeeting(store.getState().mentorInfo.jwt, this.state.id, this.state.selectedMentee, this.state.place, startTime, endTime).then(response => {

        if(response.success) {
          Alert.alert("Appointment updated!")

          let newAppointment = {...response.result, mentee: response.result.mentee}
          store.dispatch(updateAppointment(this.state.id, newAppointment))

          this.props.navigation.goBack()
        }
      })

      return;
    }

    Requests.addMeeting(store.getState().mentorInfo.jwt, this.state.selectedMentee, this.state.place, startTime, endTime).then(response => {

      if(response.success) {
        Alert.alert("Appointment scheduled!")

        let newAppointment = {...response.result, mentee: response.result.mentee._id}
        store.dispatch(addAppointment(newAppointment))

        this.props.navigation.goBack()
      }
    })
  }

  setPlace(place) {
    this.setState({ place })
  }
  setDuration(duration) {
    this.setState({ duration })
  }
  setDatetime(datetime) {
    this.setState({datetime})
  }

  render() {
    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
        <DatePicker
          style={{width: '85%', marginTop: 30}}
          date={this.state.datetime}
          mode="datetime"
          placeholder="Select Appointment Date"
          format="DD MMM YYYY, hh:mm a"
          minDate={new Date()}
          maxDate={currentDatePlus(90)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(datetime) => {this.setDatetime(datetime)}}
        />

    		<Divider />

        <Text style={{width: '85%', fontWeight: 'bold', textAlign:'center', fontSize:16, margin:10}}>Meeting duration: {this.state.duration} hours</Text>

        <Slider minimumValue={1} maximumValue={2} step={0.5} value={1} onValueChange={value => this.setDuration(value)} style={{width: '85%'}}/>

        <Divider />

        <View style={{marginTop: 10, flexDirection: "column", justifyContent: "center"}}>
          <Text style={{paddingBottom: 10, fontWeight: 'bold', textAlign:'center', fontSize:16}}>Select location: </Text>
          <TextInput value={this.state.place} style={{height: 50, width:250, textAlign:'center'}} placeholder="Meeting place" onChangeText={(text) => this.setPlace(text)} />
        </View>

    		<Divider />

        <Text style={{width: '85%', marginTop: 5, fontWeight: 'bold', textAlign:'center', fontSize:16}}>Select Mentee</Text>

        <Divider />

        <Picker
          style={{width:'85%', height:25}}
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
          style={{marginTop: 150}}
          backgroundColor='#0075ff'
          title="Confirm Appointment"
  	      iconName='calendar-check'
        />
      </View>
    )
  }



  styles = StyleSheet.create({

  });
}
