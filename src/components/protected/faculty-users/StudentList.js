import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-native';

import getStudents from '../../../data/queries/getStudents';

const colors = {
  primary: '#3D405B',
  secondary: '#81B29A'
}

const ListItem = (props) => {
    const message = `You just clicked on ${props.fullName}`
    return(
      <TouchableHighlight 
        onPress={() => Alert.alert('Clicked!', message)}
        underlayColor="white"
        activeOpacity={0.7}>
        <View>
        <Text style={styles.listItemText}>{props.fullName}</Text>
      </View>
      </TouchableHighlight>
      )
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
        color: colors.primary,
        fontWeight: '600',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    listItemText: {
        fontSize: 25,
        color: colors.primary,
        fontWeight: '300',
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 30
  }
})

export default graphql(getStudents)(StudentList);