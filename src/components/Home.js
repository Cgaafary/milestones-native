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
        this._handleSignin = this._handleSignin.bind(this);
        this._handleSignout = this._handleSignout.bind(this);

        this.state = { authenticated: false, currentUser: {} }
    }

    async _handleSignin({user, token}) {
        try {
            await AsyncStorage.setItem('TOKEN', token);
            this.setState({authenticated: true, currentUser: user});
        } catch (error) {
            console.log('Error storing token: ', error);
        }
    }

    _handleSignout() {
        AsyncStorage.removeItem('TOKEN');
        this.setState({authenticated: false});
    }
    
    componentWillReceiveProps(nextProps) {
        const { loading, user } = nextProps.data;

        if (loading) { return }

        if (user) {
            this.setState({ authenticated: true, currentUser: user })
        }
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