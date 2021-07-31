import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {BrowseScreen} from '../screens/Browse';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const BrowseStack = createStackNavigator();

const BrowseStackScreen = () => {
  return (
    <BrowseStack.Navigator
      headerMode="none"
      initialRouteName="Browse"
      mode="card"
      screenOptions={screenOptions}>
      <BrowseStack.Screen name="Browse" component={BrowseScreen} />
    </BrowseStack.Navigator>
  );
};

export default BrowseStackScreen;
