import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { graphql } from 'react-apollo';
import moment from 'moment';

import getCompetencyAchievements
  from '../../../data/queries/getCompetencyAchievements';

const colors = {
  primary: '#3D405B',
  secondary: '#81B29A',
};

const styles = StyleSheet.create({
  listItemText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '300',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
  },
  listContainer: {
    paddingTop: 20,
  },
});

const ListItem = (props) => {
  const { createdAt, level, evaluatingUser } = props.achievement;
  let date = moment(createdAt).format('MM/DD/YYYY, k:mm');
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listItemText}>
        Evaluated by {evaluatingUser.fullName}
      </Text>
      <Text style={styles.listItemText}>Level {level} Achieved</Text>
      <Text style={styles.listItemText}>Evaluated on {date}</Text>
    </View>
  );
};

const AchievementList = (props) => {
  const { loading, Competency: competencyData } = props.data;
  const { evaluatedUser, competency } = props.navigation.state.params;

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
      <Text>Evaluated User: {evaluatedUser.fullName}</Text>
      <Text>Competency: {competency.title}</Text>
      <FlatList
        data={competencyData.achievements}
        renderItem={({ item }) => <ListItem achievement={item} />}
        keyExtractor={item => item.id}
        style={styles.listContainer}
      />
    </View>
  );
};

export default graphql(getCompetencyAchievements, {
  options: ({ navigation }) => ({
    variables: {
      user: navigation.state.params.evaluatedUser.id,
      competency: navigation.state.params.competency.id,
    },
  }),
})(AchievementList);
