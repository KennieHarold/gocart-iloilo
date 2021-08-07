import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout} from '../../../styles';
import styles from './styles';

const NoResults = () => {
  return (
    <View style={{...Layout.fullWidthCenterContainer, marginTop: RFValue(25)}}>
      <Icon
        type="Ionicons"
        name="search-outline"
        style={styles.noResultsIcon}
      />
      <Text style={styles.noResultsText}>No results found</Text>
    </View>
  );
};

export default React.memo(NoResults);
