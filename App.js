import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/data/apolloClient';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from './src/components/public/Login';
import Home from './src/components/Home';
import ProtectedComponents from './src/components/protected/ProtectedComponents';

export default class App extends React.Component {
  render() {
  return(
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Home />
      </View>
    </ApolloProvider>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
  
})