import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {
  OrdersScreen,
  OrderDetailsScreen,
  OrderItemsScreen,
} from '../screens/Orders';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const OrdersStack = createStackNavigator();

const OrdersStackScreen = () => {
  return (
    <OrdersStack.Navigator
      headerMode="none"
      initialRouteName="Orders"
      mode="card"
      screenOptions={screenOptions}>
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
      <OrdersStack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <OrdersStack.Screen name="OrderItems" component={OrderItemsScreen} />
    </OrdersStack.Navigator>
  );
};

export default OrdersStackScreen;
