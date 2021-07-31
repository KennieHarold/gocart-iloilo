import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'native-base';
import styles from './styles';
import {CartButton} from '../../../components/Buttons';

const HomeHeader = ({username, address}) => {
  return (
    <View style={styles.homeHeaderLayout}>
      <View style={{flex: 5}}>
        <Text style={styles.homeHeaderLabel}>
          {`Hi, ${username ? username : 'there'}!`}
        </Text>
        <Text numberOfLines={2} style={styles.homeHeaderAddress}>
          {`Deliver to ${address ? address : 'unknown'}`}
        </Text>
      </View>
      <View style={{flex: 1.5, alignItems: 'flex-end'}}>
        <CartButton />
      </View>
    </View>
  );
};

export default HomeHeader;
