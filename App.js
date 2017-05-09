import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { NativeRouter, Route, IndexRoute, Link } from 'react-router-native';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/data/apolloClient';

import Login from './src/components/public/Login';
import Auth from './src/components/Auth';

export default class App extends React.Component {
  render() {
  return(
    <ApolloProvider client={client}>
      <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={Auth}/>
      </View>
      </NativeRouter>
    </ApolloProvider>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
  
})