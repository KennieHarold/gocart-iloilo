import React from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';
import {ScreenHeader} from '../../components/Headers';
import {PrimaryBigButton} from '../../components/Buttons';
import {TermsBox} from './components';
import {connect} from 'react-redux';
import {Fonts, Colors, Layout} from '../../styles';
import styles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {appConstants} from '../../firebase/collections';
import {
  toDecimal,
  parseDeliverySchedule,
  parsePaymentMethod,
} from '../../helpers';
import {CartAction, SharedAction} from '../../actions';

class CheckoutScreen extends React.PureComponent {
  state = {
    shoppingFee: null,
    deliveryFee: null,
    isShoppingFeeLoading: false,
    isDeliveryFeeLoading: false,
    isShoppingFeeError: false,
    isDeliveryFeeError: false,
  };

  componentDidMount() {
    this.getInitialCheckoutDetails();
    this.getShoppingFee();
    this.getDeliveryFee();
  }

  getInitialCheckoutDetails = () => {
    const {changeCheckoutDetails, user} = this.props;

    let deliveryAddress = user.address[0];
    delete deliveryAddress.id;

    const initialCheckoutDetails = {
      deliveryAddress,
      contact: {
        code: user.phone.code,
        number: user.phone.number,
      },
    };
    changeCheckoutDetails(initialCheckoutDetails);
  };

  getShoppingFee = async () => {
    this.setState({isShoppingFeeLoading: true});

    await appConstants
      .doc('shoppingFee')
      .get()
      .then(snapshot => {
        let shoppingFee = snapshot.data().value;
        this.setState({shoppingFee});
      })
      .catch(error => {
        console.log(error);
        this.setState({isShoppingFeeError: true});
      });

    this.setState({isShoppingFeeLoading: false});
  };

  getDeliveryFee = async () => {
    this.setState({isDeliveryFeeLoading: true});

    await appConstants
      .doc('deliveryFee')
      .get()
      .then(snapshot => {
        let deliveryFee = snapshot.data().value;
        this.setState({deliveryFee});
      })
      .catch(error => {
        console.log(error);
        this.setState({isDeliveryFeeError: true});
      });

    this.setState({isDeliveryFeeLoading: false});
  };

  handleNavigatePhoneForm = () => {
    const {changePhoneVerifyNextAction, changePhoneFromShared, navigation} =
      this.props;

    changePhoneVerifyNextAction(() => changePhoneFromShared());

    navigation.navigate('PhoneForm');
  };

  render() {
    const {checkoutDetails, selectedStoreProducts, checkout, navigation} =
      this.props;

    const {
      shoppingFee,
      deliveryFee,
      isShoppingFeeLoading,
      isDeliveryFeeLoading,
      isShoppingFeeError,
      isDeliveryFeeError,
    } = this.state;

    const {deliveryAddress} = checkoutDetails;

    const checkoutListItems = [
      {
        id: 'checkout-list-item-address',
        title: 'Delivery Address',
        subtitle:
          deliveryAddress.formattedAddress +
          (deliveryAddress.noteToRider && deliveryAddress.noteToRider !== ''
            ? ` - ${deliveryAddress.noteToRider}`
            : ''),
        iconType: 'Octicons',
        iconName: 'home',
        action: () => navigation.navigate('AddressSelector'),
      },
      {
        id: 'checkout-list-item-delivery-schedule',
        title: 'Delivery Schedule',
        subtitle: parseDeliverySchedule(checkoutDetails.deliverySchedule),
        iconType: 'AntDesign',
        iconName: 'clockcircleo',
        action: () => navigation.navigate('ScheduleSelector'),
      },
      {
        id: 'checkout-list-item-contact-number',
        title: 'Contact Number',
        subtitle: checkoutDetails.contact.code + checkoutDetails.contact.number,
        iconType: 'AntDesign',
        iconName: 'phone',
        action: () => this.handleNavigatePhoneForm(),
      },
      {
        id: 'checkout-list-item-payment-method',
        title: 'Payment Method',
        subtitle: parsePaymentMethod(checkoutDetails.paymentMethod),
        iconType: 'AntDesign',
        iconName: 'creditcard',
        action: () => {},
      },
      {
        id: 'checkout-list-item-delivery-inst',
        title: 'Delivery Instructions (optional)',
        subtitle: 'Press here for delivery instructions',
        iconType: 'FontAwesome',
        iconName: 'sticky-note-o',
        action: () => navigation.navigate('DeliveryInst'),
      },
    ];

    const totalPayment = checkoutDetails.subTotal + shoppingFee + deliveryFee;

    return (
      <Container>
        <ScreenHeader title="Checkout" />
        <Content>
          <List>
            {checkoutListItems.map(listItem => (
              <ListItem key={listItem.id} noIndent onPress={listItem.action}>
                <Left style={{flex: 1}}>
                  <Icon
                    type={listItem.iconType}
                    name={listItem.iconName}
                    style={{fontSize: Fonts.size.medium, width: '100%'}}
                  />
                </Left>
                <Body style={{flex: 8}}>
                  <Text style={{fontSize: Fonts.size.mini, fontWeight: '700'}}>
                    {listItem.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: Fonts.size.min,
                      color: Colors.readableText,
                    }}>
                    {listItem.subtitle}
                  </Text>
                </Body>
                <Right style={{flex: 1}}>
                  <Icon
                    type="AntDesign"
                    name="right"
                    style={{fontSize: Fonts.size.small}}
                  />
                </Right>
              </ListItem>
            ))}
          </List>
          <View style={styles.checkoutDivider} />
          <View style={{padding: RFValue(20)}}>
            <View
              style={[styles.checkoutRowLayout, {marginBottom: RFValue(10)}]}>
              <Text style={[styles.checkoutSubLabel, {fontWeight: '700'}]}>
                Subtotal
              </Text>
              <Text style={[styles.checkoutSubLabel, {fontWeight: '700'}]}>
                &#8369;{toDecimal(checkoutDetails.subTotal)}
              </Text>
            </View>
            <View
              style={[styles.checkoutRowLayout, {marginBottom: RFValue(10)}]}>
              <Text style={styles.checkoutSubLabel}>Shopping Fee</Text>
              {isShoppingFeeLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : isShoppingFeeError ? (
                <Text style={{...styles.checkoutSubLabel, color: Colors.error}}>
                  Error loading shopping fee
                </Text>
              ) : (
                <Text style={styles.checkoutSubLabel}>
                  &#8369;{toDecimal(shoppingFee)}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.checkoutRowLayout,
                {marginBottom: Layout.defaultPaddingNum},
              ]}>
              <Text style={styles.checkoutSubLabel}>Delivery Fee</Text>
              {isDeliveryFeeLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : isDeliveryFeeError ? (
                <Text style={{...styles.checkoutSubLabel, color: Colors.error}}>
                  Error loading delivery fee
                </Text>
              ) : (
                <Text style={styles.checkoutSubLabel}>
                  &#8369;{toDecimal(deliveryFee)}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.checkoutRowLayout,
                {
                  borderTopWidth: 1,
                  borderColor: 'lightgray',
                  paddingTop: 15,
                },
              ]}>
              <Text style={styles.checkoutTotalLabel}>Total</Text>
              {isShoppingFeeLoading && isDeliveryFeeError ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : isShoppingFeeError ? (
                <Text style={{...styles.checkoutSubLabel, color: Colors.error}}>
                  Error loading shopping fee
                </Text>
              ) : (
                <Text style={styles.checkoutTotalLabel}>
                  &#8369;{toDecimal(totalPayment)}
                </Text>
              )}
            </View>
            <View style={{marginTop: Layout.defaultPaddingNum}}>
              <TermsBox />
            </View>
          </View>
        </Content>
        <View
          style={{
            padding: RFValue(20),
            paddingBottom: Platform.OS === 'ios' ? RFValue(50) : 0,
          }}>
          <PrimaryBigButton
            disabled={
              isShoppingFeeError ||
              isShoppingFeeLoading ||
              isDeliveryFeeError ||
              isDeliveryFeeLoading
            }
            action={() =>
              checkout(
                checkoutDetails,
                selectedStoreProducts,
                shoppingFee,
                deliveryFee,
                totalPayment,
              )
            }
            text="Checkout"
          />
        </View>
      </Container>
    );
  }
}

const {changePhoneFromShared, changeCheckoutDetails, checkout} = CartAction;
const {changePhoneVerifyNextAction} = SharedAction;

const mapStateToProps = state => {
  const {user} = state.currentUser;
  const {checkoutDetails, selectedStoreProducts} = state.cart;

  return {user, checkoutDetails, selectedStoreProducts};
};

export default connect(mapStateToProps, {
  changeCheckoutDetails,
  checkout,
  changePhoneVerifyNextAction,
  changePhoneFromShared,
})(CheckoutScreen);
