import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'


interface AuthProp {
  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (email: string, password: string) => Promise<any>
  onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
  onGetEpiSolicitacoes?: () => Promise<any>
  onGetEquipamentoSolicitacoes?: () => Promise<any>
  onGetUserHolerites?: () => Promise<string[]>
  onGetHoleriteFile?: (mes: string, ano: string) => Promise<any>
  onPrimeiroAcesso?: (cpf: string, matricula: string, email: string, senha: string) => Promise<any>
  onGetUsersCadastrado?: (cpf: string, matricula: string) => Promise<any>
  onSolicitaResetSenha?: (matricula: string) => Promise<any>
  onValidaResetCode?: (matricula: string, code: string) => Promise<any>
  onResetSenha?: (matricula: string, senha: string, code: string) => Promise<any>
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'http://192.168.1.105:3000'
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

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
      const result = await axios.post(`${API_URL}/auth/loginmobile`, null, { params: { email, senha } })

      setAuthState({
        token: result.data.access_token,
        authenticated: true
      })

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token)

      return result

    } catch (e) {
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

  const getUserData = async (email: string) => {

    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${API_URL}/user/getUserData`, { params: { email } })

        resolve(result.data)

      } catch (e) {


        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })


  }

  const createEpi = async (nome: string, cod: string, imagem: string, problemas: []) => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.put(`${API_URL}/epi/create`, null, { params: { nome, cod, imagem, problemas } })

        resolve(result.data)

      } catch (e) {


        reject({ error: true, msg: (e as any).response.data.msg })
      }


    })


  }

  const updateEpi = async (nome: string, cod: string, imagem: string, problemas: []) => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/epi/update`, null, { params: { nome, cod, imagem, problemas } })

        resolve(result.data)

      } catch (e) {


        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })



  }

  const solicitaEpi = async (nome: string, dataSolicitacao: string, foto: string, problemas: string, uid: string) => {


    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/epi/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas, uid } })

        resolve(result.data)

      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })


  }

  const getEpiCadastrados = async () => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/epi/cadastrados`,)

        resolve(result.data)

      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })



  }

  const solicitaEquipamento = async (nome: string, dataSolicitacao: string, foto: string, problemas: string, uid: string) => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/equip/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas, uid } })

        resolve(result.data)

      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })


  }

  const getEquipamentoSolicitacoes = async () => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/equip/solicitacoes`,)

        resolve(result.data)

      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })

      }

    })


  }

  const getUserHolerites = async (): Promise<string[]> => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/holerite/getUserHolerites`,)
        console.log(result);

        resolve(result.data)

      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

  }

  const getHoleriteFile = async (mes: string, ano: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${API_URL}/holerite/file`, {
          params: { mes: mes, ano: ano }
        })

        resolve(result.data);

      } catch (e) {

        reject({ error: (e as any).response.data.error, code: (e as any).response.data.code })
      }

    })
  }

  const primeiroAcesso = async (cpf: string, matricula: string, email: string, senha: string) => {

    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/user/primeiroAcesso`, null, { params: { cpf, matricula, email, senha } })
        resolve(result.data)

      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }

    })


  }

  const getUsersCadastrado = async (cpf: string, matricula: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(`${API_URL}/user/cadastrado`, {
          params: { cpf: cpf, matricula: matricula }
        })
        resolve(result.data);

      } catch (e) {

        reject({ error: (e as any).response.data.error, code: (e as any).response.data.code })
      }

    })
  }

  const solicitaResetSenha = async (matricula: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/auth/solicitaResetSenha`, null, { params: { matricula } })
        resolve(result.data)

      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }

    })
  }

  const validaResetCode = async (matricula: string, code: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/auth/validaResetCode`, null, { params: { matricula, code } })
        resolve(result.data)

      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }

    })

  }

  const resetSenha = async (matricula: string, code: string, senha: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/auth/resetSenha`, null, { params: { matricula, code, senha } })
        resolve(result.data)

      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }

    })

  }



  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onGetUserData: getUserData,
    onCreateEpi: createEpi,
    onUpdateEpi: updateEpi,
    onSolicitaEpi: solicitaEpi,
    onGetEpiCadastrados: getEpiCadastrados,
    onSolicitaEquipamento: solicitaEquipamento,
    onGetEquipamentoSolicitacoes: getEquipamentoSolicitacoes,
    onGetUserHolerites: getUserHolerites,
    onGetHoleriteFile: getHoleriteFile,
    onPrimeiroAcesso: primeiroAcesso,
    onGetUsersCadastrado: getUsersCadastrado,
    onSolicitaResetSenha: solicitaResetSenha,
    onValidaResetCode: validaResetCode,
    onResetSenha: resetSenha,
    authState: authState,
  }

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}