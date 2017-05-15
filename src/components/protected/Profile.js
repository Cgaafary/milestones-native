import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

// const currentUser = {
//   fullName: 'Chris Gaafary',
//   userType: 'FACULTY'
// }

class Profile extends Component {
    /*static navigationOptions = {
    tabBarLabel: 'Profile',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./User-100.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
        ),
    };*/

    render() {
        const { _handleSignout, currentUser } = this.props.screenProps;
        console.log(_handleSignout, currentUser)
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    {currentUser.fullName}
                </Text>
                <Text style={styles.title}>
                    {currentUser.userType}
                </Text>
                <Text style={styles.paragraph}>
                    add profile content later...
                </Text>
                <Button title="Sign Out" onPress={_handleSignout} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  title: {
    fontSize: 25,
    fontWeight: '800'
  }
});

export default Profile;