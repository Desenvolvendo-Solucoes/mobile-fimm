import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//COMPONENTS
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";



const PrimeiroAcesso: React.FC = () => {
  const { onGetUsersCadastrado } = useAuth()
  const [cpf, setCpf] = useState<string>()
  const [matricula, setMatricula] = useState<string>()
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

  const verificaUsuario = async () => {

    onGetUsersCadastrado(cpf, matricula).then((result) => {

      if (result.cadastrado === false) {
        navigation.navigate('Credencial', { cpf: cpf, matricula: matricula });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Funcionario ja fez o primeiro acesso',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 60,
          bottomOffset: 30,
        })
        // navigation.navigate('Login');
      }
    }).catch((err) => {
      switch (err.code) {
        case 404:
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Funcionario nao cadastrado',
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

  const voltar = () => {
    navigation.navigate('Login');
  };


  return (
    <View className="flex flex-1 justify-center items-center p-6" >
      <Image className="w-48 h-16 mb-8" source={require('../../../assets/loginImage.png')} resizeMode="stretch" />
      <Input value={matricula} setValue={setMatricula} placeholder="Matricula" matricula={true}/>
      <Input value={cpf} setValue={setCpf} placeholder="CPF" cpf={true} />
      <TouchableOpacity
        className="justify-center w-80 h-14 bg-primary rounded-full mt-10"
        onPress={verificaUsuario}
      >
        <Text className="text-center text-white font-bold">Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="justify-center w-80 h-14 border border-primary rounded-full mt-10"
        // onPress={voltar}
        onPress={voltar}
      >
        <Text className="text-center text-primary">Já tenho acesso</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  )
}

export default PrimeiroAcesso