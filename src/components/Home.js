import React, { Component } from 'react';
import { StyleSheet, View, Button, AsyncStorage, Text } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';

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
        // this.props.navigation.navigate('Protected', {
        //     _handleSignout: this._handleSignout,
        //     currentUser: this.state.currentUser
        // });
    }

    _handleSignout() {
        AsyncStorage.removeItem('token');
        this.setState({authenticated: false});

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'}, { _handleSignin: this._handleSignin } )
            ]
            })
        this.props.navigation.dispatch(resetAction)
    }

    // componentWillMount() {
    //     const { navigate } = this.props.navigation;

    //     if (!this.state.authenticated) {
    //         navigate('Login', { _handleSignin: this._handleSignin })
    //     } else {
    //         this.props.navigation.navigate('ProtectedComponents')
    //     }
    // }

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


export default Home;