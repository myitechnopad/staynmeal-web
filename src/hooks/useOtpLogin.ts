import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

export function useOtpLogin() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const { login } = useAuth(); // ✅ Import login from AuthContext
  const auth = useAuth();
  if (!auth) throw new Error("AuthContext not found");

  const { user, setAccessToken } = auth;

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const sendOtp = async () => {
    try {
      const res = await api.post('/send-otp', { email });
      setOtpSent(true);
      setResendTimer(60);
      setMessage(res.data.message);
    } catch (err: any) {
      setOtpSent(true);
      setMessage(err.response?.data?.message || 'Error sending OTP.');
    }
  };

  const verifyOtp = async (): Promise<boolean> => {
    try {
      const res = await api.post('/verify-otp', { email, otp });
      const { access_token } = res.data;
      //setAccessToken(access_token);
      login(access_token); // ✅ This handles setting token + user + auth state
      return true;
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error verifying OTP.');
      return false;
    }
  };

  return {
    email, setEmail,
    otp, setOtp,
    otpSent,
    message,
    resendTimer,
    sendOtp,
    verifyOtp
  };
}
