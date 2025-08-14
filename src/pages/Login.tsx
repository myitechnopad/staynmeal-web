import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOtpLogin } from '../hooks/useOtpLogin';

const Login = () => {
  const {
    email, setEmail,
    otp, setOtp,
    otpSent,
    message,
    resendTimer,
    sendOtp,
    verifyOtp
  } = useOtpLogin();

  const navigate = useNavigate();

  const handleVerify = async () => {
    const isValid = await verifyOtp();
    if (isValid) {
      const flashMessage = 'Logged in successfully';
      const loggedState = { flash: flashMessage };
      // Optionally, you can store the email in state or context if needed
      //navigate('/dashboard', { state: { email } });
      navigate('/dashboard', {state: loggedState});
    }else {
      alert('OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Login via OTP</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={sendOtp}
          disabled={resendTimer > 0}
          className={`w-full py-2 text-white rounded-lg font-semibold transition ${
            resendTimer > 0
              ? 'bg-green-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
        </button>

        {otpSent && (
          <>
            <label className="block mt-6 mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleVerify}
              className="w-full py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Verify & Login
            </button>
          </>
        )}

        {message && (
          <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
