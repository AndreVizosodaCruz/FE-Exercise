import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { FC } from "react";

const withAuth = (
  Component: ComponentType
): FC => {
  const WrappedComponent: FC = (props) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" state={"notAuthenticated"} />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuth;