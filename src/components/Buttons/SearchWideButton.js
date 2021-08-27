import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Item, Icon, Input} from 'native-base';
import styles from './styles';

const SearchWideButton = ({action, placeholder}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={action}>
      <View pointerEvents="none">
        <Item style={styles.searchWideButtonItem}>
          <Icon name="ios-search" style={styles.searchWideButtonIcon} />
          <Input
            disabled
            placeholder={placeholder ? placeholder : 'Search'}
            style={styles.searchWideButtonInput}
            placeholderTextColor="gray"
          />
        </Item>
      </View>
    </TouchableOpacity>
  );
};

export default SearchWideButton;
