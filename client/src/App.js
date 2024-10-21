import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const CreateLink = lazy(() => import('./components/CreateLink'));
const Gift = lazy(() => import('./components/Gift'));
const InstagramLogin = lazy(() => import('./components/Instagram'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<CreateLink />} />
          <Route path="/connect/:token" element={<Gift />} />
          <Route path="/instagram-login" element={<InstagramLogin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;