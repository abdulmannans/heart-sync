import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const CreateLinkPage = lazy(() => import('./components/CreateLink'));
const InstagramConnectPage = lazy(() => import('./components/InstagramConnectPage'));
const InstagramLoginPage = lazy(() => import('./components/Instagram'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<CreateLinkPage />} />
          <Route path="/connect/:token" element={<InstagramConnectPage />} />
          <Route path="/instagram-login" element={<InstagramLoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;