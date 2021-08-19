import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {Layout, Colors, Fonts} from '../../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const WarningBanner = ({message}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.lightError,
        height: RFValue(40),
        ...Layout.fullWidthCenterContainer,
      }}>
      <Text
        style={{
          color: Colors.error,
          fontSize: Fonts.size.min,
        }}>
        {message ? message : 'This is a warning'}
      </Text>
    </View>
  );
};

export default WarningBanner;
