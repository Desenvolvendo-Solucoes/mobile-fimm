import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../context/AuthContext";

// COMPONENTS
import EquipamentoCard from "../../components/EquipamentoCard";

const Equipamento: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const { onGetEquipamentoSolicitacoes } = useAuth();
  const [equipamentosSolicitados, setEquipamentosSolicitados] = useState<any[]>([]);

  useEffect(() => {
    const fetchEquipamentosSolicitados = async () => {
      try {
        const equipamentos = await onGetEquipamentoSolicitacoes();
        setEquipamentosSolicitados(equipamentos);
      } catch (error) {
        console.error("Erro ao obter equipamentos solicitados:", error);
      }
    };

    fetchEquipamentosSolicitados();
  }, []);

  const solicitarEquipamento = () => {
    navigation.navigate('SolicitarEquipamento');
  };

  return (
    <View className='flex flex-1 mt-4 items-center'>
      {equipamentosSolicitados.map((equipamento, index) => (
        <EquipamentoCard
          key={index}
          equipamento={equipamento.nome}
          modelo={equipamento.modelo}
          quantidade={equipamento.quantidade}
          status={equipamento.status}
        />
      ))}
      
      <View className="absolute mb-10 z-10 bottom-0 bg-primary p-4 w-11/12 rounded-lg ">
        <TouchableOpacity onPress={solicitarEquipamento}>
          <Text className="text-center text-white font-bold">
            Solicitar Equipamento
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Equipamento;
