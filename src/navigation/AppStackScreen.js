import React from 'react';
import {useSelector} from 'react-redux';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {CreateProfileScreen} from '../screens/Profile';
import {MapScreen, PhoneFormScreen, PhoneVerifyScreen} from '../screens/Shared';
import TabsStackScreen from './TabsStackScreen';
import {
  CartScreen,
  CheckoutScreen,
  AddressSelectorScreen,
  OrderConfirmationScreen,
  ScheduleSelectorScreen,
} from '../screens/Cart';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const AppStack = createStackNavigator();

const AppStackScreen = () => {
  const hasUserDocument = useSelector(state => state.auth.hasUserDocument);

  return hasUserDocument ? (
    //  Show this navigation if user has already a user profile
    <AppStack.Navigator
      headerMode="none"
      initialRouteName="Tabs"
      mode="card"
      screenOptions={screenOptions}>
      {/* Tab Navigation  */}
      <AppStack.Screen name="Tabs" component={TabsStackScreen} />

      {/* Shared Navigation  */}
      <AppStack.Screen name="Cart" component={CartScreen} />
      <AppStack.Screen name="Checkout" component={CheckoutScreen} />
      <AppStack.Screen
        name="AddressSelector"
        component={AddressSelectorScreen}
      />
      <AppStack.Screen
        name="ScheduleSelector"
        component={ScheduleSelectorScreen}
      />
      <AppStack.Screen name="Map" component={MapScreen} />
      <AppStack.Screen name="PhoneForm" component={PhoneFormScreen} />
      <AppStack.Screen name="PhoneVerify" component={PhoneVerifyScreen} />
      <AppStack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
      />
    </AppStack.Navigator>
  ) : (
    //  Show this navigation if user don't have user profile
    <AppStack.Navigator
      headerMode="none"
      initialRouteName="CreateProfile"
      mode="card"
      screenOptions={screenOptions}>
      <AppStack.Screen name="NoDoc__PhoneForm" component={PhoneFormScreen} />
      <AppStack.Screen
        name="NoDoc__PhoneVerify"
        component={PhoneVerifyScreen}
      />
      <AppStack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <AppStack.Screen name="NoDoc__Map" component={MapScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
