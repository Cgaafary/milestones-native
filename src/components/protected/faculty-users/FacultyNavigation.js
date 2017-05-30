import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
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

const FacultyNavigation = TabNavigator(
  {
    Evaluate: {
      screen: EvaluationNavigation,
      navigationOptions: () => ({
        title: 'Evaluate',
        tabBarIcon: ({ tintColor }) => (
          <Image source={evaluateIcon} style={[styles.icon, { tintColor }]} />
        ),
      }),
    },
    Review: {
      screen: ReviewNavigation,
      navigationOptions: () => ({
        title: 'Review',
        tabBarIcon: ({ tintColor }) => (
          <Image source={reviewIcon} style={[styles.icon, { tintColor }]} />
        ),
      }),
      screenProps: 'Hello',
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Image source={profileIcon} style={[styles.icon, { tintColor }]} />
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
