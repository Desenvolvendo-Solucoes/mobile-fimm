import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface EpiCardProps {
  epi: string;
  tamanho: string;
  status: string;
}

const EpiCard: React.FC<EpiCardProps> = ({ epi, tamanho, status }) => {
  return (
    <View className="flex flex-col bg-white p-2 rounded-md border border-primary w-11/12 mt-3">
      <TouchableOpacity>
        <View className="flex flex-row">
          <Image
            source={require('../../../assets/Epi.png')}
          />
          <View className="ml-4 flex flex-col">
            <Text>
              EPI: <Text className="text-subtitulo">{epi}</Text> Tamanho: <Text className="text-subtitulo">{tamanho}</Text>
            </Text>
            <Text className="mt-3">Quantidade:
              <Text className="text-subtitulo"> 1</Text>
            </Text>
            <Text className="mt-3">Status:
              <Text className="text-subtitulo"> {status}</Text>
            </Text>
            <Text className="mt-3">Data:
              <Text className="text-subtitulo"> 27/01/24</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EpiCard;
