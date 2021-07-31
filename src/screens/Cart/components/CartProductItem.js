import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import {QtyTicks} from '../../../components/Buttons';
import {Colors, Fonts} from '../../../styles';
import styles from './styles';
import {CartAction} from '../../../actions';
import {RFValue} from 'react-native-responsive-fontsize';
import {toDecimal} from '../../../helpers';

const {incrementQtyCartProduct, removeProductToCart} = CartAction;

const CartProductItem = ({item}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.cartProductListItem}>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <FastImage
          source={{uri: item.product.photoUri}}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.cartProductImage}
        />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 5}}>
            <Text numberOfLines={2} style={styles.cartProductNameLabel}>
              {item.product.name}
            </Text>
          </View>
          <View style={{flex: 3, alignItems: 'flex-end'}}>
            <QtyTicks
              qty={item.quantity}
              increment={qty => dispatch(incrementQtyCartProduct(item, qty))}
            />
          </View>
          <View style={{flex: 3, alignItems: 'flex-end'}}>
            <Text style={styles.cartProductPriceLabel}>
              &#8369;
              {toDecimal(item.product.price * item.quantity)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginLeft: RFValue(40)}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => dispatch(removeProductToCart(item))}
          activeOpacity={0.5}>
          <Icon
            type="FontAwesome"
            name="trash-o"
            style={{
              color: Colors.error,
              fontSize: Fonts.size.mini,
              marginRight: 3,
            }}
          />
          <Text style={{fontSize: Fonts.size.min, color: Colors.error}}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartProductItem;
