import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { string } from 'prop-types';

interface AuthProp {
  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (email: string, password: string) => Promise<any>
  onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'https://fimm-api.8corp.com.br'
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
  const createUser = async (email: string, senha: string, nome:string, funcao:string, regiao:string, matricula:string, contrato:string) => {
    try {
      const result = await axios.put(`${API_URL}/user/create`, null, { params: { email, senha, nome, funcao, regiao, matricula, contrato } })

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
  const getUserData = async (email: string) => {
    try {
      const result = await axios.get(`${API_URL}/user/getUserData`, { params: { email } })

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
  const getUserAll = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/getAll`)

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
  const updateUser = async (email: string, senha: string, nome:string, funcao:string, regiao:string, matricula:string, contrato:string) => {
    try {
      const result = await axios.post(`${API_URL}/user/update`, null, { params: { email, senha, nome, funcao, regiao, matricula, contrato } })

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
  const createEpi = async (nome:string, cod:string, imagem:string, problemas:[]) => {
    try {
      const result = await axios.put(`${API_URL}/epi/create`, null, { params: { nome, cod, imagem, problemas } })

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
  const updateEpi = async (nome:string, cod:string, imagem:string, problemas:[]) => {
    try {
      const result = await axios.post(`${API_URL}/epi/update`, null, { params: { nome, cod, imagem, problemas } })

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
  const updateEpiStatus = async (status:string, uid:string) => {
    try {
      const result = await axios.post(`${API_URL}/epi/updatestatus`, null, { params: { status, uid } })

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
  const solicitaEpi = async (nome:string, dataSolicitacao:string, foto:string, problemas:string, uid:string) => {
    try {
      const result = await axios.post(`${API_URL}/epi/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas,uid } })

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
  const getEpiSolicitacoes = async () => {
    try {
      const result = await axios.get(`${API_URL}/epi/solicitacoes`,)

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
  const getEpiCadastrados = async () => {
    try {
      const result = await axios.get(`${API_URL}/epi/cadastrados`,)

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
  const createEquipamento = async (nome:string, cod:string, imagem:string, problemas:[]) => {
    try {
      const result = await axios.put(`${API_URL}/equip/create`, null, { params: { nome, cod, imagem, problemas } })

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
  const solicitaEquipamento = async (nome:string, dataSolicitacao:string, foto:string, problemas:string, uid:string) => {
    try {
      const result = await axios.post(`${API_URL}/equip/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas,uid } })

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
  const updateEquipamentoStatus = async (status:string, uid:string) => {
    try {
      const result = await axios.post(`${API_URL}/equip/updatestatus`, null, { params: { status, uid } })

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
  const getEquipamentoSolicitacoes = async () => {
    try {
      const result = await axios.get(`${API_URL}/equip/solicitacoes`,)

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
  const getEquipamentoCadastrados = async () => {
    try {
      const result = await axios.get(`${API_URL}/equip/cadastrados`,)

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
  const epiMassive = async () => {
    try {
      const result = await axios.post(`${API_URL}/epi/massive`,)

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

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onCreateUser: createUser,
    onGetUserData: getUserData,
    onGetUserAll: getUserAll,
    onUpdateUser: updateUser,
    onCreateEpi: createEpi,
    onUpdateEpi: updateEpi,
    onUpdateEpiStatus: updateEpiStatus,
    onSolicitaEpi: solicitaEpi,
    onGetEpiSolicitacoes: getEpiSolicitacoes,
    onGetEpiCadastrados: getEpiCadastrados,
    onCreateEquipamento: createEquipamento,
    onSolicitaEquipamento: solicitaEquipamento,
    onUpdateEquipamentoStatus: updateEquipamentoStatus,
    onGetEquipamentoSolicitacoes: getEquipamentoSolicitacoes,
    onGetEquipamentoCadastrados: getEquipamentoCadastrados,
    onEpiMassive: epiMassive,

    authState: authState,
  }

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}