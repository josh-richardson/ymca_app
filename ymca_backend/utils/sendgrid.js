const config = require('../config/config');

const sendEmail = function (to, subject, message) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(config.sendgrid_api_key);
    const msg = {
        to: "richardsonjoshua228@gmail.com",
        from: 'test@example.com',
        subject: subject,
        text: message,
    };
    sgMail.send(msg);
};


module.exports = {sendEmail};