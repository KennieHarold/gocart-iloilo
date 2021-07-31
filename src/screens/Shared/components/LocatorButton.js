import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Icon} from 'native-base';
import styles from './styles';
import {SharedAction} from '../../../actions';

const {getCurrentLocation} = SharedAction;

const LocatorButton = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(getCurrentLocation())}
      activeOpacity={0.7}
      style={styles.locatorContainer}>
      <Icon
        type="MaterialIcons"
        name="location-searching"
        style={styles.locatorIcon}
      />
    </TouchableOpacity>
  );
};

export default LocatorButton;
