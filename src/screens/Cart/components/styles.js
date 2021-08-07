import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '../../../styles';

const styles = StyleSheet.create({
  storeSectionLayout: {
    marginBottom: RFValue(7),
    backgroundColor: 'white',
    elevation: 2,
    padding: RFValue(15),
  },
  storeIcon: {
    fontSize: Fonts.size.lightMedium,
    marginRight: RFValue(5),
  },
  storeNameLabel: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
  },
  cartProductListItem: {
    paddingVertical: RFValue(15),
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
  },
  cartProductImage: {
    width: RFValue(30),
    height: RFValue(30),
    marginRight: RFValue(10),
  },
  cartProductNameLabel: {
    fontSize: Fonts.size.min,
    marginBottom: RFValue(5),
    width: '100%',
  },
  cartProductPriceLabel: {
    marginLeft: 1,
    fontSize: Fonts.size.mini,
    //color: Colors.price,
    fontWeight: '700',
  },
  termsBoxLayout: {
    width: '100%',
    height: RFValue(50),
    borderRadius: RFValue(5),
    padding: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
  },
  termsBoxText: {
    fontSize: Fonts.size.min - 2,
    textAlign: 'center',
    color: Colors.readableText,
  },
  addressSelectorItemLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    padding: RFValue(15),
    borderRadius: RFValue(10),
  },
});

export default styles;
