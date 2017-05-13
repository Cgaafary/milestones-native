import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Header from '../Header';
import Login from './Login';

export default Public = (props) => {
    const navigationOptions = {
        title: 'Public'
    }
    return(
        <View style={styles.container}>
            <Header>
                <Text style={styles.headerTitle}>Public</Text>
            </Header>
            <Login _handleSignin={props._handleSignin}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 30,
    }
});