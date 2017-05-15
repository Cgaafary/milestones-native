import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, ActivityIndicator, FlatList, Alert, TouchableHighlight } from 'react-native';
import { graphql } from 'react-apollo';
import getAllCompetencies from '../../../data/queries/getAllCompetencies';

const colors = {
  primary: '#3D405B',
  secondary: '#81B29A'
}

const ListItem = (props) => {
    const _handlePress = () => {
        console.log(props)
    }
    return(
      <TouchableHighlight 
        onPress={_handlePress}
        underlayColor="white"
        activeOpacity={0.7}>
        <View>
        <Text style={styles.listItemText}>{props.title}</Text>
      </View>
      </TouchableHighlight>
      )
}

class CompetencyChooser extends Component {
    static navigationOptions = {
        title: 'Choose a Competency'
    }

    render() {
        const { loading, allCompetencies } = this.props.data;
        if (loading) { return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator size="large" /></View> }
        return (
            <View>
                <FlatList
                    data={allCompetencies}
                    renderItem={({item}) => <ListItem id={item.id} title={item.title} navigation={this.props.navigation}/>}
                    keyExtractor={item => item.id}
                    style={styles.listContainer}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItemText: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: '300',
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 30
    },
    listContainer: {
        paddingTop: 20
    }
})

export default graphql(getAllCompetencies)(CompetencyChooser);