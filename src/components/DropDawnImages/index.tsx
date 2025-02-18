import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const EPI = [
  {
    value: 'Botina',
    lable: 'Botina',
    image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxmjofcwMZGBFW6VtanmueRuwGGJhwltjrKw&usqp=CAU',
    },
  },
  {
    value: 'Capa de Chuva',
    lable: 'Capa de Chuva',
    image: {
      uri: 'https://www.cbequipamentos.com.br/image/cache//produtos/Maicol/Capa%20Trevira%20300%20Maicol-1024x768.png',
    },
  },
  {
    value: 'Protetor Solar',
    lable: 'Protetor Solar',
    image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXtnTJuzGW42FYL4hSx_oiKh7Lcv0pOX_IP2XwUCLU0twyGpyzFoWkBZadgGX3pdkx_KY&usqp=CAU',
    },
  },
  {
    value: 'Alicate',
    lable: 'Alicate',
    image: {
      uri: 'data:image/jpeg;base64,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',
    },
  },
];

const Equipamentos = [
  {
    value: 'SmartPhone',
    lable: 'SmartPhone',
    image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-AXvXBZR48xozCMToOImC5QYbD33t9ne9Tw&usqp=CAU',
    },
  },
  {
    value: 'Impressora',
    lable: 'Impressora',
    image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22eSOMTmGN1btkrfwLlRFg5ncfAjoePFzwE93Cw4Bz7wKDSZ_p5UfWYiJmN7jiVBYLVk&usqp=CAU',
    },
  },
];

const DropDawnImages = ({ screen, onSelect }) => {
  const [country, setCountry] = useState(null);
  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry.value);
    onSelect(selectedCountry.value);
  };

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={country}
      data={screen === "SolicitaEpi" ? EPI : Equipamentos}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder={screen === "SolicitaEpi" ? "Selecione o EPI" : "Selecione o Equipamento"}
      searchPlaceholder="Search..."
      onChange={handleCountryChange}
    />
  );
};

export default DropDawnImages;


const styles = StyleSheet.create({
  dropdown: {
    marginTop: 16,
    height: 50,
    width: '91.666667%',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#bbb'
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});