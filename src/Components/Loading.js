import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Animations } from '../Constants/Animations';

const Loading = () => {


   return (
      <View style={[StyleSheet.absoluteFillObject, styles.Loading]}>
         <LottieView
            style={styles.animation}
            source={Animations.loading}
            autoPlay loop
         />
         <Text style={styles.textLoading}>Generando Prescirpción</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   Loading: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      zIndex: 1
   },
   animation: {
      margin: 0,
      width: 150
   },
   textLoading:{
      margin: 0,
      position: 'relative',
      bottom: 50,
      fontSize: 20
   }
});

export default Loading;