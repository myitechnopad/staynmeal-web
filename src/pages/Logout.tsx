import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        // Optional: Inform backend to clear the refresh token cookie
        await axios.post('/logout');

        // Clear access token using AuthContext
        if (auth) {
          auth.setAccessToken(null); // this clears state and localStorage
        }

        // Navigate to home
        //navigate('/');
        navigate('/', { state: { flash: 'Logged out successfully' } });
      } catch (error) {
        console.error('Logout failed:', error);
        //navigate('/');
        navigate('/', { state: { flash: 'Logout failed' } });
      }
    };

    logout();
  }, [navigate, auth]);

  return null;
};

export default Logout;
