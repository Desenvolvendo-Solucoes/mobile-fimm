import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { PropsStack,RouteNames } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface BtnVoltarProps {
  page: RouteNames;
}

const BtnVoltar: React.FC<BtnVoltarProps> = ({ page }) => {
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  return (
    <TouchableOpacity
    className="bg-white p-2 rounded-full shadow-md shadow-black"
    onPress={()=>{navigation.navigate(page)}}
  >
    <Icon
      name="arrow-left"
      size={25}
      color={"#000"}
    />
  </TouchableOpacity>
  )
}

export default BtnVoltar