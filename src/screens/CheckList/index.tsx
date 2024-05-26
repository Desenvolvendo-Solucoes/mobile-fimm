import React, { useState } from 'react';
import {  View, Text, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Input from '../../components/Input';


//COMPONENTS


const CheckList: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const [matricula, setMatricula] = useState('')
  const CheckListUsuario = () => {
    navigation.navigate('ChecklistUsuario');
  };

  return (
    <View className='flex-1 mt-4 items-center '>
      <Text className='text-xl mb-10'>Informe seu CPF ou Matrícula</Text>
      <Input value={matricula} setValue={setMatricula} placeholder="Entre com sua matrícula"/>
      <TouchableOpacity 
      className='w-80 p-5 bg-primary rounded-full mt-40'
      onPress={CheckListUsuario}
      >
        <Text className='text-center text-white'>Avançar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CheckList