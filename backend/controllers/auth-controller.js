const otpService = require('../services/otp-service.js');
const hashService = require('../services/hash-service.js');
const userService = require('../services/user-service.js');
const tokenService = require('../services/token-service.js');

class AuthController { 
    async sendOtp(req, res) { 
 
        const {phone} = req.body;
        // console.log(`${phone} 4`);
        if(!phone) { 
            res.status(400).json({message: 'Phone field is required!'});
        }
 
        const otp = otpService.generateOtp();

 
        const ttl = 1000 * 60 * 2; // time to live = 2 minutes
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        console.log(otp);
        try{
            // await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            });
        } catch(err) {
            console.log(err); 
            res.status(500).json({message: "OTP not sent!"});
        } 
    
        // res.json({hash: hash});
    }
 
    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if(!otp || !hash || !phone) {
            req.status(400).json({message: 'All fields are madatory'});
        }
        const [hashedOtp, expires] = hash.split('.');
        if(Date.now() > +expires) {
            res.status(400).json({message: 'OTP has expired'});
        }
 
        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if(!isValid) {
            res.status(400).json({message: "Invalid OTP"});
        } 

        let user;
        
        try{
            user = await userService.findUser({ phone });
            if(!user) {
                user = await userService.createUser({ phone });
            }
        } catch(err) {
            console.log(err);
            res.status(500).json({message: "DB error!"});
        }

        // JWT tokens 
        const {accessToken, refreshToken} = tokenService.generateTokens({ _id: user._id, activated: false,});
        
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.json({accessToken});
        
    }
}

module.exports = new AuthController();