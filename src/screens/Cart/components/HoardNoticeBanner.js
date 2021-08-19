import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {Colors, Fonts} from '../../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const HoardNoticeBanner = () => {
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: RFValue(10),
        paddingHorizontal: RFValue(20),
        backgroundColor: Colors.lightError,
      }}>
      <Text style={{fontSize: Fonts.size.min, color: Colors.error}}>
        NOTICE: Certain products may be subject to quantity limits, in
        compliance with the Department of Trade and Industry Memorandum Circular
        on Anti-Hoarding and Anti-Panic Buying and ordinances imposed by the
        local government units.
      </Text>
    </View>
  );
};

export default HoardNoticeBanner;
