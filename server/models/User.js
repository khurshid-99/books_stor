const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                // Validate Indian mobile number format (10 digits starting with 6-9)
                return /^[6-9]\d{9}$/.test(v);
            },
            message: 'Please provide a valid Indian mobile number'
        }
    },
    name: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return !v || validator.isEmail(v);
            },
            message: 'Please provide a valid email address'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    premiumExpiresAt: {
        type: Date,
        default: null
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    loginCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
userSchema.index({ mobile: 1 });
userSchema.index({ email: 1 }, { unique: true, sparse: true });

// Method to check if premium is active
userSchema.methods.isPremiumActive = function () {
    if (!this.isPremium) return false;
    if (!this.premiumExpiresAt) return true; // Lifetime premium
    return new Date() < this.premiumExpiresAt;
};

// Update last login
userSchema.methods.updateLastLogin = function () {
    this.lastLogin = Date.now();
    this.loginCount += 1;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
