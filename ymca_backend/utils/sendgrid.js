const config = require('../config/config');

const sendEmail = function (to, subject, message) {
    const helper = require('sendgrid').mail(config.sendgrid_api_key);

    const fromEmail = new helper.Email('test@example.com');
    const toEmail = new helper.Email(to);
    const content = new helper.Content('text/plain', message);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);
    const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
};


module.exports = {sendEmail};