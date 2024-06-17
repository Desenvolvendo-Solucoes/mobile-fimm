import React, { useState } from "react";
import { Text, TouchableOpacity, View, } from "react-native";


import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from 'react-native-toast-message';
import { useAuth } from "src/context/AuthContext";
//COMPONENTS

import Input from "../../components/Input";
import BtnVoltar from "../../components/BtnVoltar";



const EsqueceuSenha: React.FC = () => {
  const [matricula, setMatricula] = useState<string>()
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const { onSolicitaResetSenha } = useAuth()

  const validaMatricula = async ()=>{
    onSolicitaResetSenha(matricula).then((result)=>{
      console.log(result);
      
      if(result ===true){
        navigation.navigate('Verificacao',{matricula: matricula })
      }
    }).catch((err) => {
      switch (err.msg.status) {
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

    
  }



  return (
    <View className="flex flex-1 justify-center items-center  p-6" >
      <View className="absolute left-5 top-20"> 
      <BtnVoltar page={'Login'}/>
      </View>
      <View className="items-start mt-16">
        <Text className="text-primary font-bold text-2xl mt-14">Resetar Senha</Text>
        <Text className="text-subtitulo mt-2 mb-10" >Insira sua Matrícula para enviarmos um código vinculado ao seu e-mail.</Text>
      </View>
      <View className="mt-24">
      <Input value={matricula} setValue={setMatricula} placeholder="Matrícula" matricula={true}/>
      </View>
      <TouchableOpacity 
      className="justify-center w-80 h-14 bg-primary rounded-full mt-2 items-center"
      onPress={()=>validaMatricula()}>
        <Text className="text-white font-bold">Avançar</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  )
}

export default EsqueceuSenha