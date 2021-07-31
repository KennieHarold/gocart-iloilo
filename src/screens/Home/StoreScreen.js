import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Text, Container, Content, Icon} from 'native-base';
import {connect} from 'react-redux';
import {Layout, Colors, Fonts} from '../../styles';
import FastImage from 'react-native-fast-image';
import {ScreenHeader} from '../../components/Headers';
import {
  CartButton,
  PrimaryBigButton,
  QtyTicks,
  SearchWideButton,
} from '../../components/Buttons';
import {BottomModalContainer} from '../../components/Modals';
import {CategoriesSection, ProductsContent} from './components';
import {StoreAction, CartAction} from '../../actions';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {toDecimal} from '../../helpers';

class StoreScreen extends React.Component {
  componentDidMount() {
    const {selectedStore, getStoreCategories} = this.props;
    getStoreCategories(selectedStore);
  }

  componentWillUnmount() {
    const {
      clearSelectedStoreCategories,
      clearSelectedStoreCategorizedProducts,
    } = this.props;

    clearSelectedStoreCategories();
    clearSelectedStoreCategorizedProducts();
  }

  render() {
    const {
      selectedStore,
      selectedStore: {name, photoUri},
      selectedStoreCategories,
      isSelectedStoreCategoriesLoading,
      isPressedProduct,
      pressedProduct,
      clearPressedProduct,
      incrementQtyPressedProductValidator,
      addProductToCart,
    } = this.props;

    return (
      <>
        <Container>
          <ScreenHeader title={name} rightKey={<CartButton />} />
          <Content>
            <View style={{width: '100%'}}>
              <FastImage
                source={{uri: photoUri}}
                style={styles.storeScreenCover}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={{...Layout.defaultPadding}}>
              <SearchWideButton />
            </View>
            {isSelectedStoreCategoriesLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={{marginTop: Layout.defaultPaddingNum}}
              />
            ) : selectedStoreCategories.length > 0 ? (
              <>
                <CategoriesSection categories={selectedStoreCategories} />
                <ProductsContent categories={selectedStoreCategories} />
              </>
            ) : (
              <View style={{...Layout.flexCenterContainerWithPadding}}>
                <Icon
                  type="Ionicons"
                  name="cart-outline"
                  style={styles.noProductIcon}
                />
                <Text style={styles.noProductText}>
                  There is no available categories in this store
                </Text>
              </View>
            )}
          </Content>
        </Container>
        <BottomModalContainer
          isVisible={isPressedProduct}
          onClose={() => clearPressedProduct()}>
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
                increment={qty => incrementQtyPressedProductValidator(qty)}
              />
            </View>
            <PrimaryBigButton
              action={() => addProductToCart(pressedProduct, selectedStore)}
              text="Add to cart"
              customContainerStyles={{
                position: 'absolute',
                bottom: 0,
              }}
            />
          </View>
        </BottomModalContainer>
      </>
    );
  }
}

const {
  getStoreCategories,
  getProductsByCategoryList,
  clearSelectedStoreCategories,
  clearSelectedStoreCategorizedProducts,
} = StoreAction;

const {
  clearPressedProduct,
  incrementQtyPressedProductValidator,
  addProductToCart,
} = CartAction;

const mapStateToProps = state => {
  const {
    selectedStore,
    selectedStoreCategories,
    isSelectedStoreCategoriesLoading,
  } = state.store;

  const {isPressedProduct, pressedProduct} = state.cart;

  return {
    selectedStore,
    selectedStoreCategories,
    isSelectedStoreCategoriesLoading,
    isPressedProduct,
    pressedProduct,
  };
};

export default connect(mapStateToProps, {
  getStoreCategories,
  getProductsByCategoryList,
  clearSelectedStoreCategories,
  clearSelectedStoreCategorizedProducts,
  clearPressedProduct,
  incrementQtyPressedProductValidator,
  addProductToCart,
})(StoreScreen);
