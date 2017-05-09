import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { NativeRouter, Route, IndexRoute, Link } from 'react-router-native';

import Login from './src/components/public/Login';
import Auth from './src/components/Auth';

export default class App extends React.Component {
  render() {
  return(
    <NativeRouter>
    <View style={styles.container}>
      <Route exact path="/" component={Auth}/>
      <Route path="/login" component={Login} />
    </View>
  </NativeRouter>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
  
})