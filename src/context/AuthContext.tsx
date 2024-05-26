import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'


interface AuthProp {
  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (email: string, password: string) => Promise<any>
  onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
  onGetUserAll?: () => Promise<any>
  onGetEpiSolicitacoes?: () => Promise<any>
  onGetEquipamentoSolicitacoes?: () => Promise<any>
  onGetUserHolerites?: () => Promise<string[]>

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
//    try {
//      const result = await axios.post(`${API_URL}/auth/login`, null, { params: { email, senha } })

  //    setAuthState({
 //       token: result.data.access_token,
 //       authenticated: true
//      })

  //    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`

    //  await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token)

    //  return result

   // } catch (e) {
   //   console.log(e);

    //  return { error: true, msg: (e as any).response.data.msg }
   // }
   setAuthState({
    token: '',
    authenticated: true})
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
    
    return new Promise(async(resolve, reject) => {
      try {
        const result = await axios.put(`${API_URL}/user/create`, null, { params: { email, senha, nome, funcao, regiao, matricula, contrato } })
  
        resolve(result.data)
        
      } catch (e) {
        
        reject({ error: true, msg: (e as any).response.data.msg })
      }
    })
  }
  const getUserData = async (email: string) => {

    return new Promise(async(resolve, reject) => {
      try {
        const result = await axios.get(`${API_URL}/user/getUserData`, { params: { email } })
  
        resolve(result.data)
      
      } catch (e) {
        
  
        reject({ error: true, msg: (e as any).response.data.msg }) 
      }

    })

    
  }
  const getUserAll = async () => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/user/getAll`)
  
        resolve(result.data)
  
      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

  }
  const updateUser = async (email: string, senha: string, nome:string, funcao:string, regiao:string, matricula:string, contrato:string) => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/user/update`, null, { params: { email, senha, nome, funcao, regiao, matricula, contrato } })
        
        resolve(result.data)
  
      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })


    
  }
  const createEpi = async (nome:string, cod:string, imagem:string, problemas:[]) => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.put(`${API_URL}/epi/create`, null, { params: { nome, cod, imagem, problemas } })
  
        resolve(result.data)
  
      } catch (e) {

  
        reject({ error: true, msg: (e as any).response.data.msg })
      }


    })

    
  }
  const updateEpi = async (nome:string, cod:string, imagem:string, problemas:[]) => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/epi/update`, null, { params: { nome, cod, imagem, problemas } })
  
        resolve(result.data)
  
      } catch (e) {
        
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })


    
  }
  const updateEpiStatus = async (status:string, uid:string) => {


    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/epi/updatestatus`, null, { params: { status, uid } })
  
        resolve(result.data)
  
      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

    
  }
  const solicitaEpi = async (nome:string, dataSolicitacao:string, foto:string, problemas:string, uid:string) => {


    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/epi/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas,uid } })
  
        resolve(result.data)
  
      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

    
  }
  const getEpiSolicitacoes = async () => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/epi/solicitacoes`,)
  
        resolve(result.data)
  
      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })

      }

    })


  }
  const getEpiCadastrados = async () => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/epi/cadastrados`,)
  
        resolve(result.data)

      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })



  }
  const createEquipamento = async (nome:string, cod:string, imagem:string, problemas:[]) => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.put(`${API_URL}/equip/create`, null, { params: { nome, cod, imagem, problemas } })
  
        resolve(result.data)

      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

    
  }
  const solicitaEquipamento = async (nome:string, dataSolicitacao:string, foto:string, problemas:string, uid:string) => {

  return new Promise(async(resolve, reject) => {

    try {
      const result = await axios.post(`${API_URL}/equip/solicita`, null, { params: { nome, dataSolicitacao, foto, problemas,uid } })

      resolve(result.data)

    } catch (e) {

      reject({ error: true, msg: (e as any).response.data.msg })
    }

})

    
  }
  const updateEquipamentoStatus = async (status:string, uid:string) => {


    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.post(`${API_URL}/equip/updatestatus`, null, { params: { status, uid } })
  
        resolve(result.data)

      } catch (e) {
        
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

    
  }
  const getEquipamentoSolicitacoes = async () => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/equip/solicitacoes`,)
  
        resolve(result.data)

      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
  
      }

    })

    
  }
  const getEquipamentoCadastrados = async () => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/equip/cadastrados`,)
  
      resolve(result.data)
  
      } catch (e) {

        reject({ error: true, msg: (e as any).response.data.msg })
  
      }

    })


    
  }
  const getUserHolerites = async () : Promise<string[]> => {

    return new Promise(async(resolve, reject) => {

      try {
        const result = await axios.get(`${API_URL}/holerites/getUserHolerites`)
  
        resolve(result.data)
  
      } catch (e) {
  
        reject({ error: true, msg: (e as any).response.data.msg })
      }

    })

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
    onGetUserHolerites: getUserHolerites,

    authState: authState,
  }

  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}