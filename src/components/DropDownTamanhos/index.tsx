import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: '-', value: '0' },
  { label: 'P', value: '1' },
  { label: 'M', value: '2' },
  { label: 'G', value: '3' },
  { label: 'GG', value: '4' },
  { label: 'XL', value: '5' },
  { label: '34', value: '6' },
  { label: '35', value: '7' },
  { label: '36', value: '8' },
  { label: '37', value: '9' },
  { label: '38', value: '10' },
  { label: '39', value: '11' },
  { label: '40', value: '12' },
  { label: '41', value: '13' },
  { label: '42', value: '14' },
  { label: '43', value: '15' },
  { label: '44', value: '16' },
  { label: '45', value: '17' },
  { label: '46', value: '18' },
  { label: '47', value: '19' },
  { label: '48', value: '20' },
  { label: '49', value: '21' },
  { label: '50', value: '22' },
  { label: '51', value: '23' },
  { label: '52', value: '24' },
  { label: '53', value: '25' },
  { label: '54', value: '26' },
  { label: '55', value: '27' },
];

const botina = [
  { label: '34', value: '34' },
  { label: '35', value: '35' },
  { label: '36', value: '36' },
  { label: '37', value: '37' },
  { label: '38', value: '38' },
  { label: '39', value: '39' },
  { label: '40', value: '40' },
  { label: '41', value: '41' },
  { label: '42', value: '42' },
  { label: '43', value: '43' },
  { label: '44', value: '44' },
  { label: '45', value: '45' },
  { label: '46', value: '46' },
  { label: '47', value: '47' },
  { label: '48', value: '48' },
  { label: '49', value: '49' },
  { label: '50', value: '50' },
  { label: '51', value: '51' },
  { label: '52', value: '52' },
  { label: '53', value: '53' },
  { label: '54', value: '54' },
  { label: '55', value: '55' },
]

const capa = [
  { label: 'P', value: 'P' },
  { label: 'M', value: 'M' },
  { label: 'G', value: 'G' },
  { label: 'GG', value: 'GG' },
  { label: 'XL', value: 'XL' },
]

const protetor = [
  { label: '-', value: '-' },
]

const alicate = [
  { label: '-', value: '-' },
]

const DropDownTamanhos = ({ epi, onChange }) => {
  const [value, setValue] = useState(null);

  const handleSelect = (item) => {
    setValue(item.value);
    onChange(item.value); // <-- Envia para o componente pai
  };

  const getOptions = () => {
    if (epi === "Botina") return botina;
    if (epi === "Capa de Chuva") return capa;
    if (epi === "Protetor Solar") return protetor;
    return alicate;
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={getOptions()}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Tamanho"
      searchPlaceholder="Search..."
      value={value}
      onChange={handleSelect}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
  );
};

export default DropDownTamanhos;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: '91.666667%',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderRadius: 4,
    borderWidth:1,
    borderColor:'#bbb'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});