import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, List, Detail} from '../screens';

const mainStack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <mainStack.Navigator initialRouteName="Login">
      <mainStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <mainStack.Screen
        name="List"
        component={List}
        options={{headerShown: false}}
      />
      <mainStack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
    </mainStack.Navigator>
  );
};

export default MainStack;
