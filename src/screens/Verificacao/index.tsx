import React, { useState,useRef } from "react";
import { Text, TouchableOpacity, View,TextInput,  } from "react-native";


import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//COMPONENTS

import BtnVoltar from "../../components/BtnVoltar";


const Verificacao: React.FC = () => {
  const [matricula, setMatricula] = useState<string>()
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const [code, setCode] = useState(['', '', '', '']);
  const textInputRefs = useRef([]);
  const handleInputChange = (index, value) => {
    const newCode = [...code];
    
    newCode[index] = value;

    setCode(newCode);
        // Move focus to the next TextInput if available
        const nextIndex = index + 1;
        if (nextIndex < textInputRefs.current.length) {
          textInputRefs.current[nextIndex].focus();
        }

  };

  return (
    <View className="flex flex-1 justify-start items-center p-6">
      <View className="absolute left-5 top-20"> 
      <BtnVoltar page={'EnviarCod'}/>
      </View>
      <View className="items-start mt-16">
        <Text className="text-primary font-bold text-2xl mt-14">Verificacao</Text>
        <Text 
        className="text-subtitulo mt-2 mb-10"
        >Foi enviado um código de verificação para o e-mail <Text className="font-bold">exe****@gmai***.</Text></Text>
      <View 
      className="flex-row justify-center items-center w-full mt-24"     >
        {code.map((digit, index) => (
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
      onPress={()=>{ navigation.navigate('AlterarSenha')}}>
        <Text className="text-white font-bold">Confirmar código</Text>
      </TouchableOpacity>
      
    </View>
    </View>
  )
}

export default Verificacao