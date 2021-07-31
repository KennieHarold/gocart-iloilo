import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from './RootNavigation';
import AppStackScreen from './AppStackScreen';
import AuthStackScreen from './AuthStackScreen';
import {AuthAction} from '../actions';
import {LoadingScreen} from '../components/UIComponents';

const {checkUserLoggedIn} = AuthAction;

const Navigation = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserLoggedIn());
  }, []);

  const [isAuthLoading, isAuthenticated] = useSelector(state => {
    const {
      auth: {isAuthLoading, isAuthenticated},
    } = state;

    return [isAuthLoading, isAuthenticated];
  });

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthLoading ? (
        <LoadingScreen />
      ) : isAuthenticated ? (
        <AppStackScreen />
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
