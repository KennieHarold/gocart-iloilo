import React from 'react';
import {ListItem, Text, Left, Body, Right, Icon} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts, Colors} from '../../../styles';
import styles from './styles';
import {FavoritesAction, CartAction} from '../../../actions';

const {toggleFavorites} = FavoritesAction;
const {selectPressedProduct} = CartAction;

const FavoriteItem = ({product}) => {
  const dispatch = useDispatch();

  const getStoreName = id => {
    const availableStores = useSelector(state => state.store.availableStores);

    let index = availableStores.findIndex(store => store.id === id);

    if (index !== -1) {
      return availableStores[index].name;
    }

    return 'Error Loading Store';
  };

  return (
    <ListItem noIndent>
      <Left style={{flex: 1.25}}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{uri: product.photoUri}}
          style={styles.favoriteItemImage}
        />
      </Left>
      <Body style={{flex: 5}}>
        <Text
          numberOfLines={2}
          style={{fontSize: Fonts.size.mini, fontWeight: '700'}}>
          {product.name}
        </Text>
        <View style={styles.favoriteRowItem}>
          <Icon
            type="AntDesign"
            name="isv"
            style={{
              color: Colors.readableText,
              fontSize: Fonts.size.mini,
            }}
          />
          <Text
            numberOfLines={2}
            style={{
              fontSize: Fonts.size.min,
              color: Colors.readableText,
              marginLeft: 5,
            }}>
            {getStoreName(product.storeId)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(selectPressedProduct(product))}
          activeOpacity={0.7}
          style={{...styles.favoriteRowItem, marginTop: RFValue(15)}}>
          <Icon
            type="SimpleLineIcons"
            name="basket"
            style={{
              color: Colors.primary,
              fontSize: Fonts.size.mini,
            }}
          />
          <Text numberOfLines={2} style={styles.favoriteItemCartText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </Body>
      <Right style={[{flex: 1}]}>
        <TouchableOpacity
          onPress={() => dispatch(toggleFavorites(product, true))}
          activeOpacity={0.7}>
          <Icon
            type="MaterialCommunityIcons"
            name="star"
            style={{fontSize: RFValue(30), color: Colors.gold}}
          />
        </TouchableOpacity>
      </Right>
    </ListItem>
  );
};

export default React.memo(FavoriteItem);
