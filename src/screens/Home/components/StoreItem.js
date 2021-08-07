import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const StoreItem = ({store, navigateStore}) => {
  return (
    <View style={styles.storeItemContainer}>
      <TouchableOpacity
        onPress={() => navigateStore(store)}
        activeOpacity={0.7}
        style={styles.storeItemCard}>
        <FastImage
          source={{uri: store.photoUri}}
          style={styles.storeItemCardImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      <Text style={styles.storeTitleLabel}>
        {store.name ? store.name : 'Unknown Store'}
      </Text>
      {/* <Text style={styles.storeDescLabel}>
        {store.description ? store.description : 'No description'}
      </Text> */}
    </View>
  );
};

export default React.memo(StoreItem);
