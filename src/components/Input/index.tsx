import React, { useState } from "react";
import { TextInput, View, ScrollView, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

type Props = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string
  password?: boolean
  matricula?: boolean
  cpf?: boolean
}

const Input: React.FC<Props> = ({ value, setValue, placeholder, password,matricula,cpf }: Props) => {
  const [editing, setEditing] = useState<boolean>(false)

  const EyeRender = () => {
    if (password) {
      return (
        editing ? (<Icon size={22} name='eye-off' onPress={() => { setEditing(!editing) }} />) : (<Icon size={22} name='eye' onPress={() => { setEditing(!editing) }} />)
      )
    }

  }
  if(matricula){
    return (
      <View className='w-80 h-14 bg-[#F7F8F9] rounded-full pl-4 border border-[#E8ECF4] flex flex-row items-center justify-between pr-4 mb-4'>
        <TextInput
          className="w-64 h-14"
          value={value}
          maxLength={6}
          keyboardType="numeric"
          onChangeText={(e) => setValue(e.trim())}
          placeholder={placeholder}
          placeholderTextColor={'#8391A1'}
          secureTextEntry={password ? editing ? false : true : false}
          autoCapitalize={password ? 'none' : 'words'}
        />
        {EyeRender()}
      </View>
    )
  }if(cpf){
    return (
      <View className='w-80 h-14 bg-[#F7F8F9] rounded-full pl-4 border border-[#E8ECF4] flex flex-row items-center justify-between pr-4 mb-4'>
        <TextInput
          className="w-64 h-14"
          value={value}
          maxLength={11}
          keyboardType="numeric"
          onChangeText={(e) => setValue(e.trim())}
          placeholder={placeholder}
          placeholderTextColor={'#8391A1'}
          secureTextEntry={password ? editing ? false : true : false}
          autoCapitalize={password ? 'none' : 'words'}
        />
        {EyeRender()}
      </View>
    )
  }else{
  return (
    <View className='w-80 h-14 bg-[#F7F8F9] rounded-full pl-4 border border-[#E8ECF4] flex flex-row items-center justify-between pr-4 mb-4'>
      <TextInput
        className="w-64 h-14"
        value={value}
        onChangeText={(e) => setValue(e.trim())}
        placeholder={placeholder}
        placeholderTextColor={'#8391A1'}
        secureTextEntry={password ? editing ? false : true : false}
        autoCapitalize={password ? 'none' : 'words'}
      />
      {EyeRender()}
    </View>
  )}
}

export default Input
