import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {StackNavigator} from 'react-navigation';

import StudentList from './StudentList';
import CompetencyChooser from './CompetencyChooser';
import EvaluationStack from './EvaluationStack';

import { stackNavigatorStyles as styles } from '../../../assets/styles';

const EvaluationNavigation: NavigationContainer = StackNavigator({
    StudentList: {
        screen: StudentList,
        navigationOptions: ({navigation}) => ({
            title: 'Choose a Student',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle
        })
    },
    CompetencyChooser: {
        screen: CompetencyChooser,
        navigationOptions: ({navigation}) => ({
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor
        })
    },
    EvaluationStack: {
        screen: EvaluationStack,
        navigationOptions: ({navigation}) => ({
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor
        })
    }
})

export default EvaluationNavigation;