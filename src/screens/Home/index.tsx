import React, { useState } from "react";
import { Text, View, Image, Dimensions, StatusBar } from "react-native";
import MenuButton from "../../components/MenuButton";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAuth } from "../../context/AuthContext";



const Holerites: React.FC = () => {
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const headerHeight = useHeaderHeight();
  
  const [url,setUrl] = useState("");
  const navbarHeight =
    screenHeight - windowHeight + StatusBar.currentHeight + headerHeight;

  return (
    <View className='flex justify-center items-center'>

      <MenuButton setUrl={setUrl}/>
      <Image style={{
        height:
          Dimensions.get("window").height - navbarHeight,
        resizeMode: "stretch",
        width: Dimensions.get("window").width,
      }}
        source={{ uri: url }}
      />
    </View>
  )
}

export default Holerites