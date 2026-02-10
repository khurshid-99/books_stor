import { useState } from 'react';
import OTPVerification from './OTPVerification';
import { api } from '../../utils/api';

const LoginModal = ({ isOpen, onClose }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate mobile number (Indian format: 10 digits starting with 6-9)
        const mobileRegex = /^[6-9][0-9]{9}$/;
        if (!mobileRegex.test(mobileNumber)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        try {
            const data = await api.auth.sendOTP(mobileNumber);
            console.log('OTP sent successfully:', data);
            setShowOTP(true);
        } catch (error) {
            setError(error.message || 'Failed to send OTP. Please try again.');
            console.error('OTP send error:', error);
        }
    };

    const handleOTPVerified = () => {
        // TODO: Handle successful login
        console.log('Login successful!');
        onClose();
        // Reset states
        setMobileNumber('');
        setShowOTP(false);
    };

    const handleBackToMobile = () => {
        setShowOTP(false);
        setError('');
    };

    const handleClose = () => {
        setMobileNumber('');
        setShowOTP(false);
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md mx-4 overflow-hidden animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8">
                    {!showOTP ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange to-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-poppins-bold text-rich-black mb-2">Welcome Back!</h2>
                                <p className="text-gray-600 font-poppins-regular text-sm">Login with your mobile number</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-poppins-medium text-gray-700 mb-2">
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-poppins-medium">+91</span>
                                        </div>
                                        <input
                                            id="mobile"
                                            type="tel"
                                            value={mobileNumber}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                if (value.length <= 10) {
                                                    setMobileNumber(value);
                                                    setError('');
                                                }
                                            }}
                                            placeholder="9XXXXXXXXX"
                                            className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl font-poppins-regular text-gray-900 placeholder:text-gray-400 focus:border-orange focus:outline-none transition-colors"
                                            maxLength={10}
                                        />
                                    </div>
                                    {error && (
                                        <p className="mt-2 text-sm text-red-500 font-poppins-regular flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange to-orange-light text-white py-3 rounded-xl font-poppins-semibold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    Send OTP
                                </button>
                            </form>

                            {/* Footer */}
                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-500 font-poppins-regular">
                                    By continuing, you agree to our{' '}
                                    <a href="#" className="text-orange hover:underline">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-orange hover:underline">Privacy Policy</a>
                                </p>
                            </div>
                        </>
                    ) : (
                        <OTPVerification
                            mobileNumber={mobileNumber}
                            onVerified={handleOTPVerified}
                            onBack={handleBackToMobile}
                        />
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
        </div>
    );
};

export default LoginModal;
