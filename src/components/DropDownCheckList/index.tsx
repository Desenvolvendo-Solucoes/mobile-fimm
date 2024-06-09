import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from "react-native-vector-icons/Feather";


const DropDownCheckList = ({ epi }) => {
  const [value, setValue] = useState('0');
  const [open, setOpen] = useState(false)
  const [justificativa, setJustificativa] = useState()
  useEffect(() => {
    if (value === '3') {
      setOpen(true);
      
    }
  }, [value])
  const data = [
    { label: `${epi}`, value: '0' },
    { label: `${epi} esta Ok`, value: '1' },
    { label: `${epi} esta Ruim`, value: '2' },
    { label: `${epi} - Não tem`, value: '3' },
  ];
  const renderItem = item => {
    if (value === '0') {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="user"
              size={20}
            />
          )}
        </View>
      );
    }
    if (value === '1') {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="green"
              name="checkcircle"
              size={20}
            />
          )}
        </View>
      );
    }
    if (value === '2') {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="orange"
              name="warning"
              size={20}
            />
          )}
        </View>
      );
    }
    if (value === '3') {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="red"
              name="closecircle"
              size={20}
            />
          )}
        </View>
      );
    }
  };


  return (
    <>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          value === '1' ? <AntDesign style={styles.icon} color="green" name="checkcircle" size={20} /> :
            value === '2' ? <AntDesign style={styles.icon} color="orange" name="warning" size={20} /> : value === '3' ?
              <AntDesign style={styles.icon} color="red" name="closecircle" size={20} /> : <AntDesign style={styles.icon} color="black" name="user" size={20} />
        )}
        renderItem={renderItem}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
      >
        <View 
        style={{flex:1, justifyContent:'center',alignItems:'center',  backgroundColor: 'rgba(52, 52, 52, 0.8)'} }     >
        <View className='justify-center items-center bg-white w-3/4 h-2/4'>
          <TouchableOpacity
            className="bg-white p-2 rounded-full shadow-md shadow-black absolute left-5 top-10"
            onPress={() => {setOpen(false),setValue('0') }}
          >
            <Icon
              name="arrow-left"
              size={25}
              color={"#000"}
            />
          </TouchableOpacity>
          <View className="m-3 mb-4 w-11/12 p-3 border border-black rounded-md  bg-white ">
      <TextInput 
        style={{textAlignVertical:'top'}}
        className="h-24"
        multiline
        numberOfLines={4} 
        placeholder={`Informe por que não tem ${epi}`} 
        placeholderTextColor="#000"
        onChangeText={()=>setJustificativa}
      />
      </View>
      <View className=" mb-2 bg-primary p-4 w-11/12 rounded-lg">
      <TouchableOpacity onPress={()=>setOpen(false)}>
        <Text className="text-center text-white font-bold">
          Salvar
        </Text>
      </TouchableOpacity>
        </View>
        </View>
        </View>
      </Modal>
    </>

  );
};

export default DropDownCheckList;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    marginBottom: 5,
    backgroundColor: 'white',
    width: 300,
    borderRadius: 3,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
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