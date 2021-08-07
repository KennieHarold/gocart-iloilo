import {StyleSheet} from 'react-native';
import {Colors, Fonts, Layout} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  searchItem: {
    borderColor: 'transparent',
    backgroundColor: Colors.lightBackground,
    height: RFValue(50),
    borderRadius: RFValue(15),
    paddingHorizontal: RFValue(10),
    marginLeft: 0,
  },
  searchIcon: {
    color: 'gray',
    fontSize: Fonts.size.small,
  },
  searchInput: {
    fontSize: Fonts.size.mini,
    color: 'gray',
  },
});

export default styles;
