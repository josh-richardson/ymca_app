import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Picker, Alert } from 'react-native'
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { currentDate, currentDatePlus } from '../utils'
import { Divider, FullWidthButton } from '../components'

export default class ScheduleAppointmentScreen extends React.Component {
  static navigationOptions = {
    title: 'Schedule New Appointment',
  };

  constructor(props) {
    super(props)

    this.state = {
      token: props.navigation.state.params.token,
      date: currentDate(),
      isLoading: true
    }
  }

  componentDidMount() {
    fetch("https://api.myjson.com/bins/k30an")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        isLoading: false,
        mentees: responseJson.mentees,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  scheduleAppointment() {
    Alert.alert("Scheduling appointment...")
    this.props.navigation.goBack()
  }

  render() {

    if(this.state.isLoading) {
      return(
        <View style={[BaseStyles.container, BaseStyles.centerChildren]}>
          <Text style={{marginLeft:'15%', marginRight:'15%', fontWeight: 'bold', textAlign:'center', fontSize:16}}>Loading mentees data...</Text>
        </View>
      )
    }

    return(
      <View style={[BaseStyles.container, BaseStyles.centerChildrenHorizontally]}>
        <DatePicker
          style={{width: '85%', marginTop: 30}}
          mode="date"
          placeholder="Select Appointment Date"
          format="YYYY-MM-DD"
          minDate={currentDate()}
          maxDate={currentDatePlus(90)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date})}}
        />

        <DatePicker
          style={{width: '85%', marginTop: 10}}
          date={this.state.time}
          mode="time"
          placeholder="Select Appointment Time"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(time) => {this.setState({time: time})}}
        />

        <Text style={{width: '85%', marginTop: 30, fontWeight: 'bold', textAlign:'center', fontSize:16}}>Select Mentee</Text>
        <Divider />

        <Picker
          style={{width:'85%', height:100}}
          selectedValue={this.state.selectedMentee}
          onValueChange={(value, index) => this.setState({selectedMentee: value})}>
        {
          this.state.mentees.map(mentee =>
            <Picker.Item key={mentee.key} label={`${mentee.firstName} ${mentee.lastName}`} value={mentee.key}/>
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
