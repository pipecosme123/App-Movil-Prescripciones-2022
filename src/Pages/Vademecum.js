import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import stylesGlobal from '../css/stylesGlobal';
import { NARANJA } from '../Constants/constants';

const Vademecum = () => {
    return (
        <View style={[styles.Vademecum, stylesGlobal.container]}>
            <Entypo name="book" size={100} color={NARANJA} />
            <Text style={{fontSize: 30, fontWeight: '900'}}>Vademécum</Text>
            <Text style={{fontSize: 15, fontWeight: '500'}}>- Próximamente -</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Vademecum: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Vademecum;