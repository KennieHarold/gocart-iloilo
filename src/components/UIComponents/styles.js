import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts, Colors} from '../../styles';

const productCardDefaultPadding = {
  padding: 0,
  paddingLeft: RFValue(9),
  paddingRight: RFValue(9),
  paddingTop: RFValue(5),
  paddingBottom: 0,
};

const styles = StyleSheet.create({
  productCard: {
    borderRadius: RFValue(10),
    width: RFValue(140),
    borderWidth: RFValue(1),
    padding: RFValue(1),
  },
  productCardImageContainer: {
    margin: RFValue(5),
    borderTopEndRadius: RFValue(10),
    borderTopStartRadius: RFValue(10),
  },
  productCardImage: {
    width: '100%',
    height: RFValue(75),
  },
  productCardNameContainer: {
    ...productCardDefaultPadding,
    minHeight: RFValue(36),
  },
  productCardPriceContainer: {
    ...productCardDefaultPadding,
    borderBottomEndRadius: RFValue(10),
    borderBottomStartRadius: RFValue(10),
  },
  productCardFavContainer: {
    ...productCardDefaultPadding,
  },
  productCardNameLabel: {
    fontSize: Fonts.size.min,
    width: '100%',
  },
  productCardPriceLabel: {
    fontSize: Fonts.size.mini,
    color: Colors.price,
    //fontWeight: '700',
    width: '100%',
  },
  productCardFavIcon: {
    fontSize: Fonts.size.medium,
    width: RFValue(23),
    color: Colors.gold,
    marginRight: RFValue(3),
  },
  productCardFavLabel: {
    fontSize: Fonts.size.min - 1,
    color: Colors.readableText,
  },
  productCardFooter: {
    ...productCardDefaultPadding,
    borderBottomEndRadius: RFValue(10),
    borderBottomStartRadius: RFValue(10),
    paddingBottom: RFValue(10),
    paddingTop: RFValue(10),
  },
  addCartButton: {
    ...Layout.flexCenterContainer,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: RFValue(5),
    height: RFValue(28),
  },
  addCartButtonIcon: {
    fontSize: Fonts.size.verySmall,
    color: 'white',
    width: 18,
    marginRight: RFValue(3),
  },
  addCartButtonText: {
    color: 'white',
    fontSize: Fonts.size.min,
    fontWeight: '700',
  },
});

export default styles;
