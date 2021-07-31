import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  StoreScreen,
  SingleCategoryProductsScreen,
} from '../screens/Home';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      headerMode="none"
      initialRouteName="Home"
      mode="card"
      screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Store" component={StoreScreen} />
      <HomeStack.Screen
        name="SingleCategoryProducts"
        component={SingleCategoryProductsScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
