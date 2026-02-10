// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API Helper Functions
export const api = {
    // Base fetch wrapper
    async request(endpoint, options = {}) {
        const url = `${API_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth endpoints
    auth: {
        sendOTP(mobile) {
            return api.request('/api/auth/send-otp', {
                method: 'POST',
                body: JSON.stringify({ mobile }),
            });
        },

        verifyOTP(mobile, otp) {
            return api.request('/api/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ mobile, otp }),
            });
        },

        getProfile() {
            return api.request('/api/auth/me');
        },

        updateProfile(data) {
            return api.request('/api/auth/profile', {
                method: 'PUT',
                body: JSON.stringify(data),
            });
        },

        logout() {
            return api.request('/api/auth/logout', {
                method: 'POST',
            });
        },
    },
};

// Auth helper functions
export const auth = {
    // Get stored token
    getToken() {
        return localStorage.getItem('authToken');
    },

    // Get stored user
    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Check if user is logged in
    isAuthenticated() {
        return !!this.getToken();
    },

    // Login (store token and user)
    login(token, user) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Logout (clear token and user)
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },
};

export default api;
