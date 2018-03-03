import PushNotification from 'react-native-push-notification'

export default class Notifications {

  static initialise() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log(notification)
      },
    })
  }

  static get meetingStart() { return "MeetingStart" }
  static get meetingEnd() { return "MeetingEnd" }
  static get meetingFeedback() { return "MeetingFeedback" }

  static nameForMeetingStart(id) {
    return `${Notifications.meetingStart}${id}`
  }
  static nameForMeetingEnd(id) {
    return `${Notifications.meetingEnd}${id}`
  }
  static nameForMeetingFeedback(id) {
    return `${Notifications.meetingFeedback}${id}`
  }

  static schedule(title, message, date, type, id) {
    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: new Date(date),
      userInfo: {id: `${type}${id}`}
    })
  }
  static cancel(notificationID) {
    PushNotification.cancelLocalNotifications({
      id: notificationID
    })
  }

  static scheduleStart(meeting) {
    Notifications.schedule(
      "Meeting",
      `It's time for your meeting with ${meeting.mentee.firstName}.`,
      meeting.startTime,
      Notifications.meetingStart,
      meeting.id
    )
  }
  static scheduleEnd(meeting) {
    Notifications.schedule(
      "Meeting Ending",
      `Your meeting with ${meeting.mentee.firstName} should be ending soon.`,
      meeting.endTime,
      Notifications.meetingEnd,
      meeting.id
    )
  }
  static scheduleFeedback(meeting) {
    Notifications.schedule(
      "Meeting",
      `Please provide feedback about your meeting with ${meeting.mentee.firstName}.`,
      Date.now() + (1 * 60 * 60 * 1000),
      Notifications.meetingFeedback,
      meeting.id
    )
  }

  static cancelStart(meetingID) { Notifications.cancel(Notifications.nameForMeetingStart(meetingID)) }
  static cancelEnd(meetingID) { Notifications.cancel(Notifications.nameForMeetingEnd(meetingID)) }
  static cancelFeedback(meetingID) { Notifications.cancel(Notifications.nameForMeetingFeedback(meetingID)) }

  static meetingScheduled(meeting) {
    Notifications.cancelStart(meeting.id)
    Notifications.scheduleStart(meeting)
  }

  static meetingDeleted(meeting) {
    Notifications.cancelStart(meeting.id)
    Notifications.cancelEnd(meeting.id)
    Notifications.cancelFeedback(meeting.id)
  }

  static meetingStarted(meeting) {
    Notifications.cancelStart(meeting.id)
    Notifications.cancelEnd(meeting.id)
    Notifications.scheduleEnd(meeting)
  }

  static meetingExtended(meeting) {
    Notifications.cancelEnd(meeting.id)
    Notifications.scheduleEnd(meeting)
  }

  static meetingEnded(meeting) {
    Notifications.cancelEnd(meeting.id)
    Notifications.cancelFeedback(meeting.id)
    Notifications.scheduleFeedback(meeting)
  }

  static feedbackProvided(meeting) {
    Notifications.cancelFeedback(meeting.id)
  }

}
