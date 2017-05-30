import { StackNavigator } from 'react-navigation';

import StudentList from './StudentList';
import CompetencyChooser from './CompetencyChooser';
import AchievementList from './AchievementList';

import { stackNavigatorStyles as styles } from '../../../assets/styles';

const ReviewNavigation = StackNavigator(
  {
    StudentList: {
      screen: StudentList,
      navigationOptions: () => ({
        title: 'Choose a Student',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
      }),
    },
    CompetencyChooser: {
      screen: CompetencyChooser,
      navigationOptions: () => ({
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
      }),
    },
    Review: {
      screen: AchievementList,
      navigationOptions: () => ({
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
