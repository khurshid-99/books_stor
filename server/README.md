# Books Store Backend Server

Professional backend server for the Books Store application with OTP-based authentication.

## 🚀 Features

- **OTP Authentication**: Secure mobile number-based authentication using Twilio SMS
- **JWT Tokens**: Stateless authentication with JSON Web Tokens
- **User Management**: Complete user profile management
- **Premium Features**: Support for premium user subscriptions
- **Rate Limiting**: Protection against abuse with request rate limiting
- **Security**: Helmet.js for security headers, CORS configuration
- **MongoDB**: Persistent data storage with Mongoose ODM
- **Validation**: Comprehensive input validation
- **Error Handling**: Centralized error handling middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Twilio account (optional, for SMS OTP)

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env` (or use existing `.env`)
   - Update the values as needed

3. **Start MongoDB**:
```bash
# If using local MongoDB
mongod
```

4. **Run the server**:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🔧 Environment Variables

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/books_store

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d

# Twilio Configuration (Optional)
# If not configured, OTP will be logged to console for development
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## 📡 API Endpoints

### Authentication

#### 1. Send OTP
**POST** `/api/auth/send-otp`

Send OTP to a mobile number for authentication.

**Request Body**:
```json
{
  "mobile": "9876543210"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "mobile": "3210"
}
```

**Response** (Error - 429):
```json
{
  "success": false,
  "message": "Please wait before requesting another OTP",
  "retryAfter": 60
}
```

**Features**:
- Validates Indian mobile number format (10 digits, starts with 6-9)
- Rate limiting: 1 OTP per 60 seconds per mobile number
- OTP expires in 10 minutes
- Sends SMS via Twilio (or logs to console in development)

---

#### 2. Verify OTP
**POST** `/api/auth/verify-otp`

Verify OTP and login/register user.

**Request Body**:
```json
{
  "mobile": "9876543210",
  "otp": "123456"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_here",
    "mobile": "9876543210",
    "name": "",
    "email": null,
    "isPremium": false,
    "loginCount": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response** (Error - 400):
```json
{
  "success": false,
  "message": "Invalid OTP. Please try again.",
  "attemptsLeft": 4
}
```

**Features**:
- Maximum 5 verification attempts per OTP
- Auto-creates user if not exists
- Updates last login timestamp
- Returns JWT token valid for 30 days
- Increments login count

---

#### 3. Get Profile
**GET** `/api/auth/me`

Get current user profile (requires authentication).

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (Success - 200):
```json
{
  "success": true,
  "user": {
    "id": "user_id_here",
    "mobile": "9876543210",
    "name": "John Doe",
    "email": "john@example.com",
    "isPremium": true,
    "premiumExpiresAt": "2024-12-31T23:59:59.000Z",
    "loginCount": 15,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### 4. Update Profile
**PUT** `/api/auth/profile`

Update user profile (requires authentication).

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id_here",
    "mobile": "9876543210",
    "name": "John Doe",
    "email": "john@example.com",
    "isPremium": false
  }
}
```

---

#### 5. Logout
**POST** `/api/auth/logout`

Logout user (requires authentication).

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (Success - 200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Note**: In a stateless JWT system, logout is primarily handled client-side by removing the token.

---

## 🔐 Authentication Middleware

### `auth`
Requires valid JWT token. Use for protected routes.

```javascript
const { auth } = require('./middleware/auth');
router.get('/protected', auth, controller);
```

### `optionalAuth`
Adds user info if token is present, but doesn't require it.

```javascript
const { optionalAuth } = require('./middleware/auth');
router.get('/public', optionalAuth, controller);
```

### `requirePremium`
Requires authentication AND premium subscription.

```javascript
const { requirePremium } = require('./middleware/auth');
router.get('/premium-content', requirePremium, controller);
```

---

## 📊 Database Models

### User Model
```javascript
{
  mobile: String,        // Required, unique, validated
  name: String,          // Optional
  email: String,         // Optional, validated
  isActive: Boolean,     // Default: true
  isPremium: Boolean,    // Default: false
  premiumExpiresAt: Date,// Null for lifetime premium
  lastLogin: Date,
  loginCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Model
```javascript
{
  mobile: String,        // Required
  otp: String,          // Required, 6 digits
  verified: Boolean,    // Default: false
  attempts: Number,     // Default: 0, max: 5
  createdAt: Date,      // Auto-expires after 10 minutes
  updatedAt: Date
}
```

---

## 🧪 Testing the API

### Using cURL

**Send OTP**:
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9876543210"}'
```

**Verify OTP**:
```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9876543210","otp":"123456"}'
```

**Get Profile**:
```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the collection (create one with the endpoints above)
2. Set environment variable `baseUrl` to `http://localhost:5001`
3. After login, save the token and use it in subsequent requests

---

## 🔒 Security Features

1. **Rate Limiting**: 100 requests per 15 minutes per IP
2. **Helmet.js**: Security headers
3. **CORS**: Configured for specific origins
4. **JWT Expiration**: Tokens expire after 30 days
5. **OTP Expiration**: OTPs expire after 10 minutes
6. **Attempt Limiting**: Maximum 5 OTP verification attempts
7. **Input Validation**: All inputs are validated
8. **Mobile Number Validation**: Indian format (10 digits, starts with 6-9)

---

## 📝 Development Notes

### OTP in Development Mode

If Twilio is not configured (missing credentials in `.env`), the OTP will be logged to the console:

```
==================================================
📱 OTP for 9876543210: 123456
==================================================
⚠️  Twilio not configured. OTP logged to console.
To enable SMS, add TWILIO credentials to .env file
==================================================
```

### Adding Twilio

1. Sign up at [Twilio](https://www.twilio.com/)
2. Get a phone number with SMS capabilities
3. Copy Account SID, Auth Token, and Phone Number
4. Add to `.env` file
5. Restart the server

---

## 🚀 Deployment

### Production Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas or production database
- [ ] Add production domain to CORS whitelist
- [ ] Configure Twilio for SMS
- [ ] Set up SSL/TLS certificate
- [ ] Configure environment variables on hosting platform
- [ ] Set up monitoring and logging
- [ ] Enable database backups

### Environment-specific CORS

The server automatically configures CORS based on `NODE_ENV`:

**Development**:
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:5174`

**Production**:
- Update `index.js` line 24 with your production domain

---

## 📂 Project Structure

```
server/
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── OTP.js               # OTP schema
├── routes/
│   └── auth.js              # Authentication routes
├── utils/
│   └── otpService.js        # OTP generation and SMS service
├── .env                     # Environment variables
├── index.js                 # Server entry point
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running (`mongod` command)

### JWT Secret Warning
```
Warning: Using default JWT secret
```
**Solution**: Set `JWT_SECRET` in `.env` file

### Twilio SMS Error
```
Error: Failed to send OTP
```
**Solution**: Check Twilio credentials in `.env` or use development mode (OTP in console)

### CORS Error
```
Access to fetch blocked by CORS policy
```
**Solution**: Add your frontend URL to CORS whitelist in `index.js`

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review error messages in console
3. Check MongoDB connection
4. Verify environment variables

---

## 📄 License

ISC

---

## 🎯 Next Steps

1. **Start the server**: `npm run dev`
2. **Test OTP flow**: Use Postman or cURL
3. **Integrate with frontend**: Update API endpoints in frontend code
4. **Configure Twilio**: For production SMS sending
5. **Add more features**: User roles, permissions, etc.

---

**Server Status**: ✅ Ready for development and testing!
