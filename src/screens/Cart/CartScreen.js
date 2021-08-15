import React from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import {Fonts, Colors, Layout} from '../../styles';
import {StoreSection, WarningBanner} from './components';
import emptyCart from '../../assets/empty-cart.png';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {CartAction} from '../../actions';
import Snackbar from 'react-native-snackbar';
import {toDecimal} from '../../helpers';
import {subTotalComputer, categorizedCartComputer} from '../../computers';
import {appConstants} from '../../firebase/collections';

class CartScreen extends React.Component {
  state = {
    isLoading: false,
    minPurchase: null,
    maxPurchase: null,
    isError: false,
  };

  componentDidMount() {
    this.autoSelectFirstStore();
    this.getMinMaxPurchase();
  }

  autoSelectFirstStore = () => {
    const {categorizedCart, cartLength, selectStoreIdInCart} = this.props;

    if (cartLength > 0) {
      const firstStoreKey = Object.keys(categorizedCart)[0];
      selectStoreIdInCart(categorizedCart[firstStoreKey].storeId);
    }
  };

  getMinMaxPurchase = async () => {
    this.setState({isLoading: true});

    try {
      const minPurchaseRef = appConstants.doc('minPurchase').get();
      const maxPurchaseRef = appConstants.doc('maxPurchase').get();

      const [minPurchaseSnapshot, maxPurchaseSnapshot] = await Promise.all([
        minPurchaseRef,
        maxPurchaseRef,
      ]);

      if (minPurchaseSnapshot && maxPurchaseSnapshot) {
        const minPurchase = minPurchaseSnapshot.data().value;
        const maxPurchase = maxPurchaseSnapshot.data().value;

        this.setState({minPurchase, maxPurchase});
      } else {
        throw new Error('Min or max snaphot is undefined');
      }
    } catch (error) {
      console.log(error);
      this.setState({isError: true});
    }

    this.setState({isLoading: false});
  };

  handleNavigateCheckout = () => {
    const {selectedStoreId, categorizedCart, navigateCheckout, subtotal} =
      this.props;

    if (categorizedCart[selectedStoreId] !== undefined) {
      navigateCheckout(categorizedCart[selectedStoreId], subtotal);
    } else {
      Snackbar.show({
        text: 'Please choose a store',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  getCheckoutCartLength = () => {
    const {categorizedCart, selectedStoreId} = this.props;

    if (categorizedCart[selectedStoreId] !== undefined) {
      return categorizedCart[selectedStoreId].products.length;
    }
    return 0;
  };

  getMinPurchaseMessage = () => {
    const {subtotal} = this.props;

    const message = `Add ${String.fromCharCode(0x20b1)}${toDecimal(
      this.state.minPurchase - subtotal,
    )} more to reach minimum purchase`;

    return message;
  };

  render() {
    const {categorizedCart, cartLength, subtotal} = this.props;

    return (
      <Container style={{backgroundColor: Colors.lightBackground}}>
        <ScreenHeader
          title={cartLength > 0 ? `My Cart (${cartLength})` : 'My Cart'}
        />
        {cartLength > 0 ? (
          this.state.isLoading ? (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={{marginTop: Layout.defaultPaddingNum}}
            />
          ) : (
            <>
              <Content>
                {subtotal < this.state.minPurchase ? (
                  <WarningBanner message={this.getMinPurchaseMessage()} />
                ) : subtotal > this.state.maxPurchase ? (
                  <WarningBanner message="You've reached maximum purchase" />
                ) : null}

                <View style={{width: '100%'}}>
                  {Object.keys(categorizedCart).map(key => {
                    return (
                      <StoreSection
                        key={`store-section-${key}`}
                        categorizedCart={categorizedCart[key]}
                      />
                    );
                  })}
                </View>
              </Content>
              <View style={styles.cartScreenFooterLayout}>
                <View style={styles.cartScreenSubtotalContainer}>
                  <Text style={styles.cartScreenSubtotalLabel}>Sub Total:</Text>
                  <Text style={styles.cartScreenPriceLabel}>
                    &#8369;{toDecimal(subtotal)}
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={this.state.isError}
                  onPress={this.handleNavigateCheckout}
                  activeOpacity={0.9}
                  style={styles.cartScreenCheckoutButton}>
                  <Text style={styles.cartScreenCheckoutButtonLabel}>
                    {`Check Out (${this.getCheckoutCartLength()})`}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )
        ) : (
          <SafeAreaView style={styles.emptyCartLayout}>
            <FastImage source={emptyCart} style={styles.emptyCartImage} />
            <Text
              style={{
                fontSize: Fonts.size.verySmall,
                color: Colors.readableText,
                marginBottom: RFValue(5),
              }}>
              You have an empty cart
            </Text>
            <Text style={{fontSize: Fonts.size.small, fontWeight: '700'}}>
              Shop Now!
            </Text>
          </SafeAreaView>
        )}
      </Container>
    );
  }
}

const {selectStoreIdInCart, navigateCheckout} = CartAction;

const mapStateToProps = state => {
  const {availableStores} = state.store;
  const {cart, selectedStoreId} = state.cart;

  let categorizedCart = categorizedCartComputer(cart, availableStores);
  let cartLength = cart.length;
  let subtotal = subTotalComputer(cart, selectedStoreId);

  return {categorizedCart, cartLength, subtotal, selectedStoreId};
};

export default connect(mapStateToProps, {
  selectStoreIdInCart,
  navigateCheckout,
})(CartScreen);
