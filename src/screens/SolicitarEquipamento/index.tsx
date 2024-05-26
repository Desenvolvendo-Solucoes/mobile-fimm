import React ,{useState } from "react";
import { Text, View, TextInput,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SimpleLineIcons } from '@expo/vector-icons';



//COMPONENTS
import DropDawnImages from "../../components/DropDawnImages";
import DropDownProblemas from "../../components/DropDownProblemas";





const SolicitarEquipamento: React.FC = () => {
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  const handleCountrySelect = (country: any) => {
    setEquipamentoSelecionado(country);
    // Faça o que for necessário com o valor selecionado na sua tela
  };
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

  const cancelar = () => {
    navigation.navigate('Equipamento');
  };


  return (
    <View className='flex-1 mt-4 items-center'>
      <View className="w-11/12 items-start ">
        <Text >Informe os detalhes do Equipamento</Text>
      </View>
      <DropDawnImages screen="SolicitaEquipamento" onSelect={handleCountrySelect}/>
      <DropDownProblemas equipamento={equipamentoSelecionado}/>
      <View className="w-11/12">
        <TextInput 
        className="border border-gray-400 bg-white h-12 rounded-md p-3 mb-1"
        placeholder="Codigo do equipamento"
        placeholderTextColor="#aaa"
        />
      </View>
      <View className="m-3 mb-4 w-11/12 p-3 border border-primary rounded-md  bg-white ">
      <TextInput 
        style={{textAlignVertical:'top'}}
        className="h-24"
        multiline
        numberOfLines={4} 
        placeholder='Relate seu problema'
        placeholderTextColor="#00266F"
      />
      </View>
      <View className="mb-6 bg-white p-3 w-11/12 border border-primary rounded-lg ">
      <TouchableOpacity className="flex-row items-center justify-center ">
      <SimpleLineIcons name="camera" size={25} color="#1E1685" />
                  <Text className="text-center text-primary font-bold ml-2">
                Gravar video
        </Text>
      </TouchableOpacity>
      </View>
      <View className=" mb-2 bg-primary p-4 w-11/12 rounded-lg">
      <TouchableOpacity onPress={cancelar}>
        <Text className="text-center text-white font-bold">
          Enviar
        </Text>
      </TouchableOpacity>
      </View>
      <View className=" bg-error p-4 w-11/12 rounded-lg ">
      <TouchableOpacity onPress={cancelar}>
        <Text className="text-center text-white font-bold">
          Cancelar
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default SolicitarEquipamento