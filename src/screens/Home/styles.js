import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Colors, Fonts} from '../../styles';

const styles = StyleSheet.create({
  storeScreenCover: {
    marginTop: 1,
    width: '100%',
    height: Dimensions.get('screen').height / 6,
  },
  storeTabLabel: {
    color: Colors.primary,
    fontSize: Fonts.size.verySmall,
  },
  noProductIcon: {
    fontSize: RFValue(50),
    marginBottom: RFValue(10),
    color: Colors.readableText,
  },
  noProductText: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
  },
  addCartModalImage: {
    height: RFValue(100),
    width: RFValue(100),
    backgroundColor: Colors.lightBackground,
    borderRadius: RFValue(10),
    borderColor: Colors.lightBackground,
    borderWidth: 1,
  },
  addCartModalPriceLabel: {
    width: '100%',
    fontSize: Fonts.size.small,
    color: Colors.price,
    marginTop: RFValue(5),
  },
  addCartModalQtyContainer: {
    width: '100%',
    marginTop: Layout.defaultPaddingNum,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addCartModalQtyLabel: {
    color: Colors.readableText,
    fontSize: Fonts.size.verySmall,
  },
});

export default styles;
