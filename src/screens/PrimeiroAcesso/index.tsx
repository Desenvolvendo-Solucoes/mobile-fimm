import React, { useState } from "react";
import {  View, TouchableOpacity,Image,Text } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//COMPONENTS
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";



const PrimeiroAcesso: React.FC = () => {
  const { onPrimeiroAcesso,onGetUsersCadastrado } = useAuth()
  const [cpf, setCpf] = useState<string>()
  const [matricula, setMatricula] = useState<string>()
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

  const verificaUsuario = async () => {

    const result = await onGetUsersCadastrado!(cpf, matricula)
    if (result && result.error) {
      alert(result.msg)
    }
  }

  const voltar = () => {
    navigation.navigate('Login');
  };

  const credencial = () => {
    navigation.navigate('Credencial');
  };

  return (
    <View className="flex flex-1 justify-center items-center p-6" >
      <Image className="w-48 h-16 mb-8" source={require('../../../assets/loginImage.png')} resizeMode="stretch" />
      <Input value={matricula} setValue={setMatricula} placeholder="Matricula" />
      <Input value={cpf} setValue={setCpf} placeholder="CPF" />
      <TouchableOpacity 
      className="justify-center w-80 h-14 bg-primary rounded-full mt-10"
      onPress={verificaUsuario}
      >
        <Text className="text-center text-white font-bold">Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="justify-center w-80 h-14 border border-primary rounded-full mt-10"
        onPress={voltar}
      >
        <Text className="text-center text-primary">Já tenho acesso</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PrimeiroAcesso