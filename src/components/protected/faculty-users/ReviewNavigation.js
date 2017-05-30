import { StackNavigator } from 'react-navigation';
import React from 'react';
import { View, Text } from 'react-native';

import StudentList from './StudentList';
import CompetencyChooser from './CompetencyChooser';
import EvaluationStack from './EvaluationStack';

import { stackNavigatorStyles as styles } from '../../../assets/styles';

const Review = (props) => {
  console.log('hello review');
  console.log(props);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Placeholder for metrics review</Text>
    </View>
  );
};

const ReviewNavigation = StackNavigator(
  {
    StudentList: {
      screen: StudentList,
      navigationOptions: ({ navigation }) => ({
        title: 'Choose a Student',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }),
    },
    CompetencyChooser: {
      screen: CompetencyChooser,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
      }),
    },
    Review: {
      screen: Review,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
      }),
    },
  },
  {
    initialRouteParams: {
      isReview: true,
    },
  },
);

export default ReviewNavigation;
