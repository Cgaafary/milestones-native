import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import API_KEY from '../../SECRET/API_KEY';

const networkInterface = createNetworkInterface({
  uri: API_KEY
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = AsyncStorage.getItem('token');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}])

export const client = new ApolloClient({
  networkInterface: networkInterface,
  dataIdFromObject: o => o.id
});