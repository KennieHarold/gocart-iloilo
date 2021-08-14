import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Layout, Colors, Fonts} from '../../styles';

const styles = StyleSheet.create({
  storeScreenCover: {
    marginTop: 5,
    width: '100%',
    height: Dimensions.get('screen').height / 8,
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
  searchHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(10),
    backgroundColor: 'white',
    elevation: 2,
  },
  searchItem: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
    height: 40,
    marginLeft: 0,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(10),
    borderColor: 'transparent',
  },
});

export default styles;
