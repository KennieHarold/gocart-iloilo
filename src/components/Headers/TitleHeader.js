import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts} from '../../styles';

const TitleHeader = ({title}) => {
  return (
    <View
      style={{
        padding: Layout.defaultPaddingNum,
        backgroundColor: 'white',
        height: RFValue(80),
      }}>
      <Text style={{fontSize: Fonts.size.small, fontWeight: '700'}}>
        {title}
      </Text>
    </View>
  );
};
export default TitleHeader;
