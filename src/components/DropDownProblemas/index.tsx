import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const SmartPhone = [
  { label: "Bateria", value: "bateria" },
  { label: "Tela Quebrada", value: "tela_quebrada" },
  { label: "Problemas no Sistema", value: "problemas_no_sistema" },
  { label: "Outros", value: "outros" },

];

const Impressora = [
  { label: "Soltando Conta a Mais", value: "conta" },
  { label: "Não Faz Leitura", value: "nao_faz_leitura" },
  { label: "Não Conecta Com o Smartphone", value: "nao_conecta" },
  { label: "Outros", value: "outros" },

];

const DropDownProblemas = ({equipamento}) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={equipamento ==="Impressora"? Impressora: SmartPhone}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Selecione o Problema"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
  );
};

export default DropDownProblemas;

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