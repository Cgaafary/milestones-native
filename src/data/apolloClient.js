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

    AsyncStorage.getItem('TOKEN')
      .then((response) => {
        const token = response;
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      }).catch((error) => {
        console.log('Token Error: ', error)
        req.options.headers.authorization = null;
        next();
      })
  }
}])

export const client = new ApolloClient({
  networkInterface: networkInterface,
  dataIdFromObject: o => o.id
});