import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Card, CardItem, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {toDecimal} from '../../helpers';

const ProductCard = ({product, selectPressedProduct}) => {
  return (
    <TouchableOpacity activeOpacity={1}>
      <Card style={styles.productCard}>
        <CardItem cardBody style={styles.productCardImageContainer}>
          <FastImage
            source={{uri: product.photoUri}}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.productCardImage}
          />
        </CardItem>
        <CardItem style={styles.productCardNameContainer}>
          <Text numberOfLines={2} style={styles.productCardNameLabel}>
            {product.name}
          </Text>
        </CardItem>
        <CardItem style={styles.productCardPriceContainer}>
          <Text numberOfLines={1} style={styles.productCardPriceLabel}>
            &#8369;{toDecimal(product.price)}
          </Text>
        </CardItem>
        <CardItem style={styles.productCardFavContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity activeOpacity={0.6} style={{marginRight: 3}}>
              <Icon
                type="MaterialCommunityIcons"
                name="star-outline"
                style={styles.productCardFavIcon}
              />
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.productCardFavLabel}>
              Add a Favorite
            </Text>
          </View>
        </CardItem>
        <CardItem style={styles.productCardFooter}>
          <TouchableOpacity
            onPress={selectPressedProduct}
            activeOpacity={0.8}
            style={styles.addCartButton}>
            <Icon
              type="Ionicons"
              name="cart-outline"
              style={styles.addCartButtonIcon}
            />
            <Text style={styles.addCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default React.memo(ProductCard);
