import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';

const SocialButton = ({social, action, customButtonStyles}) => {
  const backgroundColor =
    social === 'facebook' ? '#4A6EA8' : social === 'google' ? '#EA4335' : null;

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.9}
      style={[styles.socialButton, {backgroundColor, ...customButtonStyles}]}>
      <Icon type="FontAwesome" name={social} style={styles.socialButtonIcon} />
      <Text style={styles.socialButtonText}>{social}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
