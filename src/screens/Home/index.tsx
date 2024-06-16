import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import MenuButton from "../../components/MenuButton";
import ImageViewer from 'react-native-image-zoom-viewer';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { SimpleLineIcons } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import { mesesString } from "../../context/config";
import { useHeaderHeight } from "@react-navigation/elements";
import Toast from 'react-native-toast-message';



const Holerites: React.FC = () => {
  const [url, setUrl] = useState('');
  const [naoGerado, setNaoGerado] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const meses = mesesString()
  const fullDate = new Date();
  const [filter, setFilter] = useState(meses[fullDate.getMonth()]);

  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const headerHeight = useHeaderHeight();
  const navbarHeight =
    screenHeight - windowHeight + StatusBar.currentHeight + headerHeight + 48;

  useEffect(() => {
    checkPermissions();
    console.log(url.length);

    // Verifica se a URL está vazia e atualiza o estado 'naoGerado' em conformidade
    if (url.length === 0) {
      setNaoGerado(true);
    } else {
      setNaoGerado(false);
    }
  }, [url]);

  const renderDownloadIcon = () => {
    if (downloadStatus) {
      return (
        <LottieView
          source={require("../../../assets/load.json")}
          autoPlay={true}
        />
      );
    } else {
      return (
        <View className="flex flex-row items-center justify-center">
          <SimpleLineIcons name="cloud-download" size={25} color="#fff" />
          <Text className="text-white font-bold ml-2">Baixar Holerite</Text>
        </View>
      );
    }
  };

  const checkPermissions = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
      if (newStatus === 'granted') {
        setPermissionGranted(true);
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Para fazer download de arquivos, é necessário conceder permissão',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 60,
          bottomOffset: 30,
        })
      }
    } else {
      setPermissionGranted(true);
    }
  };

  const handleDownload = async () => {
    if (!url) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Nenhum holerite disponível para download.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      return;
    }

    if (!permissionGranted) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Para fazer download de arquivos, é necessário conceder permissão',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })
      return;
    }

    setDownloadStatus(true);

    try {
      const fileUri = FileSystem.cacheDirectory + "holerite.jpg";
      await FileSystem.downloadAsync(url, fileUri);
      await MediaLibrary.saveToLibraryAsync(fileUri);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Arquivo salvo com sucesso na galeria.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })

    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Ocorreu um erro durante o download do arquivo. Por favor, tente novamente mais tarde.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 30,
      })

      console.error(error);
    } finally {
      setDownloadStatus(false);
    }
  };

  const renderDownloadButton = () => {
    if (!naoGerado) {
      return (
        <View className="w-full h-12  items-center  bg-white">
          <TouchableOpacity
            className="bg-primary h-10 w-10/12 rounded-md flex p-2"
            onPress={handleDownload}
          >
            {renderDownloadIcon()}
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View className=" flex flex-row justify-around items-center w-11/12 h-12 mt-6 ">
        <MenuButton
          subtrai={2}
          active={false}
          filter={filter}
          setFilter={setFilter}
          meses={meses}
          setNaoGerado={setNaoGerado}
          setImageUrl={setUrl}
        />
        <MenuButton
          subtrai={1}
          active={false}
          filter={filter}
          setFilter={setFilter}
          meses={meses}
          setNaoGerado={setNaoGerado}
          setImageUrl={setUrl}
        />
        <MenuButton
          subtrai={0}
          active={true}
          filter={filter}
          setFilter={setFilter}
          meses={meses}
          setNaoGerado={setNaoGerado}
          setImageUrl={setUrl}
        />
      </View>
      {naoGerado ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Não há holerites no momento!</Text>
          <Image
            style={{ top: 20 }}
            source={require("../../../assets/naoGerado.png")}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setImageOpen(true)}>
            {url ? (
              <Image style={{
                height:
                  Dimensions.get("window").height - navbarHeight,
                resizeMode: "contain",
                width: Dimensions.get("window").width,
              }}

                source={{ uri: url }}
              />

              // <Image className={`h-[calc(${Dimensions.get("window").height - navbarHeight})] w-[calc(${Dimensions.get("window").width})] `}

              //   source={{ uri: url }}
              // />
            ) : (
              <View className=" w-full h-5/6 items-center justify-center">
                <Text className="">Não há holerites no momento!</Text>
                <Image
                  style={{ top: 20 }}
                  source={require("../../../assets/naoGerado.png")}
                />
              </View>
            )}
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
            }}
            source={{ uri: url }}
          />
          {renderDownloadButton()}

        </View >
      )}

      <Modal visible={imageOpen} transparent={true}>
        <ImageViewer imageUrls={[{ url: url }]} onSwipeDown={() => setImageOpen(false)} enableSwipeDown />
      </Modal>
      <Toast/>
    </View >
  );
};

export default Holerites;
