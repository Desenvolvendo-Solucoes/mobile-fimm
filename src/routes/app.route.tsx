/// <reference types="nativewind/types" />
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native";
import { PropsStack, PropsTab } from "../types";


// SCREENS
import Holerites from "../screens/Home";
import Epi from "../screens/Epi";
import Equipamento from "../screens/Equipamento";
import SolicitarEpi from "../screens/SolicitarEpi";
import SolicitarEquipamento from "../screens/SolicitarEquipamento";
import Login from "../screens/Login";
import EsqueceuSenha from "../screens/EsqueceuSenha";
import PrimeiroAcesso from "../screens/PrimeiroAcesso";
import Credencial from "../screens/Credencial";
import Verificacao from "../screens/Verificacao";
import EnviarCod from "../screens/EnviarCod";
import AlterarSenha from "../screens/AlterarSenha";
import SenhaRedefinida from "../screens/SenhaRedefinida";
import CheckList from "../screens/CheckList";
import ChecklistUsuario from "../screens/ChecklistUsuario";


// COMPONETS
import Foto from "../components/Foto";
import { useAuth } from "../context/AuthContext";


const AppTabs = createBottomTabNavigator<PropsTab>();
const AppStack = createNativeStackNavigator<PropsStack>();

// const AppStaks: React.FC = () => {
//   return (
//     <AppStack.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >

//       <AppStack.Screen
//         name="Credencial"
//         component={Credencial}
//       />
//       <AppStack.Screen
//         name="EsqueceuSenha"
//         component={EsqueceuSenha}
//       />
//       <AppStack.Screen
//         name="Verificacao"
//         component={Verificacao}
//       />
//       <AppStack.Screen
//         name="EnviarCod"
//         component={EnviarCod}
//       />
//       <AppStack.Screen
//         name="AlterarSenha"
//         component={AlterarSenha}
//       />
//       <AppStack.Screen
//         name="Foto"
//         component={Foto}
//       />
//       <AppStack.Screen
//         name="SenhaRedefinida"
//         component={SenhaRedefinida}
//       />

//       <AppStack.Screen
//         name="PrimeiroAcesso"
//         component={PrimeiroAcesso}
//       />

//       <AppStack.Screen
//         name="ChecklistUsuario"
//         component={ChecklistUsuario}
//       />
//       <AppStack.Screen
//         name="SolicitarEpi"
//         component={SolicitarEpi}
//         options={{ headerTitle: "Solicitar EPI", headerShown: true }}
//       />
//       <AppStack.Screen
//         name="SolicitarEquipamento"
//         component={SolicitarEquipamento}
//         options={{ headerTitle: "Solicitar Equipamento", headerShown: true }}
//       />
//       {/* Adicione outras telas aqui */}
//     </AppStack.Navigator>
//   );
// };

const AppRoutes: React.FC = () => {
  const { onLogout } = useAuth()
  return (
    <AppTabs.Navigator
      initialRouteName="Holerite"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
        },
        headerRight: () => (
          <Button title="sair" onPress={onLogout} />
        )
      }}
    >
      <AppTabs.Screen
        name="EPI"
        component={Epi}
        options={{
          headerTitle: () => (<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>EPI</Text>),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View >
                  <MaterialCommunityIcons name="face-mask" size={size} color="#1E1685" />
                </View>
              )
            } else {
              return (<View >
                <MaterialCommunityIcons name="face-mask" size={size} color="#888" />
              </View>
              )
            }
          }
        }}
      />
      <AppTabs.Screen
        name="Holerite"
        component={Holerites}
        options={{
          headerTitle: () => (<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Holerite</Text>),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View >
                  <FontAwesome name="file-text" size={size} color="#1E1685" />
                </View>
              )
            } else {
              return (
                <View>
                  <FontAwesome name="file-text-o" size={size} color="#888" />
                </View>
              )
            }
          }
        }}
      />
      <AppTabs.Screen
        name="Equipamento"
        component={Equipamento}
        options={{
          headerTitle: () => (<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Equipamento</Text>),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View  >
                  <MaterialCommunityIcons name="printer" size={size} color="#1E1685" />
                </View>
              )
            } else {
              return (
                <View >
                  <MaterialCommunityIcons name="printer" size={size} color="#888" />
                </View>
              )
            }
          }
        }}
      />
      <AppTabs.Screen
        name="CheckList"
        component={CheckList}
        options={{
          headerTitle: () => (<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>CheckList</Text>),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View  >
                  <MaterialCommunityIcons name="file-check-outline" size={size} color="#1E1685" />
                </View>
              )
            } else {
              return (
                <View >
                  <MaterialCommunityIcons name="file-check-outline" size={size} color="#888" />
                </View>
              )
            }
          }
        }}
      />
    </AppTabs.Navigator>
  )
}

export default AppRoutes