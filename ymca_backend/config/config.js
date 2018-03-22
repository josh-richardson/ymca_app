/**
 * @module config
 */

/** General settings for the project are defined here. */
module.exports = {
    debug: true,
    jwt_secret: 'tcAJaJLviZvqukG7XuDVhPohsrwtaEkt',
    db_path: (process.env.NODE_ENV === 'test' ? 'mongodb://localhost/ymca-test' : 'mongodb://localhost/ymca'),
    twilio_sid: 'AC8e46e54e7c3b1eab7b0be72880db09d1',
    twilio_token: 'ef864252d24afe90a2ad96b2d6a1c62e',
    twilio_number: '+441133207262',
    sendgrid_api_key: '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'
};
