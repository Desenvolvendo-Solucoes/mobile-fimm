import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'

// ROTAS
import AppRoutes from './app.route'
import AuthRoutes from './auth.routes'

const Routes = () => {
  const { authState, onLogout } = useAuth()
  console.log(authState.authenticated);

  return authState?.authenticated ? <AppRoutes /> : <AuthRoutes />
}


export default Routes