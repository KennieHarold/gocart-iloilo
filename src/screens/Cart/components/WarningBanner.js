import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {Layout, Colors, Fonts} from '../../../styles';

const WarningBanner = ({message}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.lightPrimary,
        height: 40,
        ...Layout.fullWidthCenterContainer,
      }}>
      <Text
        style={{
          color: Colors.secondPrimary,
          fontSize: Fonts.size.min,
        }}>
        {message ? message : 'This is a warning'}
      </Text>
    </View>
  );
};

export default WarningBanner;
