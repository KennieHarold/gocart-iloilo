import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts, Colors} from '../../../styles';

const styles = StyleSheet.create({
  orderItemLayout: {
    width: '100%',
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(20),
    flexDirection: 'row',
  },
  orderItemStoreImg: {
    height: RFValue(50),
    width: RFValue(50),
    backgroundColor: Colors.lightBackground,
  },
  orderItemStoreNameLabel: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
  },
  orderItemDateLabel: {
    fontSize: Fonts.size.min,
    color: Colors.readableText,
    marginBottom: RFValue(7),
  },
  orderItemLengthLabel: {
    fontSize: Fonts.size.min,
    color: Colors.readableText,
  },
  orderItemRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemStatusLabel: {
    fontSize: Fonts.size.min - 2,
    textTransform: 'capitalize',
  },
  orderItemRightArrow: {
    marginLeft: RFValue(5),
    fontSize: Fonts.size.small,
  },
});

export default styles;
