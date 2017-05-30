import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, Image, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';

import EvaluationNavigation from './EvaluationNavigation';
import ReviewNavigation from './ReviewNavigation';
import Profile from '../Profile';

import evaluateIcon from './img/True-False-100.png';
import reviewIcon from './img/Bar-Chart-100.png';
import profileIcon from './img/User-100.png';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const Review = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Placeholder for metrics review</Text>
  </View>
);

const FacultyNavigation = TabNavigator(
  {
    Evaluate: {
      screen: EvaluationNavigation,
      navigationOptions: ({ navigation }) => ({
        title: 'Evaluate',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={evaluateIcon}
            style={[styles.icon, { tintColor }]}
          />
        ),
      }),
    },
    Review: {
      screen: ReviewNavigation,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={reviewIcon}
            style={[styles.icon, { tintColor }]}
          />
        ),
      }),
      screenProps: 'Hello',
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={profileIcon}
            style={[styles.icon, { tintColor }]}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#3D405B',
      tabStyle: {
        paddingTop: Platform.OS === 'android'
          ? Constants.statusBarHeight + 10
          : 0,
      },
    },
  },
);

export default FacultyNavigation;
