export default class Requests {

  static async login(email, password) {
    let response = await Requests.makeRequest('users/authenticate', {email, password})
    return response.token
  }

  static async getMentorInformation(jwt) {
    let response = await Requests.makeRequest('methods/profile', { auth: jwt })
    return response
  }

  static async getMentees(jwt) {
    let response = await Requests.makeRequest('methods/mentees', { auth: jwt })
    return response
  }

  static async getAppointments(jwt) {
    let response = await Requests.makeRequest('methods/meetings', { auth: jwt })
    return response
  }

  static async sendEmergency(jwt) {
    let response = await Requests.makeRequest('methods/emergency', { auth: jwt })
    return response
  }

  static async addMeeting(jwt, id, meetingAddress, startTime, endTime) {
    let response = await Requests.makeRequest('methods/meetings/add', { auth: jwt, id, meetingAddress, startTime, endTime })
    return response
  }

  static async deleteMeeting(jwt, id) {
    let response = await Requests.makeRequest('methods/meetings/delete', { auth: jwt, id })
    return response
  }

  static async updateMeeting(jwt, meetingID, menteeID, meetingAddress, startTime, endTime) {
    let response = await Requests.makeRequest('methods/meetings/edit', { auth: jwt, id: meetingID, json: JSON.stringify({ mentee: menteeID, meetingAddress, startTime, endTime }) })
    return response
  }

  static async startMeeting(jwt, meetingID) {
    let response = await Requests.makeRequest('methods/meetings/edit', { auth: jwt, id: meetingID, json: JSON.stringify({ actualStartTime: Date.parse(new Date()) }) })
    return response
  }

  static async endMeeting(jwt, meetingID) {
    let response = await Requests.makeRequest('methods/meetings/edit', { auth: jwt, id: meetingID, json: JSON.stringify({ actualEndTime: Date.parse(new Date()) }) })
    return response
  }

  static async makeRequest(url, bodyObject) {
    let response = await fetch(`http://ymca.pw/api/${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObject)
    })

    if(response.status == 200) {
      let responseJson = await response.json()
      return responseJson
    } else {
      console.log(`Response status is ${response.status}.`)
      console.log("Response:")
      console.log(response)
    }
  }
}
