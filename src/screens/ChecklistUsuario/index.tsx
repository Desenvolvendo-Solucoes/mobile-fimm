import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import * as Progress from 'react-native-progress';
import UserAvatar from 'react-native-user-avatar';
import DropDownCheckList from "../../components/DropDownCheckList";


const ChecklistUsuario: React.FC = () => {

  const epis = [
    { key: 'camisa', name: 'Camisa' },
    { key: 'calca', name: 'Calça' },
    { key: 'bota', name: 'Bota' },
    { key: 'luva', name: 'Luva' },
    { key: 'smartphone', name: 'Smartphone' },
    { key: 'impressora', name: 'Impressora' },
    { key: 'espelho', name: 'Espelho' },
  ];
  const renderEpi = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <DropDownCheckList epi={item.key} />
    </View>
  );

  return (

    <View className='flex-1'>
      <View className='p-6  bg-white '>

        <View className='flex-row mb-4 mt-14'>
          <UserAvatar size={50} name="Gabriel Silva" />
          <View className='ml-5'>
            <Text className="text-2xl font-bold">Gabriel Silva</Text>
            <Text className="text-lg text-subtitulo">Matrícula: 265325</Text>
          </View>
        </View>
        <View className="ml-5">
          {<Text className="text-xl mb-3">4/<Text className="text-primary">30</Text> Inspenções</Text>}
          <Progress.Bar progress={0.13} width={300} height={20} color="#00266F" />
        </View>
      </View>
      <View className="items-center  w-full h-2/4 ">
        <View className="w-full items-center h-10 p-2 ">
          <Text className="text-xl text-center ">
            Confirme o estado de seus EPI's
          </Text>
        </View>
        <FlatList
          data={epis}
          renderItem={renderEpi}
          keyExtractor={item => item.key}
          contentContainerStyle={{ paddingBottom: 20,height: 'auto' }}
        />
      </View>
      <View className="items-center flex-row justify-around mt-10">
      <TouchableOpacity className="bg-error p-4 w-2/5 rounded-lg">
        <Text className="text-center text-white">Cancelar</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-primary p-4 w-2/5 rounded-lg">
        <Text className="text-center text-white">Salvar</Text>
      </TouchableOpacity>
      </View>
    </View>

  )
}

export default ChecklistUsuario