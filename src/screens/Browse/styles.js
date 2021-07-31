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
  segmentButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(30),
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(5),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  segmentView: {
    paddingHorizontal: RFValue(20),
    marginVertical: Layout.defaultPaddingNum,
    backgroundColor: 'white',
  },
  noResultsIcon: {
    fontSize: RFValue(50),
    color: Colors.readableText,
    marginBottom: RFValue(10),
  },
});

export default styles;
