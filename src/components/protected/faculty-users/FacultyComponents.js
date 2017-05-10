import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export default FacultyPage = (props) => {
    const { fullName } = props.currentUser;
    return(
         <View style={styles.container}>
            <Header>
                <Text style={styles.headerTitle}>{fullName}</Text>
            </Header>
            <View>
            <Button title="Sign Out" onPress={props._handleSignout}/>
            </View>
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