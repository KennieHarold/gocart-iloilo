import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts} from '../../styles';

const TitleHeader = ({title, rightKey}) => {
  return (
    <View
      style={{
        padding: Layout.defaultPaddingNum,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: RFValue(89),
      }}>
      <Text style={{fontSize: Fonts.size.small, fontWeight: '700'}}>
        {title}
      </Text>
      {rightKey ? rightKey : null}
    </View>
  );
};
export default TitleHeader;
