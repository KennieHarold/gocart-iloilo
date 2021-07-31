import React from 'react';
import {View} from 'react-native';
import {Text, Radio} from 'native-base';
import {Colors, Fonts} from '../../../styles';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';

const AddressSelectorItem = ({address}) => {
  return (
    <View style={styles.addressSelectorItemLayout}>
      <Radio
        selected={true}
        color={'rgb(0, 0, 0)'}
        selectedColor={Colors.primary}
        style={{marginRight: RFValue(15)}}
      />
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: Fonts.size.mini,
            fontWeight: '700',
            marginBottom: RFValue(5),
          }}>
          {address.formattedAddress}
        </Text>
        <Text
          style={{
            fontSize: Fonts.size.mini,
            color: Colors.readableText,
          }}>
          {address.noteToRider}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(AddressSelectorItem);
