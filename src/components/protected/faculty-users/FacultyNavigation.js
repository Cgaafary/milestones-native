import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import EvaluationNavigation from './EvaluationNavigation';

const Evaluate = () => (
    <Text>This is the Evaluate screen</Text>
)

const Review = () => (
    <Text>This is the Review screen</Text>
)

const Profile = () => (
    <Text>This is the Profile screen</Text>
)


const FacultyNavigation = TabNavigator({
    Evaluate: {
        screen: EvaluationNavigation,
        navigationOptions: ({navigation}) => ({
            title: 'Evaluate'
        })
    },
    Review: {
        screen: Review
    },
    Profile: {
        screen: Profile
    }
});

export default FacultyNavigation;