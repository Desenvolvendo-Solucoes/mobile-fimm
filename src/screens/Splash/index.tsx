import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StatusBar, Alert } from 'react-native'
import LottieView from "lottie-react-native";
import { useAuth } from 'src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsStack } from 'src/types';
import { useNetInfo } from '@react-native-community/netinfo'

const Splash: React.FC = () => {
  const { authState, validatToken } = useAuth()
  const { height, width } = Dimensions.get('window')
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  const NetInfo = useNetInfo()
  const [reload, setReload] = useState(0)

  const validadeInternetAccess = () => {
    console.log(NetInfo.isConnected);
    if (NetInfo.isConnected) {
      navigation.navigate('Login')
    }
    else {
      Alert.alert('Acesso a internet', 'É necessário ter acesso a internet para acessar o aplicativo', [
        {
          text: 'tentar novamente',
          onPress: () => { setReload(reload + 1) }
        },
      ])
    }
  }

  useEffect(() => {
    if (NetInfo.isConnected === null) console.log(NetInfo.isConnected);
  }, [reload, authState])

  return (
    <View className='flex flex-1 w-full h-full bg-white'>
      <LottieView
        source={require('assets/Splash.json')}
        style={
          {
            width: width + 10,
            height: height + StatusBar.currentHeight
          }
        }
        autoPlay
        resizeMode='cover'
        loop={authState == null}
        onAnimationFinish={() => { validadeInternetAccess() }}
      />
    </View>
  )
}

export default Splash