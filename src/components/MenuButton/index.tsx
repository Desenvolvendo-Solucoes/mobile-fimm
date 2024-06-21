import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

interface MenuButtonProps {
  active: boolean;
  subtrai: number;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  meses: string[];
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setNaoGerado: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuButton: React.FC<MenuButtonProps> = ({ subtrai, active, filter, meses, setFilter, setImageUrl, setNaoGerado }: MenuButtonProps) => {
  const fullDate = new Date();
  fullDate.setMonth(fullDate.getMonth() - subtrai);

  const { onGetHoleriteFile } = useAuth();

  useEffect(() => {
    if (subtrai === 0) {
      selecionaMes()
    }
  }, []);



  const selecionaMes = () => {
    // Verifica se fullDate está inicializado
    if (!fullDate) {
      console.error("fullDate não está inicializado.");
      return;
    }

    // Define o filtro baseado no mês atual
    setFilter(meses[fullDate.getMonth()]);

    // Obtém o mês e o ano atuais como strings
    let mes: string = (fullDate.getMonth()).toString();
    let ano: string = fullDate.getFullYear().toString();

    // Recupera o arquivo e define a URL da imagem
    onGetHoleriteFile(mes, ano)
      .then((file: string) => {

        setImageUrl(file);
      })
      .catch((err) => {
        console.error("Falha ao recuperar o arquivo:", err);
      });
  };



  return (

    <View>
      <TouchableOpacity
        className={`${filter === meses[fullDate.getMonth()] ? "bg-secondary" : ""} p-3 rounded-md justify-center items-center`}
        onPress={() => {
          selecionaMes()
        }}
      >
        <Text className={`font-bold`}>{meses[fullDate.getMonth()]}</Text>
        <Text >{fullDate.getFullYear()}</Text>

      </TouchableOpacity>
    </View>
  );
};

export default MenuButton;