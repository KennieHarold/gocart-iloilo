import React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Icon, Text} from 'native-base';
import styles from './styles';
import {useSelector} from 'react-redux';
import * as RootNavigation from '../../navigation/RootNavigation';

const CartButton = () => {
  let cart = useSelector(state => state.cart.cart);
  let isLoading = useSelector(state => state.cart.isCartLoading);

  let numberOfItems = cart.length;

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={() => RootNavigation.navigate('Cart')}
      activeOpacity={0.9}
      style={styles.cartButtonContainer}>
      {isLoading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          <Icon
            type="SimpleLineIcons"
            name="handbag"
            style={styles.cartButtonIcon}
          />
          {numberOfItems !== 0 ? (
            <Text style={styles.cartButtonText}>{numberOfItems}</Text>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(CartButton);
