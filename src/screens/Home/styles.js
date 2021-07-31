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
});

export default styles;
