/**
 * @module utils/sendgrid
 */


const config = require('../config/config');

/**
 * @method sendEmail - Sends an email via sendgrid.
 * @param {string} to - The email address to which the email will be sent.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The body of the email.
 */
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
