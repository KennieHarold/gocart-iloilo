import React from 'react';
import {Platform, View} from 'react-native';
import {Text} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts} from '../../styles';

const TitleHeader = ({title, rightKey}) => {
  return (
    <View
      style={{
        padding: Layout.defaultPaddingNum,
        paddingTop: Platform.OS === 'ios' ? RFValue(50) : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: RFValue(82 + 25),
      }}>
      <Text style={{fontSize: Fonts.size.small, fontWeight: '700'}}>
        {title}
      </Text>
      {rightKey ? rightKey : null}
    </View>
  );
};
export default TitleHeader;
