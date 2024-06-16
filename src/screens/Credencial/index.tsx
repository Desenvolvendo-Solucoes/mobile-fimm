import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PropsStack } from "../../types";
import Toast from 'react-native-toast-message';

// COMPONENTS
import Input from "../../components/Input";
import BtnVoltar from "../../components/BtnVoltar";

// Definindo a interface para os parâmetros da rota
interface RouteParams {
  cpf: string;
  matricula: string;
}

// Definindo o tipo específico para a rota
type CredencialRouteProp = RouteProp<{ Credencial: RouteParams }, 'Credencial'>;

const Credencial: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [repitaEmail, setRepitaEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [repitaSenha, setRepitaSenha] = useState<string>();
  const route = useRoute<CredencialRouteProp>();
  
  const { onPrimeiroAcesso } = useAuth();
  const { cpf, matricula } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isPasswordStrong = (password: string) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const cadastrarUsuario = async () => {
    const emailLowerCase = email.toLowerCase();
    const repitaEmailLowerCase = repitaEmail.toLowerCase();

    if (senha !== repitaSenha || emailLowerCase  !== repitaEmailLowerCase) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'As senhas ou Email não coincidem.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      return;
    }
    if (!isEmailValid(emailLowerCase)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Por favor, insira um e-mail válido.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      return;
    }

    if (!isPasswordStrong(senha)) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      return;
    }
    const result = await onPrimeiroAcesso!(cpf, matricula, emailLowerCase, senha);
    console.log(result);
    console.log(result.error);
    
    
    if (result && result.error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: result.msg,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Usuario cadastrado com sucesso',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      navigation.navigate('Login');
    }
  };

  return (
    <View className="flex flex-1 justify-start p-6">
      <View className="w-10 h-10 mt-10">
        <BtnVoltar page={'Login'} />
      </View>
      <View className="items-start">
        <Text className="text-primary font-bold text-2xl mt-14">Dados de acesso</Text>
        <Text className="text-subtitulo mt-2 mb-10">Entre com seu E-mail e defina uma senha de acesso.</Text>
      </View>
      <Input value={email} setValue={setEmail} placeholder="Entre com Seu E-mail" />
      <Input value={repitaEmail} setValue={setRepitaEmail} placeholder="Repetir E-mail" />
      <Input value={senha} setValue={setSenha} placeholder="Senha" password />
      <Input value={repitaSenha} setValue={setRepitaSenha} placeholder="Repetir Senha" password />
      <TouchableOpacity 
        className="justify-center w-80 h-14 bg-primary rounded-full mt-10 items-center"
        onPress={cadastrarUsuario}
      >
        <Text className="text-white font-bold">Salvar</Text>
      </TouchableOpacity>
      <Toast/>
    </View>
  );
};

export default Credencial;
