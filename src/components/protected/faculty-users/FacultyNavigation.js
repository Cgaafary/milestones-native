import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

import EvaluationNavigation from './EvaluationNavigation';
import Profile from '../Profile';

import evaluateIcon from './img/True-False-100.png';
import reviewIcon from './img/Bar-Chart-100.png';
import profileIcon from './img/User-100.png';

const Review = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Placeholder for metrics review</Text>
    </View>
)


const FacultyNavigation = TabNavigator({
    Evaluate: {
        screen: EvaluationNavigation,
        navigationOptions: ({navigation}) => ({
            title: 'Evaluate',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={evaluateIcon}
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
                    source={reviewIcon}
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
                    source={profileIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            )
        })
    }
}
);

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    }
})

export default FacultyNavigation;