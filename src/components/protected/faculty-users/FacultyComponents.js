import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Route } from 'react-router-native'

import StudentList from './StudentList';
import CompetencyChooser from './CompetencyChooser';

export default FacultyPage = (props) => {
    const { fullName } = props.currentUser;
    return(
         <View style={styles.container}>
            <Header>
                <Text style={styles.headerTitle}>{fullName}</Text>
            </Header>
            <StudentList />
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