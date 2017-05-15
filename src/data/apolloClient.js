import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import API_KEY from '../../SECRET/API_KEY';

async function getToken() {
        try {
            const value = await AsyncStorage.getItem('TOKEN');
            if (value !== null){
                // We have data!!
                console.log('Success retrieving token: ', value);
                return value;
            }
        }   catch (error) {
                // Error retrieving data
                console.log('Error retrieving token: ', error)
        }
    }

const networkInterface = createNetworkInterface({
  uri: API_KEY
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTc0MTA1MjksImlhdCI6MTQ5NDgxODUyOSwicHJvamVjdElkIjoiY2oyNHplMHcxMTNkNTAxMTU3ZTVvbXdodSIsInVzZXJJZCI6ImNqMjU2cGkxaGQxejAwMTI5ZmY0NDF6YzIiLCJhdXRoRGF0YSI6eyJlbWFpbCI6ImNwZmVubmlnQGdocy5vcmcifSwibW9kZWxOYW1lIjoiVXNlciJ9.PpDMmRttpjgZXa9P5AVFCv6MVzP70RQcEwMGxoIkbi8'
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}])

export const client = new ApolloClient({
  networkInterface: networkInterface,
  dataIdFromObject: o => o.id
});