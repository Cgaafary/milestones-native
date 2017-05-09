import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Header from './Header';
import Login from './public/Login';
import Public from './public/Public';

class Main extends Component {
    constructor(props) {
        super(props);
        this.changeAuthenticatedTo = this.changeAuthenticatedTo.bind(this);

        this.state = { authenticated: false }
    }

    changeAuthenticatedTo(bool) {
        this.setState({authenticated: bool});
        return;
    }

    

    render() {
        if (!this.state.authenticated) {
            return (
                <Public
                    changeAuthenticatedTo={this.changeAuthenticatedTo}/>)
        } else {
        return(
           <Header>
                <Button title="Sign Out" onPress={() => this.setState({authenticated: false})}/>
            </Header>
        )
        }
    }
}

const styles = StyleSheet.create({
   
});

export default Main;