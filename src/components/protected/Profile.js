import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

// const currentUser = {
//   fullName: 'Chris Gaafary',
//   userType: 'FACULTY'
// }

class Profile extends Component {
    render() {
        const { _handleSignout, currentUser } = this.props.screenProps;
        console.log(_handleSignout, currentUser)
        return(
            <View style={styles.container}>
                <Text>
                    {currentUser.fullName}
                </Text>
                <Text>
                    {currentUser.userType}
                </Text>
                <Text>
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
    justifyContent: 'center'
  }
});

export default Profile;