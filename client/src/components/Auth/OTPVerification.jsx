import { useState, useRef, useEffect } from 'react';
import { api, auth } from '../../utils/api';

const OTPVerification = ({ mobileNumber, onVerified, onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all fields are filled
        if (newOtp.every(digit => digit !== '') && index === 5) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus last filled input or verify if complete
        const lastFilledIndex = Math.min(pastedData.length - 1, 5);
        inputRefs.current[lastFilledIndex]?.focus();

        if (newOtp.every(digit => digit !== '')) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleVerify = async (otpValue) => {
        setIsVerifying(true);
        setError('');

        try {
            const data = await api.auth.verifyOTP(mobileNumber, otpValue);

            // Store authentication token
            auth.login(data.token, data.user);

            console.log('Login successful:', data);
            onVerified();
        } catch (error) {
            setError(error.message || 'Invalid OTP. Please try again.');
            setIsVerifying(false);
            console.error('OTP verification error:', error);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        try {
            const data = await api.auth.sendOTP(mobileNumber);

            console.log('OTP resent successfully:', data);
            setTimer(60);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            setError('');
            inputRefs.current[0]?.focus();
        } catch (error) {
            setError(error.message || 'Failed to resend OTP. Please try again.');
            console.error('OTP resend error:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            setError('Please enter the complete 6-digit OTP');
            return;
        }

        handleVerify(otpValue);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange to-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-poppins-bold text-rich-black mb-2">Verify OTP</h2>
                <p className="text-gray-600 font-poppins-regular text-sm">
                    We've sent a 6-digit code to
                </p>
                <p className="text-orange font-poppins-semibold text-sm mt-1">
                    +91 {mobileNumber}
                </p>
            </div>

            {/* OTP Input */}
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 text-center text-xl font-poppins-bold border-2 border-gray-200 rounded-xl focus:border-orange focus:outline-none transition-colors"
                            disabled={isVerifying}
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-sm text-red-500 font-poppins-regular text-center flex items-center justify-center gap-1 mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}

                {/* Timer and Resend */}
                <div className="text-center mb-6">
                    {!canResend ? (
                        <p className="text-sm text-gray-600 font-poppins-regular">
                            Resend OTP in{' '}
                            <span className="font-poppins-semibold text-orange">
                                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                            </span>
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-sm text-orange font-poppins-semibold hover:underline"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                {/* Verify Button */}
                <button
                    type="submit"
                    disabled={isVerifying || otp.some(digit => digit === '')}
                    className="w-full bg-gradient-to-r from-orange to-orange-light text-white py-3 rounded-xl font-poppins-semibold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isVerifying ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </span>
                    ) : (
                        'Verify & Login'
                    )}
                </button>

                {/* Back Button */}
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full mt-3 text-gray-600 py-3 rounded-xl font-poppins-medium text-sm hover:bg-gray-100 transition-colors"
                >
                    ← Change Mobile Number
                </button>
            </form>
        </div>
    );
};

export default OTPVerification;
