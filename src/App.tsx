import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import FlashMessage from './components/FlashMessage';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import ListService from './pages/ListService';
import Seekers from './pages/seekers';
import Contact from './pages/Contact';
import SupportPage from './pages/SupportPage';
import PricingPage from './pages/PricingPage';
import BlogList from './components/BlogList';
import BlogDetail from './pages/BlogDetail';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import PublicLayout from './components/PublicLayout';
import ProtectedLayout from './components/ProtectedLayout';
import { SidebarProvider } from './contexts/SidebarContext';
import UserProfile from './pages/UserProfile';
import ScrollToTop from './components/ScrollToTop';
function App() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  if (isAuthLoading) return <div>Loading...</div>; // Or a loader/spinner
  console.log('App rendered, isAuthenticated:', isAuthenticated);
  //if (isAuthLoading) return <div>Loading...</div>; // Or a loader/spinner
  return (
    <SidebarProvider>
      <FlashMessage />
      <ScrollToTop />
      <Routes>
        {/* Public layout routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list-service" element={<ListService />} />
          <Route path="/seekers" element={<Seekers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Route>

        {/* Protected layout routes */}
        <Route
          element={
            isAuthenticated ? <ProtectedLayout /> : <Navigate to="/" replace />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SidebarProvider>
  );
}
export default App;
