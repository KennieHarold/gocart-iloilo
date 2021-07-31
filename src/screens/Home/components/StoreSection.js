import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import {Colors, Layout} from '../../../styles';
import StoreItem from './StoreItem';

const StoreSection = ({stores, navigateStore, isLoading}) => {
  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={Colors.primary}
      style={{marginTop: Layout.defaultPaddingNum}}
    />
  ) : (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.storesList}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      scrollEnabled
      numColumns={2}
      data={stores}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <StoreItem navigateStore={navigateStore} store={item} />
      )}
    />
  );
};

export default StoreSection;
