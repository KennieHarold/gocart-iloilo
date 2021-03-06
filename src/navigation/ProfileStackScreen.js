import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ProfileScreen,
  EditProfileScreen,
  ChangePasswordScreen,
} from '../screens/Profile';

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      headerMode="none"
      initialRouteName="Profile"
      mode="card"
      screenOptions={screenOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
