# Authentication API Test Script

This file contains test commands to verify the authentication API endpoints.

## Prerequisites
- Server running on http://localhost:5001
- MongoDB connected

## Test Flow

### 1. Send OTP
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"mobile\":\"9876543210\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "mobile": "3210"
}
```

**Check Console:** The OTP will be logged in the server console (since Twilio is configured, it will also send SMS).

---

### 2. Verify OTP
Replace `123456` with the OTP from the console or SMS.

```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d "{\"mobile\":\"9876543210\",\"otp\":\"123456\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "mobile": "9876543210",
    "name": "",
    "email": null,
    "isPremium": false,
    "loginCount": 1,
    "createdAt": "2024-..."
  }
}
```

**Save the token** for subsequent requests.

---

### 3. Get User Profile
Replace `YOUR_TOKEN_HERE` with the token from step 2.

```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "mobile": "9876543210",
    "name": "",
    "email": null,
    "isPremium": false,
    "premiumExpiresAt": null,
    "loginCount": 1,
    "lastLogin": "2024-...",
    "createdAt": "2024-..."
  }
}
```

---

### 4. Update Profile
Replace `YOUR_TOKEN_HERE` with the token from step 2.

```bash
curl -X PUT http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "...",
    "mobile": "9876543210",
    "name": "John Doe",
    "email": "john@example.com",
    "isPremium": false
  }
}
```

---

### 5. Logout
Replace `YOUR_TOKEN_HERE` with the token from step 2.

```bash
curl -X POST http://localhost:5001/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## PowerShell Commands (Windows)

If you're using PowerShell, use these commands instead:

### Send OTP
```powershell
Invoke-RestMethod -Uri "http://localhost:5001/api/auth/send-otp" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"mobile":"9876543210"}'
```

### Verify OTP
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5001/api/auth/verify-otp" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"mobile":"9876543210","otp":"123456"}'

$token = $response.token
Write-Host "Token: $token"
```

### Get Profile
```powershell
Invoke-RestMethod -Uri "http://localhost:5001/api/auth/me" `
  -Method GET `
  -Headers @{Authorization="Bearer $token"}
```

### Update Profile
```powershell
Invoke-RestMethod -Uri "http://localhost:5001/api/auth/profile" `
  -Method PUT `
  -ContentType "application/json" `
  -Headers @{Authorization="Bearer $token"} `
  -Body '{"name":"John Doe","email":"john@example.com"}'
```

---

## Error Cases to Test

### Invalid Mobile Number
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"mobile\":\"1234567890\"}"
```

**Expected:** Error - Invalid mobile number (must start with 6-9)

### Rate Limiting
Send OTP request twice within 60 seconds:

```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"mobile\":\"9876543210\"}"
```

**Expected:** 429 error - "Please wait before requesting another OTP"

### Invalid OTP
```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d "{\"mobile\":\"9876543210\",\"otp\":\"000000\"}"
```

**Expected:** Error - "Invalid OTP. Please try again."

### Unauthorized Access
```bash
curl -X GET http://localhost:5001/api/auth/me
```

**Expected:** 401 error - "Access denied. No token provided."

---

## Integration with Frontend

Update your frontend code to use these endpoints:

### LoginModal.jsx - Send OTP
```javascript
const response = await fetch('http://localhost:5001/api/auth/send-otp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mobile: mobileNumber,
  }),
});
```

### OTPVerification.jsx - Verify OTP
```javascript
const response = await fetch('http://localhost:5001/api/auth/verify-otp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mobile: mobileNumber,
    otp: otpValue,
  }),
});

const data = await response.json();
localStorage.setItem('authToken', data.token);
```

### Protected Routes - Use Token
```javascript
const response = await fetch('http://localhost:5001/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  },
});
```

---

## Notes

1. **OTP in Console**: When Twilio is configured, OTP is sent via SMS. Check server console for the OTP during development.
2. **Token Storage**: Store JWT token in localStorage or sessionStorage
3. **Token Expiry**: Tokens expire after 30 days
4. **CORS**: Frontend must be running on allowed origins (localhost:3000, 5173, or 5174)

---

**Status**: ✅ All endpoints are ready for testing!
