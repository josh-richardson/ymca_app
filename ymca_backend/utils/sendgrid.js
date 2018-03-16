const config = require('../config/config');

//Sends an email via sendgrid.
const sendEmail = function (to, subject, message) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(config.sendgrid_api_key);
    const msg = {
        to: to,
        from: 'mailer@ymca.pw',
        subject: subject,
        text: message,
    };
    sgMail.send(msg);
};


module.exports = {sendEmail};