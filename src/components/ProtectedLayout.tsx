// ProtectedLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';


export default function ProtectedLayout() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Sidebar />
    </div>
  );
}
