import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Login from './Login';

export default Public = (props) => {
    return(
        <View style={styles.container}>
            <Login _handleSignin={props._handleSignin}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});