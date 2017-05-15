import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { graphql } from 'react-apollo';
import SwipeCards from 'react-native-swipe-cards';

import getCompetencyData from '../../../data/queries/getCompetencyData';
import { getObjectById, reformatArrayByLevel } from '../../../assets/customFunctions';

const Card = (props) => (
    <View style={styles.card}>
        <Text>{props.description}</Text>
      </View>
)

const NoMoreCards = (props) => (
    <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
    </View>
)

const Cards = [
  {text: 'Tomato', backgroundColor: 'red'},
  {text: 'Aubergine', backgroundColor: 'purple'},
  {text: 'Courgette', backgroundColor: 'green'},
  {text: 'Blueberry', backgroundColor: 'blue'},
  {text: 'Umm...', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
]

class EvaluationStack extends Component {
    constructor() {
        super();
        this.state = { 
            cards: Cards ,
            currentMilestones: [],
        }
    }

    static navigationOptions = {
        title: 'Evaluate'
    }

    componentWillReceiveProps(nextProps) {
        const { loading } = nextProps.data;
        if (loading) { return }

        const { milestones } = nextProps.data.Competency;
        const milestonesByLevel = reformatArrayByLevel(milestones);
        this.setState({
            currentMilestones: milestonesByLevel,
            cards: milestonesByLevel[0]
        })
    }

    handleYup (card) {
        console.log(`Yup for ${card.text}`)
    }

    handleNope (card) {
        console.log(`Nope for ${card.text}`)
    }

    handleMaybe (card) {
        console.log(`Maybe for ${card.text}`)
    }
    
    render() {
        console.log('Evaluation Stack Props: ',this.props.navigation.state.params.competency)
        console.log(this.props.data);
        console.log(this.state);
        return (
        <SwipeCards
            cards={this.state.cards}

            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <NoMoreCards />}
            
            showYup={true}
            showNope={true}

            handleYup={this.handleYup}
            handleNope={this.handleNope}
            handleMaybe={this.handleMaybe}
            hasMaybeAction={true}
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

export default graphql(getCompetencyData, {
    options: ({navigation}) => ({ variables: { competencyId: navigation.state.params.competency.id }})
})(EvaluationStack)