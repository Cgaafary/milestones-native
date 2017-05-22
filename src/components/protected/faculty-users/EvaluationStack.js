import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, Button } from "react-native";
import { graphql, compose } from "react-apollo";
import SwipeCards from "react-native-swipe-cards";
import { NavigationActions } from 'react-navigation';

import getCompetencyData from "../../../data/queries/getCompetencyData";
import submitEvaluation from "../../../data/mutations/submitEvaluation";
import submitCompetencyAchievement from '../../../data/mutations/submitCompetencyAchievement';

import {
  getObjectById,
  reformatArrayByLevel
} from "../../../assets/customFunctions";

const Card = props => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{props.description}</Text>
  </View>
);

const NoMoreCards = props => {
  const returnToStudentList = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
          routeName: 'StudentList'
        })
    ]
  })
  console.log(props)
  return (
    <View>
      <Text style={styles.noMoreCardsText}>Evaluation Submitted!</Text>
      <Button title="Another" onPress={() => props.navigation.dispatch(returnToStudentList)}/>
    </View>
  );
};

const Cards = [
  [
    { description: "Card 1 - Level 1", id: "11" },
    { description: "Card 2 - Level 1", id: "21" },
    { description: "Card 3 - Level 1", id: "31" }
  ],
  [
    { description: "Card 1 - Level 2", id: "12" },
    { description: "Card 2 - Level 2", id: "22" },
    { description: "Card 3 - Level 2", id: "32" }
  ],
  [
    { description: "Card 1 - Level 3", id: "13" },
    { description: "Card 2 - Level 3", id: "23" },
    { description: "Card 3 - Level 3", id: "33" }
  ]
];

class EvaluationStack extends Component {
  constructor() {
    super();
    this.state = {
      displayedCards: [],
      milestoneData: [],
      currentLevel: 0,
      achievedAtCurrentLvl: 0,
      outOfCards: false,
      payload: []
    };

    this.handleNope = this.handleNope.bind(this);
    this.handleYup = this.handleYup.bind(this);
    this.cardRemoved = this.cardRemoved.bind(this);
  }

  static navigationOptions = {
    title: "Evaluate"
  };

  // Add asynchronous data to state when component loaded
  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps.data;
    if (loading) {
      return;
    }
    const { milestones } = nextProps.data.Competency;

    //reformats the milestones response object to a array organized by level
    const milestonesByLevel = reformatArrayByLevel(milestones);
    console.log("MilestoneData ", milestonesByLevel);
    this.setState({
      milestoneData: milestonesByLevel,
      displayedCards: milestonesByLevel[0]
    });
  }

  componentDidUpdate() {
    const {
      achievedAtCurrentLvl,
      displayedCards,
      outOfCards,
      currentLevel,
      payload
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
    // console.log(`The index is ${index}`);
    const {
      achievedAtCurrentLvl,
      displayedCards,
      currentLevel,
      payload
    } = this.state;

    if (displayedCards.length === index + 1) {
      this.setState({ outOfCards: true });
    }
  }

  handleYup(card) {
    // console.log(`Yup for ${card.description}`);
    var { payload, displayedCards, achievedAtCurrentLvl } = this.state;
    const {
      competency,
      currentUser,
      evaluatedUser
    } = this.props.navigation.state.params;
    const evaluatingUser = currentUser.id;
    const milestone = card.id;
    const achieved = true;

    // Change state for achieved milestones
    payload.push({
      milestone,
      achieved,
      evaluatedUser: evaluatedUser.id,
      evaluatingUser
    });
    this.setState({
      achievedAtCurrentLvl: achievedAtCurrentLvl + 1,
      payload
    });
  }

  handleNope(card) {
    // console.log(`Nope for ${card.description}`);
    var { payload } = this.state;
    const {
      competency,
      currentUser,
      evaluatedUser
    } = this.props.navigation.state.params;
    const evaluatingUser = currentUser.id;
    const milestone = card.id;
    const achieved = false;

    payload.push({
      milestone,
      achieved,
      evaluatedUser: evaluatedUser.id,
      evaluatingUser
    });
    this.setState({ payload });
  }

  advanceLevel() {
    const {
      currentLevel,
      milestoneData,
      displayedCards,
      payload
    } = this.state;
    const newIndex = currentLevel + 1;
    console.log(`Awarded Level ${newIndex}`)

    // Exit function if there are no more levels
    if (!milestoneData[newIndex]) {
      console.log("Completed all levels", payload);
      this.submitPayload(newIndex);
      return;
    }

    this.setState({
      displayedCards: milestoneData[newIndex],
      currentLevel: newIndex,
      achievedAtCurrentLvl: 0,
      outOfCards: false
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
            milestone
          }
        })
        .then(({ data }) => {
          console.log("submit evaluation data", data);
        })
        .catch(error => {
          console.log("submit evaluation error", error);
        });
    });

    const { competency, currentUser, evaluatedUser } = this.props.navigation.state.params;
    submitCompetencyAchievement({
      variables: {
        evaluatedUser: evaluatedUser.id,
        evaluatingUser: currentUser.id,
        competency: competency.id,
        level: achievedLevel
      }
    })
    .then(({data}) => { console.log("submit competency achievement data", data)})
    .catch(error => { console.log("submit competency achievement error", error)});
  }

  render() {
    const {
      competency,
      currentUser,
      evaluatedUser
    } = this.props.navigation.state.params;
    const { loading } = this.props.data;
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SwipeCards
        cards={this.state.displayedCards}
        loop={false}
        renderCard={cardData => <Card {...cardData}/>}
        renderNoMoreCards={() => <NoMoreCards {...this.props}/>}
        showYup={true}
        showNope={true}

        yupText="YES"
        nopeText="NO"

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexBasis: 300,
    flexGrow: 0,
    width: '95%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40
  },
  noMoreCardsText: {
    fontSize: 22
  },
  cardText: {
    color: '#3D405B',
    fontSize: 20,
    fontWeight: '600'
  }
});

// export default graphql(submitEvaluation)(
//   graphql(getCompetencyData, {
//     options: ({ navigation }) => ({
//       variables: { competencyId: navigation.state.params.competency.id }
//     })
//   })(EvaluationStack)
// );

export default compose(
  graphql(submitEvaluation, { name: 'submitEvaluation'}),
  graphql(submitCompetencyAchievement, { name: 'submitCompetencyAchievement'}),
  graphql(getCompetencyData, {
    options: ({ navigation }) => ({
      variables: { competencyId: navigation.state.params.competency.id }
    })
  })
)(EvaluationStack);
