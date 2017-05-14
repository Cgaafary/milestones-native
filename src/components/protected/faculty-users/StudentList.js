import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
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

class StudentList extends Component {
    render() {
        const { loading, allUsers: students} = this.props.data;

        if (loading) { return <ActivityIndicator /> }
        return (
            <View>
                <FlatList
                    data={students}
                    renderItem={({item}) => <ListItem id={item.id} fullName={item.fullName} />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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