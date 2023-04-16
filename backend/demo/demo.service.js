const db = require('_helpers/db');
const sendEmail = require('_helpers/send-email');
const sendSMS = require('_helpers/send-sms');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');

async function createUser({ username, password, email, phone }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTPs
    const emailOtp = await sendEmailotp(email);
    const smsOtp = await sendSMSotp(phone);
    if(emailOtp === "Error sending"){
        return "Error with Otp";
    }
    const user = await db.Demo.create({ 
      Username: username, 
      Password: hashedPassword, 
      Email: email, 
      Phone: phone,
      EmailOtp: emailOtp, // Save SMS OTP in database
      SMSOtp: smsOtp // Save Email OTP in database
    });
    return user;
  }
  

async function getUserByUsername(username) {
  const user = await db.Demo.findOne({ where: { Username: username } });
  return user;
}

async function getUserByEmail(email) {
    const user = await db.Demo.findOne({ where: { Email: email} });
    return user;
  }

async function getUserByPhone(phone) {
    const user = await db.Demo.findOne({ where: { Phone: phone } });
    return user;
}  

async function sendEmailotp(email){
    // Generate OTP
    const Emailotp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    // Send OTP to email
    const message = `<p>Please use the below code to verify your email address.</p>
                   <p><code>${Emailotp}</code></p>`;
    try{
        await sendEmail({
            to: email,
            subject: 'ERP App - Singup as consumer',
            html: `<h4>You just signed up</h4>
                   <p>Thanks for signing up</p>
                   ${message}`
        });
        return Emailotp;
    }
    catch (error){
        console.log(error)
    }
    return "Error sending";
}

async function sendSMSotp(phone){
    // Generate OTP
    const SMSotp = Math.floor(100000 + Math.random() * 900000);
    // Send OTP to SMS
    console.log(`Phone number: ${phone}`);
    try{
        await sendSMS({
            to: phone,
            body: `Your Registeration OTP is ${SMSotp}.`
        });    
        return SMSotp;    
    }
    catch(error){
        console.log(error)
    }
    return "Error sending";
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getUserByPhone,
  sendEmailotp,
  sendSMSotp
};
