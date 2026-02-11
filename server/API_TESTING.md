# Books Store - API Testing Documentation

This document provides a comprehensive guide to testing the authentication and user management API endpoints for the Books Store application.

## 🚀 Getting Started

### Prerequisites
- **Backend Server**: Ensure it's running on `http://localhost:5001`.
- **Database**: MongoDB should be active (Local or Atlas).
- **Environment**: `.env` file must be correctly configured in the `server` directory.

---

## 🔐 Authentication Flow

### 1. Send OTP
Initial step to request a verification code sent to a mobile number.

**Endpoint:** `POST /api/auth/send-otp`  
**Body:**
```json
{
  "mobile": "9876543210"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9876543210"}'
```

**PowerShell Command:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5001/api/auth/send-otp" -Method POST -ContentType "application/json" -Body '{"mobile":"9876543210"}'
```

---

### 2. Verify OTP & Login
Verify the received code and retrieve an authentication token.

**Endpoint:** `POST /api/auth/verify-otp`  
**Body:**
```json
{
  "mobile": "9876543210",
  "otp": "123456"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"9876543210","otp":"123456"}'
```

**Success Response Snippet:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": { "id": "...", "mobile": "9876543210", "isPremium": false }
}
```

---

## 👤 User Profile Management

*All endpoints below require the `Authorization` header with the Bearer token.*

### 3. Get Current User Profile
Fetch details of the currently logged-in user.

**Endpoint:** `GET /api/auth/me`

**Curl Command:**
```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>"
```

---

### 4. Update Profile
Update the user's name or email address.

**Endpoint:** `PUT /api/auth/profile`  
**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

**Curl Command:**
```bash
curl -X PUT http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer <YOUR_TOKEN_HERE>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com"}'
```

---

## ⚠️ Important Implementation Details

### Sparse Email Indexing
The database is configured with a **sparse unique index** on the `email` field. This means:
- Multiple users can exist without an email address (initial registration).
- If an email is provided, it **must** be unique across the entire database.

### Input Sanitization
The mobile number input automatically strips non-numeric characters and limits length to 10 digits to prevent formatting errors.

### Rate Limiting
- **Send OTP**: Limited to once every 60 seconds per IP.
- **Verification Attempts**: Users are limited to 5 attempts per OTP.

---

## 🛠️ Debugging

- **Environment Variables**: If the server fails to connect to MongoDB, ensure `MONGODB_URI` is correctly set in `server/.env`.
- **Duplicate Key Error (E11000)**: If you see this for `email_1`, it means a user is trying to set an email that already exists in the system.
- **CORS Issues**: Ensure `http://localhost:5173` is listed in the `cors` configuration in `index.js`.

---

**Last Updated**: 2026-02-11
**Status**: ✅ All Authentication and Profile modules have been updated and refactored.
