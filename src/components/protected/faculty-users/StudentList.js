import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';

import getStudents from '../../../data/queries/getStudents';


const ListItem = (props) => {
    console.log(props.id);
    return <Text>{props.fullName}</Text>
}

const StudentList = (props) => {
    const keyExtractor = (item) => item.id;

    const { loading, allUsers: students} = props.data;
    console.log(students);
    if (loading) { return <Text>Loading...</Text> }
    return (
        <View>
            <Text style={styles.subheader}>Choose a Student</Text>
            <FlatList
                data={students}
                renderItem={({item}) => <ListItem id={item.id} fullName={item.fullName}
                keyExtractor={keyExtractor} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subheader: {
        color: '#3D405B',
        fontWeight: '600',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 5
    }
})

export default graphql(getStudents)(StudentList);