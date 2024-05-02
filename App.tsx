/// <reference types="nativewind/types" />
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext'
import Routes from "./src/routes";
import { Text } from 'react-native'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}