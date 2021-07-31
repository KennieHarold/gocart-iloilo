import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import * as RootNavigation from '../../navigation/RootNavigation';

const Arrowleft = () => {
  return (
    <TouchableOpacity
      onPress={() => RootNavigation.goBack()}
      activeOpacity={0.7}
      style={{position: 'absolute', top: 20, left: 20}}>
      <Icon type="AntDesign" name="arrowleft" />
    </TouchableOpacity>
  );
};

export default memo(Arrowleft);
