import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts, Layout} from '../../styles';

const styles = StyleSheet.create({
  container: {
    ...Layout.modalLayout,
    borderRadius: RFValue(10),
    width: '75%',
    minHeight: Dimensions.get('screen').height / 8,
  },
  bottomContainer: {
    ...Layout.modalLayout,
    borderTopStartRadius: RFValue(10),
    borderTopEndRadius: RFValue(10),
    width: '100%',
    minHeight: Dimensions.get('screen').height / 2,
  },
  text: {
    marginLeft: RFValue(20),
    fontSize: Fonts.size.small,
    color: 'gray',
  },
  statusIcon: {
    marginBottom: RFValue(15),
    fontSize: RFValue(50),
  },
  closeLayout: {
    position: 'absolute',
    right: RFValue(10),
    top: RFValue(10),
  },
  actionButtonLayout: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: RFValue(20),
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
