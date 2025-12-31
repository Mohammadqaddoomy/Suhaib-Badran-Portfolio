import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import MyWorks from './components/MyWorks';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';
import Login from './admin/pages/Login';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Folders from './admin/pages/Folders';
import Videos from './admin/pages/Videos';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Portfolio Page Component
function PortfolioPage({ setLightboxVideo }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <MyWorks setLightboxVideo={setLightboxVideo} />
      <Contact />
    </div>
  );
}

function App() {
  const [lightboxVideo, setLightboxVideo] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Portfolio Routes */}
          <Route path="/" element={<PortfolioPage setLightboxVideo={setLightboxVideo} />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="folders" element={<Folders />} />
            <Route path="videos/:folderId" element={<Videos />} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Lightbox */}
        <Lightbox 
          videoSrc={lightboxVideo} 
          onClose={() => setLightboxVideo(null)} 
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
