import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoritesScreen} from '../screens/Favorites';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const FavoritesStack = createStackNavigator();

const FavoritesStackScreen = () => {
  return (
    <FavoritesStack.Navigator
      headerMode="none"
      initialRouteName="Favorites"
      mode="card"
      screenOptions={screenOptions}>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesStackScreen;
