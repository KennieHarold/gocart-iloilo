import React from 'react';
import {View, Platform, StatusBar} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const StatusBarPlaceHolder = ({backgroundColor}) => {
  return (
    <View
      style={{
        width: '100%',
        height: STATUS_BAR_HEIGHT,
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor ? backgroundColor : 'white'}
      />
    </View>
  );
};

export default StatusBarPlaceHolder;
