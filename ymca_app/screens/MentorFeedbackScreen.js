import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TextInput, Alert } from 'react-native';
import { BaseStyles } from '../BaseStyles'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { FullWidthButton, FormQuestion } from '../components'

export default class MentorFeedbackScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
      title: `Mentor Feedback`
  });

  constructor(props) {
    super(props)

    this.state = {
      meeting: props.navigation.state.params.meeting,
      token: props.navigation.state.params.token,

      response1: "",
      response2: "",
      response3: "",
      response4: "",
      response5: "",
    }
  }

  componentDidMount() {

  }

  doneButtonPressed() {
    // TODO: Send response to server
    // Possibly validate that all questions are answered
    
    this.props.navigation.navigate('MenteeFeedback', {token: this.state.token, meeting: this.state.meeting})
  }

  render() {
    return(
      <View style={BaseStyles.container}>
        <ScrollView>
          <FormQuestion
            question={"How was the atmosphere in the home/with the family?"}
            placeholder={"i.e. stressed, relaxed, did parents voice any concerns?"}
            onChangeText={(text) => {this.setState({response1: text})}}
          />
          <FormQuestion
            question={"How did the activity go?"}
            placeholder={"i.e. why did you choose this activity, any behavioural issues, did young person enjoy activity?"}
            onChangeText={(text) => {this.setState({response2: text})}}
          />
          <FormQuestion
            question={"How do you feel the young person is progressing?"}
            placeholder={"i.e. is communication improving, are they working torwards goals, has self-esteem proved?"}
            onChangeText={(text) => {this.setState({response3: text})}}
          />
          <FormQuestion
            question={"Is there anything that the young person feels they need to improve on?"}
            placeholder={"i.e. barriers to reaching goals, action points for Programme Manager?"}
            onChangeText={(text) => {this.setState({response4: text})}}
          />
          <FormQuestion
            question={"Is there anything else you would like to record?"}
            placeholder={"i.e. any cause for concern, any accidents/incidents, comments or observations?"}
            onChangeText={(text) => {this.setState({response5: text})}}
          />

          <View style={BaseStyles.centerChildren}>
            <FullWidthButton
              onPress={() => this.doneButtonPressed()}
              style={{marginTop: '2%', marginBottom: '2%'}}
              backgroundColor='#0075ff'
              title="Done"
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  styles = StyleSheet.create({

  });
}
