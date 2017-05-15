import React, {Component} from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { graphql } from 'react-apollo';
import getAllCompetencies from '../../../data/queries/getAllCompetencies';

class CompetencyChooser extends Component {
    async getToken() {
        try {
            const value = await AsyncStorage.getItem('TOKEN');
            if (value !== null){
                // We have data!!
                console.log('Success retrieving token: ', value);
            }
        }   catch (error) {
                // Error retrieving data
                console.log('Error retrieving token: ', error)
        }
    }

    render(){
        console.log('Competency Chooser', this.props)
        const { fullName } = this.props.navigation.state.params;
        return(
            <View>
                <Text>{ fullName }</Text>
                <Text>{ fullName }</Text>
                <Text>Competency Chooser</Text>
                <Text>Competency Chooser</Text>
                <Text>Competency Chooser</Text>
            </View>
        );
    }
}

export default graphql(getAllCompetencies)(CompetencyChooser);