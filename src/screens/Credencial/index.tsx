import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BtnVoltar from "../../components/BtnVoltar";

//COMPONENTS
import Input from "../../components/Input";



const Credencial: React.FC = () => {
  const [email, setEmail] = useState<string>()
  const [senha, setSenha] = useState<string>()
  const [repitaSenha, setRepitaSenha] = useState<string>()


  return (

    <View className="flex flex-1 justify-start p-6" >
      <View className=" w-10 h-10 mt-10">
      <BtnVoltar page={'Login'}/>
      </View>
      <View className="items-start">
        <Text className="text-primary font-bold text-2xl mt-14">Dados de acesso</Text>
        <Text className="text-subtitulo mt-2 mb-10" >Entre com seu E-mail e defina uma senha de acesso.</Text>
      </View>
      <Input value={email} setValue={setEmail} placeholder="Entre com Seu E-mail" />
      <Input value={senha} setValue={setSenha} placeholder="Senha" password />
      <Input value={repitaSenha} setValue={setRepitaSenha} placeholder="Repetir Senha" password />
      <TouchableOpacity className="justify-center w-80 h-14 bg-primary rounded-full mt-10 items-center">
        <Text className="text-white font-bold">Salvar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Credencial