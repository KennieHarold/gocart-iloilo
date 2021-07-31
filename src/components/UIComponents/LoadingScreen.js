import React from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import {Colors} from '../../styles';

const LoadingScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </>
  );
};

export default LoadingScreen;
