const twilio = require('twilio');

// Initialize Twilio client (only if credentials are provided)
let twilioClient = null;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );
}

/**
 * Generate a 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via Twilio Verify Service
 * @param {string} mobile - Mobile number (10 digits)
 * @returns {Promise<Object>} Twilio response
 */
const sendOTPViaSMS = async (mobile) => {
    // If Twilio Verify Service is configured, use it
    if (twilioClient && process.env.VERIFY_SERVICE_SID) {
        try {
            const verification = await twilioClient.verify.v2
                .services(process.env.VERIFY_SERVICE_SID)
                .verifications
                .create({
                    to: `+91${mobile}`,
                    channel: 'sms'
                });

            console.log('='.repeat(50));
            console.log(`✅ OTP sent via Twilio Verify to +91${mobile}`);
            console.log(`Status: ${verification.status}`);
            console.log('='.repeat(50));

            return {
                success: true,
                message: 'OTP sent successfully via SMS',
                sid: verification.sid,
                useVerifyService: true
            };
        } catch (error) {
            console.error('Twilio Verify Error:', error);

            // Fall back to console logging
            const otp = generateOTP();
            console.log('='.repeat(50));
            console.log(`📱 OTP for ${mobile}: ${otp}`);
            console.log('='.repeat(50));
            console.log('⚠️  Twilio Verify failed. OTP logged to console.');
            console.log('Error:', error.message);
            console.log('='.repeat(50));

            return {
                success: true,
                message: 'OTP logged to console (Twilio Verify failed)',
                sid: 'fallback-mode',
                otp: otp,
                useVerifyService: false
            };
        }
    }

    // If Twilio is not configured, log the OTP (for development)
    const otp = generateOTP();
    console.log('='.repeat(50));
    console.log(`📱 OTP for ${mobile}: ${otp}`);
    console.log('='.repeat(50));
    console.log('⚠️  Twilio Verify not configured. OTP logged to console.');
    console.log('To enable SMS, add VERIFY_SERVICE_SID to .env file');
    console.log('='.repeat(50));

    return {
        success: true,
        message: 'OTP logged to console (Twilio not configured)',
        sid: 'dev-mode',
        otp: otp,
        useVerifyService: false
    };
};

/**
 * Verify OTP using Twilio Verify Service
 * @param {string} mobile - Mobile number (10 digits)
 * @param {string} otp - OTP code to verify
 * @returns {Promise<Object>} Verification result
 */
const verifyOTPViaSMS = async (mobile, otp) => {
    // If Twilio Verify Service is configured, use it
    if (twilioClient && process.env.VERIFY_SERVICE_SID) {
        try {
            const verificationCheck = await twilioClient.verify.v2
                .services(process.env.VERIFY_SERVICE_SID)
                .verificationChecks
                .create({
                    to: `+91${mobile}`,
                    code: otp
                });

            console.log('='.repeat(50));
            console.log(`✅ OTP verified for +91${mobile}`);
            console.log(`Status: ${verificationCheck.status}`);
            console.log('='.repeat(50));

            return {
                success: verificationCheck.status === 'approved',
                status: verificationCheck.status
            };
        } catch (error) {
            console.error('Twilio Verify Check Error:', error);
            return {
                success: false,
                status: 'failed',
                error: error.message
            };
        }
    }

    // If Verify Service not available, return null (use database OTP)
    return null;
};

/**
 * Validate Indian mobile number format
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} True if valid
 */
const isValidIndianMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
};

/**
 * Format mobile number (remove spaces, dashes, etc.)
 * @param {string} mobile - Mobile number to format
 * @returns {string} Formatted mobile number
 */
const formatMobileNumber = (mobile) => {
    return mobile.replace(/\D/g, '');
};

module.exports = {
    generateOTP,
    sendOTPViaSMS,
    verifyOTPViaSMS,
    isValidIndianMobile,
    formatMobileNumber
};
