import React, { useState } from "react";
import { Text, TouchableOpacity, View, } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BtnVoltar from "../../components/BtnVoltar";
import Toast from 'react-native-toast-message';
import { useAuth } from "src/context/AuthContext";

//COMPONENTS
import Input from "../../components/Input";


interface RouteParams{
  matricula: string;
  code: string;
}

// Definindo o tipo específico para a rota
type VerificacaoRouteProp = RouteProp<{ AlterarSenha: RouteParams }, 'AlterarSenha'>;

const AlterarSenha: React.FC = () => {
  const [senha, setSenha] = useState<string>()
  const [repitaSenha, setRepitaSenha] = useState<string>()
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const {onResetSenha} = useAuth()
  const route = useRoute<VerificacaoRouteProp>();
  const {matricula,code} = route.params;

  function sleep(ms:any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

const ResetSenha = async () => {
  if(senha === repitaSenha){
    onResetSenha(matricula,code,senha).then(async() =>{
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Senha alterada com sucesso',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      await sleep(1500)
      navigation.navigate('Login')
    }).catch((err) => {
      console.log(code);
      
      switch (err.msg.status) {
        case 401:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Código inválido',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
            bottomOffset: 30,
          })
          break;
          case 404:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Matricula nao encontrada',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
            bottomOffset: 30,
          })
          break;
        default:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Erro não identificado',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
            bottomOffset: 30,
          })
          break;
      }
    })
    
  }else{
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'A senhas não são iguais',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 30,
    })
  }
}



  return (
    <View className="flex flex-1 justify-start items-center  p-6" >
      <View className="absolute left-5 top-20"> 
      <BtnVoltar page={'Verificacao'}/>
      </View>
      <View className="items-start w-full mt-12">
        <Text className="text-primary font-bold text-2xl mt-14">Altere sua senha</Text>
        <Text className="text-subtitulo mt-2 mb-10" >Redefina sua senha abaixo.</Text>
      </View>
      <View className="mt-12">
      <Input value={senha} setValue={setSenha} placeholder="Senha" password />
      <Input value={repitaSenha} setValue={setRepitaSenha} placeholder="Repetir Senha" password />
      </View>
      <TouchableOpacity 
      className="justify-center w-80 h-14 bg-primary rounded-full mt-2 items-center "
      onPress={()=>ResetSenha()}>
        <Text className="text-white font-bold">Redefinir Senha</Text>
      </TouchableOpacity>
      <Toast/>
    </View>
  )
}

export default AlterarSenha