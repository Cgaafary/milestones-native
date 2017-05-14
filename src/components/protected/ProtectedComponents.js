import React, {Component} from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FacultyNavigation from './faculty-users/FacultyNavigation';
import StudentComponents from './student-users/StudentComponents';

export default class ProtectedComponents extends Component {
    static navigationOptions = ( {navigation} ) => ({
        // title: navigation.state.params.currentUser.fullName,
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerLeft: null
    })
    
    render() {
        const {fullName, userType} = this.props.currentUser;
        console.log("accessed Protected Components",fullName);

        return userType === 'FACULTY' ? <FacultyNavigation screenProps={this.props} /> : <StudentComponents />
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#81B29A'
    },
    headerTitleStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: '400'
    }
});