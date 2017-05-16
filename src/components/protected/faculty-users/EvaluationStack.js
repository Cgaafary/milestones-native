import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import { graphql } from 'react-apollo';
import SwipeCards from 'react-native-swipe-cards';

import getCompetencyData from '../../../data/queries/getCompetencyData';
import submitEvaluation from '../../../data/mutations/submitEvaluation';

import { getObjectById, reformatArrayByLevel } from '../../../assets/customFunctions';

const Card = (props) => (
    <View style={styles.card}>
        <Text>{props.description}</Text>
      </View>
)

const NoMoreCards = (props) => {
    return (
        <View>
            <Text style={styles.noMoreCardsText}>No more cards</Text>
        </View>
    )
}

const Cards = [
    [
        {description: 'Card 1 - Level 1', id: '11'},
        {description: 'Card 2 - Level 1', id: '21'},
        {description: 'Card 3 - Level 1', id: '31'}
    ],
    [
        {description: 'Card 1 - Level 2', id: '12'},
        {description: 'Card 2 - Level 2', id: '22'},
        {description: 'Card 3 - Level 2', id: '32'}
    ],
    [
        {description: 'Card 1 - Level 3', id: '13'},
        {description: 'Card 2 - Level 3', id: '23'},
        {description: 'Card 3 - Level 3', id: '33'}
    ]
]

class EvaluationStack extends Component {
    constructor() {
        super();
        this.state = { 
            displayedCards: [],
            milestoneData: [],
            milestoneIndex: 0,
            achievedAtCurrentLvl: 0,
            outOfCards: false,
            payload: []
        }

        this.handleNope = this.handleNope.bind(this);
        this.handleYup = this.handleYup.bind(this);
        this.cardRemoved = this.cardRemoved.bind(this);
    }

    static navigationOptions = {
        title: 'Evaluate'
    }

    // Add asynchronous data to state when component loaded
    componentWillReceiveProps(nextProps) {
        const { loading } = nextProps.data;
        if (loading) { return }
        const { milestones } = nextProps.data.Competency;
        
        //reformats the milestones response object to a array organized by level
        const milestonesByLevel = reformatArrayByLevel(milestones);
        console.log('MilestoneData ', milestonesByLevel)
        this.setState({
            milestoneData: milestonesByLevel,
            displayedCards: milestonesByLevel[0],
        })
    }

    componentDidUpdate() {
        const { achievedAtCurrentLvl, displayedCards, outOfCards, milestoneIndex, payload } = this.state;
        // console.log('Achieved at current lvl: ', this.state.achievedAtCurrentLvl)

        if (achievedAtCurrentLvl === displayedCards.length) {
            console.log(`Level ${milestoneIndex + 1} achieved`);
            this.advanceLevel();
        } else if (outOfCards) {
            console.log("Sorry you didn't successfully complete the level")
            this.submitPayload();
        }
    }

    cardRemoved(index) {
        // console.log(`The index is ${index}`);
        const { achievedAtCurrentLvl, displayedCards, milestoneIndex, payload } = this.state;
        // const { displayedCards } = this.state;

        if (displayedCards.length === index + 1) {
            console.log('Finished Level!')
            this.setState({outOfCards: true})
        }

    }

    handleYup (card) {
        console.log(`Yup for ${card.description}`)
        var { payload, displayedCards, achievedAtCurrentLvl } = this.state;
        const { competency, currentUser, evaluatedUser } = this.props.navigation.state.params;
        const evaluatingUser = currentUser.id;
        const milestone = card.id;
        const achieved = true;

        // Change state for achieved milestones
        payload.push({milestone, achieved, evaluatedUser: evaluatedUser.id, evaluatingUser});
        this.setState({
            achievedAtCurrentLvl: achievedAtCurrentLvl + 1,
            payload
        });
    }

    handleNope (card) {
        console.log(`Nope for ${card.description}`)
        var { payload } = this.state;
        const { competency, currentUser, evaluatedUser } = this.props.navigation.state.params;
        const evaluatingUser = currentUser.id;
        const milestone = card.id;
        const achieved = false;

        payload.push({milestone, achieved, evaluatedUser: evaluatedUser.id, evaluatingUser});
        this.setState({payload});
    }

    advanceLevel () {
        const { milestoneIndex, milestoneData, displayedCards, payload } = this.state;
        const newIndex = milestoneIndex + 1;

        // Exit function if there are no more levels
        if (!milestoneData[newIndex]) { 
            console.log('Completed all levels', payload);
            this.submitPayload();
            return; 
        }

        this.setState({
            displayedCards: milestoneData[newIndex],
            milestoneIndex: newIndex,
            achievedAtCurrentLvl: 0,
            outOfCards: false
        })
    }

    // Submits evaluation data to the server **Pending
    submitPayload() {
        const { payload } = this.state;
        // eslint-disable-next-line
        payload.map(({achieved, evaluatedUser, evaluatingUser, milestone}) => {
            this.props.mutate({
                variables: {
                    achieved,
                    evaluatedUserId: evaluatedUser,
                    evaluatingUserId: evaluatingUser,
                    milestoneId: milestone
                }
            })
            .then(({ data }) => {
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error', error);
            })
        });
    }
    
    render() {
        const { competency, currentUser, evaluatedUser } = this.props.navigation.state.params;
        const { loading } = this.props.data;
        if (loading) { return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator size="large" /></View> }
        return (
        <SwipeCards
            cards={this.state.displayedCards}
            loop={false}

            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}
            
            showYup={true}
            showNope={true}

            handleYup={this.handleYup}
            handleNope={this.handleNope}
            cardRemoved={this.cardRemoved}
        />
        )
    }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexBasis: 300,
    flexGrow: 0,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})

export default graphql(submitEvaluation)(
graphql(getCompetencyData, {
    options: ({navigation}) => ({ variables: { competencyId: navigation.state.params.competency.id }})
})(EvaluationStack));