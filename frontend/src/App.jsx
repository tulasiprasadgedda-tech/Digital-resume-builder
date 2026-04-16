import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import PublicResume from './pages/PublicResume';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors duration-300">
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/public/:publicId" element={<PublicResume />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/builder/:id" element={
                  <ProtectedRoute>
                    <Builder />
                  </ProtectedRoute>
                } />
              </Routes>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    border: '1px solid var(--color-border)'
                  },
                  success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
                  error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
                }}
              />
            </div>
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
