import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default Header = (props) => {
    return(
        <View style={styles.header}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#81B29A'
    }
});