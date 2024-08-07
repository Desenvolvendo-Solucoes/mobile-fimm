import * as React from "react";
import Login from "../screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Foto from "../components/Foto";
import AlterarSenha from "../screens/AlterarSenha";
import ChecklistUsuario from "../screens/ChecklistUsuario";
import Credencial from "../screens/Credencial";
import EsqueceuSenha from "../screens/EsqueceuSenha";
import PrimeiroAcesso from "../screens/PrimeiroAcesso";
import SenhaRedefinida from "../screens/SenhaRedefinida";
import SolicitarEpi from "../screens/SolicitarEpi";
import SolicitarEquipamento from "../screens/SolicitarEquipamento";
import Verificacao from "../screens/Verificacao";
import { PropsStack } from "../types";
import Splash from "src/screens/Splash";


const AppStack = createNativeStackNavigator<PropsStack>();

const AuthRoutes: React.FC = () => {
    return (
        <AppStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <AppStack.Screen
                name="Login"
                component={Login}
            />
            <AppStack.Screen
                name="Credencial"
                component={Credencial}
            />
            <AppStack.Screen
                name="EsqueceuSenha"
                component={EsqueceuSenha}
            />
            <AppStack.Screen
                name="Verificacao"
                component={Verificacao}
            />
            <AppStack.Screen
                name="AlterarSenha"
                component={AlterarSenha}
            />
            <AppStack.Screen
                name="Foto"
                component={Foto}
            />
            <AppStack.Screen
                name="SenhaRedefinida"
                component={SenhaRedefinida}
            />

            <AppStack.Screen
                name="PrimeiroAcesso"
                component={PrimeiroAcesso}
            />

            <AppStack.Screen
                name="ChecklistUsuario"
                component={ChecklistUsuario}
            />

            <AppStack.Screen
                name="SolicitarEpi"
                component={SolicitarEpi}
                options={{ headerTitle: "Solicitar EPI", headerShown: true }}
            />

            <AppStack.Screen
                name="SolicitarEquipamento"
                component={SolicitarEquipamento}
                options={{ headerTitle: "Solicitar Equipamento", headerShown: true }}
            />

            <AppStack.Screen
                name="Splash"
                component={Splash}
            />
        </AppStack.Navigator>
    );

};


export default AuthRoutes;