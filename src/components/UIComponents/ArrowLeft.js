import React, {memo} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import * as RootNavigation from '../../navigation/RootNavigation';

const Arrowleft = () => {
  return (
    <TouchableOpacity
      onPress={() => RootNavigation.goBack()}
      activeOpacity={0.7}
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 20,
      }}>
      <Icon type="AntDesign" name="arrowleft" />
    </TouchableOpacity>
  );
};

export default memo(Arrowleft);
