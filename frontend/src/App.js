import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import Tasks from './Tasks/Tasks';
import LoginPanel from './Login/LoginPanel';
import RegistrationForm from './Registration/RegistrationForm'
import ErrorPage from './ErrorPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch user data or perform any other initial setup
  }, []);

  function getCurrentUser(user) {
    setCurrentUser(user);
  }

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPanel getCurrentUser={getCurrentUser} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/"
            element={currentUser ? <Navigate to="/tasks" /> : <Home />}
          />
          <Route path="/tasks" element={<Tasks/>}/>
      
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
