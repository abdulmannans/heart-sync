import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InstagramConnectPage from './components/InstagramConnectPage';
import CreateLinkPage from './components/CreateLink';
import InstagramLoginPage from './components/Instagram';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateLinkPage />} />
        <Route path="/connect/:token" element={<InstagramConnectPage />} />
        <Route path="/instagram-login" element={<InstagramLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;