import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const GhostProductCard = ({products, index}) => {
  return (
    products.length % 2 === 1 &&
    index === products.length - 1 && (
      <View style={{width: styles.productCard.width}} />
    )
  );
};

export default GhostProductCard;
