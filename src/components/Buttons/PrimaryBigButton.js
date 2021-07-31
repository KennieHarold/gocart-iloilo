import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';
import styles from './styles';
import {Colors} from '../../styles';

const PrimaryBigButton = ({
  text,
  action,
  customContainerStyles,
  customTextStyles,
  icon,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={action}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: Colors.primary,
          ...customContainerStyles,
        },
        styles.bigButtonLayout,
      ]}>
      {icon !== undefined ? (
        <View style={{marginRight: 15}}>{icon}</View>
      ) : null}
      <Text style={[styles.bigButtonText, {...customTextStyles}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default memo(PrimaryBigButton);
