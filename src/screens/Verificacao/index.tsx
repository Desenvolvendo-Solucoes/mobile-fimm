import React, { useState,useRef } from "react";
import { Text, TouchableOpacity, View,TextInput,  } from "react-native";
import Toast from 'react-native-toast-message';
import { useRoute, RouteProp } from '@react-navigation/native';


import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "src/context/AuthContext";

//COMPONENTS

import BtnVoltar from "../../components/BtnVoltar";

// Definindo a interface para o parâmetro da rota
interface RouteParams {
  matricula: string;
}
// Definindo o tipo específico para a rota
type VerificacaoRouteProp = RouteProp<{ Verificacao: RouteParams }, 'Verificacao'>;

const Verificacao: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const [code1, setCode1] = useState(['', '', '', '']);

  const textInputRefs = useRef([]);
  const route = useRoute<VerificacaoRouteProp>();
  const {matricula} = route.params;
  const { onValidaResetCode } = useAuth()



  const handleInputChange = (index, value) => {
    const newCode = [...code1];
    
    newCode[index] = value;

    setCode1(newCode);
        // Move focus to the next TextInput if available
        const nextIndex = index + 1;
        if (nextIndex < textInputRefs.current.length) {
          textInputRefs.current[nextIndex].focus();
        }

  };

  const ValidaResetCode = async () => {
    setCode1(code1.map(item => item.replace(/\s/g, '')))
    const code = code1.join('')
    console.log(code);
    
    onValidaResetCode(matricula,code).then((result)=>{
      console.log(result);
      
      if(result ===true){
        navigation.navigate('AlterarSenha',{matricula, code})
      }
    }).catch((err) => {
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
  } 

  return (
    <View className="flex flex-1 justify-start items-center p-6">
      <View className="absolute left-5 top-20"> 
      <BtnVoltar page={'EsqueceuSenha'}/>
      </View>
      <View className="items-start mt-16">
        <Text className="text-primary font-bold text-2xl mt-14">Verificacao</Text>
        <Text 
        className="text-subtitulo mt-2 mb-10"
        >Foi enviado um código de verificação para o e-mail <Text className="font-bold">exe****@gmai***.</Text></Text>
      <View 
      className="flex-row justify-center items-center w-full mt-24"     >
        {code1.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (textInputRefs.current[index] = ref)}
            className="w-12 h-12 mr-8 border-b-2 border-primary text-primary text-center font-bold"
            value={digit}
            onChangeText={(text) => handleInputChange(index, text)}
            keyboardType="numeric"
            maxLength={1}
            onSubmitEditing={() => {
              // Move focus to the next TextInput if available
              const nextIndex = index + 1;
              if (nextIndex < textInputRefs.current.length) {
                textInputRefs.current[nextIndex].focus();
              }
            }}
          />
        ))}
      </View>
      <Text className="mt-4 p-2">Não recebi o código. <Text className="font-bold text-primary" onPress={()=>{}}>Reenviar</Text></Text>
      <TouchableOpacity 
      className="justify-center w-80 h-14 bg-primary rounded-full mt-10 items-center"
      onPress={()=>{ ValidaResetCode()}}>
        <Text className="text-white font-bold">Confirmar código</Text>
      </TouchableOpacity>
      <Toast />
    </View>
    </View>
  )
}

export default Verificacao