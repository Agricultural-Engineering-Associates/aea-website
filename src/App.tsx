import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/layout/ScrollToTop';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Staff from './pages/Staff';
import About from './pages/About';
import Contact from './pages/Contact';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PageContentManager from './pages/admin/PageContent';
import StaffManagement from './pages/admin/StaffManagement';
import ProjectManagement from './pages/admin/ProjectManagement';
import Settings from './pages/admin/Settings';
import ContactSubmissions from './pages/admin/ContactSubmissions';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="pages" element={<PageContentManager />} />
              <Route path="staff" element={<StaffManagement />} />
              <Route path="projects" element={<ProjectManagement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="contacts" element={<ContactSubmissions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
