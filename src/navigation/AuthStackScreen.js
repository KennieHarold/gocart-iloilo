import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  OnboardingScreen,
  //LoginScreen,
  SignUpScreen,
  ForgetPasswordScreen,
} from '../screens/Onboarding';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      headerMode="none"
      initialRouteName="Onboarding"
      mode="card"
      screenOptions={screenOptions}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      {/* <AuthStack.Screen name="Login" component={LoginScreen} /> */}
      <AuthStack.Screen name="Signup" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
