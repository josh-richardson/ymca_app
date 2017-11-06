const config = require('../config/config');
const twilio = require('twilio');
const client = new twilio(config.twilio_sid, config.twilio_token);

const sendSms = function (to, message) {
    client.messages.create({
        body: message,
        to: to,
        from: config.twilio_number
    }).then((message) => console.log(message.sid));
};

const sendEmergencyCall = function (to) {
    //todo: change to a self-hosted XML file
    client.api.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: to,
            from: config.twilio_number,
        })
        .then((call) => console.log(call.sid));
};


module.exports = {sendSms, sendEmergencyCall};