import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/data/apolloClient';

import Home from './src/components/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default () => (
  <ApolloProvider client={client}>
    <View style={styles.container}>
      <Home />
    </View>
  </ApolloProvider>
);