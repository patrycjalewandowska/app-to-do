import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element: Element, currentUser }) => {
  return (
    <Route
      path={path}
      element={currentUser ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
