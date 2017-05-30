import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import FacultyNavigation from './faculty-users/FacultyNavigation';
import StudentComponents from './student-users/StudentComponents';

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81B29A',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 25,
    fontWeight: '400',
  },
});

export default class ProtectedComponents extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.currentUser.fullName,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: null,
  });

  render() {
    const { userType } = this.props.currentUser;
    return userType === 'FACULTY'
      ? <FacultyNavigation screenProps={this.props} />
      : <StudentComponents screenProps={this.props} />;
  }
}
