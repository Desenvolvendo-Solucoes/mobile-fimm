import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SimpleLineIcons } from '@expo/vector-icons';

//COMPONENTS
import DropDawnImages from "../../components/DropDawnImages";
import DropDownTamanhos from "../../components/DropDownTamanhos";
import Foto from "src/components/Foto";

const SolicitarEpi: React.FC = () => {
  const [epiSelecionado, setEpiSelecionado] = useState(null);
  const [openCamera, setOpenCamera] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

  const handleCountrySelect = (country: any) => {
    setEpiSelecionado(country);
  };

  const cancelar = () => {
    navigation.navigate('EPI');
  };
  const foto = () => {
    setOpenCamera(true)
  };

  return (
    <View className='flex-1 mt-4 items-center'>
      <View className="w-11/12 items-start ">
        <Text >Informe os detalhes do EPI</Text>
      </View>
      <DropDawnImages screen="SolicitaEpi" onSelect={handleCountrySelect} />
      <DropDownTamanhos epi={epiSelecionado} />
      <View className="m-3 w-11/12 p-3 border border-primary rounded-md bg-white ">
        <TextInput
          style={{ textAlignVertical: 'top' }}
          className="h-24"
          multiline
          numberOfLines={4}
          placeholder='Relate seu problema'
          placeholderTextColor="#00266F"
        />
      </View>
      <View className="mb-3 bg-white p-4 w-11/12 border border-primary rounded-lg ">
        <TouchableOpacity className="flex-row items-center justify-center"
          onPress={foto}
        >
          <SimpleLineIcons name="camera" size={25} color="#1E1685" />
          <Text className="text-center text-primary font-bold ml-2">
            Adicionar Imagem
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mb-3 bg-primary p-4 w-11/12 rounded-lg">
        <TouchableOpacity onPress={cancelar}>
          <Text className="text-center text-white font-bold">
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mb-13 bg-error p-4 w-11/12 rounded-lg ">
        <TouchableOpacity onPress={cancelar}>
          <Text className="text-center text-white font-bold">
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={openCamera} >
        <Foto setOpen={setOpenCamera} />
      </Modal>
    </View>
  )
}

export default SolicitarEpi