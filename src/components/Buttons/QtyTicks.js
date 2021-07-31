import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'native-base';
import styles from './styles';

const QtyTicks = ({qty, increment}) => {
  return (
    <View style={styles.qtyTicksContainer}>
      <TouchableOpacity onPress={() => increment(-1)} activeOpacity={0.8}>
        <Icon type="AntDesign" name="minus" style={styles.qtyTicksIcon} />
      </TouchableOpacity>
      <Text style={styles.qtyTicksText}>{qty}</Text>
      <TouchableOpacity onPress={() => increment(1)} activeOpacity={0.8}>
        <Icon type="AntDesign" name="plus" style={styles.qtyTicksIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default QtyTicks;
