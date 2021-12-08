import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from '../navigation/mainStack';

const AppContainer = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppContainer;