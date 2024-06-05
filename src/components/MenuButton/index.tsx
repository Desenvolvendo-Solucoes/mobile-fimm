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

  const { onGetUserHolerites, onGetHoleriteFile, authState } = useAuth();

  useEffect(() => {

  }, []);


  const selecionaMes = () => {
    setFilter(meses[fullDate.getMonth()]);
    let mes = (fullDate.getMonth() + 1).toString();
    let ano = fullDate.getFullYear().toString();

    onGetHoleriteFile(mes, ano).then((file) => {
      console.log(file);

      setImageUrl(file)
    }).catch((err) => {
      console.error(err);
    })
  }


  return (

    <View>
      <TouchableOpacity
        className={`${active === true ? "bg-secondary" : ""}p-3 rounded-md justify-center items-center`}
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