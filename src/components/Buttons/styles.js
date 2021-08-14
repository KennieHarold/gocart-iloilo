import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../styles';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  bigButtonLayout: {
    width: '100%',
    height: RFValue(50),
    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bigButtonText: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: Fonts.size.mini,
    fontWeight: '700',
  },
  cartButtonContainer: {
    height: RFValue(32),
    minWidth: RFValue(60),
    paddingHorizontal: RFValue(10),
    backgroundColor: Colors.primary,
    borderRadius: RFValue(25),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cartButtonIcon: {
    color: 'white',
    fontSize: Fonts.size.verySmall,
    marginTop: -2,
  },
  cartButtonText: {
    color: 'white',
    marginLeft: RFValue(5),
    fontWeight: '700',
    fontSize: Fonts.size.mini,
  },
  searchWideButtonItem: {
    borderColor: 'transparent',
    backgroundColor: Colors.lightBackground,
    height: RFValue(50),
    borderRadius: RFValue(15),
    paddingHorizontal: RFValue(10),
    marginLeft: 0,
  },
  searchWideButtonIcon: {
    color: 'gray',
    fontSize: Fonts.size.small,
  },
  searchWideButtonInput: {
    fontSize: Fonts.size.mini,
    color: 'gray',
  },
  qtyTicksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: RFValue(70),
    justifyContent: 'space-between',
  },
  qtyTicksIcon: {
    fontSize: Fonts.size.mini,
    color: 'white',
    backgroundColor: '#FF7C78',
    padding: RFValue(3),
    borderRadius: RFValue(2),
  },
  qtyTicksText: {
    color: Colors.readableText,
    fontSize: Fonts.size.mini,
  },
  socialButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: RFValue(45),
    borderRadius: RFValue(23),
    flexDirection: 'row',
  },
  socialButtonIcon: {
    color: 'white',
    fontSize: Fonts.size.small,
    marginRight: RFValue(10),
  },
  socialButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: Fonts.size.mini,
  },
});

export default styles;
