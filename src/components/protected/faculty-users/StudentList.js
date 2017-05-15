import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import { NavigationActions } from 'react-navigation';

import getStudents from '../../../data/queries/getStudents';

const colors = {
  primary: '#3D405B',
  secondary: '#81B29A'
}

const ListItem = (props) => {
    const message = `You just clicked on ${props.fullName}`
    const navigateToCompetencyChooser = NavigationActions.navigate({
        routeName: 'CompetencyChooser',
        params: {id: props.id, fullName: props.fullName}
    })
    const _handlePress = () => {
        props.navigation.dispatch(navigateToCompetencyChooser)
    }

    return(
      <TouchableHighlight 
        onPress={_handlePress}
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

        if (loading) { return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator size="large" /></View> }
        return (
            <View>
                <FlatList
                    data={students}
                    renderItem={({item}) => <ListItem id={item.id} fullName={item.fullName} navigation={this.props.navigation}/>}
                    keyExtractor={item => item.id}
                    style={styles.listContainer}
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
    },
    listContainer: {
        paddingTop: 20
    }
})

export default graphql(getStudents)(StudentList);