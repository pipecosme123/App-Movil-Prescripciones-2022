import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AZUL, BLANCO, ROJO } from '../Constants/constants';

const Alerts = ({ show, onClose = null, type = false, message }) => {

    return (
        <AwesomeAlert
            show={show}
            showProgress={false}
            title={type === true ? "¡Bien!" : "¡Error!"}
            message={message}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={onClose !== null && true}
            cancelText="Ok"
            onCancelPressed={() => onClose()}
            titleStyle={[styles.Title, type === true ? { color: AZUL } : { color: ROJO }]}
            messageStyle={styles.Message}
            cancelButtonStyle={styles.cancelButton}
            cancelButtonTextStyle={styles.cancelButtonText}
        />
    );
};

const styles = StyleSheet.create({
    Alerts: {

    },
    Title: {
        fontSize: 40,
        fontWeight: '900',
    },
    Message: {
        width: 300,
        fontSize: 20,
        textAlign: 'center'
    },
    cancelButton: {
        width: 100,
        backgroundColor: AZUL,
    },
    cancelButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: BLANCO

    }

});

export default Alerts;