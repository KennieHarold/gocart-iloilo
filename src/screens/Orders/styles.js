import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Fonts, Colors} from '../../styles';

const styles = StyleSheet.create({
  orderDetailsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Layout.defaultPaddingNum,
    paddingVertical: RFValue(15),
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  orderDetailsIcon: {
    color: Colors.readableText,
    fontSize: Fonts.size.big,
    marginRight: RFValue(15),
  },
  orderDetailsLabel: {
    fontSize: Fonts.size.mini,
  },
  orderDetailsProductImg: {
    height: RFValue(50),
    width: RFValue(50),
    marginHorizontal: RFValue(10),
  },
  orderDetailsDivider: {
    height: RFValue(5),
    backgroundColor: Colors.lightBackground,
    width: '100%',
  },
  transactionRowLayout: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  transactionSubLabel: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
  },
  transactionTotalLabel: {
    fontSize: Fonts.size.small,
    fontWeight: '700',
  },
});

export default styles;
