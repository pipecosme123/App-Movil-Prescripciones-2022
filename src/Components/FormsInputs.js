import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const FormsInputs = ({ label, type, nameImput, placeholder, items, onChangeItems, multiline }) => {

   const [isFocusI, setIsFocusI] = useState(false);
   const [fontsLoaded, setFontsLoaded] = useState(false);

   const handleChange = (value, name) => {
      onChangeItems({
         name: name,
         value: value
      })
   }

   return (
      <View style={styles.FormsInputs}>
         <Text style={[styles.label, isFocusI && styles.isFocusedLabel]} onFocus={() => setIsFocusI(true)} onBlur={() => setIsFocusI(false)}>{label}</Text>
         <TextInput
            multiline={multiline ? true : false}
            style={[styles.input, isFocusI && styles.isFocused, { height: multiline ? 200 : 40 }]}
            onFocus={() => setIsFocusI(true)}
            onBlur={() => setIsFocusI(false)}
            onChangeText={text => handleChange(text, nameImput)}
            value={items}
            name={nameImput}
            placeholder={placeholder}
            keyboardType={type}
            numberOfLines={5}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   FormsInputs: {
      width: '100%',
      marginBottom: 10,
      paddingHorizontal: 10
   },
   label: {

   },
   input: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#595655',
      padding: 5,
   },
   isFocused: {
      borderBottomColor: '#009CA6',
      backgroundColor: '#e0e0e0'
   },
   isFocusedLabel: {
      color: '#009CA6'
   }
});

export default FormsInputs;