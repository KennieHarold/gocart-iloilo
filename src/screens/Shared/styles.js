import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Layout, Fonts} from '../../styles';

const styles = StyleSheet.create({
  subText: {
    fontWeight: '700',
    fontSize: Fonts.size.small,
    marginBottom: Layout.defaultPaddingNum,
  },
  editIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  editIcon: {
    color: Colors.primary,
    fontSize: Fonts.size.big,
  },
  addressText: {
    fontSize: Fonts.size.mini,
    fontWeight: '700',
    color: Colors.readableText,
  },
  addressPlaceHolder: {
    fontSize: Fonts.size.mini,
    color: Colors.secondary,
    fontWeight: '700',
  },
  footer: {
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(20),
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  closeIcon: {
    color: Colors.primary,
    fontSize: 30,
  },
  mapView: {
    height: Dimensions.get('screen').height * 0.5,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
  },
  markerView: {
    height: Dimensions.get('screen').height * 0.5,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(-25),
  },
  mapFormContainer: {
    height: Dimensions.get('screen').height * 0.5,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
  locationIcon: {
    color: Colors.primary,
    fontSize: RFValue(30),
  },
  addressSubLabel: {
    color: 'gray',
    fontSize: Fonts.size.mini,
  },
  phoneFormTitle: {
    fontSize: Fonts.size.small,
    fontWeight: '700',
    marginBottom: RFValue(5),
  },
  phoneFormSubtitle: {
    fontSize: Fonts.size.mini,
    color: Colors.readableText,
    textAlign: 'center',
    marginBottom: Layout.defaultPaddingNum * 2,
  },
  phoneFormTextItem: {
    borderColor: 'transparent',
    backgroundColor: Colors.lightBackground,
    height: RFValue(50),
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(10),
    marginLeft: 0,
    marginBottom: RFValue(15),
  },
  phoneFormNote: {
    fontSize: Fonts.size.min,
    color: 'gray',
    width: '100%',
    marginBottom: Layout.defaultPaddingNum,
  },
});

export default styles;
