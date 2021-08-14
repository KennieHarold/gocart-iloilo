import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import BottomModalContainer from './BottomModalContainer';
import {QtyTicks, PrimaryBigButton} from '../Buttons';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';
import {Fonts} from '../../styles';
import {CartAction} from '../../actions';
import {toDecimal} from '../../helpers';
import FastImage from 'react-native-fast-image';

const {
  clearPressedProduct,
  incrementQtyPressedProductValidator,
  addProductToCart,
} = CartAction;

const AddToCartModal = () => {
  const [isPressedProduct, pressedProduct, selectedStore] = useSelector(
    state => {
      return [
        state.cart.isPressedProduct,
        state.cart.pressedProduct,
        state.store.selectedStore,
      ];
    },
  );

  const dispatch = useDispatch();

  return (
    <BottomModalContainer
      height={300}
      isVisible={isPressedProduct}
      onClose={() => dispatch(clearPressedProduct())}>
      <View style={{width: '100%', flex: 1, marginTop: RFValue(10)}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 3.75}}>
            <FastImage
              source={{uri: pressedProduct.product.photoUri}}
              style={styles.addCartModalImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{flex: 6.25}}>
            <Text
              numberOfLines={3}
              style={{width: '100%', fontSize: Fonts.size.mini}}>
              {pressedProduct.product.name}
            </Text>
            <Text numberOfLines={1} style={styles.addCartModalPriceLabel}>
              &#8369;{toDecimal(pressedProduct.product.price)}
            </Text>
          </View>
        </View>
        <View style={styles.addCartModalQtyContainer}>
          <Text style={styles.addCartModalQtyLabel}>Quantity</Text>
          <QtyTicks
            qty={pressedProduct.qty}
            increment={qty =>
              dispatch(incrementQtyPressedProductValidator(qty))
            }
          />
        </View>
        <PrimaryBigButton
          action={() =>
            dispatch(addProductToCart(pressedProduct, selectedStore))
          }
          text="Add to cart"
          customContainerStyles={{
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
    </BottomModalContainer>
  );
};

export default AddToCartModal;
