const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const {
    generateOTP,
    sendOTPViaSMS,
    isValidIndianMobile,
    formatMobileNumber
} = require('../utils/otpService');

/**
 * Send OTP to mobile number
 * POST /api/auth/send-otp
 */
exports.sendOTP = async (req, res) => {
    try {
        let { mobile } = req.body;

        // Validate input
        if (!mobile) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number is required'
            });
        }

        // Format mobile number (remove any non-digit characters)
        mobile = formatMobileNumber(mobile);

        // Validate Indian mobile number format
        if (!isValidIndianMobile(mobile)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid Indian mobile number'
            });
        }

        // Rate limiting: Check if OTP was sent recently (within last 60 seconds)
        const recentOTP = await OTP.findOne({
            mobile,
            createdAt: { $gte: new Date(Date.now() - 60000) } // Last 60 seconds
        });

        if (recentOTP) {
            return res.status(429).json({
                success: false,
                message: 'Please wait before requesting another OTP',
                retryAfter: 60
            });
        }

        // Send OTP via SMS (Twilio Verify Service or fallback)
        const result = await sendOTPViaSMS(mobile);

        // Only save OTP to database if not using Verify Service
        if (!result.useVerifyService && result.otp) {
            await OTP.create({
                mobile,
                otp: result.otp,
                verified: false,
                attempts: 0
            });
        }

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            mobile: mobile.slice(-4) // Return last 4 digits for confirmation
        });

    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Verify OTP and login/register user
 * POST /api/auth/verify-otp
 */
exports.verifyOTP = async (req, res) => {
    try {
        let { mobile, otp } = req.body;

        // Validate input
        if (!mobile || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number and OTP are required'
            });
        }

        // Format mobile number
        mobile = formatMobileNumber(mobile);

        // Validate mobile number format
        if (!isValidIndianMobile(mobile)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid mobile number format'
            });
        }

        // Try Twilio Verify Service first
        const { verifyOTPViaSMS } = require('../utils/otpService');
        const twilioVerifyResult = await verifyOTPViaSMS(mobile, otp);
        const validViaTwilio = twilioVerifyResult && twilioVerifyResult.success;

        if (!validViaTwilio) {
            // Fallback to database OTP verification
            const otpRecord = await OTP.findOne({
                mobile,
                verified: false
            }).sort({ createdAt: -1 });

            if (!otpRecord) {
                return res.status(400).json({
                    success: false,
                    message: 'OTP expired or not found. Please request a new OTP.'
                });
            }

            // Check if OTP has expired (10 minutes)
            const otpAge = Date.now() - otpRecord.createdAt.getTime();
            if (otpAge > 10 * 60 * 1000) { // 10 minutes
                return res.status(400).json({
                    success: false,
                    message: 'OTP has expired. Please request a new OTP.'
                });
            }

            // Check maximum attempts (5 attempts)
            if (otpRecord.attempts >= 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Maximum verification attempts exceeded. Please request a new OTP.'
                });
            }

            // Verify OTP
            if (otpRecord.otp !== otp) {
                // Increment attempts
                otpRecord.attempts += 1;
                await otpRecord.save();

                return res.status(400).json({
                    success: false,
                    message: 'Invalid OTP. Please try again.',
                    attemptsLeft: 5 - otpRecord.attempts
                });
            }

            // Mark OTP as verified
            otpRecord.verified = true;
            await otpRecord.save();
        }



        // Find or create user
        let user = await User.findOne({ mobile });

        if (!user) {
            // Create new user
            user = await User.create({
                mobile,
                loginCount: 1,
                lastLogin: Date.now()
            });
        } else {
            // Update existing user's last login
            await user.updateLastLogin();
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                mobile: user.mobile
            },
            process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
            { expiresIn: '30d' }
        );

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                mobile: user.mobile,
                name: user.name,
                email: user.email,
                isPremium: user.isPremiumActive(),
                loginCount: user.loginCount,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-__v');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                mobile: user.mobile,
                name: user.name,
                email: user.email,
                isPremium: user.isPremiumActive(),
                premiumExpiresAt: user.premiumExpiresAt,
                loginCount: user.loginCount,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Update user profile
 * PUT /api/auth/profile
 */
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update fields
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                mobile: user.mobile,
                name: user.name,
                email: user.email,
                isPremium: user.isPremiumActive()
            }
        });

    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Logout user (client-side token removal)
 * POST /api/auth/logout
 */
exports.logout = async (req, res) => {
    try {
        // In a stateless JWT system, logout is handled client-side
        // But we can log the logout event if needed
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to logout',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
