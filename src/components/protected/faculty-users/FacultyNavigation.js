import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import EvaluationNavigation from './EvaluationNavigation';
import Profile from '../Profile';

const Evaluate = () => (
    <Text>This is the Evaluate screen</Text>
)

const Review = () => (
    <Text>This is the Review screen</Text>
)


const FacultyNavigation = TabNavigator({
    Evaluate: {
        screen: EvaluationNavigation,
        navigationOptions: ({navigation}) => ({
            title: 'Evaluate',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./True-False-100.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        })
    },
    Review: {
        screen: Review,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./Bar-Chart-100.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        })
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./User-100.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        })
    }
});

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    }
})

export default FacultyNavigation;