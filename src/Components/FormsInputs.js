import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const FormsInputs = ({ label, type, nameImput, placeholder, items, onChangeItems, onBlurItems, multiline, onShowError, error }) => {

   const [isFocusI, setIsFocusI] = useState(false);
   const [fontsLoaded, setFontsLoaded] = useState(false);

   const handleChange = (value, name) => {
      onChangeItems({
         name: name,
         value: value
      })
   }

   const handleBlur = (e) => {
      onBlurItems(e);
      setIsFocusI(false)
   }

   return (
      <View style={[styles.FormsInputs, onShowError && error && styles.FormsInputseError]}>
         <Text style={[styles.label, isFocusI && styles.isFocusedLabel, onShowError && error && styles.labelError]} onFocus={() => setIsFocusI(true)} onBlur={() => setIsFocusI(false)}>{label}</Text>
         <TextInput
            multiline={multiline ? true : false}
            style={[styles.input, isFocusI && styles.isFocused, { height: multiline ? 200 : 40 }, onShowError && error && styles.inputError]}
            onFocus={() => setIsFocusI(true)}
            onBlur={handleBlur}
            onChangeText={text => handleChange(text, nameImput)}
            value={items}
            name={nameImput}
            placeholder={placeholder}
            keyboardType={type}
            numberOfLines={5}
         />
         {onShowError && error && <Text style={styles.textError}>{error}</Text>}
      </View>
   );
};

const styles = StyleSheet.create({
   FormsInputs: {
      width: '100%',
      marginBottom: 10,
      paddingHorizontal: 10
   },
   FormsInputseError: {
      marginBottom: 0
   },
   label: {

   },
   labelError:{
      color: '#d2010d'
   },
   input: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#595655',
      padding: 5
   },
   inputError: {
      borderBottomWidth: 1,
      borderBottomColor: '#d2010d'
   },
   isFocused: {
      borderBottomColor: '#009CA6',
      backgroundColor: '#f0f0f0'
   },
   isFocusedLabel: {
      color: '#009CA6'
   },
   textError: {
      marginLeft: 5,
      color: '#d2010d'
   }
});

export default FormsInputs;