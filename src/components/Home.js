import React, { Component } from 'react';
import { StyleSheet, View, Button, AsyncStorage, Text, ActivityIndicator } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { graphql } from 'react-apollo';

import Login from './public/Login';
import Public from './public/Public';
import ProtectedComponents from './protected/ProtectedComponents';

class Home extends Component {
    constructor(props) {
        super(props);
        this.changeAuthenticatedTo = this.changeAuthenticatedTo.bind(this);
        this._handleSignin = this._handleSignin.bind(this);
        this._handleSignout = this._handleSignout.bind(this);

        this.state = { authenticated: false, currentUser: {} }
    }

    changeAuthenticatedTo(bool) {
        this.setState({authenticated: bool});
    }

    _handleSignin({user, token}) {
        AsyncStorage.setItem('token', token);
        this.setState({authenticated: true, currentUser: user});
    }

    _handleSignout() {
        AsyncStorage.removeItem('token');
        this.setState({authenticated: false});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
           <View>
                <Text>Welcome to the landing page!</Text>
                <Button title="Login" onPress={() => navigate('Login', { _handleSignin: this._handleSignin })} />
            </View>
        )
    }

    render() {
        const { loading } = this.props.data;
        if (loading) { return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator size="large" /></View> }
        if (!this.state.authenticated) {
            return (
                <Public _handleSignin={this._handleSignin}/>
                    );
        } else {
            return(
                <ProtectedComponents _handleSignout={this._handleSignout} currentUser={this.state.currentUser}/>
            )
        }
    }
}

import getCurrentUser from '../data/queries/getCurrentUser';
export default graphql(getCurrentUser)(Home);