# Client-Server Integration Guide

## ✅ Integration Complete!

The client has been successfully integrated with the authentication server using environment variables.

## 📁 Files Updated

### 1. Environment Configuration
**File**: `.env`
```env
VITE_API_URL=http://localhost:5001
```

### 2. Login Modal
**File**: `src/components/Auth/LoginModal.jsx`
- ✅ Updated to use `import.meta.env.VITE_API_URL`
- ✅ Sends OTP to mobile number
- ✅ Handles errors properly

### 3. OTP Verification
**File**: `src/components/Auth/OTPVerification.jsx`
- ✅ Updated to use environment variable
- ✅ Verifies OTP with backend
- ✅ Stores JWT token in localStorage
- ✅ Stores user data in localStorage
- ✅ Resend OTP functionality

### 4. API Helper Utility (NEW)
**File**: `src/utils/api.js`
- ✅ Centralized API configuration
- ✅ Reusable fetch wrapper
- ✅ Automatic token injection
- ✅ Auth helper functions

## 🔧 Environment Variables

### Development
```env
VITE_API_URL=http://localhost:5001
```

### Production
```env
VITE_API_URL=https://your-production-api.com
```

**Note**: Vite requires the `VITE_` prefix for environment variables to be accessible in the client code.

## 🚀 Usage

### Using Direct Fetch (Current Implementation)
```javascript
// Send OTP
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mobile: '9876543210' })
});
```

### Using API Helper (Recommended)
```javascript
import { api, auth } from '@/utils/api';

// Send OTP
try {
  const data = await api.auth.sendOTP('9876543210');
  console.log('OTP sent:', data);
} catch (error) {
  console.error('Error:', error.message);
}

// Verify OTP
try {
  const data = await api.auth.verifyOTP('9876543210', '123456');
  auth.login(data.token, data.user);
  console.log('Logged in:', data.user);
} catch (error) {
  console.error('Error:', error.message);
}

// Get user profile
try {
  const data = await api.auth.getProfile();
  console.log('Profile:', data.user);
} catch (error) {
  console.error('Error:', error.message);
}

// Update profile
try {
  const data = await api.auth.updateProfile({
    name: 'John Doe',
    email: 'john@example.com'
  });
  console.log('Updated:', data.user);
} catch (error) {
  console.error('Error:', error.message);
}

// Logout
auth.logout();
```

## 🔐 Authentication Flow

### 1. User Login
```
User enters mobile → Send OTP → User enters OTP → Verify OTP → Store token & user
```

### 2. Token Storage
```javascript
// After successful OTP verification
localStorage.setItem('authToken', data.token);
localStorage.setItem('user', JSON.stringify(data.user));
```

### 3. Using Token in Requests
```javascript
// Manual approach
const token = localStorage.getItem('authToken');
fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Using API helper (automatic)
const data = await api.auth.getProfile(); // Token added automatically
```

### 4. Check Authentication Status
```javascript
import { auth } from '@/utils/api';

if (auth.isAuthenticated()) {
  const user = auth.getUser();
  console.log('Logged in as:', user.name);
} else {
  console.log('Not logged in');
}
```

## 📡 Available API Endpoints

### Public Endpoints
- `POST /api/auth/send-otp` - Send OTP to mobile
- `POST /api/auth/verify-otp` - Verify OTP and login

### Protected Endpoints (Require Token)
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

## 🧪 Testing

### 1. Start the Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5001`

### 2. Start the Client
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173` (or 5174)

### 3. Test Login Flow
1. Click "Login" button in navbar
2. Enter mobile number (e.g., 9876543210)
3. Click "Send OTP"
4. Check server console for OTP (e.g., `📱 OTP for 9876543210: 123456`)
5. Enter the OTP
6. Click "Verify & Login"
7. Check browser console for success message
8. Check localStorage for `authToken` and `user`

## 🔍 Debugging

### Check Environment Variable
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
// Should output: http://localhost:5001
```

### Check Token Storage
```javascript
console.log('Token:', localStorage.getItem('authToken'));
console.log('User:', localStorage.getItem('user'));
```

### Network Errors
- **CORS Error**: Make sure server CORS is configured for your client URL
- **Connection Refused**: Make sure server is running on port 5001
- **404 Not Found**: Check API endpoint URLs

## 🎯 Next Steps

### Optional: Refactor to Use API Helper
You can optionally refactor `LoginModal.jsx` and `OTPVerification.jsx` to use the API helper:

```javascript
// Instead of:
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, ...);

// Use:
import { api } from '@/utils/api';
const data = await api.auth.sendOTP(mobileNumber);
```

### Add Protected Routes
Create a wrapper component to protect routes that require authentication:

```javascript
import { Navigate } from 'react-router-dom';
import { auth } from '@/utils/api';

const ProtectedRoute = ({ children }) => {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
```

### Add User Context
Create a React context to manage user state globally:

```javascript
import { createContext, useState, useEffect } from 'react';
import { auth } from '@/utils/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(auth.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());

  const login = (token, userData) => {
    auth.login(token, userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

## 📝 Summary

✅ **Environment variables configured**  
✅ **LoginModal integrated with backend**  
✅ **OTPVerification integrated with backend**  
✅ **API helper utility created**  
✅ **Token management implemented**  
✅ **Ready for production deployment**

---

**Integration Status**: ✅ Complete and Ready!
