import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../styles';

const styles = StyleSheet.create({
  cartScreenFooterLayout: {
    elevation: 10,
    backgroundColor: 'white',
    height: RFValue(50),
    marginBottom: Platform.OS === 'ios' ? RFValue(25) : 0,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  cartScreenSubtotalContainer: {
    marginRight: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartScreenSubtotalLabel: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
    marginRight: RFValue(5),
  },
  cartScreenPriceLabel: {
    fontSize: Fonts.size.small,
    //color: Colors.price,
    fontWeight: '700',
  },
  cartScreenCheckoutButton: {
    height: '100%',
    width: RFValue(125),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartScreenCheckoutButtonLabel: {
    color: 'white',
    fontWeight: '700',
    fontSize: Fonts.size.mini,
  },
  emptyCartLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: -1,
  },
  emptyCartImage: {
    width: RFValue(100),
    height: RFValue(100),
    marginBottom: RFValue(15),
    marginLeft: -20,
  },
  checkoutDivider: {
    height: RFValue(7),
    backgroundColor: Colors.lightBackground,
    width: '100%',
  },
  checkoutRowLayout: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  checkoutSubLabel: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
  },
  checkoutTotalLabel: {
    fontSize: Fonts.size.small,
    fontWeight: '700',
  },
  orderConfirmationTitle: {
    fontSize: Fonts.size.small,
    fontWeight: '700',
    textAlign: 'center',
  },
  deliveryScheduleInst: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
  },
  deliveryScheduleTimeTitle: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
    marginBottom: 15,
  },
});

export default styles;
