const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true
    },
    otp: {
        type: String,
        required: [true, 'OTP is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // OTP expires after 10 minutes (600 seconds)
    },
    verified: {
        type: Boolean,
        default: false
    },
    attempts: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
otpSchema.index({ mobile: 1, createdAt: -1 });

module.exports = mongoose.model('OTP', otpSchema);
