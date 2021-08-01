import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts, Colors, Layout} from '../../../styles';

const NoResults = () => {
  return (
    <View style={{...Layout.fullWidthCenterContainer}}>
      <Icon
        type="Ionicons"
        name="search-outline"
        style={{
          fontSize: RFValue(50),
          color: Colors.readableText,
          marginBottom: RFValue(10),
        }}
      />
      <Text
        style={{
          fontSize: Fonts.size.mini,
          color: Colors.readableText,
        }}>
        No results found
      </Text>
    </View>
  );
};

export default React.memo(NoResults);
