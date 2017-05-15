import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { graphql } from 'react-apollo';
import SwipeCards from 'react-native-swipe-cards';

const Card = (props) => (
    <View style={styles.card}>
        <Text>{props.text}</Text>
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
        this.state = { cards: Cards }
    }

    static navigationOptions = {
        title: 'Evaluate'
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
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
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

export default EvaluationStack;