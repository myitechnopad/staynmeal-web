import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  withCredentials: true, // ✅ important for sending cookies
});

// ✅ Attach access token to all requests
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if (userId) {
    config.headers['X-User-ID'] = userId;
  }

  return config;
});

// 🔁 Refresh access token using cookie
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/token/refresh-token`,
          {},
          {
            withCredentials: true, // ✅ cookie sent to backend
          }
        );

        const newAccessToken = refreshRes.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        console.error('Token refresh Issued:', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // 🔁 retry original request
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        // Optional: redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
