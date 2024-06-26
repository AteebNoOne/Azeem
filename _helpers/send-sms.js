const twilio = require('twilio');
const config = require('config.json');

module.exports = sendSMS;

const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);

async function sendSMS({ to, body, from = config.twilio.fromNumber }) {
    await twilioClient.messages.create({
        to: to,
        from: from,
        body: body
    });
}
