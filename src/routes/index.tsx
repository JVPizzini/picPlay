import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//routes
import { AppRouter } from './app.routes';
import { AuthRouters } from './auth.routes';
import { useAuth } from '../hooks/auth';

export function Routes() {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>{isAuthenticated ? <AppRouter /> : <AuthRouters />}</NavigationContainer>
  );
}
