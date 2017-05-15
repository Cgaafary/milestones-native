import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import StudentList from './StudentList';
import CompetencyChooser from './CompetencyChooser';

const EvaluationNavigation = StackNavigator({
    StudentList: {
        screen: StudentList,
        navigationOptions: ({navigation}) => ({
            title: 'Choose a Student'
        })
    },
    CompetencyChooser: {
        screen: CompetencyChooser
    }
})

export default EvaluationNavigation;