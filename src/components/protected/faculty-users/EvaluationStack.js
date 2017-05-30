import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import SwipeCards from 'react-native-swipe-cards';
import { NavigationActions } from 'react-navigation';

import getCompetencyData from '../../../data/queries/getCompetencyData';
import submitEvaluation from '../../../data/mutations/submitEvaluation';
import submitCompetencyAchievement
  from '../../../data/mutations/submitCompetencyAchievement';
import getCompetenciesForUser
  from '../../../data/queries/getCompetenciesForUser';

import { reformatArrayByLevel } from '../../../assets/customFunctions';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexBasis: 300,
    flexGrow: 0,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  cardText: {
    color: '#3D405B',
    fontSize: 20,
    fontWeight: '600',
  },
});
const Card = props => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{props.description}</Text>
  </View>
);

const NoMoreCards = (props) => {
  const { evaluatedUser } = props.navigation.state.params;
  const returnToCompetencyChooser = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'CompetencyChooser',
        params: { evaluatedUser, isReview: false },
      }),
    ],
  });

  const returnToStudentList = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'StudentList',
        params: { isReview: false },
      }),
    ],
  });

  console.log('No more cards props', evaluatedUser);
  return (
    <View>
      <Text style={styles.noMoreCardsText}>Evaluation Submitted!</Text>
      <Button
        title="Another"
        onPress={() => props.navigation.dispatch(returnToCompetencyChooser)}
      />
      <Button
        title="Finished"
        onPress={() => props.navigation.dispatch(returnToStudentList)}
      />
    </View>
  );
};

class EvaluationStack extends Component {
  static navigationOptions = {
    title: 'Evaluate',
  };

  constructor() {
    super();
    this.state = {
      displayedCards: [],
      milestoneData: [],
      currentLevel: 0,
      achievedAtCurrentLvl: 0,
      outOfCards: false,
      payload: [],
    };

    this.handleNope = this.handleNope.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.cardRemoved = this.cardRemoved.bind(this);
  }

  // Add asynchronous data to state when component loaded
  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps.data;
    if (loading) {
      return;
    }
    const { milestones } = nextProps.data.Competency;

    // reformats the milestones response object to a array organized by level
    const milestonesByLevel = reformatArrayByLevel(milestones);

    this.setState({
      milestoneData: milestonesByLevel,
      displayedCards: milestonesByLevel[0],
    });
  }

  componentDidUpdate() {
    const {
      achievedAtCurrentLvl,
      displayedCards,
      outOfCards,
      currentLevel,
    } = this.state;
    // console.log('Achieved at current lvl: ', this.state.achievedAtCurrentLvl)

    if (achievedAtCurrentLvl === displayedCards.length) {
      this.advanceLevel();
    } else if (outOfCards) {
      console.log("Sorry you didn't successfully complete the level");
      this.submitPayload(currentLevel);
    }
  }

  cardRemoved(index) {
    const { displayedCards } = this.state;

    if (displayedCards.length === index + 1) {
      this.setState({ outOfCards: true });
    }
  }

  handleYup(card) {
    const { payload, achievedAtCurrentLvl } = this.state;
    const {
      competency,
      currentUser,
      evaluatedUser,
    } = this.props.navigation.state.params;
    const evaluatingUser = currentUser.id;
    const milestone = card.id;
    const achieved = true;

    // Change state for achieved milestones
    payload.push({
      milestone,
      achieved,
      evaluatedUser: evaluatedUser.id,
      evaluatingUser,
    });
    this.setState({
      achievedAtCurrentLvl: achievedAtCurrentLvl + 1,
      payload,
    });
  }

  handleNope(card) {
    // console.log(`Nope for ${card.description}`);
    const { payload } = this.state;
    const {
      competency,
      currentUser,
      evaluatedUser,
    } = this.props.navigation.state.params;
    const evaluatingUser = currentUser.id;
    const milestone = card.id;
    const achieved = false;

    payload.push({
      milestone,
      achieved,
      evaluatedUser: evaluatedUser.id,
      evaluatingUser,
    });
    this.setState({ payload });
  }

  advanceLevel() {
    const { currentLevel, milestoneData, displayedCards, payload } = this.state;
    const newIndex = currentLevel + 1;
    console.log(`Awarded Level ${newIndex}`);

    // Exit function if there are no more levels
    if (!milestoneData[newIndex]) {
      console.log('Completed all levels', payload);
      this.submitPayload(newIndex);
      return;
    }

    this.setState({
      displayedCards: milestoneData[newIndex],
      currentLevel: newIndex,
      achievedAtCurrentLvl: 0,
      outOfCards: false,
    });
  }

  // Submits evaluation data to the server **Pending
  submitPayload(achievedLevel) {
    const { payload } = this.state;
    const { submitEvaluation, submitCompetencyAchievement } = this.props;
    // eslint-disable-next-line
    payload.map(({ achieved, evaluatedUser, evaluatingUser, milestone }) => {
      // Submit the evaluation object to the server
      submitEvaluation({
        variables: {
          achieved,
          evaluatedUser,
          evaluatingUser,
          milestone,
        },
      })
        .then(({ data }) => {
          console.log('submit evaluation data', data);
        })
        .catch((error) => {
          console.log('submit evaluation error', error);
        });
    });

    const {
      competency,
      currentUser,
      evaluatedUser,
    } = this.props.navigation.state.params;
    submitCompetencyAchievement({
      variables: {
        evaluatedUser: evaluatedUser.id,
        evaluatingUser: currentUser.id,
        competency: competency.id,
        level: achievedLevel,
      },
      refetchQueries: [
        {
          query: getCompetenciesForUser,
          variables: {
            user: evaluatedUser.id,
          },
        },
      ],
    })
      .then(({ data }) => {
        console.log('submit competency achievement data', data);
      })
      .catch((error) => {
        console.log('submit competency achievement error', error);
      });
  }

  render() {
    const { loading } = this.props.data;
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
      <SwipeCards
        cards={this.state.displayedCards}
        loop={false}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards {...this.props} />}
        showYup
        showNope
        yupText="YES"
        nopeText="NO"
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    );
  }
}
export default compose(
  graphql(submitEvaluation, { name: 'submitEvaluation' }),
  graphql(submitCompetencyAchievement, { name: 'submitCompetencyAchievement' }),
  graphql(getCompetencyData, {
    options: ({ navigation }) => ({
      variables: { competencyId: navigation.state.params.competency.id },
    }),
  }),
)(EvaluationStack);
