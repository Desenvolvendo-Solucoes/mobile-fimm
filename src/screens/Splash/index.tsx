import React, { useEffect, useState } from 'react'
import { View, Dimensions, StatusBar, Alert, Animated } from 'react-native'
import LottieView from "lottie-react-native";
import { useAuth } from 'src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsStack } from 'src/types';
import NetInfo from '@react-native-community/netinfo'
import * as Location from 'expo-location';

const Splash: React.FC = () => {

  const { height, width } = Dimensions.get('window')
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();
  // const NetInfo = useNetInfo()
  const [reload, setReload] = useState(0)
  const [isConnected, setIsConnected] = useState(false);

  const validadeInternetAccess = () => {
    console.log(isConnected);
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        navigation.navigate('Login')
      }
      else {
        Alert.alert('Acesso a internet', 'É necessário ter acesso a internet para acessar o aplicativo', [
          {
            text: 'tentar novamente',
            onPress: () => { validadeInternetAccess() }
          },
        ])
      }
    });
  }

  const validateLocationAcesses = async () => {

    let { status, } = await Location.requestForegroundPermissionsAsync();
    console.log('permissão de localização: ', status);

    if (status !== 'granted') {
      Alert.alert('Permissão de localização é  necessária para o funcionamento do aplicativo')
      Location.requestForegroundPermissionsAsync();
      return
    }
    setTimeout(validadeInternetAccess, 1000)

    // validadeInternetAccess()
  }

  useEffect(() => {
    validateLocationAcesses()
  }, [])

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
        loop={true}
      // onAnimationFinish={() => { validadeInternetAccess() }}
      // progress={splashProgress}
      />
    </View>
  )
}

export default Splash