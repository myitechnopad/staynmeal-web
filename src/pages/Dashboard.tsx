import React, { use } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from "@/hooks/useUserProfile";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { user, loading,refetch } = useUserProfile();
  const email = (location.state as { email?: string })?.email;
  const auth = useAuth();
  const uemail = auth?.user?.sub;
  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!user) return <div className="text-center p-6 text-red-500">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-green-700 mb-4">Welcome to Your Dashboard</h1>
            {auth?.user && (
            <div>Welcome, {auth.user.sub}
            <div>Login Email: {uemail}</div>
            </div>
            )}          

          <p className="mt-2 text-sm text-gray-500">
            This is a placeholder dashboard. You can customize it with your listings, bookings,
            analytics, and more in the future.
          </p>

          <div className="mt-6">
            <div className="bg-green-100 border border-green-300 rounded-md p-4">
              <p className="text-green-800 text-sm">
                🚀 Tip: Use this space to showcase quick stats, recent activity, or navigation links.
              </p>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
              onClick={() => alert('Logging out soon...')}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
