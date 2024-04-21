import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import VideoBackground from './components/video/VideoBackground';
import Slogan from './components/slogan/Slogan';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './routes/PrivateRoute';
import MyPage from './components/auth/MyPage';
import PasswordEntry from './components/auth/PasswordEntry';
import Nearby from './components/nearby/Nearby';

function App() {
  const isAuthenticated = true; 

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <VideoBackground />
      <Slogan />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
        <Route path="/mypage" element={<PrivateRoute element={<PasswordEntry />} isAuthenticated={isAuthenticated} />} />
        <Route path="/userinfo" element={<PrivateRoute element={<MyPage />} isAuthenticated={isAuthenticated} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
