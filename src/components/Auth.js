import React, { Component } from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import Login from './public/Login';
import Public from './public/Public';
import ProtectedComponents from './protected/ProtectedComponents';

class Main extends Component {
    constructor(props) {
        super(props);
        this.changeAuthenticatedTo = this.changeAuthenticatedTo.bind(this);
        this._handleSignin = this._handleSignin.bind(this);
        this._handleSignout = this._handleSignout.bind(this);

        this.state = { authenticated: false, currentUser: {} }
    }

    static navigationOptions = {
        title: 'Home',
    }

    changeAuthenticatedTo(bool) {
        this.setState({authenticated: bool});
    }

    _handleSignin({user, token}) {
        AsyncStorage.setItem('token', token);
        this.setState({authenticated: true, currentUser: user})
    }

    _handleSignout() {
        AsyncStorage.removeItem('token');
        this.setState({authenticated: false});
    }

    

    render() {
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

const Navigator = StackNavigator({
    Home: { screen: Main }
})

export default Navigator;