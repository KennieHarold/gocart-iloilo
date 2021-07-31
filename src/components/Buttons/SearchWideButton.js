import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Item, Icon, Input} from 'native-base';
import styles from './styles';

const SearchWideButton = () => {
  return (
    <TouchableOpacity>
      <Item style={styles.searchWideButtonItem}>
        <Icon name="ios-search" style={styles.searchWideButtonIcon} />
        <Input
          disabled
          placeholder="Search"
          style={styles.searchWideButtonInput}
          placeholderTextColor="gray"
        />
      </Item>
    </TouchableOpacity>
  );
};

export default SearchWideButton;
