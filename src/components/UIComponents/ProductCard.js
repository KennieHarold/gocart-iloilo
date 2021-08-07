import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Card, CardItem, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {toDecimal} from '../../helpers';
import {CartAction, FavoritesAction} from '../../actions';

const {selectPressedProduct} = CartAction;
const {toggleFavorites} = FavoritesAction;

const ProductCard = ({product}) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector(state => {
    const favorites = state.favorites.favorites;
    const index = favorites.findIndex(fav => fav.id === product.id);

    return index !== -1;
  });

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
          <TouchableOpacity
            onPress={() => dispatch(toggleFavorites(product, isFavorite))}
            activeOpacity={0.4}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            {isFavorite ? (
              <Icon
                type="MaterialCommunityIcons"
                name="star"
                style={styles.productCardFavIcon}
              />
            ) : (
              <Icon
                type="MaterialCommunityIcons"
                name="star-outline"
                style={styles.productCardFavIcon}
              />
            )}
            <Text numberOfLines={1} style={styles.productCardFavLabel}>
              {isFavorite ? 'Favorite' : 'Add a Favorite'}
            </Text>
          </TouchableOpacity>
        </CardItem>
        <CardItem style={styles.productCardFooter}>
          <TouchableOpacity
            onPress={() => dispatch(selectPressedProduct(product))}
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
