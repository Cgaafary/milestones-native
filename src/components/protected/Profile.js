import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Profile = (props) => {
  const { _handleSignout, currentUser } = props.screenProps;
  return (
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
};

export default Profile;
