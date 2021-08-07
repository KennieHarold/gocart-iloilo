import {StyleSheet} from 'react-native';
import {Fonts, Colors, Layout} from '../../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  favoriteRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(10),
    paddingLeft: RFValue(13),
  },
  favoriteItemImage: {
    height: RFValue(50),
    width: RFValue(50),
  },
  favoriteItemCartText: {
    fontSize: Fonts.size.min,
    color: Colors.primary,
    marginLeft: 5,
  },
});

export default styles;
