import React, { useState } from "react";
import { Text, TouchableOpacity, View, } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BtnVoltar from "../../components/BtnVoltar";

//COMPONENTS

import Input from "../../components/Input";


const AlterarSenha: React.FC = () => {
  const [senha, setSenha] = useState<string>()
  const [repitaSenha, setRepitaSenha] = useState<string>()
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

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
      onPress={()=>{ navigation.navigate('SenhaRedefinida')}}>
        <Text className="text-white font-bold">Redefinir Senha</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AlterarSenha