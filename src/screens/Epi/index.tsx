import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../context/AuthContext";

// COMPONENTS
import EpiCard from "../../components/EpiCard";

const Epi: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const { onGetEpiSolicitacoes } = useAuth();
  const [episSolicitados, setEpisSolicitados] = useState<any[]>([]);

  useEffect(() => {
    const fetchEpisSolicitados = async () => {
      try {
        const epis = await onGetEpiSolicitacoes();
        setEpisSolicitados(epis);
      } catch (error) {
        console.error("Erro ao obter epis solicitados:", error);
      }
    };

    fetchEpisSolicitados();
  }, []);

  const solicitarEpi = () => {
    navigation.navigate('SolicitarEpi');
  };

  return (
    <View className='flex-1 mt-4 items-center'>
      {episSolicitados.map((epi, index) => (
        <EpiCard
          key={index}
          epi={epi.epi}
          tamanho={epi.tamanho}
          status={epi.status}
        />
      ))}
      
      <View className="absolute mb-10 z-10 bottom-0 bg-primary p-4 w-11/12 rounded-lg ">
        <TouchableOpacity onPress={solicitarEpi}>
          <Text className="text-center text-white font-bold">
            Solicitar EPI
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Epi;
