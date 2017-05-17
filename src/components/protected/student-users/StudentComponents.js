import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default StudentComponents = (props) => {
    console.log(props)
    const { fullName } = props.screenProps.currentUser;
    return(
        <View style={styles.container}>
            <View>
            <Text>Sorry {fullName}!</Text>
            <Text>Student pages are not yet functional...</Text>
            <Button title="Sign Out" onPress={props.screenProps._handleSignout}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 30,
    }
});