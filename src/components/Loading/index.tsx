import React from "react";
import LottieView from "lottie-react-native";

const Loading: React.FC = () => {
  return (
    <LottieView
      source={require('../../../assets/load.json')}
      style={{ width: "100%", height: "100%" }}
      autoPlay
      loop
    />
  )
}

export default Loading