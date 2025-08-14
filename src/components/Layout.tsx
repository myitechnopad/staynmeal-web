import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { Navigate } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <main className="p-4 overflow-auto flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
