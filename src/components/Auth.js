import React, { Component } from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import { Route } from 'react-router-native';
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
                <Route exact path="/" render={props => <Public {...props} _handleSignin={this._handleSignin}/>} />
                // <Public _handleSignin={this._handleSignin}/>
                    );
        } else {
        return(
            <Route exact path="/" render={props => <ProtectedComponents {...props} _handleSignout={this._handleSignout} currentUser={this.state.currentUser}/>} />
                // <ProtectedComponents _handleSignout={this._handleSignout} currentUser={this.state.currentUser}/>
        )
        }
    }
}

export default Main;