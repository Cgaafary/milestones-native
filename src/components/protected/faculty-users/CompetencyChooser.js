import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { graphql, compose } from 'react-apollo';
import getAllCompetencies from '../../../data/queries/getAllCompetencies';
import getCompetenciesForUser
  from '../../../data/queries/getCompetenciesForUser';

const colors = {
  primary: '#3D405B',
  secondary: '#81B29A',
};

const styles = StyleSheet.create({
  listItemText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '300',
    paddingLeft: 10,
  },
  listItemCounter: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '300',
  },
  listItemContainer: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  listContainer: {
    paddingTop: 20,
  },
});

const ListItem = (props) => {
  const _handlePress = () => {
    const {
      competency,
      currentUser,
      evaluatedUser,
      navigation: { dispatch },
    } = props;

    const { isReview } = evaluatedUser.navigation.state.params;

    const navigateToEvaluationStack = NavigationActions.navigate({
      routeName: isReview ? 'Review' : 'EvaluationStack',
      params: { competency, currentUser, evaluatedUser },
    });

    dispatch(navigateToEvaluationStack);
  };

  const { title, _achievementsMeta: { count } } = props.competency;
  return (
    <TouchableHighlight
      onPress={_handlePress}
      underlayColor="white"
      activeOpacity={0.7}
    >
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemCounter}>{count}</Text>
        <Text style={styles.listItemText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

class CompetencyChooser extends Component {
  static navigationOptions = {
    title: 'Choose a Competency',
  };

  render() {
    const { loading, allCompetencies } = this.props.data;
    const { currentUser } = this.props.screenProps;
    const { evaluatedUser } = this.props.navigation.state.params;

    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={allCompetencies}
          renderItem={({ item }) => (
            <ListItem
              competency={item}
              navigation={this.props.navigation}
              currentUser={currentUser}
              evaluatedUser={evaluatedUser}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.listContainer}
        />
      </View>
    );
  }
}

export default graphql(getCompetenciesForUser, {
  options: ({ navigation }) => ({
    variables: { user: navigation.state.params.evaluatedUser.id },
  }),
})(CompetencyChooser);
