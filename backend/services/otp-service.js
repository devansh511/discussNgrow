const crypto = require('crypto');
const hashService = require('./hash-service');
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

class OtpService{
    async generateOtp() {
        const otp = await crypto.randomInt(1000, 9999);
        console.log(otp);
        return otp;
    }
 
    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone, 
            from: process.env.SMS_FROM_NUMBER,
            body: `One time code for getting in discussNgrow is ${otp}`,
        });
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return (hashedOtp == computedHash);
    }

}


module.exports = new OtpService();