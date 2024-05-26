import React, { useState,useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

interface Menuprop
{
  setUrl:React.Dispatch<React.SetStateAction<string>>;
}
const MenuButton: React.FC <Menuprop> = ({setUrl}:Menuprop) => {

  const { onGetUserHolerites } = useAuth();
  const [filter,setFilter] = useState("mes3");
  const [mes0,setMes0] = useState("");
  const [ano0,setAno0] = useState("");
  const [mes1,setMes1] = useState("");
  const [ano1,setAno1] = useState("");
  const [mes2,setMes2] = useState("");
  const [ano2,setAno2] = useState("");
  const [holerites, setHolerites] = useState([])

  useEffect(() => {
    const lastThreeMonths = getLastThreeMonths();
    if (lastThreeMonths.length > 0) {
      setMes0(lastThreeMonths[0].month);
      setAno0(lastThreeMonths[0].year);
      setMes1(lastThreeMonths[1].month);
      setAno1(lastThreeMonths[1].year);
      setMes2(lastThreeMonths[2].month);
      setAno2(lastThreeMonths[2].year);
    }
    onGetUserHolerites().then((holerite)=>{
      setHolerites(holerite)

    } )
  }, []);

  const getLastThreeMonths = () => {
    const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const today = new Date();
    
    let result = [];
    
    for (let i = 0; i < 3; i++) {
      let month = today.getMonth() - i;
      let year = today.getFullYear();
  
      if (month < 0) {
        month += 12;
        year -= 1;
      }
      
      result.push({
        month: monthNames[month],
        monthNumber: month + 1,
        year: year
      });
    }
  
    return result;
  };

    return (
        <View className=" flex flex-row justify-around items-center w-11/12 h-12 mt-6 ">
              <TouchableOpacity 
              className={` ${filter =="mes1"?"bg-secondary":""} p-3 rounded-md justify-center items-center`}
              onPress={() => {
                setFilter("mes1") 
                setUrl("https://firebasestorage.googleapis.com/v0/b/enel-sp-67001.appspot.com/o/Holerites%2F12-2023%2F106045.jpg?alt=media&token=c66fb373-4f8d-4c32-a91b-41275c35399c")}}
              >
                <Text className={`${filter =="mes1"?"text-primary":"text-text"} font-bold`}>{mes2}</Text>
                <Text className={`${filter =="mes1"?"text-primary":"text-text"}`}>{ano2}</Text>
              
              </TouchableOpacity>
              <TouchableOpacity 
              className={` ${filter =="mes2"?"bg-secondary":""} p-3 rounded-md justify-center items-center`} 
              onPress={() =>{
                setFilter("mes2") 
                setUrl("https://firebasestorage.googleapis.com/v0/b/enel-sp-67001.appspot.com/o/Holerites%2F11-2023%2F106045.jpg?alt=media&token=37e8c6a5-3413-4cd6-aac3-0b3441c136f6")}}
              >
                <Text className={`${filter =="mes2"?"text-primary":"text-text"} font-bold`}>{mes1}</Text>
                <Text className={`${filter =="mes2"?"text-primary":"text-text"}`}>{ano1}</Text>
              
              </TouchableOpacity>

              <TouchableOpacity 
              className={` ${filter =="mes3"?"bg-secondary":""} p-3 rounded-md justify-center items-center`}
              onPress={() =>{
                setFilter("mes3") 
                setUrl("https://firebasestorage.googleapis.com/v0/b/enel-sp-67001.appspot.com/o/Holerites%2F1-2024%2F106045.jpg?alt=media&token=f83e1cd1-427c-4a34-8f82-591d40b87a7a")}}
              >
                <Text className={`${filter =="mes3"?"text-primary":"text-text"} font-bold`}>{mes0}</Text>
                <Text className={`${filter =="mes3"?"text-primary":"text-text"}`}>{ano0}</Text>
              
              </TouchableOpacity>

        </View>
    );
};

export default MenuButton;