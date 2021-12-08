/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Provider as StoreProvider} from 'react-redux';
import AppContainer from './navigation';
import store from './redux/store';

const App = () => {
  return (
    <StoreProvider store={store}>
      <AppContainer />
    </StoreProvider>
  );
};

export default App;

