import React from 'react';
import { graphql } from 'react-apollo';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';

import signinUser from '../../data/mutations/signinUser';
import getCurrentUser from '../../data/queries/getCurrentUser';

class App extends React.Component {
constructor(props) {
    super(props);
    this.state = { email: 'cpfenning@ghs.org', password: '12345' }
  }

  _handleButtonPress = () => {
    const { email, password } = this.state;
        this.props.mutate({
            refetchQueries: [{
                query: getCurrentUser
            }],
            variables: {
                email, password
            }
        }).then(({ data }) => {
            const userAuthData = data.signinUser;
            this.props._handleSignin(userAuthData);
            console.log(userAuthData);

        }).catch((error) => {
            console.log('There was an error: ', error);
        });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodyView}>
          <View style={styles.formContainer}>
            <TextInput 
              style={styles.inputStyling}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder="Email Address"
              keyboardType="email-address"/>
            <TextInput 
              style={styles.inputStyling}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder="Password"
              secureTextEntry={true}/>
            <Button
              title="Sign In"
              onPress={this._handleButtonPress}
              color="#81B29A"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
  headerText: {
    fontFamily: 'Arial',
    fontWeight: '400',
    fontSize: 25,
    color: 'white',
    paddingTop: 10
  },
  headerView: {
    backgroundColor: '#81B29A',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  bodyView: {
    flex: 8,
    width: '100%',
    justifyContent: 'center'
  },
  formContainer: {
    marginTop: -100,
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between'
  },
  inputStyling: {
    height: 50,
    borderColor: '#E07A5F',
    backgroundColor: 'white',
    borderWidth: 2,
    color: '#3D405B',
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Avenir Next',
    fontWeight: 'bold'
  },
  buttonBorder: {
    borderColor: '#E07A5F',
    borderWidth: 2,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 30,
    marginRight: 30
  }
  
});

export default graphql(signinUser)(App);