import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import * as Location from 'expo-location'

interface AuthProp {

  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (email: string, password: string) => Promise<any>
  onLogin?: (email: string, password: string, coords: Location.LocationObjectCoords) => Promise<any>
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
  validatToken?: () => Promise<unknown>
  loadToken?: () => Promise<void>
}

const TOKEN_KEY = 'my-jwt'
const instance = axios.create({
  baseURL: "https://fimm-api.8corp.com.br"
});

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

  const loadToken = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      validaToken().then((res: any) => {

        if (res.statusCode === 401) {
          setAuthState({ token: null, authenticated: false })
        } else {
          setAuthState({ token: token, authenticated: true })
        }
      }).catch((e) => {
        setAuthState({ token: null, authenticated: false })
      })
    } else {
      setAuthState({ token: null, authenticated: false })
    }
  }

  useEffect(() => {


  }, [])

  const register = async (email: string, senha: string) => {
    try {
      return await instance.post('users', { email, senha })
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg }
    }
  }

  const login = async (email: string, senha: string, coords: Location.LocationObjectCoords) => {
    try {
      const result = await instance.post(`/auth/loginmobile`, null, { params: { email, senha, coords } })

      setAuthState({
        token: result.data.access_token,
        authenticated: true
      })
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`
      loadToken()

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
        const result = await instance.get(`/user/getUserData`, { params: { email } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const createEpi = async (nome: string, cod: string, imagem: string, problemas: []) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.put(`/epi/create`, null, { params: { nome, cod, imagem, problemas } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const updateEpi = async (nome: string, cod: string, imagem: string, problemas: []) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.post(`/epi/update`, null, { params: { nome, cod, imagem, problemas } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const solicitaEpi = async (nome: string, dataSolicitacao: string, foto: string, problemas: string, uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.post(`/epi/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas, uid } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const getEpiCadastrados = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.get(`/epi/cadastrados`,)
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const solicitaEquipamento = async (nome: string, dataSolicitacao: string, foto: string, problemas: string, uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.post(`/equip/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas, uid } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const getEquipamentoSolicitacoes = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.get(`/equip/solicitacoes`,)
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const getUserHolerites = async (): Promise<string[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.get(`/holerite/getUserHolerites`,)
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }

  const getHoleriteFile = async (mes: string, ano: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)

        const result = await instance.get(`/holerite/file`, {
          params: { mes: mes, ano: ano }, headers: { 'Authorization': 'Bearer ' + token }
        })
        resolve(result.data);
      } catch (e) {
        console.error(e)
        reject({ error: (e as any).response.data.error, code: (e as any).response.data.code })
      }
    })
  }

  const primeiroAcesso = async (cpf: string, matricula: string, email: string, senha: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.post(`/user/primeiroAcesso`, null, { params: { cpf, matricula, email, senha } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }
    })
  }

  const getUsersCadastrado = async (cpf: string, matricula: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.get(`/user/cadastrado`, {
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
        const result = await instance.post(`/auth/solicitaResetSenha`, null, { params: { matricula } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }
    })
  }

  const validaResetCode = async (matricula: string, code: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.post(`/auth/validaResetCode`, null, { params: { matricula, code } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }
    })
  }

  const resetSenha = async (matricula: string, code: string, senha: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await instance.post(`/auth/resetSenha`, null, { params: { matricula, code, senha } })
        resolve(result.data)
      } catch (e) {
        reject({ error: true, msg: (e as any).response })
      }
    })
  }

  const validaToken = async () => {

    return new Promise(async (resolve, reject) => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        instance.get('/', {
          validateStatus: (status) => {
            return status < 500
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((result) => {
          resolve(result.data)
        }).catch(e => {
          reject({ error: true, msg: (e as any).message })
        })

      } catch (e) {
        reject({ error: true, msg: (e as any).response.data })
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
    validatToken: validaToken,
    loadToken: loadToken
  }

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}