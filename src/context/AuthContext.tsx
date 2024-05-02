import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

interface AuthProp {
  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (email: string, password: string) => Promise<any>
  onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'http://192.168.1.6:3000'
const AuthContext = createContext<AuthProp>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null,
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      console.log(token);

      if (token) {
        setAuthState({ token: token, authenticated: true })
      } else {
        setAuthState({ token: null, authenticated: false })
      }
    }
    loadToken()
  }, [])

  const register = async (email: string, senha: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, senha })
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg }
    }
  }

  const login = async (email: string, senha: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, null, { params: { email, senha } })

      setAuthState({
        token: result.data.access_token,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token)

      return result

    } catch (e) {
      console.log(e);

      return { error: true, msg: (e as any).response.data.msg }
    }
  }

  const logout = async () => {
    // Deleta o token do storage
    await SecureStore.deleteItemAsync(TOKEN_KEY)

    // Deleta o token do axios
    axios.defaults.headers.common['Authorization'] = '';

    // Reseta o auth state
    setAuthState({
      token: null,
      authenticated: false
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState,
  }

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}