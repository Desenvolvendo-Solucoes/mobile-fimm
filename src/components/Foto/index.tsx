import React, { useEffect, useRef, useState, } from "react";
import { Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { useNavigation } from '@react-navigation/native';
import { PropsStack } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";
import BtnVoltar from "../BtnVoltar";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Foto: React.FC<Props> = ({ setOpen }) => {
  const camRef = useRef(null)
  const [type, setType] = useState<CameraType>('back');
  const [permission, setRequestPermission] = useState(false);
  const [fotoCapturada, setFotoCapturada] = useState<string | null>(null);
  const [open, setOpenFoto] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<PropsStack>>();

  const voltarCamera = () => {
    setOpenFoto(false)
  };

  const voltarEpi = () => {
    setOpen(false)
  };

  const salvarFoto = () => {
    setOpen(false)
    // navigation.navigate('SolicitarEpi');
  };

  useEffect(() => {
    (async () => {
      const [status, requestPermission] = useCameraPermissions();
      if (status?.granted!) {
        setRequestPermission(status?.granted!);
        return;
      } else {

      }
    })();
  }, []);

  async function tirarFoto() {
    setFotoCapturada(null);
    if (camRef) {
      const data = await camRef?.current!.takePictureAsync({ quality: 0.5 });
      setFotoCapturada(data.uri);
      setOpenFoto(true);
    }
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView className="flex-1 items-center" facing={type} ref={camRef}>
        <TouchableOpacity
          className="absolute left-5 top-20 bg-white p-2 rounded-full shadow-md shadow-black"
          onPress={voltarEpi}
        >
          <Icon
            name="arrow-left"
            size={25}
            color={"#000"}
          />
        </TouchableOpacity>
        <View className="flex-1 flex-row justify-center items-center m-16 w-[70]">
          <TouchableOpacity className="flex-1 self-end rounded-full bg-red-600 border-4 border-white h-[70]"
            onPress={tirarFoto}
          />

          {fotoCapturada &&

            <Modal
              animationType="slide"
              transparent={false}
              visible={open}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: fotoCapturada }}
                />
                <View className="absolute left-5 top-20">
                  <TouchableOpacity
                    className="bg-white p-2 rounded-full shadow-md shadow-black"
                    onPress={voltarCamera}
                  >
                    <Icon
                      name="arrow-left"
                      size={25}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ position: "absolute", display: 'flex', bottom: "10%", alignItems: 'center', justifyContent: 'center' }} onPress={salvarFoto}>
                  <Text style={{ backgroundColor: "#ffffff", width: 50, height: 50, borderRadius: 50, }}>
                    <Icon
                      name="check-circle"
                      size={50}
                      color={"#1E1685"}
                    /></Text>
                </TouchableOpacity>

              </View>
            </Modal>

          }

        </View>
      </CameraView>
    </View>
  )
};

export default Foto